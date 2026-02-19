const pool = require('../db')
const AppError = require('../utils/errorHandler')
const ProjectService = require('./project.service')
async function getAllTenants(user_id){
    const result = await pool.query(
            `SELECT t.tenant_name
             FROM memberships m 
             JOIN tenants t ON 
             m.tenant_id = t.id
             WHERE m.user_id = $1`,
             [user_id]
        )
    const tenants = result.rowCount? result.rows : []
    return tenants
}

async function createTenant(user_id,tenant_name){
    const client = await pool.connect()
    try{
        await client.query(`BEGIN`)
        const result =  await client.query(`INSERT INTO tenants(tenant_name) VALUES($1) RETURNING id`,[tenant_name])
        const tenantId = result.rows[0].id
        await client.query(`INSERT INTO memberships(user_id,tenant_id,role) VALUES($1,$2,'owner')`,[user_id,tenantId])
        await client.query(`COMMIT`)
        return 
    }catch(err){
        await client.query(`ROLLBACK`)
        throw new AppError(500,'FAILED_TO_CREATE_TENANT')
    }finally{
        client.release()
    }
}

async function buildTenantProfile(tenant_id){
   const projects = await ProjectService.getAllProjects(tenant_id)
   const result = await pool.query(
        `SELECT tenant_name FROM tenants WHERE id = $1`,
        [tenant_id]
   )
   const tenantName =  result.rows[0]
   return {tenantName,projects}
}

module.exports = {
    getAllTenants,
    createTenant,
    buildTenantProfile
}