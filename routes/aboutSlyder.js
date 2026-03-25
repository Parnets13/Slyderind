const router = require('express').Router()
const { verifyToken } = require('../lib/auth')
const { getAboutSlyder, updateAboutSlyder } = require('../controllers/aboutSlyderController')

router.get('/',  getAboutSlyder)
router.put('/',  verifyToken, updateAboutSlyder)

module.exports = router
