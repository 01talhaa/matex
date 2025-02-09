// components/FeaturedSuppliers.js
import React from 'react';
import SupplierCard from './SupplierCard';

const FeaturedSuppliers = ({ suppliers }) => {
  console.log("Suppliers prop inside FeaturedSuppliers:", suppliers); // Add this line

  if (!Array.isArray(suppliers)) {
    console.warn("FeaturedSuppliers received an invalid 'suppliers' prop:", suppliers);
    return <div>No featured suppliers to display.</div>; // Or return null
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Featured Suppliers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier, index) => {
  if (!supplier) {
    console.warn(`Supplier at index ${index} is undefined!`);
    return null; // Skip rendering this element
  }
  return <SupplierCard key={supplier.id} supplier={supplier} />;
})}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSuppliers;