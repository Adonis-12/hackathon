const pool = require('../db')
const AppError = require('../utils/errorHandler')

async function createTask(title,description,projectId,user_id){
    console.log("heelo")
 try{
    await pool.query(`
        INSERT INTO tasks(title,description,project_id,created_by)
        VALUES($1,$2,$3,$4)`,
        [title,description,projectId,user_id])
 }catch(err){
     console.log(err)
    if(err.code == '23505'){
        throw new AppError(409,'TASK_ALREADY_EXISTS')
    }
    throw new AppError(505,"FAILED_TO_CREATE_TASK")

 }
}
async function assignTask(user_id,task_id){
    try{await pool.query(`
        UPDATE tasks
        SET assigned_to = $1
        WHERE id = $2`,
    [user_id,task_id])
    }catch(err){
        throw new Error
    }
}

module.exports = {
    createTask,
    assignTask
}