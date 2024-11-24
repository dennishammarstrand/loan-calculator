export const formattedCurrency = (value: number) =>
  new Intl.NumberFormat('se-SV', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/,/g, ' ') + ' kr'

export const formattedYears = (value: number) => `${value} år`
