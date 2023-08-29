export function useConvertCurrencyToNumber(currencyStr: string) {
  const numericStr = currencyStr.replace(/[R$\s]/g, "").replace(",", ".")
  const numericValue = parseFloat(numericStr)

  return numericValue
}
