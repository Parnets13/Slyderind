const AboutSlyder = require('../models/AboutSlyder')

const DEFAULT = {
  heading: 'Welcome To',
  subheading: 'Slyder Electronics',
  description: "Slyder Electronics revolutionized the hospitality industry with innovative electronic lock solutions. Established in 2006, Slyder emerged as India's frontrunner in cutting-edge hotel locks — driven by quality, innovation, and customer satisfaction.",
  points: [
    'Frontrunner in hotel electronic lock solutions since 2006',
    "Designed India's first RFID Reader for hotel lock systems",
    'Built indigenous Lock Management Software from scratch',
    'Trusted by hundreds of hotels across India',
  ],
  stats: [
    { value: '2006', label: 'Established', order: 0 },
    { value: '18+',  label: 'Years of Excellence', order: 1 },
    { value: '100%', label: 'Made in India', order: 2 },
    { value: '#1',   label: 'RFID in India', order: 3 },
  ],
  pioneerTitle: 'Industry Pioneer',
  pioneerText: 'First to design & manufacture RFID Reader + Lock Management Software in India',
}

const getAboutSlyder = async (req, res) => {
  try {
    let doc = await AboutSlyder.findOne().lean()
    if (!doc) doc = DEFAULT
    res.json(doc)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

const updateAboutSlyder = async (req, res) => {
  try {
    const { heading, subheading, description, points, stats, pioneerTitle, pioneerText } = req.body
    const pts = Array.isArray(points) ? points.filter(p => p.trim()) : []
    const sts = Array.isArray(stats) ? stats : []
    const upd = { heading, subheading, description, points: pts, stats: sts, pioneerTitle, pioneerText }
    let doc = await AboutSlyder.findOne()
    doc = doc
      ? await AboutSlyder.findByIdAndUpdate(doc._id, upd, { new: true })
      : await AboutSlyder.create(upd)
    res.json(doc)
  } catch (err) { res.status(400).json({ error: err.message }) }
}

module.exports = { getAboutSlyder, updateAboutSlyder }
