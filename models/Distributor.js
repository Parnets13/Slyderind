const { Schema, model } = require('mongoose')

const DistributorSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  image:       { type: String },
}, { timestamps: true })

module.exports = model('Distributor', DistributorSchema)
