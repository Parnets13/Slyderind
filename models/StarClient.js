const { Schema, model } = require('mongoose')

const StarClientSchema = new Schema({
  image: { type: String },
}, { timestamps: true })

module.exports = model('StarClient', StarClientSchema)
