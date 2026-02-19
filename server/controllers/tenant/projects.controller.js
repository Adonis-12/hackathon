const ProjectService = require('../../services/project.service')
async function create(req,res){
    const {projectName} = req.body
    const tenant_id = req.tenant.id
    const user = req.user.id
    await ProjectService.createProject(projectName,tenant_id,user)
    res.status(201).json({
        message : "PROJECT_CREATED"
    })
}
module.exports = {
    create
}