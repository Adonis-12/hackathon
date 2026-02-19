const TaskService = require('../../services/task.service')
async function create(req,res){
    const {title,description} = req.body
    const {projectId} = req.params
    const user_id = req.user.id
    await TaskService.createTask(title,description,projectId,user_id)
    console.log("hello")
    return res.status(201).json({
        success : true
    })
}
async function assign(req,res){
    const {taskId} = req.query
    const {user_id} = req.body
    await TaskService.assignTask(user_id,taskId)
    return res.status(201).json({
        success : true
    })
}
module.exports = {
    create,
    assign
}