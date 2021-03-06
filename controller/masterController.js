const responseHelper = require('./helper/responseHelper')
const passwordMasterHelper = require('../database/helpers/passwordMasterHelper')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    getPasswordList: async (req, res) => {
        try {
            let passwordList = await passwordMasterHelper.getPasswordList()
            if (passwordList) {
                var title = []
                for (let i = 0; i < passwordList.length; i++) {
                    title[i] = passwordList[i].title
                }
                log('MasterController:getPasswordList', title, 'info')
                return res.status(200).send(responseHelper.successWithResult(200, null, passwordList))
            } else {
                return res.status(500).send(responseHelper.error(500, exception))
            }
        } catch (exception) {
            log('MasterController:getPasswordList', exception)
            return res.status(500).send(responseHelper.error(500, exception))
        }
    },

    createPasswordList: async (req, res) => {
        try {
            console.log(req.body)
            let { password, title } = req.body

            var hashPassword = await bcrypt.hash(password, saltRounds)
            password = hashPassword
            let createPasswordList = await passwordMasterHelper.createPasswordMaster(password, title)
            if (!createPasswordList) {
                return res.status(500).send(responseHelper.error(500, 'Database Server Error'))
            } else {
                return res.status(200).send(responseHelper.successWithResult(200, null, 'Created Successfully'))
            }
        } catch (exception) {
            console.log(exception)
            return res.status(500).send(responseHelper.error(500, exception))
        }
    },


}