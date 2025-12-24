import { DEFAULT_ARRAY_MIN, DEFAULT_ARRAY_MAX } from '@/config/defaults'

/**
 * Generates a random array of integers
 */
export function generateRandomArray(
  size: number,
  min: number = DEFAULT_ARRAY_MIN,
  max: number = DEFAULT_ARRAY_MAX
): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

/**
 * Generates a nearly sorted array by starting with sorted array and making random swaps
 */
export function generateNearlySortedArray(
  size: number,
  swaps: number = Math.floor(size * 0.1),
  min: number = DEFAULT_ARRAY_MIN,
  max: number = DEFAULT_ARRAY_MAX
): number[] {
  // Start with a sorted array
  const sortedArray = Array.from(
    { length: size },
    (_, i) => min + Math.floor((i * (max - min)) / (size - 1 || 1))
  )

  // Make random swaps
  const array = [...sortedArray]
  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * size)
    const idx2 = Math.floor(Math.random() * size)
    ;[array[idx1], array[idx2]] = [array[idx2], array[idx1]]
  }

  return array
}

/**
 * Generates a reversed (descending) array
 */
export function generateReversedArray(
  size: number,
  min: number = DEFAULT_ARRAY_MIN,
  max: number = DEFAULT_ARRAY_MAX
): number[] {
  return Array.from(
    { length: size },
    (_, i) => max - Math.floor((i * (max - min)) / (size - 1 || 1))
  )
}

/**
 * Generates an array with few unique values (many duplicates)
 */
export function generateFewUniqueArray(
  size: number,
  uniqueCount: number = Math.max(3, Math.floor(size * 0.1)),
  min: number = DEFAULT_ARRAY_MIN,
  max: number = DEFAULT_ARRAY_MAX
): number[] {
  // Generate unique values
  const uniqueValues: number[] = []
  const step = (max - min) / (uniqueCount - 1 || 1)
  for (let i = 0; i < uniqueCount; i++) {
    uniqueValues.push(min + Math.floor(i * step))
  }

  // Fill array with random selections from unique values
  return Array.from({ length: size }, () => {
    return uniqueValues[Math.floor(Math.random() * uniqueCount)]
  })
}

export type ArrayType = 'random' | 'nearlySorted' | 'reversed' | 'fewUnique'

/**
 * Generates an array based on the specified type
 */
export function generateArray(
  type: ArrayType,
  size: number,
  min: number = DEFAULT_ARRAY_MIN,
  max: number = DEFAULT_ARRAY_MAX
): number[] {
  switch (type) {
    case 'random':
      return generateRandomArray(size, min, max)
    case 'nearlySorted':
      return generateNearlySortedArray(size, undefined, min, max)
    case 'reversed':
      return generateReversedArray(size, min, max)
    case 'fewUnique':
      return generateFewUniqueArray(size, undefined, min, max)
    default:
      return generateRandomArray(size, min, max)
  }
}

