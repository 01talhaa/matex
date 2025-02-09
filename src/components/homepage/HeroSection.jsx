'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import CountUp from 'react-countup';  // Import CountUp here

function HeroSection({ stats }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the case where stats might be undefined or null
  const validStats = stats || {};

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 opacity-90"></div>

      <div className="relative container mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Transform Your Supply Chain with Bangladesh's Premier
            <span className="text-yellow-400"> Raw Materials</span> Marketplace
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Connect with verified suppliers, get real-time pricing, and streamline your procurement process
          </p>

          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white rounded-lg p-2">
              <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4">
                <FiSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search for raw materials, suppliers, or categories..."
                  className="w-full py-3 bg-transparent focus:outline-none text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition flex items-center">
                Search
              </button>
            </div>

            {/* Trending Searches */}
            <div className="mt-4 flex items-center justify-center text-sm mb-10">
              <span className="opacity-80">Trending:</span>
              <div className="flex gap-2 ml-2">
                {['Steel', 'Cotton', 'Plastic Granules'].map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
            <Link href="/buy"
              className="group relative px-8 py-4 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition overflow-hidden m-10">
              <span className="relative z-10">Start Buying</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
            <Link href="/sell"
              className="group relative px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition overflow-hidden m-10">
              <span className="relative z-10">Start Selling</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          <div className="flex justify-center gap-6 mt-40">
          </div>
        </motion.div>
      </div>

      {/* Statistics Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(validStats).map(([key, value]) => (
              <div key={key} className="text-center">
                <CountUp
                  end={value}
                  duration={2.5}
                  separator=","
                  className="text-3xl font-bold text-white"
                />
                <p className="text-white opacity-80 capitalize">{key}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;