// pages/products/index.js
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { StarIcon, GridIcon, ListIcon, PackageSearch } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductSidebar from './ProductSidebar';

const NoProductsFound = ({ onReset }) => (
  <div className="flex flex-col items-center justify-center w-full py-12 px-4 bg-white rounded-lg shadow-sm">
    <PackageSearch size={48} className="text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
    <p className="text-gray-600 text-center mb-4">
      We couldn't find any products matching your current filters.
    </p>
    <button 
      onClick={onReset}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Reset All Filters
    </button>
  </div>
);

const ProductListingPage = ({ subCategoryId }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  
  const router = useRouter();

  // Sample products data
  const initialProducts = {
    1: [
      {
        id: 1,
        name: "Steel Bar 10mm",
        price: 500,
        priceDisplay: "₹500/unit",
        image: "/api/placeholder/400/400",
        description: "Standard 10mm steel bar, perfect for various construction needs.",
        material: "Steel",
        rating: 4.5,
        supplier: "Steel Corp",
        supplierRating: 4.8,
        verified: true,
        moq: 100
      },
      {
        id: 2,
        name: "Steel Bar 12mm",
        price: 600,
        priceDisplay: "₹600/unit",
        image: "/api/placeholder/400/400",
        description: "Durable 12mm steel bar known for its strength and reliability.",
        material: "Steel",
        rating: 4.2,
        supplier: "Metal Works",
        supplierRating: 3.9,
        verified: false,
        moq: 50
      },
      {
        id: 3,
        name: "Aluminum Bar 10mm",
        price: 450,
        priceDisplay: "₹450/unit",
        image: "/api/placeholder/400/400",
        description: "Lightweight aluminum bar for specialized applications.",
        material: "Aluminum",
        rating: 4.7,
        supplier: "Metal Works",
        supplierRating: 4.2,
        verified: true,
        moq: 75
      },
      {
        id: 4,
        name: "Copper Rod 8mm",
        price: 800,
        priceDisplay: "₹800/unit",
        image: "/api/placeholder/400/400",
        description: "High-quality copper rod for electrical applications.",
        material: "Copper",
        rating: 4.9,
        supplier: "Copper Kings",
        supplierRating: 4.7,
        verified: true,
        moq: 25
      }
    ],
  }[subCategoryId] || [];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

    // Material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(p => selectedMaterials.includes(p.material));
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (selectedRating !== 'all') {
      filtered = filtered.filter(p => p.rating >= parseInt(selectedRating));
    }

    // Verified suppliers filter
    if (verifiedOnly) {
      filtered = filtered.filter(p => p.verified);
    }

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...filtered].sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [initialProducts, selectedMaterials, priceRange, selectedRating, verifiedOnly, sortOption]);

  const handleViewProduct = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleResetFilters = () => {
    setSelectedMaterials([]);
    setPriceRange([0, 1000]);
    setSelectedRating('all');
    setVerifiedOnly(false);
    setSortOption('featured');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProductSidebar 
            onMaterialChange={handleMaterialChange}
            onPriceRangeChange={setPriceRange}
            onRatingChange={setSelectedRating}
            onVerifiedChange={setVerifiedOnly}
            selectedMaterials={selectedMaterials}
            priceRange={priceRange}
            selectedRating={selectedRating}
            verifiedOnly={verifiedOnly}
          />

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
              <select 
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Product Grid or No Products Message */}
            {filteredProducts.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredProducts.map((product) => (
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
                        <span className="text-2xl font-bold text-blue-600">{product.priceDisplay}</span>
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
            ) : (
              <NoProductsFound onReset={handleResetFilters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;