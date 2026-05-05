const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const { verifyToken } = require('../lib/auth')
const upload = require('../lib/uploadBlog')

// Public routes
router.get('/', blogController.getAllBlogs)
router.get('/slug/:slug', blogController.getBlogBySlug)

// Admin routes (protected)
router.get('/admin/all', verifyToken, blogController.getAllBlogsAdmin)
router.get('/admin/:id', verifyToken, blogController.getBlogById)
router.post('/', verifyToken, upload.single('image'), blogController.createBlog)
router.put('/:id', verifyToken, upload.single('image'), blogController.updateBlog)
router.delete('/:id', verifyToken, blogController.deleteBlog)

module.exports = router
