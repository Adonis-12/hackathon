const pool = require("../db");
const TenantService = require("./tenant.service");

async function builduserProfile(user_id){
    const tenants = await TenantService.getAllTenants(user_id)
    const result = await pool.query(
        `SELECT name,email FROM users WHERE id = $1`,
        [user_id]
    )
    console.log('here')
    const user = result.rows[0]
    return {user,tenants}
}

module.exports = {
    builduserProfile
}