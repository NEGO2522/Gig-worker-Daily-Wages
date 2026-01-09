import React, { useState } from 'react';
import { FiBell, FiCalendar, FiDollarSign, FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiUser, FiLogOut } from 'react-icons/fi';
import { FaTools, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Worker = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [isOnline, setIsOnline] = useState(true);
  const [workerData, setWorkerData] = useState({
    name: 'Rahul Sharma',
    skillType: 'Electrician',
    isAvailable: true
  });

  const [ongoingJob, setOngoingJob] = useState({
    id: 3,
    title: 'Electrical Wiring',
    description: 'Complete house wiring for new construction',
    location: 'Ujjain, MP',
    price: '₹15,000',
    duration: '3 days',
    customer: 'Rahul Sharma',
    phone: '+91 98765 43210',
    address: '123 Main Street, Ujjain, MP 456010',
    status: 'in-progress' // 'in-progress' or 'completed'
  });

  const toggleAvailability = () => {
    setWorkerData(prev => ({
      ...prev,
      isAvailable: !prev.isAvailable
    }));
  };

  // Sample job data
  const availableJobs = [
    {
      id: 1,
      title: 'Plumbing Repair',
      description: 'Fixing a leaky faucet and unclogging sink',
      location: 'Ujjain, MP',
      price: '₹800 - ₹1,200',
      duration: '2-3 hours',
      posted: '2h ago',
      status: 'pending'
    },
    {
      id: 2,
      title: 'AC Service',
      description: 'Full service and gas refill for 1.5 ton split AC',
      location: 'Indore, MP',
      price: '₹1,500 - ₹2,000',
      duration: '3-4 hours',
      posted: '5h ago',
      status: 'pending'
    }
  ];

  const activeJobs = [];

  const completedJobs = [
    {
      id: 4,
      title: 'Carpentry Work',
      description: 'Wardrobe installation',
      location: 'Ujjain, MP',
      price: '₹3,500',
      duration: '6 hours',
      completedOn: 'Jan 5, 2024',
      rating: 4.8
    }
  ];

  const handleJobAction = (jobId, action) => {
    console.log(`Job ${jobId}: ${action}`);
    if (action === 'accept') {
      const acceptedJob = availableJobs.find(job => job.id === jobId);
      if (acceptedJob) {
        setOngoingJob({
          ...acceptedJob,
          status: 'in-progress',
          customer: 'Rahul Sharma',
          phone: '+91 98765 43210',
          address: '123 Main Street, Ujjain, MP 456010'
        });
      }
    }
  };

  const handleJobStatusChange = () => {
    if (ongoingJob.status === 'in-progress') {
      setOngoingJob(prev => ({
        ...prev,
        status: 'completed'
      }));
    } else {
      // Job is completed, reset ongoing job
      setOngoingJob(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">Worker Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white">
                <FiBell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <FiUser className="text-white" />
                </div>
                <span className="text-sm font-medium text-white">{workerData.name.split(' ')[0]}</span>
              </div>
            </div>
          </div>
          
          {/* Worker Info */}
          <div className="bg-gray-900 rounded-lg p-4 mt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl font-semibold text-white">{workerData.name}</h2>
                <p className="text-gray-300">{workerData.skillType}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">
                  {workerData.isAvailable ? 'Available' : 'Busy'}
                </span>
                <button
                  onClick={toggleAvailability}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    workerData.isAvailable ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      workerData.isAvailable ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Daily Wage Image */}
      <div className="w-full">
        <img 
          src="/daily wage image.jpg" 
          alt="Daily Wage" 
          className="w-full h-auto max-h-64 object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">John Doe</h2>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-600">{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                    isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('available')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left ${
                    activeTab === 'available' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaTools className="mr-3 h-5 w-5" />
                  Available Jobs
                </button>
                <button
                  onClick={() => setActiveTab('active')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left ${
                    activeTab === 'active' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiClock className="mr-3 h-5 w-5" />
                  Active Jobs
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left ${
                    activeTab === 'completed' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiCheckCircle className="mr-3 h-5 w-5" />
                  Completed Jobs
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiUser className="mr-3 h-5 w-5" />
                  My Profile
                </button>
                <button className="flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-md w-full text-left hover:bg-red-50">
                  <FiLogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'available' && (
              <div className="space-y-6">
                {/* Ongoing Job Section - Moved to top */}
                {ongoingJob && ongoingJob.status === 'in-progress' && (
                  <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500 w-full">
                    <h3 className="text-lg font-semibold mb-2">Ongoing Job</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Job Details */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 text-sm">Job Details</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-gray-700"><span className="font-medium">Title:</span> {ongoingJob.title}</p>
                          <p className="text-gray-700"><span className="font-medium">Location:</span> {ongoingJob.location}</p>
                          <p className="text-gray-700"><span className="font-medium">Price:</span> {ongoingJob.price}</p>
                          <p className="text-gray-700"><span className="font-medium">Duration:</span> {ongoingJob.duration}</p>
                        </div>
                      </div>
                      
                      {/* Customer Contact */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 text-sm">Customer Contact</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700"><span className="font-medium">Name:</span> {ongoingJob.customer}</p>
                          <p className="text-gray-700"><span className="font-medium">Phone:</span> {ongoingJob.phone}</p>
                          <p className="text-gray-700"><span className="font-medium">Address:</span> {ongoingJob.address}</p>
                        </div>
                        
                        {/* Action Buttons and Status */}
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                            <span className="text-xs font-medium text-gray-700">
                              {ongoingJob.status === 'in-progress' ? 'In Progress' : 'Completed'}
                            </span>
                          </div>
                          <button
                            onClick={handleJobStatusChange}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 flex items-center"
                          >
                            <FiCheckCircle className="mr-1.5 h-3.5 w-3.5" />
                            {ongoingJob.status === 'in-progress' ? 'Complete Job' : 'Job Completed'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Available Jobs Section */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Available Jobs</h2>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <FiMapPin className="inline mr-1" /> Near Me
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <FiDollarSign className="inline mr-1" /> Price: Low to High
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                    
                    {availableJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                            
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <FaTools className="text-gray-500 mr-2" />
                                <span className="text-gray-700">{job.description}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <FiMapPin className="text-gray-500 mr-2" />
                                <span className="text-gray-700">{job.location}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <FiClock className="text-gray-500 mr-2" />
                                <span className="text-gray-700">{job.duration} • Posted {job.posted}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <FiDollarSign className="text-gray-500 mr-2" />
                                <span className="font-medium text-gray-900">{job.price}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => handleJobAction(job.id, 'accept')}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
                            >
                              <FiCheckCircle className="mr-2" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleJobAction(job.id, 'reject')}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
                            >
                              <FiXCircle className="mr-2" />
                              Reject
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {availableJobs.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No new job requests available at the moment.</p>
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            )}

            {activeTab === 'completed' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Completed Jobs</h2>
                <div className="space-y-4">
                  {completedJobs.map((job) => (
                    <div key={job.id} className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                      <div className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{job.description}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <FiDollarSign className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>Earned: {job.price}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>Duration: {job.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>Completed: {job.completedOn}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-5 w-5 ${i < Math.floor(job.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-gray-500">{job.rating}/5.0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right">
                        <button
                          onClick={() => handleJobAction(job.id, 'contact')}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Contact Customer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiUser className="h-10 w-10 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
                        <p className="text-sm text-gray-500">Plumber & Electrician</p>
                        <p className="text-sm text-gray-500">Ujjain, Madhya Pradesh</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Plumbing
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Electrical
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Carpentry
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">About</label>
                        <p className="mt-1 text-sm text-gray-600">
                          Experienced professional with 5+ years in plumbing and electrical work. Committed to providing quality service with attention to detail.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Jobs Completed</span>
                            <span className="font-medium">124</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Rating</span>
                            <span className="font-medium">4.8/5.0</span>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Response Time</span>
                            <span className="font-medium">15 min</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMail className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                          <span>john.doe@example.com</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiDollarSign className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                          <span>Hourly Rate: ₹500 - ₹800</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMapPin className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                          <span>Ujjain, Madhya Pradesh, India</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                            Receive email notifications
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SMS Notifications</label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sms-notifications"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                            Receive SMS notifications
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Service Area</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ujjain"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="ujjain" className="ml-2 block text-sm text-gray-700">
                          Ujjain
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="indore"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="indore" className="ml-2 block text-sm text-gray-700">
                          Indore
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="dewas"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="dewas" className="ml-2 block text-sm text-gray-700">
                          Dewas
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job History Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-2"></span> Job History
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-medium bg-gray-100 p-3 rounded-lg mb-4">
          <div>Past jobs</div>
          <div>Dates</div>
          <div>Amount earned</div>
          <div>User rating</div>
        </div>
        
        <div className="space-y-4">
          {/* Job Item 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <div className="font-medium">Plumbing Repair</div>
              <div className="text-sm text-gray-500">John D.</div>
            </div>
            <div className="text-sm">Jan 5, 2024</div>
            <div className="text-blue-600 font-medium">₹1,200</div>
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Job Item 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <div className="font-medium">Electrical Wiring</div>
              <div className="text-sm text-gray-500">Sarah M.</div>
            </div>
            <div className="text-sm">Dec 22, 2023</div>
            <div className="text-blue-600 font-medium">₹2,500</div>
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Job Item 3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <div className="font-medium">Bathroom Tiling</div>
              <div className="text-sm text-gray-500">Robert K.</div>
            </div>
            <div className="text-sm">Dec 15, 2023</div>
            <div className="text-blue-600 font-medium">₹3,200</div>
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          Builds trust + proof of work.
        </p>
      </div>

      {/* Spacer between Job History and Footer */}
      <div className="h-16"></div>
      
      {/* Footer */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#E3E3E3] skew-y-1 -translate-y-4 origin-bottom-left"></div>
        <div className="relative pt-16 pb-20">
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

export default Worker;