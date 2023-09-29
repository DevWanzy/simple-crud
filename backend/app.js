const express = require('express')
const app = express()
require('dotenv').config()
// const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const CookieParser = require('cookie-parser')
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
// app.use(CookieParser)

// Routes
const authRoutes = require('./routes/authRouter')
const itemRoutes = require('./routes/itemRouter')
const { checkUser, requireAuth } = require('./middlewares/authMiddleware')

app.use('/user', authRoutes)
app.use('/items', itemRoutes)

app.get('/dashboard', requireAuth, (req, res) => {
  const user = res.locals.user

  res.render('dashboard', { user })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
