import type { AlgorithmMetadata } from './types'
import { bubbleSort } from './bubbleSort'
import { selectionSort } from './selectionSort'
import { insertionSort } from './insertionSort'
import { mergeSort } from './mergeSort'
import { quickSort } from './quickSort'
import { heapSort } from './heapSort'
import { countingSort } from './countingSort'
import { shellSort } from './shellSort'
import { radixSort } from './radixSort'
import { shakerSort } from './shakerSort'

export const algorithms: Record<string, AlgorithmMetadata> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    description:
      'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    pseudocode: `function bubbleSort(arr):
  for i = 0 to arr.length - 1:
    for j = 0 to arr.length - i - 2:
      if arr[j] > arr[j + 1]:
        swap(arr[j], arr[j + 1])`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    sortFunction: bubbleSort,
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    description:
      'Finds the minimum element from the unsorted portion and places it at the beginning. The algorithm maintains two subarrays: sorted and unsorted.',
    pseudocode: `function selectionSort(arr):
  for i = 0 to arr.length - 1:
    minIndex = i
    for j = i + 1 to arr.length:
      if arr[j] < arr[minIndex]:
        minIndex = j
    swap(arr[i], arr[minIndex])`,
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    sortFunction: selectionSort,
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    description:
      'Builds the sorted array one item at a time by inserting each element into its correct position in the sorted portion.',
    pseudocode: `function insertionSort(arr):
  for i = 1 to arr.length:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j--
    arr[j + 1] = key`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    sortFunction: insertionSort,
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    description:
      'A divide-and-conquer algorithm that splits the array in half, recursively sorts both halves, then merges them back together.',
    pseudocode: `function mergeSort(arr, left, right):
  if left < right:
    mid = (left + right) / 2
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)

function merge(arr, left, mid, right):
  // Merge two sorted subarrays`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    sortFunction: mergeSort,
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    description:
      'A divide-and-conquer algorithm that picks a pivot element, partitions the array around the pivot, and recursively sorts the subarrays.',
    pseudocode: `function quickSort(arr, low, high):
  if low < high:
    pivotIndex = partition(arr, low, high)
    quickSort(arr, low, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, high)

function partition(arr, low, high):
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1:
    if arr[j] <= pivot:
      i++
      swap(arr[i], arr[j])
  swap(arr[i + 1], arr[high])
  return i + 1`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    sortFunction: quickSort,
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    description:
      'Builds a max heap from the array, then repeatedly extracts the maximum element and places it at the end of the sorted portion.',
    pseudocode: `function heapSort(arr):
  // Build max heap
  for i = arr.length / 2 - 1 down to 0:
    heapify(arr, arr.length, i)
  
  // Extract elements from heap
  for i = arr.length - 1 down to 1:
    swap(arr[0], arr[i])
    heapify(arr, i, 0)`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    sortFunction: heapSort,
  },
  counting: {
    id: 'counting',
    name: 'Counting Sort',
    description:
      'A non-comparison sorting algorithm that counts occurrences of each value and uses those counts to determine positions.',
    pseudocode: `function countingSort(arr):
  max = findMax(arr)
  count = array of size (max + 1) initialized to 0
  
  // Count occurrences
  for each element in arr:
    count[element]++
  
  // Modify count to store positions
  for i = 1 to max:
    count[i] += count[i - 1]
  
  // Build output array
  output = new array of size arr.length
  for i = arr.length - 1 down to 0:
    output[count[arr[i]] - 1] = arr[i]
    count[arr[i]]--
  
  return output`,
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n + k)',
    },
    spaceComplexity: 'O(k)',
    sortFunction: countingSort,
  },
  shell: {
    id: 'shell',
    name: 'Shell Sort',
    description:
      'A generalization of insertion sort that allows exchange of items that are far apart. Uses a gap sequence to sort elements at various intervals.',
    pseudocode: `function shellSort(arr):
  gap = arr.length / 2
  while gap > 0:
    for i = gap to arr.length:
      temp = arr[i]
      j = i
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      arr[j] = temp
    gap = gap / 2`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n^1.5)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    sortFunction: shellSort,
  },
  radix: {
    id: 'radix',
    name: 'Radix Sort',
    description:
      'A non-comparison sorting algorithm that sorts numbers by processing individual digits, from least significant to most significant.',
    pseudocode: `function radixSort(arr):
  max = findMax(arr)
  maxDigits = number of digits in max
  
  for place = 0 to maxDigits:
    buckets = array of 10 empty lists
    for each element in arr:
      digit = getDigit(element, place)
      buckets[digit].append(element)
    
    arr = concatenate all buckets`,
    timeComplexity: {
      best: 'O(nk)',
      average: 'O(nk)',
      worst: 'O(nk)',
    },
    spaceComplexity: 'O(n + k)',
    sortFunction: radixSort,
  },
  shaker: {
    id: 'shaker',
    name: 'Shaker Sort',
    description:
      'Also known as Cocktail Sort, this is a bidirectional bubble sort that sorts in both directions - left to right, then right to left.',
    pseudocode: `function shakerSort(arr):
  swapped = true
  start = 0
  end = arr.length - 1
  
  while swapped:
    swapped = false
    
    // Forward pass
    for i = start to end - 1:
      if arr[i] > arr[i + 1]:
        swap(arr[i], arr[i + 1])
        swapped = true
    end--
    
    // Backward pass
    for i = end - 1 down to start:
      if arr[i] > arr[i + 1]:
        swap(arr[i], arr[i + 1])
        swapped = true
    start++`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    sortFunction: shakerSort,
  },
}

export function getAlgorithm(id: string): AlgorithmMetadata | undefined {
  return algorithms[id]
}

export function getAllAlgorithmIds(): string[] {
  return Object.keys(algorithms)
}

