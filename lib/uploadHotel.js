const multer = require('multer')
const path = require('path')
const fs = require('fs')

const UPLOAD_DIR = path.join(__dirname, '../uploads/hotels')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`
    cb(null, unique + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/
  allowed.test(path.extname(file.originalname).toLowerCase())
    ? cb(null, true)
    : cb(new Error('Only image files are allowed'))
}

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })
