const bcrypt = require('bcrypt')
const User = require('../models/user')
const auth = require('../config/auth')
const db = require('../config/db')

exports.getUsers = (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Database query error: ' + error)
      return res.status(500).json({ message: 'Internal server error' })
    }
    // res.render('login')
    res.status(200).json(results)
  })
}

module.exports.login_get = (req, res) => {
  // res.render('/login')
  res.send('people')
}

exports.signUp = (req, res) => {
  const { username, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)

  const sql = 'INSERT INTO users(username, password) VALUES(?,?)'
  const values = [username, hashedPassword, 'user']
  db.query(sql, values, (error, result) => {
    if (error) {
      console.log('Database query error', error)
      return res.status(500).json({ message: 'Internal Server error' })
    }
    const userId = result.insertId
    const newUser = { id: userId, username }
    const token = auth.generateToken(newUser)
    // res.redirect('/login')
    res.json({ resp: 'user added successfully' })
  })
}

// User login
exports.login = (req, res) => {
  const { username, password } = req.body

  User.findByUsername(username, (error, user) => {
    if (error) {
      console.error('Database query error: ' + error)
      return res.status(500).json({ message: 'Internal server error' })
    }

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    // Check if the provided password matches the hashed password in the database
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    // Generate a JWT token
    const token = auth.generateToken(user)

    res.status(200).json({ user: user.username })
    // res.render('/dashboard')
  })
}

// Logout route (not implemented on the server-side)
exports.logout = (req, res) => {
  // You can clear the token by setting it to null or deleting it from the client-side
  // For example, you can clear cookies or local storage where the token is stored
  res.status(200).json({ message: 'Logged out successfully' })
}
// module.exports.logout_get = (req, res) => {
//   res.cookie('jwt', '', { maxAge: 1 })
//   res.redirect('/')
// }
