import React from 'react';
import { motion } from 'framer-motion';
import { Star, Package, MapPin, Clock, Mail, DollarSign, ShieldCheck, CircleCheck } from 'lucide-react';

const ProductInfo = ({ product, quantity, handleQuantityChange, handleContactSupplier }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <motion.h1
          className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {product.name}
        </motion.h1>

        <div className="flex items-center space-x-2 sm:space-x-6 mb-2 sm:mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star 
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  } fill-current`}
                />
              </motion.div>
            ))}
            <span className="ml-1 sm:ml-2 font-semibold">{product.rating}</span>
          </div>
          <div className="flex items-center text-blue-600">
            <Package className="w-4 h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
            <span>50+ orders</span>
          </div>
        </div>

        <motion.div
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">${product.price}</div>
          <div className="text-blue-600">MOQ: {product.moq} units</div>
        </motion.div>

        <div className="flex items-center space-x-4 mt-4">
          <span className="text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded-lg">
            <button
              className="px-2 py-1 sm:px-4 sm:py-2 hover:bg-gray-100 transition-colors"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-12 sm:w-20 text-center border-x py-1 sm:py-2"
              min="1"
            />
            <button
              className="px-2 py-1 sm:px-4 sm:py-2 hover:bg-gray-100 transition-colors"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <motion.div
          className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 mt-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">{product.supplier.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg">{product.supplier}</h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1" />
                <span>{product.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-2 sm:pt-4">
            <div className="text-xs sm:text-sm">
              <div className="text-gray-600">Response Time</div>
              <div className="font-medium flex items-center mt-1">
                <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1" />
                {product.responseTime}
              </div>
            </div>
            <div className="text-xs sm:text-sm">
              <div className="text-gray-600">Established</div>
              <div className="font-medium">{product.yearEstablished}</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-2 sm:space-y-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-2 sm:py-4 px-3 sm:px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
          >
            <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
            <span>Request Quote</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-blue-600 text-blue-600 py-2 sm:py-4 px-3 sm:px-6 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
            onClick={handleContactSupplier}
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5" />
            <span>Contact Supplier</span>
          </motion.button>
        </div>

        <motion.div
          className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 mt-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="font-semibold flex items-center text-gray-900">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2" />
            Buyer Protection
          </h3>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center">
              <CircleCheck className="w-3 h-3 md:w-4 md:h-4 text-green-600 mr-2" />
              <span>Trade Assurance protection</span>
            </div>
            <div className="flex items-center">
              <CircleCheck className="w-3 h-3 md:w-4 md:h-4 text-green-600 mr-2" />
              <span>Refund Policy</span>
            </div>
            <div className="flex items-center">
              <CircleCheck className="w-3 h-3 md:w-4 md:h-4 text-green-600 mr-2" />
              <span>Shipping protection</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductInfo;