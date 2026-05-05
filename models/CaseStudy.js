const mongoose = require('mongoose')

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  client: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, default: 'General' },
  result: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('CaseStudy', caseStudySchema)
