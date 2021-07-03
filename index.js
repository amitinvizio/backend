const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index.routes')
const userRoutes = require('./routes/user.routes')
const app = express()
const PORT = process.env.PORT || 3001
const dotenv = require('dotenv').config()
const db = require('./database/models/index')
const passport = require('passport')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())

app.use('/', indexRoutes)
app.use('/user', userRoutes)


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

global.models = require('./database/models/index')

db.sequelize.sync({ logging: console.log }).then((result) => {
    app.listen(PORT, () => {
        console.log(`Listening to port http://localhost:${PORT}`)
    })
}).catch((error) => { console.log(error)})