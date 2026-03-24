const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'slyder_secret'

function generateToken() {
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '8h' })
}

function verifyToken(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    req.user = jwt.verify(auth.split(' ')[1], SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = { generateToken, verifyToken }
