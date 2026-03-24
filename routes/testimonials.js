const router = require('express').Router()
const Testimonial = require('../models/Testimonial')
const { verifyToken } = require('../lib/auth')

router.get('/', async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: 1 })
  res.json(items)
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const item = await Testimonial.create(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

router.delete('/:id', verifyToken, async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
})

module.exports = router
