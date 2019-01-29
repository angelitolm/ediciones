/*
  This file is a part of Netfy
  Author: Angel Labrada Massó
 */

// ===============================================================
// Import Modules
// ===============================================================
const User = require('../models/user')

// ===============================================================
// SignUp
// ===============================================================
async function SignUp (req, res) {
  let errors = []
  const { name, email, username, password, rpassword } = req.body

  // Pre Validations
  // Password miss match
  if (password !== rpassword) errors.push({ text: 'Passwords do not match.' })
  // Password don't have max length
  if (password < 6) errors.push({ text: 'Passwords must be at least 6 characters.' })
  // Send Errors
  if (errors > 0) res.status(500).send({ errors, name, email, username, password, rpassword })

  // Looking for username coincidence
  await User.findOne({ username: username }, async (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
            res.status(500).send({ error: err })
        } else if (user) {
            res.json({ error_msg: `Sorry, already a user with the username: ${username}` })
            req.flash('error_msg', 'The Username is already in use.');
        }
        else {
            // New User data
            const newUser = new User({ name, email, username, password })
            // Encrypt Password
            newUser.password = await newUser.hashPassword(password)
            // Save a new User
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
                return req.flash('success_msg', 'You are registered successfull.');
            })
        }
    })
}

module.exports = {
  SignUp
}
