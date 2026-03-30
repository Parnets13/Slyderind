const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const dropIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
    
    const collection = mongoose.connection.db.collection('featuredproducts')
    await collection.dropIndex('slug_1')
    
    console.log('✓ Index "slug_1" dropped successfully')
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

dropIndex()
