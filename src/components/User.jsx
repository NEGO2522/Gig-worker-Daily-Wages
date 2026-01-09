import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiClock, FiDollarSign, FiMapPin, FiPhone, FiUser, FiCheckCircle, FiClock as FiClockOutline, FiLoader, FiMap, FiStar, FiSearch, FiPlus, FiMinus, FiCompass } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import WorkerCategories from './WorkerCategories';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Memoized Worker Card Component
const WorkerCard = React.memo(({ worker }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    whileHover={{ 
      y: -1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)'
    }}
    className="bg-white rounded-lg p-3 transition-all border border-gray-100 hover:border-blue-100"
  >
    <div className="flex items-start space-x-3">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-xl font-bold">
        {worker.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{worker.name}</h3>
            <p className="text-blue-600 text-sm">{worker.profession}</p>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${worker.available ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {worker.available ? 'Available' : 'Busy'}
          </span>
        </div>
        
        <div className="mt-2 flex items-center text-gray-500 text-sm">
          <FiStar className="fill-amber-400 text-amber-400 mr-1" />
          <span className="font-medium text-gray-700 mr-3">{worker.rating}</span>
          <FiMapPin className="text-blue-400 mr-1" />
          <span className="text-gray-500">{worker.distance}</span>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <span className="font-bold text-gray-900">{worker.rate}</span>
            </div>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md font-medium transition-all flex items-center whitespace-nowrap"
              onClick={() => window.location.href = `tel:${worker.phone || '9876543210'}`}
            >
              <FiPhone className="mr-1.5 text-xs" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));

WorkerCard.displayName = 'WorkerCard';

const User = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [nearbyWorkers, setNearbyWorkers] = useState([
    { id: 1, name: 'Rahul Sharma', profession: 'Electrician', rating: 4.7, distance: '0.8 km', rate: '₹400/hr', available: true, experience: '5 years', completedJobs: 124, phone: '9876543210' },
    { id: 2, name: 'Vikram Singh', profession: 'Plumber', rating: 4.5, distance: '1.2 km', rate: '₹350/hr', available: true, experience: '3 years', completedJobs: 89, phone: '9876543210' },
    { id: 3, name: 'Amit Patel', profession: 'Carpenter', rating: 4.8, distance: '2.1 km', rate: '₹450/hr', available: false, experience: '7 years', completedJobs: 215, phone: '9876543210' },
    { id: 4, name: 'Suresh Kumar', profession: 'AC Repair', rating: 4.6, distance: '1.5 km', rate: '₹500/hr', available: true, experience: '4 years', completedJobs: 156, phone: '9876543210' },
    { id: 5, name: 'Rajesh Verma', profession: 'Painter', rating: 4.3, distance: '0.5 km', rate: '₹300/hr', available: true, experience: '6 years', completedJobs: 198, phone: '9876543210' },
    { id: 6, name: 'Sanjay Gupta', profession: 'Electrician', rating: 4.9, distance: '1.8 km', rate: '₹450/hr', available: true, experience: '8 years', completedJobs: 342, phone: '9876543210' },
    { id: 7, name: 'Deepak Yadav', profession: 'Carpenter', rating: 4.4, distance: '2.5 km', rate: '₹400/hr', available: false, experience: '5 years', completedJobs: 176, phone: '9876543210' },
    { id: 8, name: 'Vijay Malhotra', profession: 'Plumber', rating: 4.7, distance: '0.9 km', rate: '₹380/hr', available: true, experience: '4 years', completedJobs: 132, phone: '9876543210' },
    { id: 9, name: 'Ramesh Iyer', profession: 'AC Repair', rating: 4.8, distance: '1.6 km', rate: '₹550/hr', available: true, experience: '9 years', completedJobs: 287, phone: '9876543210' },
    { id: 10, name: 'Arjun Reddy', profession: 'Painter', rating: 4.6, distance: '1.3 km', rate: '₹320/hr', available: true, experience: '4 years', completedJobs: 154, phone: '9876543210' }
  ]);

  const [activeJobs, setActiveJobs] = useState([
    { id: 1, title: 'Plumbing Repair', status: 'In Progress', worker: 'Rahul Sharma', date: '2023-06-15', amount: 1200 },
    { id: 2, title: 'Electrical Work', status: 'Accepted', worker: 'Vikram Singh', date: '2023-06-20', amount: 2000 }
  ]);
  const [jobHistory, setJobHistory] = useState([
    { 
      id: 1, 
      title: 'Carpentry Work', 
      status: 'Completed', 
      worker: 'Amit Patel', 
      date: '2023-05-10', 
      amount: 1800,
      workerContact: '+91 9876543210',
      serviceType: 'Furniture Repair',
      duration: '2 hours',
      rating: 4.5,
      review: 'Excellent work! Very professional.'
    },
    { 
      id: 2, 
      title: 'AC Installation', 
      status: 'Completed', 
      worker: 'Suresh Kumar', 
      date: '2023-04-25', 
      amount: 3500,
      workerContact: '+91 9876543211',
      serviceType: 'AC Installation',
      duration: '4 hours',
      rating: 4.8,
      review: 'Quick service and proper installation.'
    },
    { 
      id: 3, 
      title: 'Plumbing Work', 
      status: 'In Progress', 
      worker: 'Rahul Sharma', 
      date: '2023-06-15', 
      amount: 1200,
      workerContact: '+91 9876543212',
      serviceType: 'Bathroom Plumbing',
      duration: '3 hours (estimated)',
      scheduledTime: 'Today, 2:00 PM',
      workerRating: 4.7
    }
  ]);

  // Mock data - replace with actual data from your state/API
  const userData = {
    name: 'Prabha Trivedi',
    location: 'Ujjain, Madhya Pradesh',
    phone: '+91 7089063541',
    email: 'prabha.trivedi@example.com',
    memberSince: '2023',
    walletBalance: 1250.75,
    upcomingBookings: 2,
    totalBookings: 12,
    savedWorkers: 5,
    lastActive: '2 hours ago'
  };

  // Simplified animation variants for better performance
  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const cardHover = {
    scale: 1.02,
    transition: { duration: 0.2 }
  };

  // Memoize the workers list to prevent unnecessary re-renders
  const memoizedWorkers = useMemo(() => nearbyWorkers, [nearbyWorkers]);

  // Virtualization would be better for very large lists
  const renderWorkers = useCallback(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
      {memoizedWorkers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  ), [memoizedWorkers]);

  // Add animation styles
  const styles = {
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    },
    '@keyframes pulse': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' }
    },
    '.animate-fadeIn': {
      animation: 'fadeIn 1s ease-out forwards',
      animationDelay: '1.5s',
      opacity: 0
    },
    '.animate-bounce': {
      animation: 'bounce 1s infinite'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      {/* Daily Wage Image Banner */}
      <div className="w-screen">
        <img 
          src="/daily wage image.jpg" 
          alt="Daily Wage Workers" 
          className="w-full h-auto object-cover"
          style={{ 
            height: '300px',
            objectPosition: 'center center',
            width: '100vw'
          }}
        />
      </div>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6">
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 overflow-hidden"
        >
          <div className="space-y-4">
            {/* Main Profile Row */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Profile Picture */}
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 text-3xl font-bold border-2 border-white shadow-sm">
                {userData.name.charAt(0)}
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="flex items-center mr-4">
                        <FiMapPin className="mr-1.5" size={14} />
                        {userData.location}
                      </span>
                      <span className="flex items-center">
                        <FiPhone className="mr-1.5" size={14} />
                        {userData.phone}
                      </span>
                    </div>
                  </div>
                  
                  {/* Wallet Balance */}
                  <div className="bg-blue-50 p-3 rounded-lg min-w-[180px] border border-blue-100">
                    <p className="text-sm text-blue-700 font-medium flex items-center">
                      <FiDollarSign className="mr-1.5" size={14} />
                      Wallet Balance
                    </p>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-bold text-gray-900">₹{userData.walletBalance.toLocaleString('en-IN')}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium bg-white px-2 py-1 rounded-md border border-blue-100 hover:bg-blue-50">
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Activity Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-800">{userData.memberSince}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500">Total Bookings</p>
                    <p className="font-medium text-gray-800">{userData.totalBookings}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500">Upcoming</p>
                    <p className="font-medium text-gray-800">{userData.upcomingBookings} bookings</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500">Last Active</p>
                    <p className="font-medium text-gray-800">{userData.lastActive}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <FiUser className="mr-1.5" size={16} />
                <span>{userData.savedWorkers} workers saved</span>
              </div>
              <div className="w-full sm:w-auto">
                <button 
                  onClick={() => setShowCategories(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center w-full"
                >
                  <FiBriefcase className="mr-2" />
                  Find Worker
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3 sm:space-y-4"
        >
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-900">👷 Workers Nearby</h2>
                <p className="text-gray-600 mt-1">Find skilled professionals in your area</p>
              </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-48">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search location..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full"
                  />
                </div>
                <div className="relative w-full sm:w-auto">
                  <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full">
                    <option>Sort by: Distance</option>
                    <option>Sort by: Rating</option>
                    <option>Sort by: Experience</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Map View */}
            <div className="relative bg-white rounded-xl overflow-hidden mb-6 h-96 border border-gray-200">
              <MapContainer 
                center={[23.1769, 75.7775]} // Ujjain, MP coordinates
                zoom={13} 
                style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
                zoomControl={false}
                scrollWheelZoom={false}
                className="relative"
              >
                {/* Pulsing circle at the center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none">
                  <div className="relative w-4 h-4">
                    <div className="absolute inset-0 bg-blue-600 rounded-full opacity-70 animate-ping"></div>
                    <div className="absolute inset-1 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {memoizedWorkers.slice(0, 8).map((worker, index) => {
                  // Generate more spread out positions around Ujjain
                  const angle = (index / 5) * 2 * Math.PI; // Evenly distribute in a circle
                  const radius = 0.05 + (Math.random() * 0.02); // Random radius between 0.05 and 0.07 degrees
                  const lat = 23.1769 + (Math.sin(angle) * radius);
                  const lng = 75.7775 + (Math.cos(angle) * radius);
                  
                  return (
                    <Marker 
                      key={worker.id} 
                      position={[lat, lng]}
                      icon={L.divIcon({
                        html: `
                          <div class="relative">
                            <div class="bg-white p-1 rounded-full shadow-md border-2 border-blue-500">
                              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                                ${worker.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              ${worker.distance} away
                            </div>
                          </div>
                        `,
                        className: 'bg-transparent border-none',
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                        popupAnchor: [0, -40]
                      })}
                    >
                      <Popup>
                        <div className="text-sm">
                          <h4 className="font-semibold">{worker.name}</h4>
                          <p className="text-blue-600">{worker.profession}</p>
                          <div className="flex items-center mt-1">
                            <FiStar className="text-amber-400 fill-amber-400 mr-1" size={14} />
                            <span className="text-gray-700">{worker.rating}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-600">{worker.distance} away</span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-gray-500 text-xs">Starting from</p>
                            <p className="font-semibold text-gray-800">{worker.rate}</p>
                          </div>
                          <button 
                            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-md flex items-center justify-center"
                            onClick={() => window.location.href = `tel:${worker.phone}`}
                          >
                            <FiPhone className="mr-1.5" size={12} />
                            Contact Now
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
              
              {/* Map controls */}
              <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-[1000]">
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    const map = document.querySelector('.leaflet-container');
                    if (map) {
                      map._leaflet_map.zoomIn();
                    }
                  }}
                >
                  <FiPlus className="text-gray-700" />
                </button>
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    const map = document.querySelector('.leaflet-container');
                    if (map) {
                      map._leaflet_map.zoomOut();
                    }
                  }}
                >
                  <FiMinus className="text-gray-700" />
                </button>
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    const map = document.querySelector('.leaflet-container');
                    if (map) {
                      map._leaflet_map.setView([23.1769, 75.7775], 13);
                    }
                  }}
                >
                  <FiCompass className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Workers List */}
            <div id="available-workers" className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Workers ({memoizedWorkers.length})</h3>
              {renderWorkers()}
            </div>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">📋 My Bookings</h2>
              <div className="relative w-full sm:w-48 mt-2 sm:mt-0">
                <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full">
                  <option>All Bookings</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            {jobHistory.length > 0 ? jobHistory.map((job) => (
              <motion.div 
                key={job.id} 
                variants={item}
                whileHover={cardHover}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100 transition-all mb-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                      <span className="font-bold text-gray-900 text-lg">₹{job.amount.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
                          <FiUser className="text-lg" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Worker</p>
                          <p className="font-medium text-gray-800">{job.worker}</p>
                          {job.workerRating && (
                            <div className="flex items-center mt-1">
                              <FiStar className="text-amber-400 fill-amber-400 mr-1" size={14} />
                              <span className="text-sm text-gray-700">{job.workerRating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-3 flex-shrink-0">
                          <FiBriefcase className="text-lg" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Service</p>
                          <p className="font-medium text-gray-800">{job.serviceType}</p>
                          <p className="text-sm text-gray-500 mt-1">{job.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                          <FiClock className="text-lg" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {job.status === 'Completed' ? 'Completed on' : job.status === 'In Progress' ? 'Scheduled for' : 'Booked on'}
                          </p>
                          <p className="font-medium text-gray-800">
                            {job.scheduledTime || new Date(job.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {job.review && (
                        <div className="mt-2 sm:col-span-2 bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Your Review</p>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`${i < Math.floor(job.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} mr-0.5`} 
                                size={16} 
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">"{job.review}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:flex-col gap-2 sm:gap-3 sm:items-end">
                    <a 
                      href={`tel:${job.workerContact}`}
                      className="flex items-center justify-center px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      <FiPhone className="mr-2" />
                      Call Worker
                    </a>
                    <button className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap">
                      {job.status === 'Completed' ? 'Book Again' : 'View Details'}
                    </button>
                    {job.status === 'Completed' && (
                      <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm font-medium whitespace-nowrap">
                        Download Invoice
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-10 text-gray-500">
                No job history yet.
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showCategories && (
          <WorkerCategories
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setShowCategories(false);
              // Here you can add navigation or state update based on the selected category
              console.log('Selected category:', category);
            }}
            onClose={() => setShowCategories(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Footer with tilted left side */}
      <div className="relative mt-12">
        {/* Tilted section */}
        <div 
          className="h-16 w-full bg-[#E3E3E3] relative overflow-hidden"
          style={{
            clipPath: 'polygon(0 50%, 100% 100%, 100% 100%, 0% 100%)',
            marginTop: '-30px'
          }}
        ></div>
        
        {/* Main footer content */}
        <div className="bg-[#E3E3E3] pt-8 pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-gray-700 font-semibold text-lg">Solver</h3>
                <p className="text-gray-600 text-sm mt-1">Connecting you with trusted professionals</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              </div>
            </div>
            <div className="border-t border-gray-400 mt-6 pt-6 text-center text-gray-600 text-sm">
              {new Date().getFullYear()} Solver. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;