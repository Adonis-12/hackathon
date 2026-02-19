const express = require('express')
const RegisterRouter = express.Router()
const {registerUser} = require('../../controllers/auth/register.controller')
const validateUser = require('../../middlewares/validateInput.middleware')
const asyncHandler = require('../../utils/asyncHandler')

RegisterRouter.post('/',validateUser,asyncHandler(registerUser))

module.exports = RegisterRouter