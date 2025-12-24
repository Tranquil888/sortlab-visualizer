import type { SortStep } from './types'

/**
 * Selection Sort: Finds the minimum element and places it at the beginning.
 * Repeats for the remaining unsorted portion.
 */
export function selectionSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i

    // Find minimum element in remaining array
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [minIndex, j],
        description: `Comparing ${arr[minIndex]} and ${arr[j]} to find minimum`,
      })

      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    // Swap if minimum is not at current position
    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
      steps.push({
        array: [...arr],
        action: 'swap',
        indices: [i, minIndex],
        description: `Swapping ${arr[minIndex]} with ${arr[i]}`,
      })
    }
  }

  return steps
}

