// ProductImageGallery.js
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';

const ProductImageGallery = ({ 
  images, 
  selectedImage, 
  setSelectedImage, 
  isWishlisted, 
  handleWishlist, 
  handleShare, 
  showShareTooltip,
  setShowShareTooltip // Add this prop
}) => {
  const [zoomImage, setZoomImage] = useState({
    isZoomed: false,
    position: { x: 0, y: 0 },
  });
  const imageRef = useRef(null);

  const handleImageMouseEnter = (e) => {
    if (!zoomImage.isZoomed && imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;

      setZoomImage({
        isZoomed: true,
        position: { x, y },
      });
    }
  };

  const handleImageMouseMove = (e) => {
    if (zoomImage.isZoomed && imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;
      setZoomImage({ ...zoomImage, position: { x, y } });
    }
  };

  const handleImageMouseLeave = () => {
    setZoomImage({ isZoomed: false, position: { x: 0, y: 0 } });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative h-[300px] sm:h-[500px] rounded-2xl overflow-hidden group">
        <div className="absolute top-4 right-4 space-x-3 z-10">
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            onClick={handleWishlist}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
            />
          </motion.button>
        </div>

        {/* Share Tooltip */}
        {showShareTooltip && (
          <div className="absolute top-12 right-4 bg-black text-white text-xs sm:text-sm py-1 px-2 sm:px-3 rounded">
            Share
          </div>
        )}

        <div
          ref={imageRef}
          className="relative w-full h-full"
          onMouseMove={handleImageMouseMove}
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
        >
          <Image
            src={images[selectedImage]}
            alt="Product Image"
            fill
            style={{ objectFit: 'cover' }}
            className={`transition-all duration-300 group-hover:scale-105 ${zoomImage.isZoomed ? 'cursor-zoom-in' : 'cursor-default'}`}
          />
          {zoomImage.isZoomed && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${images[selectedImage]})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${zoomImage.position.x}% ${zoomImage.position.y}%`,
                transform: 'scale(1.5)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative h-16 sm:h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300
              ${selectedImage === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;