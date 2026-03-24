const { Schema, model } = require('mongoose')

const VideoSchema = new Schema({
  title:    { type: String, required: true },
  filename: { type: String },
}, { timestamps: true })

module.exports = model('Video', VideoSchema)
