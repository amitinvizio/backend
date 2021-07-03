var express = require('express')
var cors = require('cors')

var router = express.Router()
router.use(cors())
const userController = require('../controller/userController')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.post('/createuser')

module.exports = router