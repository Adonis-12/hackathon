const express = require('express')
const router = express.Router()
const authRouter = require('./auth/index')
const tenantsRouter = require('./tenant/index')
const profileRouter = require('./profile/profile.route')

router.use('/auth',authRouter)
router.use('/tenants',tenantsRouter)
router.use('/profile',profileRouter)

module.exports = router