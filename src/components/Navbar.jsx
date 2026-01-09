import React, { useState } from 'react';
import { FiHome, FiDollarSign, FiMail, FiInfo, FiGlobe } from 'react-icons/fi';
import { FaUserTie } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Home icon */}
            <a href="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <FiHome className="h-6 w-6" />
            </a>
            
            {/* Book a Worker button */}
            <button 
              onClick={() => {
                const element = document.getElementById('available-workers');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If we're not on the User page, navigate there first
                  window.location.href = '/user';
                }
              }}
              className="hidden md:flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <FaUserTie className="h-5 w-5" />
              <span>Book a Worker</span>
            </button>
          </div>
          
          {/* Right section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* About Button */}
            <a 
              href="/about" 
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <FiInfo className="h-4 w-4" />
              <span>About</span>
            </a>

            {/* Contact Button */}
            <a 
              href="/contact" 
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <FiMail className="h-4 w-4" />
              <span>Contact</span>
            </a>
            
            {/* Language Display */}
            <div className="flex items-center text-gray-400 px-2">
              <FiGlobe className="h-4 w-4 mr-1" />
              <span className="text-sm">EN</span>
            </div>
            
            {/* Wallet button */}
            <button className="p-2 rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none text-gray-300">
              <FiDollarSign className="h-5 w-5" />
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <a 
                href="/contact" 
                className="md:hidden mr-2 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
                title="Contact"
              >
                <FiMail className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Book a Worker button */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                const element = document.getElementById('available-workers');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/user';
                }
              }}
              className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium bg-gray-800 text-white hover:bg-gray-700"
            >
              <FaUserTie className="h-5 w-5 mr-2" />
              Book a Worker
            </button>

            {/* Mobile About Button */}
            <a
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            >
              <FiInfo className="h-5 w-5 mr-2" />
              About
            </a>

            {/* Mobile Contact Button */}
            <a
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            >
              <FiMail className="h-5 w-5 mr-2" />
              Contact
            </a>
            
            {/* Mobile wallet button */}
            <a
              href="#"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800"
            >
              <FiDollarSign className="h-5 w-5 text-gray-400" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;