const express = require('express')
const { handleUserCount } = require('../controllers/UserhandleSignup')

const router = express.Router()


router.get('/userInfo', handleUserCount)

module.exports = router