require('dotenv').config();

// Set mongoose strictQuery BEFORE any other imports
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const connectDB = require('./lib/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Verify environment variables are loaded
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env file')
  process.exit(1)
}

console.log('🔧 Environment loaded, PORT:', PORT)

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://slyderind.in',
  'https://www.slyderind.in',
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
}));
app.use(express.json());
app.use('/uploads', require('express').static(path.join(__dirname, 'uploads')));

// Serve frontend static files
const frontendPath = path.join(__dirname, 'build');
app.use(express.static(frontendPath));

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
app.use('/api/why-choose-us',      require('./routes/whyChooseUs'))
app.use('/api/faq',                require('./routes/faq'))
app.use('/api/blog',               require('./routes/blog'))
app.use('/api/about-slyder',      require('./routes/aboutSlyder'))
app.use('/api/star-clients',      require('./routes/starClients'))
app.use('/api/case-studies',      require('./routes/caseStudies'))

/* =======================
   📄 FRONTEND FALLBACK (VERY IMPORTANT)
======================= */
app.get('*', (req, res) => {
  // Allow API routes to pass through to the 404 handler
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API not found' });
  }

  // Serve index.html for all non-asset routes (SPA fallback)
  res.sendFile(path.join(frontendPath, 'index.html'));
});

/* =======================
   ❌ ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error('❌ Stack:', err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

/* =======================
   🚀 START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);

  // Keep-alive (optional)
  if (process.env.RENDER_EXTERNAL_URL) {
    setInterval(() => {
      https.get(`${process.env.RENDER_EXTERNAL_URL}/api/contact`)
        .on('error', () => {});
    }, 14 * 60 * 1000);
  }
}).on('error', (err) => {
  console.error('❌ Server error:', err);
});