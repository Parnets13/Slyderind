const WhyChooseUs = require('../models/WhyChooseUs')

// Get all active features (public)
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await WhyChooseUs.find({ isActive: true }).sort({ order: 1 })
    res.json(features)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all features (admin)
exports.getAllFeaturesAdmin = async (req, res) => {
  try {
    const features = await WhyChooseUs.find().sort({ order: 1 })
    res.json(features)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single feature
exports.getFeatureById = async (req, res) => {
  try {
    const feature = await WhyChooseUs.findById(req.params.id)
    if (!feature) return res.status(404).json({ message: 'Feature not found' })
    res.json(feature)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create feature
exports.createFeature = async (req, res) => {
  try {
    const { title, description, icon, color, order, isActive } = req.body

    const feature = new WhyChooseUs({
      title,
      description,
      icon,
      color: color || '#159c48',
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    })

    const newFeature = await feature.save()
    res.status(201).json(newFeature)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Update feature
exports.updateFeature = async (req, res) => {
  try {
    const { title, description, icon, color, order, isActive } = req.body

    const feature = await WhyChooseUs.findById(req.params.id)
    if (!feature) return res.status(404).json({ message: 'Feature not found' })

    if (title !== undefined) feature.title = title
    if (description !== undefined) feature.description = description
    if (icon !== undefined) feature.icon = icon
    if (color !== undefined) feature.color = color
    if (order !== undefined) feature.order = order
    if (isActive !== undefined) feature.isActive = isActive

    const updatedFeature = await feature.save()
    res.json(updatedFeature)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete feature
exports.deleteFeature = async (req, res) => {
  try {
    const feature = await WhyChooseUs.findById(req.params.id)
    if (!feature) return res.status(404).json({ message: 'Feature not found' })

    await WhyChooseUs.findByIdAndDelete(req.params.id)
    res.json({ message: 'Feature deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
