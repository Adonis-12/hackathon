const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncHandler = require('../../utils/asyncHandler')
const { authenticatedUsersOnly } = require('../../middlewares/authenticateUser.middleware')
const { resolveTenant } = require('../../middlewares/resolveTenant.middleware')
const { requireMembership } = require('../../middlewares/requireMembership.middleware')
const { requirePermission } = require('../../middlewares/requirePermission') 
const P = require('../../auth/permissions')
const taskController = require('../../controllers/tenant/task.controller')

router.post('/',
    asyncHandler(authenticatedUsersOnly),
    asyncHandler(resolveTenant),
    asyncHandler(requireMembership),
    requirePermission(P.CREATE_TASK),
    asyncHandler(taskController.create)
)
router.patch('/',
    asyncHandler(authenticatedUsersOnly),
    asyncHandler(resolveTenant),
    asyncHandler(requireMembership),
    requirePermission(P.ASSIGN_TASK),
    asyncHandler(taskController.assign)
)
module.exports = router