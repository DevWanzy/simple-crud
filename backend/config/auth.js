// const jwt = require('jsonwebtoken')
// const secretKey = 'isabellah'

// function generateToken(user) {
//   return jwt.sign(
//     { id: user.id, username: user.username, userType: user.userType },
//     secretKey,
//     {
//       expiresIn: '1h',
//     }
//   )
// }

// function verifyToken(token) {
//   try {
//     return jwt.verify(token, secretKey)
//   } catch (err) {
//     return null // Token is invalid
//   }
// }

// module.exports = {
//   generateToken,
//   verifyToken,
// }
const jwt = require('jsonwebtoken')

// Secret key for signing and verifying tokens (keep this secret!)
const secretKey = 'isabellah'

// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    password: user.password,
    // Add other user data as needed
  }

  // Generate a token with a payload and a secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }) // Token expires in 1 hour

  return token
}

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, secretKey)

    return decodedToken
  } catch (err) {
    return null // If verification fails, return null
  }
}

module.exports = { generateToken, verifyToken }
