const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema({
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = model('Project', ProjectSchema)
