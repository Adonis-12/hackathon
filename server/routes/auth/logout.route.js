const express = require('express')
const logoutController = require('../../controllers/auth/logout.controller')
const asyncHandler = require('../../utils/asyncHandler')
const { authenticatedUsersOnly } = require('../../middlewares/authenticateUser.middleware')
const LogoutRouter = express.Router()

LogoutRouter.post('/',
    asyncHandler(authenticatedUsersOnly),
    asyncHandler(logoutController.logout)
)

module.exports = LogoutRouter