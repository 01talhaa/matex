import React from 'react';
import Link from 'next/link';

const SupplierCard = ({ supplier }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="h-24 w-full mb-4 flex items-center justify-center">
          <img
            src={supplier.logo}
            alt={supplier.name}
            className="h-full max-w-full object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {supplier.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {supplier.businessType}
        </p>
        <p className="text-gray-500 text-xs">
          Years in Business: {supplier.yearsInBusiness}
        </p>
      </div>

      <div className="flex justify-between items-center px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div>
          {supplier.isGoldSupplier && (
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
              Gold Supplier
            </span>
          )}
          {supplier.isVerifiedManufacturer && (
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Verified Manufacturer
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="text-yellow-500 mr-1">⭐⭐⭐⭐</span>
          <span className="text-gray-500 text-sm">
            ({supplier.reviewCount} Reviews)
          </span>
        </div>
        <div className="flex justify-between">
          <Link href={`/suppliers/details?id=${supplier.id}`} passHref>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
              View Products
            </button>
          </Link>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Contact Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;