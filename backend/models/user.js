const db = require('../config/db')

class User {
  constructor(user) {
    this.id = user.id
    this.username = user.username
    this.password = user.password
  }

  static findByUsername(username, callback) {
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (error, results) => {
        if (error) {
          return callback(error, null)
        }
        if (results.length === 0) {
          return callback(null, null)
        }
        return callback(null, new User(results[0]))
      }
    )
  }
}

module.exports = User
