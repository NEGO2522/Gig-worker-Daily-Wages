import React from 'react';
import { FaTools, FaPaintRoller, FaWrench, FaTint, FaBolt, FaTree, FaCar, FaLaptopHouse } from 'react-icons/fa';
import { MdCarpenter, MdElectricalServices, MdPlumbing, MdCleaningServices } from 'react-icons/md';

const workerCategories = [
  { id: 1, name: 'Plumber', icon: <FaTint className="text-3xl text-blue-500" /> },
  { id: 2, name: 'Electrician', icon: <FaBolt className="text-3xl text-yellow-500" /> },
  { id: 3, name: 'Carpenter', icon: <MdCarpenter className="text-3xl text-amber-800" /> },
  { id: 4, name: 'Painter', icon: <FaPaintRoller className="text-3xl text-purple-500" /> },
  { id: 5, name: 'AC Repair', icon: <FaTools className="text-3xl text-cyan-500" /> },
  { id: 6, name: 'Gardener', icon: <FaTree className="text-3xl text-green-500" /> },
  { id: 7, name: 'Mechanic', icon: <FaWrench className="text-3xl text-gray-600" /> },
  { id: 8, name: 'Carpenter', icon: <MdCarpenter className="text-3xl text-amber-800" /> },
  { id: 9, name: 'Electrician', icon: <MdElectricalServices className="text-3xl text-yellow-500" /> },
  { id: 10, name: 'Plumber', icon: <MdPlumbing className="text-3xl text-blue-500" /> },
  { id: 11, name: 'Cleaning', icon: <MdCleaningServices className="text-3xl text-green-400" /> },
  { id: 12, name: 'Home Service', icon: <FaLaptopHouse className="text-3xl text-indigo-500" /> },
];

const WorkerCategories = ({ onSelectCategory, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start md:items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto my-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Select Worker Category</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 -mr-2"
            aria-label="Close"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {workerCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                {React.cloneElement(category.icon, {
                  className: `${category.icon.props.className} text-2xl sm:text-3xl`
                })}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center mt-1">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerCategories;
