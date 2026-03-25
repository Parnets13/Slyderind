const { Schema, model } = require('mongoose')

const TestimonialSchema = new Schema({
  name:   { type: String },
  role:   { type: String },
  hotel:  { type: String },
  text:   { type: String },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  image:  { type: String },
}, { timestamps: true })

module.exports = model('Testimonial', TestimonialSchema)
