import type { SortStep } from './types'

/**
 * Shaker Sort (Cocktail Sort): Bidirectional bubble sort that sorts in both
 * directions - left to right, then right to left.
 */
export function shakerSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  let swapped = true
  let start = 0
  let end = arr.length - 1

  while (swapped) {
    swapped = false

    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [i, i + 1],
        description: `Comparing ${arr[i]} and ${arr[i + 1]} (forward pass)`,
      })

      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        swapped = true
        steps.push({
          array: [...arr],
          action: 'swap',
          indices: [i, i + 1],
          description: `Swapping ${arr[i + 1]} and ${arr[i]}`,
        })
      }
    }

    if (!swapped) break

    swapped = false
    end--

    // Backward pass (right to left)
    for (let i = end - 1; i >= start; i--) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [i, i + 1],
        description: `Comparing ${arr[i]} and ${arr[i + 1]} (backward pass)`,
      })

      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        swapped = true
        steps.push({
          array: [...arr],
          action: 'swap',
          indices: [i, i + 1],
          description: `Swapping ${arr[i + 1]} and ${arr[i]}`,
        })
      }
    }

    start++
  }

  return steps
}

