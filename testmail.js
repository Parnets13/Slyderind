require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

transporter.verify((err, success) => {
  if (err) {
    console.error('❌ Connection failed:', err.message)
  } else {
    console.log('✅ Connected to Gmail. Sending test email...')
    transporter.sendMail({
      from: `"Test" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: 'Nodemailer Test',
      text: 'If you see this, nodemailer is working.',
    }, (err, info) => {
      if (err) console.error('❌ Send failed:', err.message)
      else console.log('✅ Email sent:', info.response)
    })
  }
})
