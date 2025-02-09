/**
 * Formats a number as currency.
 * @param {number} number The number to format.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(number)
}

/**
 * Formats a number as a percentage.
 * @param {number} number The number to format.
 * @returns {string} The formatted percentage string.
 */
export const formatPercent = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number / 100)
}

