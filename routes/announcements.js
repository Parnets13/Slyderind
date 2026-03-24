const router = require('express').Router()
const Announcement = require('../models/Announcement')
const { verifyToken } = require('../lib/auth')

router.get('/', async (req, res) => {
  const items = await Announcement.find().sort({ createdAt: 1 })
  res.json(items)
})

router.post('/', verifyToken, async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Text required' })
  const item = await Announcement.create({ text })
  res.status(201).json(item)
})

router.put('/:id', verifyToken, async (req, res) => {
  const item = await Announcement.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

router.delete('/:id', verifyToken, async (req, res) => {
  const item = await Announcement.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
})

module.exports = router
