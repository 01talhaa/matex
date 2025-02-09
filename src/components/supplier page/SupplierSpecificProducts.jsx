import React from 'react';

const SupplierSpecificProducts = ({ products }) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Supplier Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-700 line-clamp-2">{product.description}</p>
              <p className="text-green-500 font-bold mt-3">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierSpecificProducts;