const MemberService = require('../../services/member.service')
async function invite(req,res){
    const tenant_id = req.tenant.id
    const user_id = req.user.id
    const {email} = req.body
    await MemberService.inviteMember(email,tenant_id,user_id)
    res.status(201).json({
        success : true
    })
}

async function acceptInvite(req,res){
    const {token} = req.query
    await MemberService.addMember(token)
    res.status(201).json({
        success : true 
    })
}

module.exports = {
    invite,
    acceptInvite
}