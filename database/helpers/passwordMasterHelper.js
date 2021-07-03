const PasswordMaster = require('../models').PasswordMaster
const { Op, Sequelize: sequelize } = require('sequelize')


module.exports = {
  createPasswordMaster: async (password, title) => {
    try {
      let passwordMasterList = await PasswordMaster.create({ password: password, title: title })
      if(passwordMasterList){
        return passwordMasterList
      }else{
        return null
      }
    } catch (exception) {
      console.log('passwordMasterDBHelper:createAccountMaster', exception)
      return false
    }
  },

  getPasswordList: async () => {
    try {
      let passwordObj = await PasswordMaster.findAll({
        where: { deletedAt: null },
        order: [['id', 'ASC']]
      })
      if (passwordObj) {
        return passwordObj
      } else {
        return null
      }
    } catch (exception) {
      console.log('passwordMasterDBHelper:getPasswordList', exception)
    }
  }
}
