const express = require('express')
const router = express.Router()
const tenantRoute = require('./tenant.route')

router.use('/',tenantRoute)

module.exports = router