"use client"

import { useState } from "react"

export default function Sidebar() {
  const [favorites, setFavorites] = useState([])

  const products = [
    { id: 1, name: "CRC", category: "Flat Products" },
    { id: 2, name: "GI Coil", category: "Flat Products" },
    { id: 3, name: "HR Plate", category: "Flat Products" },
    { id: 4, name: "HRC", category: "Flat Products" },
    { id: 5, name: "Sponge Pellet", category: "Semi-Finished" },
  ]

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]))
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Click ❤️ to follow your Favourite Raw Material</div>
      </div>

      {["Flat Products", "Semi-Finished"].map((category) => (
        <div key={category} className="mb-4">
          <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
          <ul className="space-y-1">
            {products
              .filter((p) => p.category === category)
              .map((product) => (
                <li key={product.id} className="flex items-center justify-between">
                  <span className="text-gray-600">{product.name}</span>
                  <button onClick={() => toggleFavorite(product.id)} className="text-gray-400 hover:text-red-500">
                    {favorites.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

