const { Schema, model } = require('mongoose')

const StarClientSchema = new Schema({
  name:  { type: String },
  image: { type: String },
}, { timestamps: true })

module.exports = model('StarClient', StarClientSchema)
