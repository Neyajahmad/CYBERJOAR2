require('dotenv').config();
const mongoose = require('mongoose');
const Area = require('./models/Area');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urban-growth';

async function checkData() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    const areas = await Area.find();
    
    console.log('\n📊 Database Status:');
    console.log('Total areas:', areas.length);
    
    if (areas.length > 0) {
      console.log('\n📍 Sample areas:');
      areas.slice(0, 5).forEach((area, index) => {
        console.log(`${index + 1}. ${area.areaName} (${area.latitude}, ${area.longitude}) - Score: ${area.growthScore.toFixed(2)}`);
      });
      
      console.log('\n🔍 Checking for Indian cities:');
      const indianCities = areas.filter(a => 
        a.areaName.includes('Delhi') || 
        a.areaName.includes('Mumbai') || 
        a.areaName.includes('Bangalore')
      );
      console.log('Indian cities found:', indianCities.length);
      indianCities.forEach(city => console.log('  -', city.areaName));
    } else {
      console.log('\n⚠️  No data in database!');
      console.log('Run: npm start (to load sample data)');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkData();
