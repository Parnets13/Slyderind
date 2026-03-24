const router = require('express').Router()
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadDistributor')
const { getDistributor, updateDistributor } = require('../controllers/distributorController')

router.get('/', getDistributor)
router.put('/', verifyToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    next()
  })
}, updateDistributor)

module.exports = router
