const express = require('express');
const router = express.Router();
const Area = require('../models/Area');

// Calculate growth score using weighted formula
const calculateGrowthScore = (priceGrowth, rentalDemand, infrastructureScore) => {
  return (0.4 * priceGrowth) + (0.3 * rentalDemand) + (0.3 * infrastructureScore);
};

// @route   POST /api/areas
// @desc    Add new area
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { areaName, latitude, longitude, priceGrowth, rentalDemand, infrastructureScore } = req.body;

    // Validate required fields
    if (!areaName || latitude === undefined || longitude === undefined || 
        priceGrowth === undefined || rentalDemand === undefined || infrastructureScore === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate ranges
    if (priceGrowth < 0 || priceGrowth > 100 || 
        rentalDemand < 0 || rentalDemand > 100 || 
        infrastructureScore < 0 || infrastructureScore > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'Scores must be between 0 and 100' 
      });
    }

    // Calculate growth score
    const growthScore = calculateGrowthScore(priceGrowth, rentalDemand, infrastructureScore);

    // Create new area
    const area = new Area({
      areaName,
      latitude,
      longitude,
      priceGrowth,
      rentalDemand,
      infrastructureScore,
      growthScore
    });

    await area.save();

    res.status(201).json({
      success: true,
      data: area
    });
  } catch (error) {
    console.error('Error adding area:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/areas
// @desc    Get all areas
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, minScore } = req.query;
    
    let query = {};
    
    // Search by area name
    if (search) {
      query.areaName = { $regex: search, $options: 'i' };
    }
    
    // Filter by minimum growth score
    if (minScore) {
      query.growthScore = { $gte: parseFloat(minScore) };
    }

    const areas = await Area.find(query).sort({ growthScore: -1 });

    res.json({
      success: true,
      count: areas.length,
      data: areas
    });
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/top-areas
// @desc    Get top 5 high-growth areas
// @access  Public
router.get('/top', async (req, res) => {
  try {
    const topAreas = await Area.find()
      .sort({ growthScore: -1 })
      .limit(5);

    res.json({
      success: true,
      count: topAreas.length,
      data: topAreas
    });
  } catch (error) {
    console.error('Error fetching top areas:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
