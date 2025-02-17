import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import FeaturedSuppliers from '@/src/components/supplier page/FeaturedSuppliers';
import Link from 'next/link';

const Header = () => (
  <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link href={`/`}>
            <h1 className="text-2xl font-bold text-blue-600">RawMat</h1>
            </Link>
          </div>
          
        </div>
        
        <div className="flex items-center space-x-6">
          <div >
            <div className="relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Connect with Leading Suppliers Worldwide
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Discover verified manufacturers, traders, and distributors for your business needs
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </div>
);

const StatsSection = () => (
  <div className="bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
          <div className="text-gray-600">Verified Suppliers</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
          <div className="text-gray-600">Countries</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
          <div className="text-gray-600">Customer Satisfaction</div>
        </div>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const featuredSuppliers = [
    {
      id: 1,
      name: 'Textile Pro',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQq-989MfpGuGmOkv9BOarlg0X-1z3Hya3Q&s',
      businessType: 'Manufacturer',
      yearsInBusiness: 10,
      isGoldSupplier: true,
      isVerifiedManufacturer: true,
      reviewCount: 45,
    },
    {
      id: 2,
      name: 'Metal Masters',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQq-989MfpGuGmOkv9BOarlg0X-1z3Hya3Q&s',
      businessType: 'Trader',
      yearsInBusiness: 5,
      isGoldSupplier: false,
      isVerifiedManufacturer: false,
      reviewCount: 22,
    },
    {
      id: 3,
      name: 'Plastic Solutions',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQq-989MfpGuGmOkv9BOarlg0X-1z3Hya3Q&s',
      businessType: 'Distributor',
      yearsInBusiness: 7,
      isGoldSupplier: true,
      isVerifiedManufacturer: false,
      reviewCount: 38,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Suppliers</h2>
        <FeaturedSuppliers suppliers={featuredSuppliers} />
      </div>
    </div>
  );
};

export default HomePage;