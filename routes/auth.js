const router = require('express').Router()
const { generateToken } = require('../lib/auth')

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect email or password' })
  }

  res.json({ token: generateToken() })
})

module.exports = router
