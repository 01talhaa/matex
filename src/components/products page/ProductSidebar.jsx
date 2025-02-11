// components/ProductSidebar.js
import React from 'react';

const ProductSidebar = ({ 
  onMaterialChange, 
  onPriceRangeChange, 
  onRatingChange, 
  onVerifiedChange,
  selectedMaterials,
  priceRange,
  selectedRating,
  verifiedOnly 
}) => {
  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          
          {/* Material Type Filter */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Material Type</h4>
            {['Steel', 'Aluminum', 'Copper', 'Brass'].map((material) => (
              <label key={material} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={selectedMaterials.includes(material)}
                  onChange={() => onMaterialChange(material)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-gray-600">{material}</span>
              </label>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>

          {/* Supplier Rating Filter */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Supplier Rating</h4>
            <select 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedRating}
              onChange={(e) => onRatingChange(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>

          {/* Verified Suppliers Toggle */}
          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={verifiedOnly}
                onChange={(e) => onVerifiedChange(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              />
              <span className="text-gray-700 font-medium">Verified Suppliers Only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;