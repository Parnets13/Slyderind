const { Schema, model } = require('mongoose')

const ContactMessageSchema = new Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  mobile:  { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
}, { timestamps: true })

module.exports = model('ContactMessage', ContactMessageSchema)
