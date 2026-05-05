const mongoose = require('mongoose')

// Suppress deprecation warning
mongoose.set('strictQuery', false)

const connect = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...')
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ MongoDB connected successfully')
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    console.error('Full error:', err)
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB')
})

module.exports = connect
