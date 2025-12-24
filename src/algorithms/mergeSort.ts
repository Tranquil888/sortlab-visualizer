import type { SortStep } from './types'

/**
 * Merge Sort: Divide and conquer algorithm that splits the array in half,
 * recursively sorts both halves, then merges them back together.
 */
export function mergeSort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array]

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)

    let i = 0,
      j = 0,
      k = left

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        action: 'compare',
        indices: [left + i, mid + 1 + j],
        description: `Comparing ${leftArr[i]} and ${rightArr[j]} in merge`,
        metadata: {
          subarrayStart: left,
          subarrayEnd: right,
        },
      })

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        steps.push({
          array: [...arr],
          action: 'move',
          indices: [left + i, k],
          description: `Merging ${leftArr[i]} to position ${k}`,
          metadata: {
            subarrayStart: left,
            subarrayEnd: right,
          },
        })
        i++
      } else {
        arr[k] = rightArr[j]
        steps.push({
          array: [...arr],
          action: 'move',
          indices: [mid + 1 + j, k],
          description: `Merging ${rightArr[j]} to position ${k}`,
          metadata: {
            subarrayStart: left,
            subarrayEnd: right,
          },
        })
        j++
      }
      k++
    }

    // Copy remaining elements
    while (i < leftArr.length) {
      arr[k] = leftArr[i]
      steps.push({
        array: [...arr],
        action: 'move',
        indices: [left + i, k],
        description: `Merging remaining ${leftArr[i]} to position ${k}`,
        metadata: {
          subarrayStart: left,
          subarrayEnd: right,
        },
      })
      i++
      k++
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j]
      steps.push({
        array: [...arr],
        action: 'move',
        indices: [mid + 1 + j, k],
        description: `Merging remaining ${rightArr[j]} to position ${k}`,
        metadata: {
          subarrayStart: left,
          subarrayEnd: right,
        },
      })
      j++
      k++
    }
  }

  function sort(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)

      steps.push({
        array: [...arr],
        action: 'partition',
        indices: [left, mid, right],
        description: `Partitioning from ${left} to ${right}`,
        metadata: {
          subarrayStart: left,
          subarrayEnd: right,
        },
      })

      sort(left, mid)
      sort(mid + 1, right)
      merge(left, mid, right)
    }
  }

  sort(0, arr.length - 1)
  return steps
}

