import { describe, it, expect } from 'vitest'
import { selectionSort } from './selectionSort'

describe('selectionSort', () => {
  it('should sort an array correctly', () => {
    const array = [64, 34, 25, 12, 22, 11, 90]
    const steps = selectionSort(array)
    const finalArray = steps[steps.length - 1]?.array || []
    const sorted = [...array].sort((a, b) => a - b)
    expect(finalArray).toEqual(sorted)
  })

  it('should preserve array length', () => {
    const array = [5, 2, 8, 1, 9]
    const steps = selectionSort(array)
    steps.forEach((step) => {
      expect(step.array.length).toBe(array.length)
    })
  })

  it('should have valid indices in all steps', () => {
    const array = [3, 1, 4, 1, 5]
    const steps = selectionSort(array)
    steps.forEach((step) => {
      step.indices.forEach((idx) => {
        expect(idx).toBeGreaterThanOrEqual(0)
        expect(idx).toBeLessThan(step.array.length)
      })
    })
  })
})

