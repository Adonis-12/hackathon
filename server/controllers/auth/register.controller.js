const {registerUser} = require('../../services/auth.service')
async function register(req,res){
    const {name,email,password} = req.body
    await registerUser(name,email,password)
    return res.status(201).json({
        message : "USER_REGISTERED_SUCCESSFULLY"
    })
}

module.exports = {
    register,
}