const Hotel = require('../models/Hotel')
const fs = require('fs')
const path = require('path')

const imgPath = (filename) => path.join(__dirname, '../uploads/hotels', filename)

const getAll = async (req, res) => {
  const hotels = await Hotel.find().sort({ createdAt: 1 })
  res.json(hotels)
}

const create = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null
    const hotel = await Hotel.create({ image })
    res.status(201).json(hotel)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const update = async (req, res) => {
  try {
    const upd = {}
    if (req.file) {
      const old = await Hotel.findById(req.params.id)
      if (old?.image) {
        const p = imgPath(old.image)
        if (fs.existsSync(p)) fs.unlinkSync(p)
      }
      upd.image = req.file.filename
    }
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, upd, { returnDocument: 'after' })
    if (!hotel) return res.status(404).json({ error: 'Not found' })
    res.json(hotel)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const remove = async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id)
  if (!hotel) return res.status(404).json({ error: 'Not found' })
  if (hotel.image) {
    const p = imgPath(hotel.image)
    if (fs.existsSync(p)) fs.unlinkSync(p)
  }
  res.json({ success: true })
}

module.exports = { getAll, create, update, remove }

