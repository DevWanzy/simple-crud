const auth = require('../config/auth')

// Middleware to protect routes (verify JWT token)
exports.requireAuth = (req, res, next, error) => {
  const token = req.headers.authorization

  if (!token) {
    console.log(error.message)
    return res.status(401).json({ message: 'Authentication required' })
  }

  // Verify the token
  const decodedToken = auth.verifyToken(token)

  if (!decodedToken) {
    console.log(error.message)

    return res.status(401).json({ message: 'Invalid token' })
  }

  // Attach the decoded user data to the request
  req.user = decodedToken
  next()
}

// check current user
exports.checkUser = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, 'isabellah', async (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.locals.user = null
        next()
      } else {
        // console.log(decodedToken);
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

// const auth = require('../config/auth') // Import the auth module
// const { verifyToken } = auth // Destructure the verifyToken function from auth
// const { verifyToken, generateToken } = require('../config/auth')
// exports.requireAuth = (req, res, next) => {
//   const token = req.headers.authorization

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' })
//   }

//   // Verify the token using the verifyToken function from the auth module
//   const decodedToken = verifyToken(token)
//   console.log(decodedToken)
//   if (!decodedToken) {
//     return res.status(401).json({ message: 'Invalid token' })
//   }

//   // Attach the decoded user data to the request
//   req.user = decodedToken
//   next()
// }
