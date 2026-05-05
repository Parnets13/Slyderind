const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/blogs/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E6) + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|webp/
    const extname = types.test(path.extname(file.originalname).toLowerCase())
    const mimetype = types.test(file.mimetype)
    if (mimetype && extname) return cb(null, true)
    cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'))
  }
})

module.exports = upload
