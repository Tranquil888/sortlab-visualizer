import { describe, it, expect } from 'vitest'
import { algorithms } from './index'
import { bubbleSort } from './bubbleSort'
import { selectionSort } from './selectionSort'
import { insertionSort } from './insertionSort'
import { mergeSort } from './mergeSort'
import { quickSort } from './quickSort'
import { heapSort } from './heapSort'
import { countingSort } from './countingSort'
import { shellSort } from './shellSort'
import { radixSort } from './radixSort'
import { shakerSort } from './shakerSort'

const allAlgorithms = [
  { name: 'bubbleSort', fn: bubbleSort },
  { name: 'selectionSort', fn: selectionSort },
  { name: 'insertionSort', fn: insertionSort },
  { name: 'mergeSort', fn: mergeSort },
  { name: 'quickSort', fn: quickSort },
  { name: 'heapSort', fn: heapSort },
  { name: 'countingSort', fn: countingSort },
  { name: 'shellSort', fn: shellSort },
  { name: 'radixSort', fn: radixSort },
  { name: 'shakerSort', fn: shakerSort },
]

describe('All Sorting Algorithms', () => {
  allAlgorithms.forEach(({ name, fn }) => {
    describe(name, () => {
      it('should sort arrays correctly', () => {
        const testCases = [
          [64, 34, 25, 12, 22, 11, 90],
          [5, 2, 8, 1, 9],
          [1],
          [2, 1],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [3, 1, 4, 1, 5, 9, 2, 6, 5],
        ]

        testCases.forEach((testCase) => {
          const steps = fn(testCase)
          if (steps.length > 0) {
            const finalArray = steps[steps.length - 1]?.array || []
            const sorted = [...testCase].sort((a, b) => a - b)
            expect(finalArray).toEqual(sorted)
          }
        })
      })

      it('should preserve array length in all steps', () => {
        const array = [5, 2, 8, 1, 9]
        const steps = fn(array)
        steps.forEach((step) => {
          expect(step.array.length).toBe(array.length)
        })
      })

      it('should have valid indices in all steps', () => {
        const array = [5, 2, 8, 1, 9]
        const steps = fn(array)
        steps.forEach((step) => {
          step.indices.forEach((idx) => {
            expect(idx).toBeGreaterThanOrEqual(0)
            expect(idx).toBeLessThan(step.array.length)
          })
        })
      })
    })
  })

  it('should have all algorithms registered', () => {
    expect(Object.keys(algorithms).length).toBeGreaterThanOrEqual(10)
  })
})

