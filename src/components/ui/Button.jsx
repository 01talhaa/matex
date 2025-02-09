export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all"

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow",
    outline: "border border-blue-200 hover:border-blue-300 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

