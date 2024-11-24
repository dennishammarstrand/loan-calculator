import { describe, it, expect } from 'vitest'
import { formattedCurrency } from '../utils/numberFormatters'

describe('formattedCurrency', () => {
  const normalizeString = (str: string) =>
    str.replace(/\u00A0/g, ' ').replace(/−/g, '-')

  it('should format the number as currency with no decimal places', () => {
    const value = 1234567
    const expected = '1 234 567 kr'
    expect(normalizeString(formattedCurrency(value))).toBe(expected)
  })

  it('should format the number as currency with no decimal places for small numbers', () => {
    const value = 123
    const expected = '123 kr'
    expect(normalizeString(formattedCurrency(value))).toBe(expected)
  })

  it('should format the number as currency with no decimal places for large numbers', () => {
    const value = 9876543210
    const expected = '9 876 543 210 kr'
    expect(normalizeString(formattedCurrency(value))).toBe(expected)
  })

  it('should format the number as currency with no decimal places for zero', () => {
    const value = 0
    const expected = '0 kr'
    expect(normalizeString(formattedCurrency(value))).toBe(expected)
  })

  it('should format the number as currency with no decimal places for negative numbers', () => {
    const value = -1234567
    const expected = '-1 234 567 kr'
    expect(normalizeString(formattedCurrency(value))).toBe(expected)
  })
})
