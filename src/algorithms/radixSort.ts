import type { SortStep } from './types'

/**
 * Radix Sort: Non-comparison sorting algorithm that sorts numbers by processing
 * individual digits, from least significant to most significant.
 */
export function radixSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  if (arr.length === 0) return steps

  // Find maximum number to determine number of digits
  const max = Math.max(...arr)
  const maxDigits = Math.floor(Math.log10(Math.abs(max))) + 1

  // Helper function to get digit at position
  const getDigit = (num: number, place: number) => {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
  }

  // Counting sort for each digit
  for (let place = 0; place < maxDigits; place++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => [])

    steps.push({
      array: [...arr],
      action: 'compare',
      indices: [],
      description: `Processing digit at place ${place}`,
    })

    // Distribute numbers into buckets based on current digit
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], place)
      buckets[digit].push(arr[i])
      steps.push({
        array: [...arr],
        action: 'move',
        indices: [i],
        description: `Placing ${arr[i]} in bucket ${digit} (digit at place ${place})`,
      })
    }

    // Collect numbers from buckets back into array
    let index = 0
    for (let bucket = 0; bucket < 10; bucket++) {
      for (const value of buckets[bucket]) {
        arr[index] = value
        steps.push({
          array: [...arr],
          action: 'move',
          indices: [index],
          description: `Placing ${value} at position ${index} from bucket ${bucket}`,
        })
        index++
      }
    }
  }

  return steps
}

