const  {rolePermissions} = require('../auth')
const AppError = require('../utils/errorHandler')

function requirePermission(permission){
    return(req,res,next) => {
        const role = req.membership.role
        console.log(role)
        const allowed = rolePermissions[role] || []

        if(!allowed.includes(permission)){
            throw new AppError(403,'ACCESS_DENIED')
        }
        next()
    }
}

module.exports = {
    requirePermission
}