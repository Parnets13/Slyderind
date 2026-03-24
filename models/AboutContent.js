const { Schema, model } = require('mongoose')

const AboutSectionSchema = new Schema({
  sectionId:   { type: String },
  heading:     { type: String, required: true },
  description: { type: String, default: '' },
  points:      [{ type: String }],
  order:       { type: Number, default: 0 },
}, { timestamps: true })

const AboutFounderSchema = new Schema({
  heading:    { type: String, default: 'Visionary Founder of Slyder Electronics' },
  subheading: { type: String, default: 'Early Education and Academic Background' },
  bio:        { type: String },
  name:       { type: String, default: 'Mr. S. Venkatesh' },
  role:       { type: String, default: 'Founder & CEO' },
  image:      { type: String },
}, { timestamps: true })

const OrgItemSchema = new Schema({
  heading: { type: String, required: true },
  content: { type: String },
  order:   { type: Number, default: 0 },
}, { timestamps: true })

module.exports = {
  AboutSection: model('AboutSection', AboutSectionSchema),
  AboutFounder: model('AboutFounder', AboutFounderSchema),
  OrgItem:      model('OrgItem', OrgItemSchema),
}
