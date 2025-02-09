import React from 'react';
import { motion } from 'framer-motion';

function CategoriesSection({ categories }) {
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center relative overflow-hidden group"
          >
            {category.trending && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Trending
              </span>
            )}
            <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">
              {category.icon}
            </span>
            <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">{category.count} Products</p>
            <div className="space-y-1">
              {category.subCategories.map((sub, index) => (
                <p key={index} className="text-sm text-gray-500">{sub}</p>
              ))}
            </div>
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;