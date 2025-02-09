"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import FilterDropdown from "./FilterDropdown"
import SearchFilter from "./SearchFilter"

export default function FilterBar() {
  const [activeFilter, setActiveFilter] = useState(null)

  const filters = [
    {
      name: "Location",
      options: ["Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad", "Kolkata"],
    },
    {
      name: "Grade",
      options: ["IS513", "IS513D", "IS513CR4", "IS277", "IS277EQ"],
    },
    {
      name: "Thickness",
      options: ["0.80-2.0mm", "2.0-3.0mm", "3.0-4.0mm", "4.0-5.0mm"],
    },
    {
      name: "Brand",
      options: ["SAIL", "Tata Steel", "JSW", "AMNS", "Uttam"],
    },
  ]

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 border border-blue-100">
      <div className="flex flex-wrap items-center gap-4">
        <SearchFilter />

        {filters.map((filter) => (
          <FilterDropdown
            key={filter.name}
            filter={filter}
            isActive={activeFilter === filter.name}
            onToggle={() => setActiveFilter(activeFilter === filter.name ? null : filter.name)}
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="ml-auto px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700
                     bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          onClick={() => {
            /* Clear all filters */
          }}
        >
          Clear Filters
        </motion.button>
      </div>
    </div>
  )
}

