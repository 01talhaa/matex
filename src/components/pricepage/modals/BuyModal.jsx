"use client"

import { useState } from "react"
// import Button from "../ui/Button"
import Button from "../../ui/Button"

export default function BuyModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle the purchase logic here
    console.log(`Purchasing ${quantity} units of ${product.name}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Purchase {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value)))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              min="1"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm Purchase
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

