import { YEARLY_INTEREST_RATE } from './constants'

export const calculateMonthlyCost = (amount: number, years: number) => {
  if (years === 0) return 0

  const monthlyInterestRate = YEARLY_INTEREST_RATE / 12
  const numberOfPayments = years * 12
  const monthlyPayment =
    (amount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  return Math.round(monthlyPayment)
}
