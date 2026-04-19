const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  priceGrowth: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  rentalDemand: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  infrastructureScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  growthScore: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
areaSchema.index({ growthScore: -1 });
areaSchema.index({ areaName: 1 });

module.exports = mongoose.model('Area', areaSchema);
