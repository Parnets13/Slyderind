const Banner = require('../models/Banner')
const fs = require('fs')
const path = require('path')

const getBanners = async (req, res) => {
  const banners = await Banner.find().sort({ createdAt: 1 })
  res.json(banners)
}

const createBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body
    const image = req.file ? req.file.filename : null
    const banner = await Banner.create({ title, subtitle, image })
    res.status(201).json(banner)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateBanner = async (req, res) => {
  try {
    const update = { title: req.body.title, subtitle: req.body.subtitle }
    if (req.file) {
      // Delete old image if exists
      const old = await Banner.findById(req.params.id)
      if (old?.image) {
        const oldPath = path.join(__dirname, '../uploads/banners', old.image)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
      update.image = req.file.filename
    }
    const banner = await Banner.findByIdAndUpdate(req.params.id, update, { returnDocument: 'after' })
    if (!banner) return res.status(404).json({ error: 'Banner not found' })
    res.json(banner)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteBanner = async (req, res) => {
  const banner = await Banner.findByIdAndDelete(req.params.id)
  if (!banner) return res.status(404).json({ error: 'Banner not found' })
  // Delete image file
  if (banner.image) {
    const imgPath = path.join(__dirname, '../uploads/banners', banner.image)
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath)
  }
  res.json({ success: true })
}

module.exports = { getBanners, createBanner, updateBanner, deleteBanner }

