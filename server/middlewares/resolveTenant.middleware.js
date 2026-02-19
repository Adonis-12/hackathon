const pool = require('../db')
const AppError = require('../utils/errorHandler')
async function resolveTenant(req,res,next){
    console.log(req.params)
    const {tenantId} = req.params
    console.log(tenantId)
    const result = await pool.query(
        'SELECT id FROM tenants WHERE id = $1',
        [tenantId]
    )
    if(!result.rowCount){
        throw new AppError(404,'TENANT_NOT_FOUND')
    }
    req.tenant = {
        id : tenantId
    }
    console.log('here')
    next()
}

module.exports = {
    resolveTenant
}