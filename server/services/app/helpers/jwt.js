const jwt = require('jsonwebtoken')

JWT_SECRET = process.env.JWT_SECRET

function signToken(token) {
    return jwt.sign(token, JWT_SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    signToken,
    verifyToken
}