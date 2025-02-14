import React from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

const ProductShippingTab = ({ product }) => {
  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-4 sm:p-6 rounded-xl"
        >
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">Shipping Methods</h3>
          <div className="space-y-2 sm:space-y-4">
            {product.shipping.methods.map((method, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-4">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {method.time} • {method.cost}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-4 sm:p-6 rounded-xl"
        >
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4">Payment Methods</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {product.shipping.payment.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-3 sm:p-4 rounded-lg text-center"
              >
                <div className="text-gray-900">{method}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductShippingTab;