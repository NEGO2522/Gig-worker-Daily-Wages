import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';

const Slideshow = () => {
  const images = [
    '/wages.jpg',
    '/zomato.JPG',
    '/daily wage image.jpg',
    '/daily.jpg'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[calc(100%-2rem)] max-w-[1200px] mx-auto h-[32rem] md:h-[40rem] overflow-hidden rounded-2xl my-4 shadow-xl">
      <img 
        src={images[currentImageIndex]} 
        alt="Slideshow"
        className="w-full h-full object-cover transition-opacity duration-1000"
      />
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="bg-black shadow-md py-2 w-full">
        <div className="flex justify-center w-full px-2">
          <div className="flex items-center flex-wrap justify-center space-x-1 bg-gray-900 bg-opacity-50 px-4 py-2 rounded-full border border-gray-700 max-w-full">
            <span className="text-xl font-bold text-white px-3">Solver</span>
            <div className="h-6 w-px bg-gray-600 mx-2"></div>
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                About us
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Contact us
              </Link>
            </div>
            <div className="h-6 w-px bg-gray-600 mx-2"></div>
            <div className="flex items-center">
              <button className="flex items-center text-gray-300 hover:text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slideshow */}
      <Slideshow />

      {/* User and Worker Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 py-8 w-full max-w-6xl mx-auto">
        {/* User Card */}
        <div className="w-full md:w-1/3 bg-gray-900 bg-opacity-50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">I'm a User</h3>
            <p className="text-gray-300 mb-4">Find the best services and professionals for your needs</p>
            <Link to="/user" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
              Get Started
            </Link>
          </div>
        </div>

        {/* Worker Card */}
        <div className="w-full md:w-1/3 bg-gray-900 bg-opacity-50 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 16h.01M16 16h.01M8 16h.01M3 20h18a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">I'm a Worker</h3>
            <p className="text-gray-300 mb-4">Offer your services and connect with potential clients</p>
            <Link to="/worker" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
              Join Now
            </Link>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Find & Book Workers Near You</h2>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <input 
              type="text" 
              placeholder="Search for services or skills..."
              className="w-full bg-gray-800 text-white rounded-full py-4 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          {/* Map Container */}
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden h-96 w-full border border-gray-700">
            <MapComponent />
            
            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-10">
              <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
              <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* How it Works */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: '🔍', 
                title: 'Search', 
                desc: 'Find the right worker for your needs' 
              },
              { 
                icon: '📍', 
                title: 'Locate', 
                desc: 'See available workers near you on the map' 
              },
              { 
                icon: '📅', 
                title: 'Book', 
                desc: 'Schedule a service at your convenience' 
              }
            ].map((step, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="w-full bg-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Dashboard</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* User Dashboard */}
            <div className="w-full md:w-1/2 text-center">
              <h3 className="text-2xl font-semibold text-white mb-6">User Dashboard</h3>
              <div className="relative group">
                <img 
                  src="/User Dashboard.png" 
                  alt="User Dashboard" 
                  className="w-full h-64 md:h-80 object-cover rounded-2xl border-2 border-blue-500 transition-all duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 rounded-2xl transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Link 
                    to="/user" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Access Dashboard
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-gray-300">Find and book services from verified professionals</p>
            </div>
            
            {/* Vertical Divider */}
            <div className="h-64 md:h-80 w-px bg-gray-700 my-8 md:my-0"></div>
            
            {/* Worker Dashboard */}
            <div className="w-full md:w-1/2 text-center">
              <h3 className="text-2xl font-semibold text-white mb-6">Worker Dashboard</h3>
              <div className="relative group">
                <img 
                  src="/Worker Dashboard.png" 
                  alt="Worker Dashboard" 
                  className="w-full h-64 md:h-80 object-cover rounded-2xl border-2 border-green-500 transition-all duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 rounded-2xl transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Link 
                    to="/worker" 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Access Dashboard
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-gray-300">Manage your services and connect with clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 backdrop-blur-sm border-t border-gray-800 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold text-white mb-4">Solver</h3>
              <p className="text-gray-400 text-sm">Connecting skilled workers with customers in need of quality services.</p>
              <div className="flex space-x-4 mt-4">
                {/* Facebook */}
                <a 
                  href="#facebook" 
                  className="text-gray-400 hover:text-[#1877F2] transition-colors"
                  aria-label="Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a 
                  href="#linkedin" 
                  className="text-gray-400 hover:text-[#0A66C2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a 
                  href="#instagram" 
                  className="text-gray-400 hover:text-[#E4405F] transition-colors"
                  aria-label="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                
                {/* GitHub */}
                <a 
                  href="#github" 
                  className="text-gray-400 hover:text-[#181717] transition-colors"
                  aria-label="GitHub"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2">
                {['Electrician', 'Plumber', 'Cleaner', 'Carpenter', 'Painter'].map((service) => (
                  <li key={service}>
                    <a href={`#${service.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
              <address className="not-italic text-sm text-gray-400 space-y-2">
                <p>123 Service Lane</p>
                <p>City, State 12345</p>
                <p>Email: info@solver.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p> {new Date().getFullYear()} Solver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;