const AuthService = require('../../services/auth.service')
async function login(req,res){
    const {email,password} = req.body
    const {sessionId} = await AuthService.loginUser(email,password)
    res.cookie('session_id',sessionId,{
           httpOnly: true,
           sameSite: 'lax',
           secure: false,
           maxAge: 7 * 24 * 60 * 60 * 1000
        })
    return res.status(200).json({
        message : "USER_LOGGED_IN_SUCCESSFULLY"
    })
}
module.exports = {
    login
}