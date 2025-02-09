// pages/products/index.js
import { useState } from 'react';
import Image from 'next/image';
import { StarIcon, GridIcon, ListIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProductListingPage = ({ subCategoryId }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  const router = useRouter();

  const handleViewProduct = (productId) => {
    router.push(`/products/${productId}`);
  };
  
  // Sample data - in real app, this would come from an API
  const products =
    {
      1: [
        {
          id: 1,
          name: "Steel Bar 10mm",
          price: "₹500/unit",
          image: "https://www.toplevelcnc.com/wp-content/uploads/2021/04/aluminum-alloy-plates-5052.jpg",
          // image: "/api/placeholder/400/400",
          description:
            "Standard 10mm steel bar, perfect for various construction needs.",
        },
        {
          id: 2,
          name: "Steel Bar 12mm",
          price: "₹600/unit",
          image: "https://www.toplevelcnc.com/wp-content/uploads/2021/04/aluminum-alloy-plates-5052.jpg",
          description:
            "Durable 12mm steel bar known for its strength and reliability.",
        },
      ],
      2: [
        {
          id: 3,
          name: "Steel Sheet 2mm",
          price: "₹2000/unit",
          image: "/api/placeholder/400/400",
          description:
            "High-quality 2mm steel sheet suitable for industrial applications.",
        },
        {
          id: 4,
          name: "Steel Sheet 4mm",
          price: "₹2500/unit",
          image: "/api/placeholder/400/400",
          description:
            "Robust 4mm steel sheet, ideal for heavy-duty applications.",
        },
      ],
      3: [
        {
          id: 5,
          name: "Steel Tube 2inch",
          price: "₹1500/unit",
          image: "/api/placeholder/400/400",
          description:
            "2-inch steel tubes known for its robustness and flexibility.",
        },
        {
          id: 6,
          name: "Steel Tube 3inch",
          price: "₹2000/unit",
          image: "/api/placeholder/400/400",
          description:
            "Standard 3-inch steel tube which can be used for diverse projects.",
        },
      ],
    }[subCategoryId] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                
                {/* Material Type Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Material Type</h4>
                  {['Steel', 'Aluminum', 'Copper', 'Brass'].map((material) => (
                    <label key={material} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
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
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Supplier Rating Filter */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Supplier Rating</h4>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Ratings</option>
                    <option>4+ Stars</option>
                    <option>3+ Stars</option>
                  </select>
                </div>

                {/* Verified Suppliers Toggle */}
                <div className="mt-6">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-700 font-medium">Verified Suppliers Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <GridIcon size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <ListIcon size={20} />
                </button>
              </div>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      <span className="text-sm text-gray-500">MOQ: {product.moq} units</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      <StarIcon size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span>{product.supplier}</span>
                        <div className="flex items-center mt-1">
                          <StarIcon size={14} className="text-yellow-400 fill-current mr-1" />
                          <span>{product.supplierRating}</span>
                        </div>
                      </div>
                      <button 
                  onClick={() => handleViewProduct(product.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  View Product
                </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;