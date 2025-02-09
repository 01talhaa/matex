"use client"

import { useState } from "react"
import { motion } from "framer-motion"
// import Button from "../ui/Button"
import Button from "../../ui/Button"
// import Badge from "../ui/Badge"
import Badge from "../../ui/Badge"
import BuyModal from "../modals/BuyModal"
// import { formatCurrency, formatPercent } from "@/lib/utils"
import { formatCurrency, formatPercent } from "@/src/lib/utils"
// import { usePrices } from "@/context/PriceContext"
import { usePrices } from "@/src/context/PriceContext"

export default function PriceTable() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const { prices, loading, error } = usePrices()

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-blue-100">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Brand</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Volume</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-50">
          {prices.map((product) => (
            <motion.tr
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-blue-50/50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">{product.specs}</div>
              </td>
              <td className="px-6 py-4 text-gray-600">{product.brand}</td>
              <td className="px-6 py-4 text-gray-600">{product.location}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{formatCurrency(product.price)}</div>
                <div className={`text-sm ${product.change < 0 ? "text-red-500" : "text-green-500"}`}>
                  {formatPercent(product.change)}
                </div>
                <div className="text-xs text-gray-400">{product.lastUpdated}</div>
              </td>
              <td className="px-6 py-4 text-gray-600">{product.volume}</td>
              <td className="px-6 py-4">
                <Badge variant={product.status === "In Stock" ? "success" : "warning"}>{product.status}</Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(product)
                      setShowBuyModal(true)
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://wa.me/1234567890?text=Inquiry about ${product.name}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {showBuyModal && <BuyModal product={selectedProduct} onClose={() => setShowBuyModal(false)} />}
    </div>
  )
}

