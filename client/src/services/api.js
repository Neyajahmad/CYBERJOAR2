import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add new area
export const addArea = async (areaData) => {
  try {
    const response = await api.post('/areas', areaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all areas
export const getAllAreas = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.minScore) params.append('minScore', filters.minScore);
    
    const response = await api.get(`/areas?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get top 5 areas
export const getTopAreas = async () => {
  try {
    const response = await api.get('/areas/top');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
