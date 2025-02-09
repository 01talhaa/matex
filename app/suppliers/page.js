// 1. `app/page.js` (Home Page)

import React from 'react';
// import FeaturedSuppliers from '../components/FeaturedSuppliers';
import FeaturedSuppliers from '@/src/components/supplier page/FeaturedSuppliers';

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
    <div>
      <h1 className="text-4xl font-bold text-center py-8 text-gray-800">
        Welcome to Our Supplier Platform
      </h1>
      <FeaturedSuppliers suppliers={featuredSuppliers} />
    </div>
  );
};

export default HomePage;