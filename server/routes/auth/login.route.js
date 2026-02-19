const express = require('express')
const LoginRouter = express.Router()
const asyncHandler = require('../../utils/asyncHandler')
const {login }= require('../../controllers/auth/login.controller')
const validateInput = require('../../middlewares/validateInput.middleware')
const rateLimiter = require('../../middlewares/rateLimiter.middleware')

LoginRouter.post('/',
    validateInput,
    asyncHandler(rateLimiter),
    asyncHandler(login))
module.exports = LoginRouter