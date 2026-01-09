import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiClock, FiDollarSign, FiMapPin, FiPhone, FiUser, FiCheckCircle, FiClock as FiClockOutline, FiLoader } from 'react-icons/fi';
import WorkerCategories from './WorkerCategories';

const User = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock data - replace with actual data from your state/API
  const userData = {
    name: 'Prabha Trivedi',
    location: 'Ujjain, Madhya Pradesh',
    phone: '+91 7089063541',
    walletBalance: 1250.75
  };

  const activeJobs = [
    { id: 1, title: 'Plumbing Repair', status: 'In Progress', worker: 'Mike Johnson', date: '2023-06-15', amount: 1200 },
    { id: 2, title: 'Electrical Work', status: 'Accepted', worker: 'Sarah Wilson', date: '2023-06-20', amount: 2000 }
  ];

  const jobHistory = [
    { id: 1, title: 'Carpentry Work', status: 'Completed', worker: 'Robert Brown', date: '2023-05-10', amount: 1800 },
    { id: 2, title: 'AC Installation', status: 'Completed', worker: 'Emily Davis', date: '2023-04-25', amount: 3500 }
  ];

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardHover = {
    scale: 1.02,
    transition: { duration: 0.2 }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                {userData.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <FiMapPin className="mr-1" />
                  <span>{userData.location}</span>
                  <FiPhone className="ml-3 mr-1" />
                  <span>{userData.phone}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowCategories(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
            >
              <FiBriefcase className="mr-2" />
              Find Worker
            </button>
          </div>
        </motion.div>

        {/* Wallet Card */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          whileHover={cardHover}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-sm text-white p-4 sm:p-6 mb-4 sm:mb-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100">Wallet Balance</p>
              <h2 className="text-3xl font-bold mt-1">₹{userData.walletBalance.toLocaleString('en-IN')}</h2>
            </div>
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors">
              Add Money
            </button>
          </div>
          <div className="mt-4 flex space-x-4 text-sm">
            <button className="flex items-center text-blue-100 hover:text-white">
              <FiDollarSign className="mr-1" /> Withdraw
            </button>
            <button className="flex items-center text-blue-100 hover:text-white">
              <FiClockOutline className="mr-1" /> History
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="flex border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto"
        >
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-4 font-medium ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Active Jobs ({activeJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-4 font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Job History
          </button>
        </motion.div>

        {/* Jobs List */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3 sm:space-y-4"
        >
          {(activeTab === 'active' ? activeJobs : jobHistory).map((job) => (
            <motion.div 
              key={job.id} 
              variants={item}
              whileHover={cardHover}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-3 md:mb-0">
                  <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                  <div className="flex items-center text-gray-600 mt-1 text-sm">
                    <FiUser className="mr-1" />
                    <span className="mr-3">{job.worker}</span>
                    <FiClock className="mr-1" />
                    <span>{new Date(job.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 mr-4">₹{job.amount.toLocaleString('en-IN')}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : job.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status === 'In Progress' ? (
                      <span className="flex items-center"><FiLoader className="animate-spin mr-1" /> {job.status}</span>
                    ) : job.status === 'Completed' ? (
                      <span className="flex items-center"><FiCheckCircle className="mr-1" /> {job.status}</span>
                    ) : (
                      <span className="flex items-center"><FiClockOutline className="mr-1" /> {job.status}</span>
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {(activeTab === 'active' && activeJobs.length === 0) && (
            <div className="text-center py-10 text-gray-500">
              No active jobs. Post a job to get started!
            </div>
          )}
          
          {(activeTab === 'history' && jobHistory.length === 0) && (
            <div className="text-center py-10 text-gray-500">
              No job history yet.
            </div>
          )}
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
    </div>
  );
};

export default User;