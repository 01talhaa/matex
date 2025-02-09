import React from 'react';
import Link from 'next/link';
import SupplierReviewAndRatings from './SupplierReviewAndRatings';

const SupplierDetails = ({ supplier }) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            {supplier.name}
          </h1>
          <div className="flex items-center mb-4">
            <span className="text-gray-700 font-medium w-32">Location:</span>
            <span className="text-gray-600">{supplier.location}</span>
          </div>
          <div className="flex items-center mb-6">
            <span className="text-gray-700 font-medium w-32">
              Business Type:
            </span>
            <span className="text-gray-600">{supplier.businessType}</span>
          </div>

          {supplier.isVerified && (
            <div className="flex items-center mb-6">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Verified
              </span>
            </div>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Products Offered
          </h2>
          <ul className="list-disc pl-8 text-gray-700">
            {supplier.products.map((product, index) => (
              <li key={index} className="mb-2">
                {product}
              </li>
            ))}
          </ul>

          <Link href={`/suppliers/${supplier.id}/products`} passHref>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors mt-8">
              See All Products
            </button>
          </Link>
        </div>

        <SupplierReviewAndRatings supplierId={supplier.id} />
      </div>
    </div>
  );
};

export default SupplierDetails;