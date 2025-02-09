'use client';

import React from 'react';
import { useParams } from 'next/navigation';
// import SupplierList from '../../../components/SupplierList';
import SupplierList from '@/src/components/supplier page/SupplierList';

const CategoryPage = () => {
  const params = useParams();
  const { supplierCategory } = params;

  const suppliers = [
    {
      id: 1,
      name: 'Example Supplier 1',
      logo: '/images/example-logo.png',
      businessType: 'Manufacturer',
      yearsInBusiness: 8,
      isGoldSupplier: true,
      isVerifiedManufacturer: false,
      reviewCount: 12,
    },
    {
      id: 2,
      name: 'Example Supplier 2',
      logo: '/images/example-logo.png',
      businessType: 'Trader',
      yearsInBusiness: 3,
      isGoldSupplier: false,
      isVerifiedManufacturer: true,
      reviewCount: 5,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Top {supplierCategory} Suppliers
      </h1>
      <SupplierList suppliers={suppliers} />
    </div>
  );
};

export default CategoryPage;