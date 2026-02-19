const express = require('express')
const { authenticatedUsersOnly } = require('../../middlewares/authenticateUser.middleware')
const profileController = require('../../controllers/profile/profile.controller')
const asyncHandler = require('../../utils/asyncHandler')
const router = express.Router()

router.get('/',
    authenticatedUsersOnly,
    asyncHandler(profileController.getProfile)
)

module.exports = router