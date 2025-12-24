import type { SortStep } from './types'

/**
 * Shell Sort: Generalization of insertion sort that allows exchange of items
 * that are far apart. Uses a gap sequence to sort elements at various intervals.
 */
export function shellSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  // Using Shell's original sequence: n/2, n/4, n/8, ...
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push({
      array: [...arr],
      action: 'compare',
      indices: [],
      description: `Starting pass with gap ${gap}`,
    })

    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i]
      let j = i

      // Compare elements at gap distance
      while (j >= gap && arr[j - gap] > temp) {
        steps.push({
          array: [...arr],
          action: 'compare',
          indices: [j - gap, j],
          description: `Comparing ${arr[j - gap]} and ${arr[j]} (gap ${gap})`,
        })

        arr[j] = arr[j - gap]
        steps.push({
          array: [...arr],
          action: 'move',
          indices: [j - gap, j],
          description: `Moving ${arr[j]} to position ${j}`,
        })
        j -= gap
      }

      if (j !== i) {
        arr[j] = temp
        steps.push({
          array: [...arr],
          action: 'move',
          indices: [i, j],
          description: `Inserting ${temp} at position ${j}`,
        })
      }
    }
  }

  return steps
}

