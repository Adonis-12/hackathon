const ProfileService = require('../../services/profile.service')
async function getProfile(req,res){
    const user_id = req.user.id
    const {user,tenants} = await ProfileService.builduserProfile(user_id)
    return res.status(200).json({
        user : user,
        tenants : tenants
    })
}
module.exports={
    getProfile
}