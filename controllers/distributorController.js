const Distributor = require('../models/Distributor')
const fs = require('fs')
const path = require('path')

const getDistributor = async (req, res) => {
  try {
    const doc = await Distributor.findOne().lean()
    res.json(doc || {})
  } catch (err) { res.status(500).json({ error: err.message }) }
}

const updateDistributor = async (req, res) => {
  try {
    const { title, description } = req.body
    let doc = await Distributor.findOne()
    const upd = { title, description }
    if (req.file) {
      if (doc?.image) {
        const p = path.join(__dirname, '../uploads/distributor', doc.image)
        if (fs.existsSync(p)) fs.unlinkSync(p)
      }
      upd.image = req.file.filename
    }
    doc = doc
      ? await Distributor.findByIdAndUpdate(doc._id, upd, { returnDocument: 'after' })
      : await Distributor.create(upd)
    res.json(doc)
  } catch (err) {
    console.error('updateDistributor error:', err.message)
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getDistributor, updateDistributor }
