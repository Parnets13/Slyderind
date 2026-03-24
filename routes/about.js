const router = require('express').Router()
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadFounder')
const {
  getSections, createSection, updateSection, deleteSection,
  getFounder, updateFounder,
  getOrgItems, createOrgItem, updateOrgItem, deleteOrgItem,
} = require('../controllers/aboutController')

// Sections
router.get('/sections',         getSections)
router.post('/sections',        verifyToken, createSection)
router.put('/sections/:id',     verifyToken, updateSection)
router.delete('/sections/:id',  verifyToken, deleteSection)

// Founder
router.get('/founder',          getFounder)
router.put('/founder', verifyToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    next()
  })
}, updateFounder)

// Org items
router.get('/org',              getOrgItems)
router.post('/org',             verifyToken, createOrgItem)
router.put('/org/:id',          verifyToken, updateOrgItem)
router.delete('/org/:id',       verifyToken, deleteOrgItem)

module.exports = router
