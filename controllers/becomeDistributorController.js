const { BecomeDistributorContent, DistributorApplication } = require('../models/BecomeDistributor')

const DEFAULT_SECTIONS = [
  { heading: 'Strengths for Providing Service', body: "Please provide detailed information about your company's strengths that make you an ideal distributor for the Slyder Hotel Lock System. Highlight your ability to provide exceptional service and support to hotel projects." },
  { heading: 'Proven Background of Sales to Hotel Projects', body: "Provide evidence of your successful sales history in supplying products to hotel projects. Include specific examples of hotel projects you have supplied and any relevant data that showcases your ability to meet hotel clients' needs and exceed their expectations." },
  { heading: 'Additional Information', body: "Is there any additional information you would like to share that demonstrates your company's suitability as a distributor for the Slyder Hotel Lock System? This could include awards, recognitions, partnerships, or unique strategies you employ." },
]

// ── Page Content ─────────────────────────────────────────
const getContent = async (req, res) => {
  try {
    let doc = await BecomeDistributorContent.findOne().lean()
    if (!doc) doc = await BecomeDistributorContent.create({ sections: DEFAULT_SECTIONS })
    res.json(doc)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

const updateContent = async (req, res) => {
  try {
    const { title, sections, submissionNote } = req.body
    let doc = await BecomeDistributorContent.findOne()
    if (!doc) doc = await BecomeDistributorContent.create({ title, sections, submissionNote })
    else {
      doc.title = title
      doc.sections = sections
      if (submissionNote !== undefined) doc.submissionNote = submissionNote
      await doc.save()
    }
    res.json(doc)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

// ── Applications ─────────────────────────────────────────
const submitApplication = async (req, res) => {
  try {
    if (!req.body.companyName || !req.body.email) return res.status(400).json({ error: 'Company name and email are required' })
    const app = await DistributorApplication.create(req.body)
    res.status(201).json({ success: true, data: app })
  } catch (err) { res.status(500).json({ error: err.message }) }
}

const getApplications = async (req, res) => {
  try {
    const apps = await DistributorApplication.find().sort({ createdAt: -1 }).lean()
    res.json(apps)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

const markRead = async (req, res) => {
  try {
    const app = await DistributorApplication.findByIdAndUpdate(req.params.id, { read: true }, { returnDocument: 'after' })
    res.json(app)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

const deleteApplication = async (req, res) => {
  try {
    await DistributorApplication.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
}

module.exports = { getContent, updateContent, submitApplication, getApplications, markRead, deleteApplication }
