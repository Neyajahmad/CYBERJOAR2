import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// Access Leaflet from window (loaded via CDN)
const L = window.L;

const MapView = ({ areas }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const heatLayerRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Wait for Leaflet to be available
    if (!window.L) {
      console.error('Leaflet not loaded');
      return;
    }

    // Fix for default marker icons
    if (L.Icon.Default.prototype._getIconUrl) {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }

    // Initialize map only once
    if (!mapInstanceRef.current) {
      // Center on India (Delhi coordinates)
      mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    console.log('MapView received areas:', areas?.length || 0);
    
    if (!mapInstanceRef.current || !areas || areas.length === 0) {
      console.log('Cannot render markers:', {
        hasMap: !!mapInstanceRef.current,
        hasAreas: !!areas,
        areasLength: areas?.length || 0
      });
      return;
    }

    console.log('Rendering', areas.length, 'markers on map');

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Remove existing heatmap layer
    if (heatLayerRef.current) {
      mapInstanceRef.current.removeLayer(heatLayerRef.current);
    }

    // Prepare heatmap data
    const heatData = areas.map(area => [
      area.latitude,
      area.longitude,
      area.growthScore / 100 // Normalize to 0-1 range
    ]);

    // Add heatmap layer
    heatLayerRef.current = L.heatLayer(heatData, {
      radius: 30,
      blur: 25,
      maxZoom: 10,
      max: 1.0,
      gradient: {
        0.0: 'green',
        0.5: 'yellow',
        0.7: 'orange',
        1.0: 'red'
      }
    }).addTo(mapInstanceRef.current);

    // Add markers with popups
    areas.forEach(area => {
      const marker = L.marker([area.latitude, area.longitude])
        .addTo(mapInstanceRef.current);

      // Create popup content
      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-lg mb-2">${area.areaName}</h3>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="font-semibold">Growth Score:</span>
              <span class="text-blue-600 font-bold">${area.growthScore.toFixed(2)}</span>
            </div>
            <hr class="my-1" />
            <div class="flex justify-between">
              <span>Price Growth:</span>
              <span>${area.priceGrowth}%</span>
            </div>
            <div class="flex justify-between">
              <span>Rental Demand:</span>
              <span>${area.rentalDemand}%</span>
            </div>
            <div class="flex justify-between">
              <span>Infrastructure:</span>
              <span>${area.infrastructureScore}%</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (areas.length > 0) {
      const bounds = L.latLngBounds(areas.map(area => [area.latitude, area.longitude]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [areas]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapView;
