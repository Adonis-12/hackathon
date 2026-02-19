const express = require('express')
const router = express.Router()
const loginRoute = require('./login.route')
const registerRoute = require('./login.route')
const resetPasswordRoute = require('./login.route')
const logoutRoute = require('./logout.route')
const resetRequestRoute = require('./login.route')

router.use('/login',loginRoute)
router.use('/register',registerRoute)
router.use('/logout',logoutRoute)
router.use('/reset-request',resetRequestRoute)
router.use('/reset-password',resetPasswordRoute)

module.exports = router