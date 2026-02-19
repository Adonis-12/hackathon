const crypto = require('crypto')
const pool = require('../../db')
//  mail transporter
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})
// main mailer function
async function sendMail(email,token) {
    return transporter.sendMail({
        from: `"qwerty" <${process.env.EMAIL_USER}>`,
        to: `${email}`,
        subject: "Password reset",
        text: "Hello world2", 
        html: `<b>This mail is only for testing purposes</b>
        <p>click on the link below to reset your password</p>
        <p><a href='http://${process.env.BASE_URL}/reset-password?token=${token}'>Link</a></p>`, 
    })
}
// main controller
async function resetRequest(req,res){
    const {email} = req.body
    const resetToken = crypto.randomBytes(32).toString('hex') // random token generation
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex') // hashing the generated token
    // checking if user exists
    const exists = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    )
    if(!exists.rowCount){
        return res.status(200).json({
            message : "if the user was valid, the reset link will be sent"
        })
    }

    const userId =exists.rows[0].id
    // inserting token to db
    await pool.query(
        `INSERT INTO password_resets(user_id,token_hash,expiry_at) VALUES($1,$2,NOW() + INTERVAL '30 MINUTES')`,
        [userId,hashedToken]
    )
    // sending the mail
    await sendMail(email,resetToken)

    // sending response on succession
    res.status(200).json({
        message : "If the user was valid , the reset link will be sent"
    })
}
module.exports = resetRequest