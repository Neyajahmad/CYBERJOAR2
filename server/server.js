require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const areaRoutes = require('./routes/areas');
const Area = require('./models/Area');
const sampleAreas = require('./data/sampleData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Calculate growth score helper
const calculateGrowthScore = (priceGrowth, rentalDemand, infrastructureScore) => {
  return (0.4 * priceGrowth) + (0.3 * rentalDemand) + (0.3 * infrastructureScore);
};

// Load sample data on startup (only if database is empty)
const loadSampleData = async () => {
  try {
    const count = await Area.countDocuments();
    if (count === 0) {
      console.log('Loading sample data...');
      
      const areasWithScores = sampleAreas.map(area => ({
        ...area,
        growthScore: calculateGrowthScore(
          area.priceGrowth,
          area.rentalDemand,
          area.infrastructureScore
        )
      }));
      
      await Area.insertMany(areasWithScores);
      console.log('Sample data loaded successfully');
    }
  } catch (error) {
    console.error('Error loading sample data:', error);
  }
};

// Routes
app.use('/api/areas', areaRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  loadSampleData();
});
