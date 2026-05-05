const express = require('express')
const router = express.Router()
const faqController = require('../controllers/faqController')
const { verifyToken } = require('../lib/auth')

// Public routes
router.get('/', faqController.getAllFAQs)

// Admin routes (protected)
router.get('/admin', verifyToken, faqController.getAllFAQsAdmin)
router.get('/:id', verifyToken, faqController.getFAQById)
router.post('/', verifyToken, faqController.createFAQ)
router.put('/:id', verifyToken, faqController.updateFAQ)
router.delete('/:id', verifyToken, faqController.deleteFAQ)

module.exports = router
