const { Schema, model } = require('mongoose')

const BannerSchema = new Schema({
  title:    { type: String, required: true },
  subtitle: { type: String },
  image:    { type: String }, // stored filename
}, { timestamps: true })

module.exports = model('Banner', BannerSchema)
