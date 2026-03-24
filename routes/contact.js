const router = require('express').Router()
const Contact = require('../models/Contact')
const ContactMessage = require('../models/ContactMessage')
const { verifyToken } = require('../lib/auth')

const DEFAULT_CONTACT = {
  address: 'No.8 First Floor, Opp Government PU College, Jakkur Main Road, Sneha layout, Jakkur, Bangalore - 560064.',
  mobile: '9845670055',
  email1: 'slyderelectronics@gmail.com',
  email2: 'director@slyderind.in',
  website: 'www.slyderind.in',
}

// ── Contact Info ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne().lean()
    if (!contact) contact = await Contact.create(DEFAULT_CONTACT)
    res.json(contact)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.put('/', verifyToken, async (req, res) => {
  try {
    let contact = await Contact.findOne()
    if (!contact) {
      contact = await Contact.create({ ...DEFAULT_CONTACT, ...req.body })
    } else {
      Object.assign(contact, req.body)
      await contact.save()
    }
    res.json(contact)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Contact Form Submissions ──────────────────────────────
router.post('/message', async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required' })
    const msg = await ContactMessage.create({ name, email, mobile, subject, message })
    res.json({ success: true, message: 'Message received. We will get back to you soon.', data: msg })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.get('/messages', verifyToken, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean()
    res.json(messages)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.put('/messages/:id/read', verifyToken, async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { returnDocument: 'after' })
    res.json(msg)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

router.delete('/messages/:id', verifyToken, async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
