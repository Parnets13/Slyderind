const FAQ = require('../models/FAQ')

// Get all active FAQs (public)
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: 1 })
    res.json(faqs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all FAQs (admin)
exports.getAllFAQsAdmin = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 })
    res.json(faqs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single FAQ
exports.getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id)
    if (!faq) return res.status(404).json({ message: 'FAQ not found' })
    res.json(faq)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, category, order, isActive } = req.body

    const faq = new FAQ({
      question,
      answer,
      category: category || 'General',
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    })

    const newFAQ = await faq.save()
    res.status(201).json(newFAQ)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Update FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const { question, answer, category, order, isActive } = req.body

    const faq = await FAQ.findById(req.params.id)
    if (!faq) return res.status(404).json({ message: 'FAQ not found' })

    if (question !== undefined) faq.question = question
    if (answer !== undefined) faq.answer = answer
    if (category !== undefined) faq.category = category
    if (order !== undefined) faq.order = order
    if (isActive !== undefined) faq.isActive = isActive

    const updatedFAQ = await faq.save()
    res.json(updatedFAQ)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id)
    if (!faq) return res.status(404).json({ message: 'FAQ not found' })

    await FAQ.findByIdAndDelete(req.params.id)
    res.json({ message: 'FAQ deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
