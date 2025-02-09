"use client"

export default function ProductTable() {
  const products = [
    {
      id: 1,
      name: "CRC IS513",
      specs: "0.80-2.0mm",
      brand: "-",
      location: "EX - Delhi",
      price: "₹53,000/MT",
      change: -7.02,
      time: "19 hours ago",
    },
    {
      id: 2,
      name: "CRC IS513",
      specs: "0.80-2.0mm",
      brand: "-",
      location: "EX - Ludhiana",
      price: "₹53,000/MT",
      change: -8.62,
      time: "19 hours ago",
    },
    {
      id: 3,
      name: "CRC IS513",
      specs: "0.80-2.0mm",
      brand: "-",
      location: "EX - Chennai",
      price: "₹56,000/MT",
      change: -6.67,
      time: "19 hours ago",
    },
    {
      id: 4,
      name: "CRC IS513",
      specs: "0.80-2.0mm",
      brand: "-",
      location: "EX - Bangalore",
      price: "₹55,000/MT",
      change: -8.33,
      time: "19 hours ago",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-200">
        <div className="px-6 py-3 text-left text-sm font-medium text-gray-700">Products</div>
        <div className="px-6 py-3 text-left text-sm font-medium text-gray-700">Brand</div>
        <div className="px-6 py-3 text-left text-sm font-medium text-gray-700">Location</div>
        <div className="px-6 py-3 text-left text-sm font-medium text-gray-700">Prices</div>
        <div className="px-6 py-3 text-left text-sm font-medium text-gray-700"></div>
        <div className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</div>
      </div>

      <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-6 hover:bg-gray-50">
            <div className="px-6 py-4">
              <div className="font-medium text-gray-900">{product.name}</div>
              <div className="text-sm text-gray-500">{product.specs}</div>
            </div>
            <div className="px-6 py-4 text-sm text-gray-500">{product.brand}</div>
            <div className="px-6 py-4 text-sm text-gray-900">{product.location}</div>
            <div className="px-6 py-4">
              <div className="text-sm font-medium text-gray-900">{product.price}</div>
              <div className="text-sm text-red-500">{product.change}%</div>
              <div className="text-xs text-gray-500">{product.time}</div>
            </div>
            <div className="px-6 py-4">
              <button className="text-gray-400 hover:text-blue-600">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 flex space-x-3">
              <button
                className="px-4 py-1 text-sm text-blue-600 font-medium bg-blue-50 
                               rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 
                               focus:ring-offset-2 focus:ring-blue-500"
              >
                Buy
              </button>
              <button className="text-green-500 hover:text-green-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

