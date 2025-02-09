import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPackage, FiBriefcase, FiAward, FiClock } from 'react-icons/fi';

function Transactions({ transactions }) {
  // Handle undefined or non-array transactions prop
  const validTransactions = Array.isArray(transactions) ? transactions : [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Recent Transactions</h2>
            <p className="text-gray-600 mt-2">Latest deals from our marketplace</p>
          </div>
          <Link href="/transactions" className="text-blue-600 hover:text-blue-700 font-semibold">
            View All Transactions →
          </Link>
        </div>

        <div className="grid gap-6">
          {validTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiPackage className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{transaction.material}</h3>
                    <p className="text-gray-600">{transaction.quantity}</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-semibold text-lg">{transaction.price}</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <FiBriefcase className="text-gray-400" />
                    <span className="text-gray-600">{transaction.buyer}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <FiAward className="text-gray-400" />
                    <span className="text-gray-600">{transaction.seller}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FiClock className="text-gray-400" />
                    <span className="text-gray-600">{transaction.date}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    transaction.status === 'Completed'
                      ? 'bg-green-100 text-green-600'
                      : transaction.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Transactions;