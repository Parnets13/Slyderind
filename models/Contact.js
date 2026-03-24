const { Schema, model } = require('mongoose')

// Single document — we always upsert the one contact info record
const ContactSchema = new Schema({
  address:  String,
  mobile:   String,
  email1:   String,
  email2:   String,
  website:  String,
}, { timestamps: true })

module.exports = model('Contact', ContactSchema)
