const express = require('express')
const resetRequest = require('../../controllers/auth/reset-request.controller')
const asyncHandler = require('../../utils/asyncHandler')
const resetRequestRouter = express.Router()

resetRequestRouter.post('/',asyncHandler(resetRequest))
module.exports = resetRequestRouter