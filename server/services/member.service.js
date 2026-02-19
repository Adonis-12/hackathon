const pool = require('../db')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const MembershipService = require('./membership.service')
const AppError = require('../utils/errorHandler')
const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    })
async function sendMail(email,token,user,tenant_name,tenant_id){
    return transporter.sendMail({
        from: `"qwerty" <${process.env.EMAIL_USER}>`,
        to: `${email}`,
        subject: "Tenant Invite",
        text: `Hello ${email.split('@')[0]}`,
        html :`
        <p>You are invited to tenant <b>${tenant_name}</b> by <b>${user}</b></p>
        <p>click on the link below to accept the invite</p>
        <p><a href='http://${process.env.BASE_URL}/api/v1/tenants/${tenant_id}/members/invites/accept?token=${token}'>Link</a></p>
        `
    })
}
async function inviteMember(email,tenant_id,user_id){
    const exists = await pool.query(   `
        SELECT name from users WHERE email=$1`,
    [email])
    if(!exists.rowCount){
        throw new AppError(404,"USER_NOT_FOUND")
    }
    const token = crypto.randomBytes(32).toString('hex') // random token generation
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const result = await pool.query(`
        SELECT 
        u.name AS username,
        t.tenant_name  AS tenant_name
        FROM memberships m
        JOIN tenants t ON 
        t.id = m.tenant_id
        JOIN users u ON 
        u.id = m.user_id
        WHERE m.tenant_id = $1
        `,
        [tenant_id]
    )
    console.log(result)
    const username = result.rows[0].username
    const tenant_name = result.rows[0].tenant_name
    console.log("am i here")
    const client = await pool.connect()
    try{
        await client.query(`BEGIN`)
        await sendMail(email,token,username,tenant_name,tenant_id)
        await client.query(`
        INSERT INTO tenant_invites(tenant_id,email,token,invited_by,expires_at)
        VALUES($1,$2,$3,$4,NOW() + '7 days')
        `,
        [tenant_id,email,hashedToken,user_id]
        )
        await client.query(`COMMIT`)
    }catch(err){
        console.log(err)
        await client.query(`ROLLBACK`)
    }finally{
        client.release()
    }
}

async function addMember(requestToken){
    const hashedToken = crypto.createHash('sha256').update(requestToken).digest('hex')
    const result = await pool.query(
        `SELECT i.token,i.expires_at,i.accepted_at,i.tenant_id,u.id AS user_id
        FROM tenant_invites i
        JOIN users u ON 
        i.email = u.email
        WHERE i.token = $1`,
        [hashedToken]
    )
    const {token,expires_at,accepted_at,tenant_id,user_id} = result.rows[0]


    if(token === hashedToken && new Date(expires_at) > (new Date()) && accepted_at == null){
        const client = await pool.connect()
        try{
            console.log(1)
            await client.query('BEGIN')
            await client.query(`UPDATE tenant_invites SET accepted_at= NOW() WHERE token = $1 `,[hashedToken])
            await MembershipService.createMembership(client,user_id,tenant_id,'member')
            await client.query('COMMIT')
            return 
        }catch(err){
            await client.query('ROLLBACK')
        }finally{
            client.release()
        }
    }else{
        throw new AppError(301,`INVITE_IS_EITHER_EXPIRED_OR_ALREADY_ACCEPTED`)
    }
}
module.exports = {
    inviteMember,
    addMember
}