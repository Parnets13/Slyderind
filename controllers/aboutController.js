const { AboutSection, AboutFounder, OrgItem } = require('../models/AboutContent')
const fs = require('fs')
const path = require('path')

// ── About Sections ──────────────────────────────────────────
const getSections = async (req, res) => {
  try {
    const sections = await AboutSection.find().sort({ order: 1 }).lean()
    res.json(sections)
  } catch (err) { res.status(500).json({ error: err.message }) }
}
const createSection = async (req, res) => {
  try {
    const { sectionId, heading, description, points, order } = req.body
    const id = sectionId || heading.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()
    const pts = Array.isArray(points) ? points.filter(p => p.trim()) : []
    const section = await AboutSection.create({ sectionId: id, heading, description, points: pts, order: order || 0 })
    res.status(201).json(section)
  } catch (err) { res.status(400).json({ error: err.message }) }
}
const updateSection = async (req, res) => {
  try {
    const { heading, description, points, order } = req.body
    const pts = Array.isArray(points) ? points.filter(p => p.trim()) : []
    const section = await AboutSection.findByIdAndUpdate(
      req.params.id,
      { heading, description, points: pts, order: order || 0 },
      { returnDocument: 'after' }
    )
    if (!section) return res.status(404).json({ error: 'Not found' })
    res.json(section)
  } catch (err) { res.status(400).json({ error: err.message }) }
}
const deleteSection = async (req, res) => {
  const section = await AboutSection.findByIdAndDelete(req.params.id)
  if (!section) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
}

// ── Founder ─────────────────────────────────────────────────
const getFounder = async (req, res) => {
  try {
    const founder = await AboutFounder.findOne().lean()
    res.json(founder || {})
  } catch (err) {
    console.error('getFounder error:', err.message)
    res.status(500).json({ error: err.message })
  }
}
const updateFounder = async (req, res) => {
  try {
    const { heading, subheading, bio, name, role } = req.body
    let founder = await AboutFounder.findOne()
    const upd = { heading, subheading, bio, name, role }
    if (req.file) {
      if (founder?.image) {
        const p = path.join(__dirname, '../uploads/founder', founder.image)
        if (fs.existsSync(p)) fs.unlinkSync(p)
      }
      upd.image = req.file.filename
    }
    founder = founder
      ? await AboutFounder.findByIdAndUpdate(founder._id, upd, { returnDocument: 'after' })
      : await AboutFounder.create(upd)
    res.json(founder)
  } catch (err) {
    console.error('updateFounder error:', err.message)
    res.status(500).json({ error: err.message })
  }
}

// ── Org Items ────────────────────────────────────────────────
const getOrgItems = async (req, res) => {
  try {
    const items = await OrgItem.find().sort({ order: 1 }).lean()
    res.json(items)
  } catch (err) { res.status(500).json({ error: err.message }) }
}
const createOrgItem = async (req, res) => {
  try {
    const { heading, content, order } = req.body
    const item = await OrgItem.create({ heading, content, order: order || 0 })
    res.status(201).json(item)
  } catch (err) { res.status(400).json({ error: err.message }) }
}
const updateOrgItem = async (req, res) => {
  try {
    const { heading, content, order } = req.body
    const item = await OrgItem.findByIdAndUpdate(req.params.id, { heading, content, order: order || 0 }, { returnDocument: 'after' })
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) { res.status(400).json({ error: err.message }) }
}
const deleteOrgItem = async (req, res) => {
  const item = await OrgItem.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
}

module.exports = { getSections, createSection, updateSection, deleteSection, getFounder, updateFounder, getOrgItems, createOrgItem, updateOrgItem, deleteOrgItem }

