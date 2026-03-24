const router = require('express').Router()
const { getAll, getOne, create, update, remove } = require('../controllers/featuredProductController')
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadFeatured')

router.get('/',     getAll)
router.get('/:id',  getOne)
router.post('/',        verifyToken, upload.single('image'), create)
router.put('/:id',      verifyToken, upload.single('image'), update)
router.delete('/:id',   verifyToken, remove)

module.exports = router
