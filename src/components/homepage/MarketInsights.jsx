import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function MarketInsights({ insights }) {
  // Safely handle undefined insights prop
  const validInsights = Array.isArray(insights) ? insights : [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Market Insights</h2>
            <p className="text-gray-600 mt-2">Stay updated with the latest market trends and analysis</p>
          </div>
          <Link href="/insights" className="text-blue-600 hover:text-blue-700 font-semibold">
            View All Insights →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {validInsights.map((insight, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-xl">{insight.title}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  insight.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {insight.change}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{insight.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{insight.date}</span>
                <Link href="/insight-details" className="text-blue-600 hover:text-blue-700">
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketInsights;