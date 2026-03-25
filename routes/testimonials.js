const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const Testimonial = require('../models/Testimonial')
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadTestimonial')

const handleUpload = (req, res, next) =>
  upload.single('image')(req, res, err => {
    if (err) return res.status(400).json({ error: err.message })
    next()
  })

router.get('/', async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: 1 })
  res.json(items)
})

router.post('/', verifyToken, handleUpload, async (req, res) => {
  try {
    const data = { ...req.body }
    if (data.rating) data.rating = Number(data.rating)
    if (req.file) data.image = req.file.filename
    const item = await Testimonial.create(data)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', verifyToken, handleUpload, async (req, res) => {
  try {
    const existing = await Testimonial.findById(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Not found' })
    const data = { ...req.body }
    if (data.rating) data.rating = Number(data.rating)
    if (req.file) {
      if (existing.image) {
        const old = path.join(__dirname, '../uploads/testimonials', existing.image)
        if (fs.existsSync(old)) fs.unlinkSync(old)
      }
      data.image = req.file.filename
    }
    const item = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  if (item.image) {
    const p = path.join(__dirname, '../uploads/testimonials', item.image)
    if (fs.existsSync(p)) fs.unlinkSync(p)
  }
  res.json({ success: true })
})

module.exports = router
