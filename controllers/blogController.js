const Blog = require('../models/Blog')

// Get all active blogs (public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all blogs (admin)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single blog by slug (public)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isActive: true })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    
    // Increment views
    blog.views += 1
    await blog.save()
    
    res.json(blog)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single blog by ID (admin)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json(blog)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, slug, shortDescription, content, category, author, tags, isActive, isFeatured } = req.body
    const image = req.file ? req.file.filename : null

    if (!image) {
      return res.status(400).json({ message: 'Image is required' })
    }

    const blog = new Blog({
      title,
      slug,
      shortDescription,
      content,
      image,
      category: category || 'General',
      author: author || 'Slyder Team',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
    })

    const newBlog = await blog.save()
    res.status(201).json(newBlog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, slug, shortDescription, content, category, author, tags, isActive, isFeatured } = req.body

    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })

    if (title !== undefined) blog.title = title
    if (slug !== undefined) blog.slug = slug
    if (shortDescription !== undefined) blog.shortDescription = shortDescription
    if (content !== undefined) blog.content = content
    if (category !== undefined) blog.category = category
    if (author !== undefined) blog.author = author
    if (tags !== undefined) blog.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())
    if (isActive !== undefined) blog.isActive = isActive
    if (isFeatured !== undefined) blog.isFeatured = isFeatured
    if (req.file) blog.image = req.file.filename

    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })

    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: 'Blog deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
