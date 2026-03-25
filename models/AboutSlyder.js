const { Schema, model } = require('mongoose')

const StatSchema = new Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
})

const AboutSlyderSchema = new Schema({
  heading:     { type: String, default: 'Welcome To' },
  subheading:  { type: String, default: 'Slyder Electronics' },
  description: { type: String, default: '' },
  points:      [{ type: String }],
  stats:       [StatSchema],
  pioneerTitle:{ type: String, default: 'Industry Pioneer' },
  pioneerText: { type: String, default: 'First to design & manufacture RFID Reader + Lock Management Software in India' },
}, { timestamps: true })

module.exports = model('AboutSlyder', AboutSlyderSchema)
