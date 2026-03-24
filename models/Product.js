const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  slug:        { type: String, required: true, unique: true },
  name:        { type: String, required: true },
  category:    { type: String, required: true },
  descType:    { type: String, enum: ['bullets', 'table'], required: true },
  description: [String],
  specs:       [{ spec: String, desc: String }],
}, { timestamps: true })

module.exports = model('Product', ProductSchema)
