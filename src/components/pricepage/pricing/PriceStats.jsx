export default function PriceStats() {
  const stats = [
    { name: "Average Price", value: "₹54,000", change: "+2.5%" },
    { name: "Highest Price", value: "₹58,000", change: "+5.2%" },
    { name: "Lowest Price", value: "₹51,000", change: "-1.8%" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-blue-100">
          <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
          <p className={`mt-2 text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  )
}

