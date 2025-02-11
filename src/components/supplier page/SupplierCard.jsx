import React from 'react';
import Link from 'next/link';
import { Star, MessageCircle, Package, Shield, Award } from 'lucide-react';

const SupplierCard = ({ supplier }) => {
  const renderStars = (count) => {
    return (
      <div className="flex items-center">
        {[...Array(4)].map((_, index) => (
          <Star
            key={index}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {supplier.reviewCount} reviews
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Header Section */}
      <div className="relative p-6">
        <div className="absolute top-6 right-6 flex gap-2">
          {supplier.isGoldSupplier && (
            <div className="tooltip" data-tip="Gold Supplier">
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
          )}
          {supplier.isVerifiedManufacturer && (
            <div className="tooltip" data-tip="Verified Manufacturer">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-gray-50 p-2 flex items-center justify-center">
            <img
              src={supplier.logo}
              alt={supplier.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {supplier.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                {supplier.businessType}
              </span>
              <span className="text-gray-400">•</span>
              <span>{supplier.yearsInBusiness} years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Footer Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          {renderStars()}
          <span className="text-sm text-gray-500">
            Response time: &lt;24h
          </span>
        </div>

        <div className="flex gap-3">
          <Link 
            href={`/suppliers/details?id=${supplier.id}`}
            className="flex-1"
          >
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200">
              <Package className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </Link>
          <button 
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;