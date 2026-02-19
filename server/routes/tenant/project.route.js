const express = require('express')
const router = express.Router({ mergeParams: true })
const ProjectsController = require('../../controllers/tenant/projects.controller')
const { authenticatedUsersOnly } = require('../../middlewares/authenticateUser.middleware')
const { resolveTenant } = require('../../middlewares/resolveTenant.middleware')
const { requireMembership } = require('../../middlewares/requireMembership.middleware')
const { requirePermission } = require('../../middlewares/requirePermission')
const P = require('../../auth/permissions')
const asyncHandler = require('../../utils/asyncHandler')
const tasksRouter = require('./task.route')

router.post('/',
    asyncHandler(authenticatedUsersOnly),
    asyncHandler(resolveTenant),
    asyncHandler(requireMembership),
    requirePermission(P.CREATE_PROJECT),
    asyncHandler(ProjectsController.create)
)
router.use('/:projectId/tasks',tasksRouter)

module.exports = router