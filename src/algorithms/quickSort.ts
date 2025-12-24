import type { SortStep } from './types'

/**
 * Quick Sort: Divide and conquer algorithm that picks a pivot element,
 * partitions the array around the pivot, and recursively sorts the subarrays.
 */
export function quickSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  function partition(low: number, high: number): number {
    const pivot = arr[high]
    let i = low - 1

    steps.push({
      array: [...arr],
      action: 'partition',
      indices: [high],
      description: `Partitioning with pivot ${pivot}`,
      metadata: {
        subarrayStart: low,
        subarrayEnd: high,
        pivotIndex: high,
      },
    })

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [j, high],
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
        metadata: {
          subarrayStart: low,
          subarrayEnd: high,
          pivotIndex: high,
        },
      })

      if (arr[j] <= pivot) {
        i++
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          steps.push({
            array: [...arr],
            action: 'swap',
            indices: [i, j],
            description: `Swapping ${arr[j]} and ${arr[i]}`,
            metadata: {
              subarrayStart: low,
              subarrayEnd: high,
              pivotIndex: high,
            },
          })
        }
      }
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      steps.push({
        array: [...arr],
        action: 'swap',
        indices: [i + 1, high],
        description: `Placing pivot ${pivot} at position ${i + 1}`,
        metadata: {
          subarrayStart: low,
          subarrayEnd: high,
          pivotIndex: i + 1,
        },
      })
    }

    return i + 1
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pivotIndex = partition(low, high)

      sort(low, pivotIndex - 1)
      sort(pivotIndex + 1, high)
    }
  }

  sort(0, arr.length - 1)
  return steps
}

