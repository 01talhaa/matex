"use client"

import { createContext, useContext, useState, useEffect } from "react"

const PriceContext = createContext()

export function PriceProvider({ children }) {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Simulating an API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockData = [
          {
            id: 1,
            name: "CRC IS513",
            specs: "0.80-2.0mm",
            brand: "SAIL",
            location: "Delhi",
            price: 53000,
            change: -7.02,
            lastUpdated: "2 hours ago",
            volume: "100 MT",
            status: "In Stock",
          },
          {
            id: 2,
            name: "CRC IS513",
            specs: "0.80-2.0mm",
            brand: "Tata Steel",
            location: "Mumbai",
            price: 54000,
            change: -5.26,
            lastUpdated: "1 hour ago",
            volume: "150 MT",
            status: "Low Stock",
          },
          {
            id: 3,
            name: "CRC IS513D",
            specs: "2.0-3.0mm",
            brand: "JSW",
            location: "Bangalore",
            price: 55000,
            change: 2.8,
            lastUpdated: "3 hours ago",
            volume: "80 MT",
            status: "In Stock",
          },
          {
            id: 4,
            name: "CRC IS277",
            specs: "0.80-2.0mm",
            brand: "AMNS",
            location: "Chennai",
            price: 52000,
            change: -3.7,
            lastUpdated: "4 hours ago",
            volume: "120 MT",
            status: "In Stock",
          },
          {
            id: 5,
            name: "CRC IS513CR4",
            specs: "3.0-4.0mm",
            brand: "Uttam",
            location: "Hyderabad",
            price: 56000,
            change: 1.82,
            lastUpdated: "2 hours ago",
            volume: "90 MT",
            status: "Low Stock",
          },
        ]
        setPrices(mockData)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch prices")
        setLoading(false)
      }
    }

    fetchPrices()
  }, [])

  const value = {
    prices,
    loading,
    error,
    updatePrice: (id, newPrice) => {
      setPrices((prevPrices) => prevPrices.map((price) => (price.id === id ? { ...price, price: newPrice } : price)))
    },
  }

  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
}

export function usePrices() {
  const context = useContext(PriceContext)
  if (context === undefined) {
    throw new Error("usePrices must be used within a PriceProvider")
  }
  return context
}

