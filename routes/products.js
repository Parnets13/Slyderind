const router = require('express').Router()
const Product = require('../models/Product')
const { verifyToken } = require('../lib/auth')

// Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 })
    res.json(products)
  } catch (err) {
    console.error('❌ Error fetching products:', err.message)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
    if (!product) return res.status(404).json({ error: 'Not found' })
    res.json(product)
  } catch (err) {
    console.error('❌ Error fetching product:', err.message)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// Protected
router.post('/', verifyToken, async (req, res) => {
  try {
    const body = req.body
    if (!body.slug) body.slug = body.name.toLowerCase().replace(/\s+/g, '-')
    const product = await Product.create(body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:slug', verifyToken, async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true, runValidators: true }
  )
  if (!product) return res.status(404).json({ error: 'Not found' })
  res.json(product)
})

router.delete('/:slug', verifyToken, async (req, res) => {
  const product = await Product.findOneAndDelete({ slug: req.params.slug })
  if (!product) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
})

module.exports = router
