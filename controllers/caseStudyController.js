let CaseStudy
try {
  CaseStudy = require('../models/CaseStudy')
  console.log('[CaseStudy] Model loaded OK')
} catch (e) {
  console.error('[CaseStudy] FAILED to load model:', e.message)
}

// GET all active (public)
exports.getAllCaseStudies = async (req, res) => {
  try {
    if (!CaseStudy) return res.status(500).json({ message: 'CaseStudy model not loaded. Check models/CaseStudy.js on server.' })
    const items = await CaseStudy.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(items)
  } catch (err) {
    console.error('[CaseStudy] getAllCaseStudies:', err.message)
    res.status(500).json({ message: err.message })
  }
}

// GET all (admin)
exports.getAllCaseStudiesAdmin = async (req, res) => {
  try {
    if (!CaseStudy) return res.status(500).json({ message: 'CaseStudy model not loaded. Check models/CaseStudy.js on server.' })
    const items = await CaseStudy.find().sort({ createdAt: -1 })
    res.json(items)
  } catch (err) {
    console.error('[CaseStudy] getAllCaseStudiesAdmin:', err.message)
    res.status(500).json({ message: err.message })
  }
}

// GET single by slug (public)
exports.getCaseStudyBySlug = async (req, res) => {
  try {
    if (!CaseStudy) return res.status(500).json({ message: 'CaseStudy model not loaded.' })
    const item = await CaseStudy.findOne({ slug: req.params.slug, isActive: true })
    if (!item) return res.status(404).json({ message: 'Case study not found' })
    item.views += 1
    await item.save()
    res.json(item)
  } catch (err) {
    console.error('[CaseStudy] getCaseStudyBySlug:', err.message)
    res.status(500).json({ message: err.message })
  }
}

// GET single by ID (admin)
exports.getCaseStudyById = async (req, res) => {
  try {
    if (!CaseStudy) return res.status(500).json({ message: 'CaseStudy model not loaded.' })
    const item = await CaseStudy.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Case study not found' })
    res.json(item)
  } catch (err) {
    console.error('[CaseStudy] getCaseStudyById:', err.message)
    res.status(500).json({ message: err.message })
  }
}

// CREATE
exports.createCaseStudy = async (req, res) => {
  try {
    if (!CaseStudy) return res.status(500).json({ message: 'CaseStudy model not loaded.' })
    const { title, slug, client, shortDescription, content, category, result, isActive, isFeatured } = req.body
    const image = req.file ? req.file.filename : null

    if (!image) {
      console.error('[CaseStudy] No image uploaded. req.file is:', req.file)
      return res.status(400).json({ message: 'Image is required. Ensure uploads/case-studies/ folder exists on the server.' })
    }

    const item = new CaseStudy({
      title,
      slug,
      client,
      shortDescription,
      content,
      image,
      category: category || 'General',
      result: result || '',
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
    })

    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error('[CaseStudy] createCaseStudy:', err.message)
    res.status(400).json({ message: err.message })
  }
}

// UPDATE
exports.updateCaseStudy = async (req, res) => {
  try {
    if (!CaseStudy) return res.status(500).json({ message: 'CaseStudy model not loaded.' })
    const { title, slug, client, shortDescription, content, category, result, isActive, isFeatured } = req.body
    const item = await CaseStudy.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Case study not found' })

    if (title !== undefined) item.title = title
    if (slug !== undefined) item.slug = slug
    if (client !== undefined) item.client = client
    if (shortDescription !== undefined) item.shortDescription = shortDescription
    if (content !== undefined) item.content = content
    if (category !== undefined) item.category = category
    if (result !== undefined) item.result = result
    if (isActive !== undefined) item.isActive = isActive
    if (isFeatured !== undefined) item.isFeatured = isFeatured
    if (req.file) item.image = req.file.filename

    const updated = await item.save()
    res.json(updated)
  } catch (err) {
    console.error('[CaseStudy] updateCaseStudy:', err.message)
    res.status(400).json({ message: err.message })
  }
}

// DELETE
exports.deleteCaseStudy = async (req, res) => {
  try {
    if (!CaseStudy) return res.status(500).json({ message: 'CaseStudy model not loaded.' })
    const item = await CaseStudy.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Case study not found' })
    await CaseStudy.findByIdAndDelete(req.params.id)
    res.json({ message: 'Case study deleted' })
  } catch (err) {
    console.error('[CaseStudy] deleteCaseStudy:', err.message)
    res.status(500).json({ message: err.message })
  }
}
