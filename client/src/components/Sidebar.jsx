import React, { useState } from 'react';
import AreaForm from './AreaForm';

const Sidebar = ({ onAddArea, topAreas, filters, onFilterChange }) => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="w-96 bg-white shadow-lg overflow-y-auto">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'add'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Add Area
        </button>
        <button
          onClick={() => setActiveTab('top')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'top'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Top Areas
        </button>
        <button
          onClick={() => setActiveTab('filter')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'filter'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Filters
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'add' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Area</h2>
            <AreaForm onSubmit={onAddArea} />
          </div>
        )}

        {activeTab === 'top' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Top 5 High-Growth Areas</h2>
            {topAreas && topAreas.length > 0 ? (
              <div className="space-y-3">
                {topAreas.map((area, index) => (
                  <div
                    key={area._id}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                          <h3 className="text-lg font-semibold text-gray-800">{area.areaName}</h3>
                        </div>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Growth Score:</span>
                            <span className="font-bold text-blue-600">{area.growthScore.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Price Growth:</span>
                            <span>{area.priceGrowth}%</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Rental Demand:</span>
                            <span>{area.rentalDemand}%</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Infrastructure:</span>
                            <span>{area.infrastructureScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No areas available</p>
            )}
          </div>
        )}

        {activeTab === 'filter' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Filter Areas</h2>
            <div className="space-y-4">
              {/* Search by name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Area Name
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => onFilterChange({ search: e.target.value })}
                  placeholder="Enter area name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* High growth filter */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="highGrowth"
                  checked={filters.showHighGrowthOnly}
                  onChange={(e) => onFilterChange({ showHighGrowthOnly: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="highGrowth" className="ml-2 block text-sm text-gray-700">
                  Show only high-growth areas (score ≥ 70)
                </label>
              </div>

              {/* Clear filters */}
              <button
                onClick={() => onFilterChange({ search: '', showHighGrowthOnly: false })}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Heatmap Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>High Growth (70-100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Medium Growth (40-70)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Low Growth (0-40)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
