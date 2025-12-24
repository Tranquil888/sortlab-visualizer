import { describe, it, expect } from 'vitest'
import { quickSort } from './quickSort'

describe('quickSort', () => {
  it('should sort an array correctly', () => {
    const array = [64, 34, 25, 12, 22, 11, 90]
    const steps = quickSort(array)
    const finalArray = steps[steps.length - 1]?.array || []
    const sorted = [...array].sort((a, b) => a - b)
    expect(finalArray).toEqual(sorted)
  })

  it('should preserve array length', () => {
    const array = [5, 2, 8, 1, 9]
    const steps = quickSort(array)
    steps.forEach((step) => {
      expect(step.array.length).toBe(array.length)
    })
  })

  it('should handle duplicates', () => {
    const array = [3, 1, 4, 1, 5, 9, 2, 6, 5]
    const steps = quickSort(array)
    const finalArray = steps[steps.length - 1]?.array || []
    const sorted = [...array].sort((a, b) => a - b)
    expect(finalArray).toEqual(sorted)
  })
})

