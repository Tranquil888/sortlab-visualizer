import type { SortStep } from './types'

/**
 * Heap Sort: Builds a max heap from the array, then repeatedly extracts
 * the maximum element and places it at the end of the sorted portion.
 */
export function heapSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  function heapify(n: number, i: number) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [largest, left],
        description: `Comparing ${arr[largest]} and ${arr[left]}`,
        metadata: {
          heapSize: n,
        },
      })

      if (arr[left] > arr[largest]) {
        largest = left
      }
    }

    if (right < n) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [largest, right],
        description: `Comparing ${arr[largest]} and ${arr[right]}`,
        metadata: {
          heapSize: n,
        },
      })

      if (arr[right] > arr[largest]) {
        largest = right
      }
    }

    if (largest !== i) {
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      steps.push({
        array: [...arr],
        action: 'heapify',
        indices: [i, largest],
        description: `Heapifying: swapping ${arr[largest]} and ${arr[i]}`,
        metadata: {
          heapSize: n,
        },
      })

      heapify(n, largest)
    }
  }

  // Build max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr.length, i)
  }

  // Extract elements from heap one by one
  for (let i = arr.length - 1; i > 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    steps.push({
      array: [...arr],
      action: 'swap',
      indices: [0, i],
      description: `Moving max element ${arr[i]} to position ${i}`,
      metadata: {
        heapSize: i,
      },
    })

    heapify(i, 0)
  }

  return steps
}

