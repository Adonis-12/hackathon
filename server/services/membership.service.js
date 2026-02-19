const pool = require('../db')
const AppError = require('../utils/errorHandler')

async function createMembership(client,user_id,tenant_id,role){
    try{
        await client.query(`
         INSERT INTO memberships(user_id,tenant_id,role) 
         VALUES($1,$2,$3)`,
        [user_id,tenant_id,role])
        console.log("request is here")
    }catch(err){
            throw new AppError(409,'ALREADY_A_MEMBER')
    }
}

module.exports = {
    createMembership
}