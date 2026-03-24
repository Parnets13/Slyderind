const { Schema, model } = require('mongoose')

const TestimonialSchema = new Schema({
  name:  { type: String, required: true },
  role:  { type: String },
  hotel: { type: String },
  text:  { type: String, required: true },
}, { timestamps: true })

module.exports = model('Testimonial', TestimonialSchema)
