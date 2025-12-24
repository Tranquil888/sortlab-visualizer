import { describe, it, expect } from 'vitest'
import { mergeSort } from './mergeSort'

describe('mergeSort', () => {
  it('should sort an array correctly', () => {
    const array = [64, 34, 25, 12, 22, 11, 90]
    const steps = mergeSort(array)
    const finalArray = steps[steps.length - 1]?.array || []
    const sorted = [...array].sort((a, b) => a - b)
    expect(finalArray).toEqual(sorted)
  })

  it('should preserve array length', () => {
    const array = [5, 2, 8, 1, 9]
    const steps = mergeSort(array)
    steps.forEach((step) => {
      expect(step.array.length).toBe(array.length)
    })
  })

  it('should handle already sorted array', () => {
    const array = [1, 2, 3, 4, 5]
    const steps = mergeSort(array)
    const finalArray = steps[steps.length - 1]?.array || []
    expect(finalArray).toEqual([1, 2, 3, 4, 5])
  })
})

