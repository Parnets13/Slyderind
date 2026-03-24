const router = require('express').Router()
const { getBanners, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController')
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/upload')

router.get('/',       getBanners)
router.post('/',      verifyToken, upload.single('image'), createBanner)
router.put('/:id',    verifyToken, upload.single('image'), updateBanner)
router.delete('/:id', verifyToken, deleteBanner)

module.exports = router
