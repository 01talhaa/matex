// ProductReviewsTab.js
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

const ProductReviewsTab = ({ product }) => {
  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Rating Summary */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-x-8 p-4 sm:p-6 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-blue-600">{product.rating}</div>
          <div className="flex items-center justify-center mt-1 sm:mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                } fill-current`}
              />
            ))}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">
            Based on {product.reviews.length} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = product.reviews.filter(r => Math.floor(r.rating) === rating).length;
            const percentage = (count / product.reviews.length) * 100;
            return (
              <div key={rating} className="flex items-center space-x-2">
                <div className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">{rating}</div>
                <div className="flex-1 h-1 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-yellow-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 w-8 sm:w-12">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 sm:space-y-6">
        {product.reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4">
              {/* Review Header */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {review.user.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium mr-1 sm:mr-2">{review.user}</span>
                    {review.verified && (
                      <span className="text-[0.6rem] sm:text-xs bg-green-100 text-green-600 px-1 sm:px-2 py-0.5 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        } fill-current`}
                      />
                    ))}
                    <span className="text-[0.7rem] sm:text-sm text-gray-500 ml-1 sm:ml-2">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-2 sm:mb-4">{review.comment}</p>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-500">
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600 transition-colors">
                <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 sm:space-x-2 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Reply ({review.replies})</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsTab;