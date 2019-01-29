/*
  This file is a part of Netfy
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Modules
// ===============================================================
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('../config/dbconnection')
const passport = require('./middlewares/passport')
const { SECRET_TOKEN } = require('../config/parameters')
const MongoStore = require('connect-mongo')(session)

// ===============================================================
// Route requires
// ===============================================================
const user = require('./routes/user')

// ===============================================================
// Initializing API with Express Framework
// ===============================================================
const api = express()

// ===============================================================
// Middleware
// ===============================================================
// Debug by console everything the requests to making on web server
api.use(morgan('dev'))
// API use format json for all requests
api.use(
  bodyParser.urlencoded({
    'extended': 'false'
  })
)
api.use(bodyParser.json())
// Using Session Variables
api.use(session({
  secret: SECRET_TOKEN, // pick a random string to make the hash that is generated secure
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false, // required
  saveUninitialized: false // required
}))
// Passport
api.use(passport.initialize()) // Initializing passport
api.use(passport.session()) // Save Authentication User

// ===============================================================
// Global Variables
// ===============================================================

// ===============================================================
// Routes
// ===============================================================
api.get('/api', (req, res) => {
  res.status(200).send('<h1>The API Rest running here...')
})
api.use('/user', user) // User Route

// ===============================================================
// Static files
// ===============================================================
// api.use(express.static(path.join(__dirname, '/public')))

module.exports = api
