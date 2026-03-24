const router = require('express').Router()
const { verifyToken } = require('../lib/auth')
const { getContent, updateContent, submitApplication, getApplications, markRead, deleteApplication } = require('../controllers/becomeDistributorController')

router.get('/content',              getContent)
router.put('/content', verifyToken, updateContent)

router.post('/apply',               submitApplication)
router.get('/applications', verifyToken, getApplications)
router.put('/applications/:id/read', verifyToken, markRead)
router.delete('/applications/:id',   verifyToken, deleteApplication)

module.exports = router
