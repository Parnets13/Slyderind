require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./lib/db');

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
}))
app.use(express.json())
app.use('/uploads', require('express').static(require('path').join(__dirname, 'uploads')));

// Routes
app.use('/api/auth',          require('./routes/auth'))
app.use('/api/banners',       require('./routes/banners'))
app.use('/api/products',      require('./routes/products'))
app.use('/api/testimonials',  require('./routes/testimonials'))
app.use('/api/announcements',      require('./routes/announcements'))
app.use('/api/contact',            require('./routes/contact'))
app.use('/api/featured-products',  require('./routes/featuredProducts'))
app.use('/api/videos',             require('./routes/videos'))
app.use('/api/hotels',             require('./routes/hotels'))
app.use('/api/about',              require('./routes/about'))
app.use('/api/distributor',        require('./routes/distributor'))
app.use('/api/projects',           require('./routes/projects'))
app.use('/api/become-distributor', require('./routes/becomeDistributor'))
app.use('/api/about-slyder',      require('./routes/aboutSlyder'))
app.use('/api/star-clients',      require('./routes/starClients'))


// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`✅ Slyder backend running on http://localhost:${PORT}`)
});



