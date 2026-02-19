const express = require('express')
const router = express.Router({ mergeParams: true })
const { authenticatedUsersOnly } = require('../../middlewares/authenticateUser.middleware')
const { resolveTenant } = require('../../middlewares/resolveTenant.middleware')
const asyncHandler = require('../../utils/asyncHandler')
const P = require('../../auth/permissions')
const { requireMembership } = require('../../middlewares/requireMembership.middleware')
const { requirePermission } = require('../../middlewares/requirePermission')
const memberController = require('../../controllers/tenant/members.controller')

router.post(
    '/invites',
    asyncHandler(authenticatedUsersOnly),
    asyncHandler(resolveTenant),
    asyncHandler(requireMembership),
    requirePermission(P.INVITE_MEMBER),
    asyncHandler(memberController.invite)
)
router.get(
    '/invites/accept',
    asyncHandler(authenticatedUsersOnly),
    asyncHandler(resolveTenant),
    asyncHandler(memberController.acceptInvite)
)

module.exports = router