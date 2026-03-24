const { Schema, model } = require('mongoose')

const SpecSchema = new Schema({ spec: String, desc: String }, { _id: false })

const FeaturedProductSchema = new Schema({
  name:        { type: String, required: true },
  image:       { type: String },
  descType:    { type: String, enum: ['bullets', 'table'], default: 'bullets' },
  description: [{ type: String }],
  specs:       [SpecSchema],
}, { timestamps: true })

module.exports = model('FeaturedProduct', FeaturedProductSchema)
