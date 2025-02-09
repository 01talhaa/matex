// components/categories/SubCategories.jsx
import React from 'react';
import Link from 'next/link';

const SubCategories = ({ subCategories }) => {
    return (
        <>
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Subcategories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subCategories.map((subCategory) => (
                    <Link 
                        key={subCategory.id}
                        href={`/products/listing/${subCategory.id}`}
                        className="block border rounded-2xl p-6 shadow-sm cursor-pointer transition-shadow duration-300 
                                hover:shadow-lg hover:border-blue-500 border-gray-200"
                    >
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">{subCategory.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{subCategory.description}</p>
                        <span className="text-blue-600 text-sm font-medium">{subCategory.itemCount} items</span>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default SubCategories;