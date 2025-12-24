import type { SortStep } from './types'

/**
 * Insertion Sort: Builds the sorted array one item at a time by inserting
 * each element into its correct position in the sorted portion.
 */
export function insertionSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1

    // Compare and shift elements
    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [j, i],
        description: `Comparing ${arr[j]} and ${key}`,
      })

      arr[j + 1] = arr[j]
      steps.push({
        array: [...arr],
        action: 'move',
        indices: [j, j + 1],
        description: `Moving ${arr[j + 1]} to position ${j + 1}`,
      })
      j--
    }

    // Insert key at correct position
    if (j + 1 !== i) {
      arr[j + 1] = key
      steps.push({
        array: [...arr],
        action: 'move',
        indices: [i, j + 1],
        description: `Inserting ${key} at position ${j + 1}`,
      })
    }
  }

  return steps
}

