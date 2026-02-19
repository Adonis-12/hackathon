const bcrypt = require('bcrypt')
const pool = require('../../db')
const crypto = require('crypto')

//post request
async function postResetRequest(req,res){
  
    const {token,password} = req.body

    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password,salt)
    
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const result = await pool.query(
        'SELECT expiry_at,user_id FROM password_resets WHERE token_hash = $1',
        [tokenHash]
    )
    if(!result.rowCount){
        return res.status(400).json({
            message : "Invalid Request"
        })
    }
    const expiry = result.rows[0].expiry_at
    const userId = result.rows[0].user_id
    if(new Date(expiry) < new Date()){
        return res.send("Please try again")
    }
    const client = await pool.connect()// creating a live connection for transaction
    // transaction 
    try{
        await client.query(`BEGIN`)
        await client.query(
            `UPDATE users SET password_hash=$1,updated_at = NOW() WHERE id = $2`,
            [password_hash,userId]
        )
        await client.query(
            `DELETE FROM password_resets WHERE user_id = $1`,
            [userId]
        )

        await client.query(`COMMIT`)
        res.send("Password updated successfully")
    }catch(err){
        await client.query(`ROLLBACK`)
        console.log(err)
        res.send("Something went wrong haha")
    }finally{
        await client.query(
            `DELETE FROM password_resets WHERE expiry_at < NOW()`
        )
        client.release()
    }
}
module.exports = {
    postResetRequest
}