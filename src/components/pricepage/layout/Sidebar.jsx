"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Sidebar({ isOpen, onClose }) {
  const sidebarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 bg-white border-r border-gray-200 transition duration-300 ease-in-out z-30`}
    >
      <div className="h-full overflow-y-auto">
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/products" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Products
              </Link>
            </li>
            <li>
              <Link href="/orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

