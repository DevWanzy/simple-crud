const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@isabellah',
  database: 'management',
})

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack)
    return
  }
  console.log('Connected to the database as id ' + db.threadId)
})

module.exports = db
