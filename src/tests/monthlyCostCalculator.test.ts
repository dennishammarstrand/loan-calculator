import { describe, it, expect } from 'vitest'
import { YEARLY_INTEREST_RATE } from '../utils/constants'
import { calculateMonthlyCost } from '../utils/monthlyCostCalculator'

describe('calculateMonthlyCost', () => {
  it('should calculate the correct monthly cost for a given amount and years', () => {
    const amount = 100000
    const years = 30
    const expectedMonthlyCost = Math.round(
      (amount *
        (YEARLY_INTEREST_RATE / 12) *
        Math.pow(1 + YEARLY_INTEREST_RATE / 12, years * 12)) /
        (Math.pow(1 + YEARLY_INTEREST_RATE / 12, years * 12) - 1)
    )
    expect(calculateMonthlyCost(amount, years)).toBe(expectedMonthlyCost)
  })

  it('should return 0 if the amount is 0', () => {
    const amount = 0
    const years = 30
    expect(calculateMonthlyCost(amount, years)).toBe(0)
  })

  it('should return 0 if the years is 0', () => {
    const amount = 100000
    const years = 0
    expect(calculateMonthlyCost(amount, years)).toBe(0)
  })

  it('should handle high values correctly', () => {
    const amount = 10000000
    const years = 30
    const expectedMonthlyCost = Math.round(
      (amount *
        (YEARLY_INTEREST_RATE / 12) *
        Math.pow(1 + YEARLY_INTEREST_RATE / 12, years * 12)) /
        (Math.pow(1 + YEARLY_INTEREST_RATE / 12, years * 12) - 1)
    )
    expect(calculateMonthlyCost(amount, years)).toBe(expectedMonthlyCost)
  })
})
