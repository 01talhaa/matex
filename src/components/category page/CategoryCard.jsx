// components/CategoryCard.jsx
import React from 'react';
import Link from 'next/link';

const CategoryCard = ({ category }) => {
    return (
        <Link 
            href={`/category/${category.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="relative">
                <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-40 object-cover"
                />
                {category.featured && (
                    <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                        Featured
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-sm">{category.itemCount} items</span>
                    <span className="text-gray-500 text-sm">{category.subCategories} subcategories</span>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;