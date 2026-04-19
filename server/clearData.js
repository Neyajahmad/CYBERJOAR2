require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urban-growth';

async function clearData() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Drop the areas collection
    await mongoose.connection.db.dropCollection('areas');
    
    console.log('✅ Old data cleared successfully!');
    console.log('Now restart the server to load Indian cities data.');
    
    process.exit(0);
  } catch (error) {
    if (error.message.includes('ns not found')) {
      console.log('✅ Collection already empty or does not exist.');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(0);
  }
}

clearData();
