const express = require('express')
const router = express.Router()
const whyChooseUsController = require('../controllers/whyChooseUsController')
const { verifyToken } = require('../lib/auth')

// Public routes
router.get('/', whyChooseUsController.getAllFeatures)

// Admin routes (protected)
router.get('/admin', verifyToken, whyChooseUsController.getAllFeaturesAdmin)
router.get('/:id', verifyToken, whyChooseUsController.getFeatureById)
router.post('/', verifyToken, whyChooseUsController.createFeature)
router.put('/:id', verifyToken, whyChooseUsController.updateFeature)
router.delete('/:id', verifyToken, whyChooseUsController.deleteFeature)

module.exports = router
