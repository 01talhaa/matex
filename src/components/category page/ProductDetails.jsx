// components/categories/SubCategoryProducts.jsx
import React from 'react';
import Link from 'next/link'

const SubCategoryProducts = ({ subCategoryId }) => {
    // Fetch products based on subCategoryId from the API
    // For now, using mock data.
    const products = {
        1: [
          { id: 1, name: 'Steel Bar 10mm', price: '₹500/unit', image: '/api/placeholder/400/400', description: "Standard 10mm steel bar, perfect for various construction needs." },
          { id: 2, name: 'Steel Bar 12mm', price: '₹600/unit', image: '/api/placeholder/400/400', description: "Durable 12mm steel bar known for its strength and reliability."},
        ],
        2: [
          { id: 3, name: 'Steel Sheet 2mm', price: '₹2000/unit', image: '/api/placeholder/400/400',  description: "High-quality 2mm steel sheet suitable for industrial applications."},
          { id: 4, name: 'Steel Sheet 4mm', price: '₹2500/unit', image: '/api/placeholder/400/400', description: "Robust 4mm steel sheet, ideal for heavy-duty applications."},
        ],
        3: [
            { id: 5, name: 'Steel Tube 2inch', price: '₹1500/unit', image: '/api/placeholder/400/400', description: "2-inch steel tubes known for its robustness and flexibility." },
            { id: 6, name: 'Steel Tube 3inch', price: '₹2000/unit', image: '/api/placeholder/400/400', description: "Standard 3-inch steel tube which can be used for diverse projects."},
          ]
        
    }[subCategoryId] || [];

    return (
        <>
             <h2 className="text-3xl font-semibold mb-8 text-gray-800">Products</h2>
           {products.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
                    <div className="aspect-w-16 aspect-h-9">
                       <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                    </div>
                     <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                         <div className="flex justify-between items-center">
                             <span className="text-gray-900 font-semibold">{product.price}</span>
                             <Link href={`/categories/products?id=${product.id}`} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
View
</Link>
                         </div>
                    </div>
                </div>
               ))}
            </div>
           : (
              <p className="text-gray-600">No products available in this subcategory.</p>
           )}
        </>
    );
};

export default SubCategoryProducts;