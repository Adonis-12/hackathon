const pool = require('../../db')
const TenantService = require('../../services/tenant.service')

async function getTenants(req,res){
   const {user_id} = req.body
   const tenants =  TenantService.getAllTenants(user_id)
   return res.status(200).json({
     tenants : tenants
   })
}

async function postTenant(req,res){
    const {user_id,tenant_name} = req.body
    await TenantService.createTenant(user_id,tenant_name)
    return res.status(201).json({
        message  : "TENANT_CREATED_SUCCESSFULLY"
    })
}
async function getTenantProfile(req,res){
    const {tenantId} = req.params
    const data = await TenantService.buildTenantProfile(tenantId)
    res.status(200).json({
        data : data
    })
}



module.exports = {
    getTenants,
    postTenant,
    getTenantProfile
}