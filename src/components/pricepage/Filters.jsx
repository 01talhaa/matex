"use client"

import { useState } from "react"

export default function Filters() {
  const [activeFilter, setActiveFilter] = useState(null)

  const filters = [
    { name: "Locations", options: ["Delhi", "Mumbai", "Chennai", "Bangalore"] },
    { name: "Grade", options: ["IS513", "IS513D", "IS513CR4"] },
    { name: "Dimension", options: ["0.80-2.0mm", "2.0-3.0mm", "3.0-4.0mm"] },
  ]

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((filter) => (
        <div key={filter.name} className="relative">
          <button
            onClick={() => setActiveFilter(activeFilter === filter.name ? null : filter.name)}
            className="px-4 py-2 text-sm border border-blue-200 rounded-md bg-white hover:bg-blue-50 
                     text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {filter.name}
            <span className="ml-2">▼</span>
          </button>

          {activeFilter === filter.name && (
            <div className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg border border-gray-200">
              <div className="py-1">
                {filter.options.map((option) => (
                  <button
                    key={option}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

