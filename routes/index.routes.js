var express = require('express')
var cors = require('cors')

var router = express.Router()
router.use(cors())
const masterController = require('../controller/masterController')

router.get('/password', masterController.getPasswordList)

router.post('/password', masterController.createPasswordList)

module.exports = router