import type { SortStep } from './types'

/**
 * Counting Sort: Non-comparison sorting algorithm that counts occurrences
 * of each value and uses those counts to determine positions.
 */
export function countingSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  if (arr.length === 0) return steps

  const min = Math.min(...arr)
  const max = Math.max(...arr)
  const range = max - min + 1
  const count = new Array(range).fill(0)
  const output = new Array(arr.length).fill(0)

  // Count occurrences of each value
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++
    steps.push({
      array: [...arr],
      action: 'compare',
      indices: [i],
      description: `Counting occurrence of ${arr[i]}`,
    })
  }

  // Modify count to store actual positions
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1]
  }

  // Build output array (iterate backwards for stability)
  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i]
    const position = count[value - min] - 1
    output[position] = value
    count[value - min]--

    // Update visualization array gradually
    arr[position] = value
    steps.push({
      array: [...arr],
      action: 'move',
      indices: [i, position],
      description: `Placing ${value} at position ${position}`,
    })
  }

  // Final step - ensure array is fully sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i]
  }
  steps.push({
    array: [...arr],
    action: 'move',
    indices: [],
    description: 'Counting sort complete',
  })

  return steps
}

