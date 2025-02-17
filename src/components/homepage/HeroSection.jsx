'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import CountUp from 'react-countup';

function HeroSection({ stats }) {
  const [searchQuery, setSearchQuery] = useState('');
  const validStats = stats || {};

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 opacity-90">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white space-y-6 sm:space-y-8"
          >
            {/* Responsive Typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Supply Chain with Bangladesh's Premier
              <span className="text-yellow-400 block mt-2">Raw Materials</span> Marketplace
            </h1>
            
            <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto">
              Connect with verified suppliers, get real-time pricing, and streamline your procurement process
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mt-8">
              <div className="flex flex-col sm:flex-row gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4">
                  <FiSearch className="text-gray-400 min-w-[20px]" />
                  <input
                    type="text"
                    placeholder="Search materials, suppliers, or categories..."
                    className="w-full py-3 px-2 bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center text-white">
                  Search
                </button>
              </div>

              {/* Trending Searches */}
              <div className="mt-4 flex flex-wrap items-center justify-center text-sm gap-2">
                <span className="opacity-80">Trending:</span>
                <div className="flex flex-wrap gap-2">
                  {['Steel', 'Cotton', 'Plastic Granules'].map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">
              <Link 
                href="/buy"
                className="group relative w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-all duration-300 overflow-hidden text-center"
              >
                <span className="relative z-10">Start Buying</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link 
                href="/sell"
                className="group relative w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all duration-300 overflow-hidden text-center"
              >
                <span className="relative z-10">Start Selling</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Statistics Section - Now properly positioned at bottom */}
      <div className="relative w-full bg-white/10 backdrop-blur-md mt-8 sm:mt-0">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {Object.entries(validStats).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-4"
              >
                <CountUp
                  end={value}
                  duration={2.5}
                  separator=","
                  className="text-2xl sm:text-3xl font-bold text-white"
                />
                <p className="text-sm sm:text-base text-white/80 capitalize mt-1">
                  {key}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;