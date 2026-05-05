const mongoose = require('mongoose')

const whyChooseUsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Icon name from lucide-react
  color: { type: String, default: '#159c48' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('WhyChooseUs', whyChooseUsSchema)
