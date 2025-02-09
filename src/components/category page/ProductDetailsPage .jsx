'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { StarIcon, TruckIcon, ShieldCheckIcon, DollarSignIcon } from 'lucide-react';

const ProductDetailsPage = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch product data from an API
    // For now, we'll use sample data based on the ID
    const fetchProduct = () => {
      // Sample product data - in real app, this would come from an API
      const sampleProduct = {
        id: params.id,
        name: `Premium Steel ${params.id === "1" ? "Bars" : params.id === "2" ? "Sheets" : "Tubes"}`,
        price: 299.99,
        moq: 100,
        rating: 4.5,
        supplier: "MetalWorks Inc.",
        supplierRating: 4.8,
        location: "Shanghai",
        description: `High-quality steel ${params.id === "1" ? "bars" : params.id === "2" ? "sheets" : "tubes"} perfect for industrial applications. Features excellent durability and precision manufacturing.`,
        specifications: {
          material: "Stainless Steel",
          thickness: "2.5mm",
          dimensions: params.id === "1" ? "6m length" : params.id === "2" ? "1000mm x 2000mm" : "50mm diameter",
          finish: "Brushed",
        },
        images: [
          "/api/placeholder/600/400",
          "/api/placeholder/600/400",
          "/api/placeholder/600/400",
          "/api/placeholder/600/400"
        ],
        reviews: [
          {
            id: 1,
            user: "John D.",
            rating: 5,
            comment: "Excellent quality and fast shipping. Will order again.",
            date: "2024-01-15"
          },
        ]
      };

      setProduct(sampleProduct);
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Loading...</h2>
          <p className="mt-2 text-gray-600">Please wait while we fetch the product details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <StarIcon size={20} className="text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">50+ orders</span>
              </div>

              <div className="border-t border-b py-4">
                <div className="text-3xl font-bold text-blue-600">${product.price}</div>
                <div className="text-gray-600 mt-1">MOQ: {product.moq} units</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/api/placeholder/40/40"
                    alt={product.supplier}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{product.supplier}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <StarIcon size={16} className="text-yellow-400 fill-current mr-1" />
                      <span>{product.supplierRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                  Request Quote
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold">
                  Contact Supplier
                </button>
              </div>

              {/* Buyer Protection */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold flex items-center">
                  <ShieldCheckIcon size={20} className="text-green-600 mr-2" />
                  Buyer Protection
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <DollarSignIcon size={16} className="mr-2" />
                    <span>Trade Assurance protection</span>
                  </div>
                  <div className="flex items-center">
                    <TruckIcon size={16} className="mr-2" />
                    <span>Shipping protection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t">
            <div className="flex border-b">
              {['description', 'specifications', 'shipping', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <span className="font-medium text-gray-600">{key}: </span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Delivery Options</h4>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center">
                            <TruckIcon size={16} className="mr-2" />
                            <span>Standard Shipping (15-20 days)</span>
                          </div>
                          <div className="flex items-center">
                            <TruckIcon size={16} className="mr-2" />
                            <span>Express Shipping (7-10 days)</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Payment Methods</h4>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center">
                            <DollarSignIcon size={16} className="mr-2" />
                            <span>Trade Assurance</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSignIcon size={16} className="mr-2" />
                            <span>Bank Transfer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            size={20}
                            className={`${
                              star <= product.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            } fill-current`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Based on {product.reviews.length} reviews
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium">{review.user}</div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  size={16}
                                  className={`${
                                    star <= review.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  } fill-current`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;