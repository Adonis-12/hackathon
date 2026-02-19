const AuthService = require('../../services/auth.service')
async function logout(req,res){
    const sessionId = req.cookies.session_id
    await AuthService.logoutUser(sessionId)
    res.clearCookie('session_id')
    console.log('here')
    return res.status(204).end()
}

module.exports = {
    logout
}