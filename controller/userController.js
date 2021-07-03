const responseHelper = require('./helper/responseHelper')
const passwordMasterHelper = require('../database/helpers/passwordMasterHelper')
const bcrypt = require('bcrypt')
const saltRounds = 10
const passport = require('passport')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = {
  login: async (req, res, next) => {
    passport.authenticate(
      'local-login',
      {
        session: false,
        failureMessage: true,
        failureFlash: true
      },
      async (error, user, info) => {
        try {
          if (error || !user || info) {
            var message = error ? null : info
            return res.status(400).send(responseHelper.error(400, message))
          }
          //create jwt token for the logged in user/admin
          //jwt session generation
          let token = jwt.sign(
            {
              userId: user.userCode,
              email: user.email,
              type: user.type
            },
            process.env.SECRET,
            {
              expiresIn: process.env.tokenLife
            }
          )
          console.log(`Login JWT Token-${user.email}-${user.type} `, token)
          return res.status(200).send(responseHelper.successWithResult(200, 'Login Successful', token))
        } catch (exception) {
          console.log('indexController:login', exception)
          return res.status(500).send(responseHelper.error(500, exception))
        }
      }
    )(req, res, next)
  },

  register: (req, res, next) => {
    passport.authenticate(
      'local-signup',
      {
        session: false,
        failureMessage: true,
        failureFlash: true
      },
      async (error, user, info) => {
        try {
          var successMessage = ''
          if (error || !user || info) {
            var message = error ? null : info
            return res.status(400).send(responseHelper.error(400, message))
          } else {
            successMessage = user.message
          }
          return res.status(200).send(responseHelper.successWithUpdateMessage(successMessage))
        } catch (exception) {
          console.log('indexController:register', exception)
          return res.status(500).send(responseHelper.error(500, exception))
        }
      }
    )(req, res, next)
  },
}