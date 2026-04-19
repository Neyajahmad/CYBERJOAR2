import React, { useState } from 'react';

const AreaForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    areaName: '',
    latitude: '',
    longitude: '',
    priceGrowth: '',
    rentalDemand: '',
    infrastructureScore: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate
    if (!formData.areaName || !formData.latitude || !formData.longitude ||
        !formData.priceGrowth || !formData.rentalDemand || !formData.infrastructureScore) {
      setMessage({ type: 'error', text: 'All fields are required' });
      setLoading(false);
      return;
    }

    // Convert to numbers
    const areaData = {
      areaName: formData.areaName,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      priceGrowth: parseFloat(formData.priceGrowth),
      rentalDemand: parseFloat(formData.rentalDemand),
      infrastructureScore: parseFloat(formData.infrastructureScore)
    };

    // Validate ranges
    if (areaData.priceGrowth < 0 || areaData.priceGrowth > 100 ||
        areaData.rentalDemand < 0 || areaData.rentalDemand > 100 ||
        areaData.infrastructureScore < 0 || areaData.infrastructureScore > 100) {
      setMessage({ type: 'error', text: 'Scores must be between 0 and 100' });
      setLoading(false);
      return;
    }

    const result = await onSubmit(areaData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Area added successfully!' });
      setFormData({
        areaName: '',
        latitude: '',
        longitude: '',
        priceGrowth: '',
        rentalDemand: '',
        infrastructureScore: ''
      });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to add area' });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Area Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area Name *
        </label>
        <input
          type="text"
          name="areaName"
          value={formData.areaName}
          onChange={handleChange}
          placeholder="e.g., Downtown Manhattan"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Latitude */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Latitude *
        </label>
        <input
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          placeholder="e.g., 40.7128"
          step="any"
          min="-90"
          max="90"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Longitude */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Longitude *
        </label>
        <input
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          placeholder="e.g., -74.0060"
          step="any"
          min="-180"
          max="180"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Price Growth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Growth (0-100) *
        </label>
        <input
          type="number"
          name="priceGrowth"
          value={formData.priceGrowth}
          onChange={handleChange}
          placeholder="e.g., 75"
          min="0"
          max="100"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Rental Demand */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rental Demand (0-100) *
        </label>
        <input
          type="number"
          name="rentalDemand"
          value={formData.rentalDemand}
          onChange={handleChange}
          placeholder="e.g., 80"
          min="0"
          max="100"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Infrastructure Score */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Infrastructure Score (0-100) *
        </label>
        <input
          type="number"
          name="infrastructureScore"
          value={formData.infrastructureScore}
          onChange={handleChange}
          placeholder="e.g., 85"
          min="0"
          max="100"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } transition-colors`}
      >
        {loading ? 'Adding...' : 'Add Area'}
      </button>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md text-xs text-gray-600">
        <p className="font-semibold mb-1">Growth Score Formula:</p>
        <p>Score = (0.4 × Price Growth) + (0.3 × Rental Demand) + (0.3 × Infrastructure)</p>
      </div>
    </form>
  );
};

export default AreaForm;
