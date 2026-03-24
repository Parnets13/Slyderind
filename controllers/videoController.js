const Video = require('../models/Video')
const fs = require('fs')
const path = require('path')

const filePath = (filename) => path.join(__dirname, '../uploads/videos', filename)

const getAll = async (req, res) => {
  const videos = await Video.find().sort({ createdAt: 1 })
  res.json(videos)
}

const create = async (req, res) => {
  try {
    const { title } = req.body
    const filename = req.file ? req.file.filename : null
    const video = await Video.create({ title, filename })
    res.status(201).json(video)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const update = async (req, res) => {
  try {
    const upd = { title: req.body.title }
    if (req.file) {
      const old = await Video.findById(req.params.id)
      if (old?.filename) {
        const p = filePath(old.filename)
        if (fs.existsSync(p)) fs.unlinkSync(p)
      }
      upd.filename = req.file.filename
    }
    const video = await Video.findByIdAndUpdate(req.params.id, upd, { returnDocument: 'after' })
    if (!video) return res.status(404).json({ error: 'Not found' })
    res.json(video)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const remove = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id)
  if (!video) return res.status(404).json({ error: 'Not found' })
  if (video.filename) {
    const p = filePath(video.filename)
    if (fs.existsSync(p)) fs.unlinkSync(p)
  }
  res.json({ success: true })
}

module.exports = { getAll, create, update, remove }

