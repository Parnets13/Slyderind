const { Schema, model } = require('mongoose')

const AnnouncementSchema = new Schema({
  text: { type: String, required: true },
}, { timestamps: true })

module.exports = model('Announcement', AnnouncementSchema)
