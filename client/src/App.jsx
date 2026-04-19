import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import { getAllAreas, getTopAreas, addArea } from './services/api';

function App() {
  const [areas, setAreas] = useState([]);
  const [topAreas, setTopAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    showHighGrowthOnly: false
  });

  // Fetch all areas
  const fetchAreas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filterParams = {};
      if (filters.search) filterParams.search = filters.search;
      if (filters.showHighGrowthOnly) filterParams.minScore = 70;
      
      console.log('Fetching areas with filters:', filterParams);
      const response = await getAllAreas(filterParams);
      console.log('Received areas:', response.data.length, 'areas');
      setAreas(response.data);
    } catch (err) {
      setError('Failed to fetch areas');
      console.error('Error fetching areas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch top areas
  const fetchTopAreas = async () => {
    try {
      const response = await getTopAreas();
      setTopAreas(response.data);
    } catch (err) {
      console.error('Failed to fetch top areas:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAreas();
    fetchTopAreas();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchAreas();
  }, [filters]);

  // Handle new area submission
  const handleAddArea = async (areaData) => {
    try {
      await addArea(areaData);
      await fetchAreas();
      await fetchTopAreas();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to add area' };
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        onAddArea={handleAddArea}
        topAreas={topAreas}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Main Content - Map */}
      <div className="flex-1 relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-md">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Predictive Urban Growth Modeling Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Visualizing high-growth real estate areas based on pricing trends, rental demand, and infrastructure
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-full pt-20">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading areas...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-red-600">
                <p className="text-xl font-semibold">{error}</p>
                <button
                  onClick={fetchAreas}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <MapView areas={areas} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
