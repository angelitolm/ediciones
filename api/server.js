/*
  This file is a part of Netfy
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Modules
// ===============================================================
const api = require('./api')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// ===============================================================
// Settings
// ===============================================================
const config = require('../config/parameters')

// ===============================================================
// Starting Server
// ===============================================================
api.listen(config.apiPort, () => {
  console.log(`API Rest Netfy running on http://localhost:${config.apiPort}`)
})

module.exports = mongoose
