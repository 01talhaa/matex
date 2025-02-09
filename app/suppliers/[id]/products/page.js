'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Import the Link component
import SupplierSpecificProducts from '@/src/components/supplier page/SupplierSpecificProducts';

const SupplierProductsPage = () => {
  const params = useParams();
  const { supplierId } = params;

  const products = [
    { id: 1, name: 'High-Quality Cotton Yarn', description: 'Made from premium fibers', price: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrfpF11DU9ouJ-o48GioT2bZQl1zI1PwJUmA&s' },
    { id: 2, name: 'Durable Polyester Fabric', description: 'Perfect for clothing', price: 15, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrfpF11DU9ouJ-o48GioT2bZQl1zI1PwJUmA&s' },
    { id: 3, name: 'Raw Denim', description: 'Classic raw denim material', price: 35, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrfpF11DU9ouJ-o48GioT2bZQl1zI1PwJUmA&s' },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Supplier Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-green-500 font-bold mt-2">${product.price}</p>
              <Link href={`/products/details?id=${product.id}`} passHref>
                <button className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierProductsPage;