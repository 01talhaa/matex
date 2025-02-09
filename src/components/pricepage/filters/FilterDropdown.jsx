"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FilterDropdown({ filter, isActive, onToggle }) {
  const [selectedOptions, setSelectedOptions] = useState([])

  const toggleOption = (option) => {
    setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]))
  }

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center
                    ${isActive ? "bg-blue-100 text-blue-800" : "bg-white text-gray-700 hover:bg-gray-50"}`}
      >
        {filter.name}
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${isActive ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {filter.options.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    selectedOptions.includes(option)
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  role="menuitem"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

