"use client"

import { useState } from "react"
// import Navbar from "@/components/layout/Navbar"
import Navbar from "@/src/components/pricepage/Navbar"
// import Sidebar from "@/components/layout/Sidebar"
import Sidebar from "@/src/components/pricepage/Sidebar"
// import FilterBar from "@/components/filters/FilterBar"
import FilterBar from "@/src/components/pricepage/filters/FilterBar"
// import PriceTable from "@/components/pricing/PriceTable"
import PriceTable from "@/src/components/pricepage/pricing/PriceTable"
// import PriceStats from "@/components/pricing/PriceStats"
import PriceStats from "@/src/components/pricepage/pricing/PriceStats"
// import PriceChart from "@/components/pricing/PriceChart"
import PriceChart from "@/src/components/pricepage/pricing/PriceChart"
// import Footer from "@/components/layout/Footer"
import Footer from "@/src/components/pricepage/layout/Footer"
// import { PriceProvider } from "@/context/PriceContext"
import { PriceProvider } from "@/src/context/PriceContext"

export default function PricingDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <PriceProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main className="flex-1 p-6 transition-all duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-blue-100">
                <h1 className="text-3xl font-bold gradient-text">CRC Prices Today</h1>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Access real-time pricing data for Mild Steel Cold Rolled Coils from industry-leading manufacturers.
                  Track price trends, compare rates, and make informed decisions.
                </p>
              </div>

              <PriceStats />
              <PriceChart />
              <FilterBar />
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-blue-100">
                <PriceTable />
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </PriceProvider>
  )
}

