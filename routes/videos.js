const router = require('express').Router()
const { getAll, create, update, remove } = require('../controllers/videoController')
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadVideo')

router.get('/',       getAll)
router.post('/',      verifyToken, upload.single('video'), create)
router.put('/:id',    verifyToken, upload.single('video'), update)
router.delete('/:id', verifyToken, remove)

module.exports = router
