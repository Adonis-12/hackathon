const pool = require('../db')
const AppError = require('../utils/errorHandler')
async function getAllProjects(tenant_id){
    console.log(11)
    const result = await pool.query(
        `SELECT name,description,created_by FROM projects WHERE tenant_id = $1`,
        [tenant_id]
    )
    const projects = result.rowCount? result.rows : []
    return projects
}
async function createProject(name,tenant_id,created_by){
    try{
        await pool.query(
            `INSERT INTO projects(name,tenant_id,created_by) VALUES ($1,$2,$3)`,
            [name,tenant_id,created_by]
        )
    }catch(err){
        if(err.code == '23505'){
            throw new AppError(409,'PROJECT_ALREADY_EXISTS')
        }
        throw new Error
    }
    return
}

module.exports = {
    getAllProjects,
    createProject
}