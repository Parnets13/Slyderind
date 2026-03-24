const router = require('express').Router()
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadProject')
const { getProjects, createProject, deleteProject } = require('../controllers/projectController')

router.get('/', getProjects)
router.post('/', verifyToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    next()
  })
}, createProject)
router.delete('/:id', verifyToken, deleteProject)

module.exports = router
