import React from 'react';
import SupplierCard from './SupplierCard';

const SupplierList = ({ suppliers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {suppliers.map((supplier) => (
        <SupplierCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  );
};

export default SupplierList;