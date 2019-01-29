/*
  This file is a part of Netfy
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Modules
// ===============================================================
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// ===============================================================
// Settings
// ===============================================================
const config = require('./parameters')

// ===============================================================
// Connection to Database
// ===============================================================
mongoose.connect(config.dbUri, { useNewUrlParser: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('Netfy has been connected to Mongo...')
  },
  err => {
    /** handle initial connection error */
    console.log('Oops!!! Error connecting to Mongo: ')
    console.log(err)
  }
)

module.exports = mongoose.connection
