import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center space-x-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          <span className="sr-only">Back</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/mild-steel" className="hover:text-blue-600">
            Mild Steel
          </Link>
          <span>/</span>
          <span className="text-gray-400">CRC</span>
        </div>
      </div>
    </nav>
  )
}

