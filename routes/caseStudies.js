const router = require('express').Router()
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadCaseStudy')

// Lazy-load controller so a bad require doesn't crash the whole server
let ctrl
try {
  ctrl = require('../controllers/caseStudyController')
  console.log('[CaseStudy] Controller loaded. Exports:', Object.keys(ctrl))
} catch (e) {
  console.error('[CaseStudy] Failed to load controller:', e.message)
  ctrl = {}
}

const safe = (fn, name) => {
  if (typeof fn === 'function') return fn
  console.error(`[CaseStudy] Missing controller export: ${name}`)
  return (req, res) => res.status(500).json({ error: `Handler "${name}" not found` })
}

// Public
router.get('/', safe(ctrl.getAllCaseStudies, 'getAllCaseStudies'))
router.get('/slug/:slug', safe(ctrl.getCaseStudyBySlug, 'getCaseStudyBySlug'))

// Admin — must come before /:id
router.get('/admin/all', verifyToken, safe(ctrl.getAllCaseStudiesAdmin, 'getAllCaseStudiesAdmin'))
router.get('/:id', verifyToken, safe(ctrl.getCaseStudyById, 'getCaseStudyById'))

router.post('/', verifyToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('[CaseStudy upload error]', err.message)
      return res.status(400).json({ error: err.message })
    }
    next()
  })
}, safe(ctrl.createCaseStudy, 'createCaseStudy'))

router.put('/:id', verifyToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('[CaseStudy upload error]', err.message)
      return res.status(400).json({ error: err.message })
    }
    next()
  })
}, safe(ctrl.updateCaseStudy, 'updateCaseStudy'))

router.delete('/:id', verifyToken, safe(ctrl.deleteCaseStudy, 'deleteCaseStudy'))

module.exports = router
