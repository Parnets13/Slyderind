const FeaturedProduct = require('../models/FeaturedProduct')
const fs = require('fs')
const path = require('path')

const imgPath = (filename) => path.join(__dirname, '../uploads/featured', filename)

const parseJSON = (val, fallback) => {
  try { return JSON.parse(val) } catch { return fallback }
}

const getAll = async (req, res) => {
  try {
    const items = await FeaturedProduct.find().sort({ createdAt: 1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getOne = async (req, res) => {
  try {
    const item = await FeaturedProduct.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const create = async (req, res) => {
  try {
    const { name, descType, description, specs } = req.body
    const image = req.file ? req.file.filename : null
    const item = await FeaturedProduct.create({
      name, image,
      descType: descType || 'bullets',
      description: parseJSON(description, []),
      specs: parseJSON(specs, []),
    })
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const update = async (req, res) => {
  try {
    const { name, descType, description, specs } = req.body
    const upd = {
      name,
      descType: descType || 'bullets',
      description: parseJSON(description, []),
      specs: parseJSON(specs, []),
    }
    if (req.file) {
      const old = await FeaturedProduct.findById(req.params.id)
      if (old?.image) {
        const p = imgPath(old.image)
        if (fs.existsSync(p)) fs.unlinkSync(p)
      }
      upd.image = req.file.filename
    }
    const item = await FeaturedProduct.findByIdAndUpdate(req.params.id, upd, { new: true })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const item = await FeaturedProduct.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    if (item.image) {
      const p = imgPath(item.image)
      if (fs.existsSync(p)) fs.unlinkSync(p)
    }
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getAll, getOne, create, update, remove }
