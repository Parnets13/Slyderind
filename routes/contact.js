const router = require('express').Router()
const nodemailer = require('nodemailer')
const Contact = require('../models/Contact')
const ContactMessage = require('../models/ContactMessage')
const { verifyToken } = require('../lib/auth')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

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

    // Send email notification
    try {
      await transporter.sendMail({
        from: `"Slyder Website" <${process.env.GMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `New Contact Form: ${subject || 'No Subject'} — from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
            <div style="background:#159c48;padding:20px 24px">
              <h2 style="color:#fff;margin:0;font-size:20px">New Contact Form Submission</h2>
            </div>
            <div style="padding:24px">
              <table style="width:100%;border-collapse:collapse;font-size:15px">
                <tr><td style="padding:8px 0;color:#64748b;width:120px">Name</td><td style="padding:8px 0;font-weight:600;color:#0f172a">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;color:#0f172a">${email}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Mobile</td><td style="padding:8px 0;color:#0f172a">${mobile || '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Subject</td><td style="padding:8px 0;color:#0f172a">${subject || '—'}</td></tr>
              </table>
              <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:6px;border-left:4px solid #159c48">
                <p style="margin:0 0 6px;color:#64748b;font-size:13px;font-weight:600">MESSAGE</p>
                <p style="margin:0;color:#0f172a;line-height:1.7">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <p style="margin-top:20px;font-size:12px;color:#94a3b8">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div>
          </div>
        `,
      })
    } catch (mailErr) {
      console.error('Email send failed:', mailErr.message)
      // Don't fail the request if email fails — message is already saved
    }

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
