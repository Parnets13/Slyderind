const StarClient = require('../models/StarClient')
const fs = require('fs')
const path = require('path')

const imgPath = (filename) => path.join(__dirname, '../uploads/star-clients', filename)

const getAll = async (req, res) => {
  const clients = await StarClient.find().sort({ createdAt: 1 })
  res.json(clients)
}

const create = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null
    const client = await StarClient.create({ image })
    res.status(201).json(client)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const update = async (req, res) => {
  try {
    const upd = {}
    if (req.file) {
      const old = await StarClient.findById(req.params.id)
      if (old?.image) {
        const p = imgPath(old.image)
        if (fs.existsSync(p)) fs.unlinkSync(p)
      }
      upd.image = req.file.filename
    }
    const client = await StarClient.findByIdAndUpdate(req.params.id, upd, { returnDocument: 'after' })
    if (!client) return res.status(404).json({ error: 'Not found' })
    res.json(client)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const remove = async (req, res) => {
  const client = await StarClient.findByIdAndDelete(req.params.id)
  if (!client) return res.status(404).json({ error: 'Not found' })
  if (client.image) {
    const p = imgPath(client.image)
    if (fs.existsSync(p)) fs.unlinkSync(p)
  }
  res.json({ success: true })
}

module.exports = { getAll, create, update, remove }
