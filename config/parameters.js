/*
  This file is a part of Netfy
  Author: Angel Labrada Massó
 */

// ===============================================================
// Global Settings
// ===============================================================
module.exports = {
  dbUri: process.env.MONGODB || 'mongodb://localhost:27017/netfy', // 27017 is the default mongoDB port
  apiPort: process.env.PORT || 8080,
  SECRET_TOKEN: 'NetfyPass'
}
