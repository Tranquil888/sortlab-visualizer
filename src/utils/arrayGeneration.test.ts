import { describe, it, expect } from 'vitest'
import {
  generateRandomArray,
  generateNearlySortedArray,
  generateReversedArray,
  generateFewUniqueArray,
  generateArray,
} from './arrayGeneration'

describe('arrayGeneration', () => {
  describe('generateRandomArray', () => {
    it('should generate array of correct size', () => {
      const array = generateRandomArray(10)
      expect(array.length).toBe(10)
    })

    it('should generate values within range', () => {
      const array = generateRandomArray(100, 10, 50)
      array.forEach((val) => {
        expect(val).toBeGreaterThanOrEqual(10)
        expect(val).toBeLessThanOrEqual(50)
      })
    })
  })

  describe('generateNearlySortedArray', () => {
    it('should generate array of correct size', () => {
      const array = generateNearlySortedArray(10)
      expect(array.length).toBe(10)
    })

    it('should be mostly sorted', () => {
      const array = generateNearlySortedArray(20, 2)
      // Count inversions - should be low
      let inversions = 0
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) inversions++
      }
      expect(inversions).toBeLessThan(10) // Should have few inversions
    })
  })

  describe('generateReversedArray', () => {
    it('should generate descending array', () => {
      const array = generateReversedArray(5, 10, 50)
      expect(array.length).toBe(5)
      for (let i = 0; i < array.length - 1; i++) {
        expect(array[i]).toBeGreaterThanOrEqual(array[i + 1])
      }
    })
  })

  describe('generateFewUniqueArray', () => {
    it('should generate array with few unique values', () => {
      const array = generateFewUniqueArray(20, 3)
      const uniqueValues = new Set(array)
      expect(uniqueValues.size).toBeLessThanOrEqual(3)
    })
  })

  describe('generateArray', () => {
    it('should generate random array when type is random', () => {
      const array = generateArray('random', 10)
      expect(array.length).toBe(10)
    })

    it('should generate nearly sorted array when type is nearlySorted', () => {
      const array = generateArray('nearlySorted', 10)
      expect(array.length).toBe(10)
    })

    it('should generate reversed array when type is reversed', () => {
      const array = generateArray('reversed', 5)
      expect(array.length).toBe(5)
    })

    it('should generate few unique array when type is fewUnique', () => {
      const array = generateArray('fewUnique', 10)
      expect(array.length).toBe(10)
    })
  })
})

