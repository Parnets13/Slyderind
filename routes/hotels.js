const router = require('express').Router()
const { getAll, create, update, remove } = require('../controllers/hotelController')
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadHotel')

router.get('/',       getAll)
router.post('/',      verifyToken, upload.single('image'), create)
router.put('/:id',    verifyToken, upload.single('image'), update)
router.delete('/:id', verifyToken, remove)

module.exports = router
