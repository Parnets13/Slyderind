const { Schema, model } = require('mongoose')

const HotelSchema = new Schema({
  image: { type: String },
}, { timestamps: true })

module.exports = model('Hotel', HotelSchema)
