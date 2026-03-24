const Project = require('../models/Project')
const fs = require('fs')
const path = require('path')

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: 1 }).lean()
    res.json(projects)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

const createProject = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image is required' })
    const count = await Project.countDocuments()
    const project = await Project.create({ image: req.file.filename, order: count })
    res.status(201).json(project)
  } catch (err) { res.status(400).json({ error: err.message }) }
}

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ error: 'Not found' })
    const p = path.join(__dirname, '../uploads/projects', project.image)
    if (fs.existsSync(p)) fs.unlinkSync(p)
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
}

module.exports = { getProjects, createProject, deleteProject }
