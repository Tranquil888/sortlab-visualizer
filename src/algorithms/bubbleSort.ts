import type { SortStep } from './types'

/**
 * Bubble Sort: Repeatedly steps through the list, compares adjacent elements
 * and swaps them if they are in the wrong order.
 */
export function bubbleSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array] // Clone to avoid mutation

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Compare step
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [j, j + 1],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      })

      if (arr[j] > arr[j + 1]) {
        // Swap step
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({
          array: [...arr],
          action: 'swap',
          indices: [j, j + 1],
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
        })
      }
    }
  }

  return steps
}

