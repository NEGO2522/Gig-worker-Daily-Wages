import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import WorkerAnimation from './WorkerAnimation';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  // Default coordinates (center of India)
  const position = [20.5937, 78.9629];

  // Sample worker locations
  const workers = [
    { position: [20.6, 78.97], type: 'Electrician', name: 'John D.' },
    { position: [20.58, 78.95], type: 'Cleaner', name: 'Sarah M.' },
  ];

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={position} 
        zoom={6} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        zoomControl={false}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {workers.map((worker, index) => (
        <Marker key={index} position={worker.position}>
          <Popup>
            <div className="text-center">
              <strong>{worker.name}</strong><br />
              <span className="text-sm text-gray-600">{worker.type}</span><br />
              <button className="mt-1 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded">
                View Profile
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      </MapContainer>
      
      {/* Worker Animation Overlay */}
      <WorkerAnimation />
    </div>
  );
};

export default MapComponent;
