export type SortActionType = 'compare' | 'swap' | 'merge' | 'partition' | 'heapify' | 'move'

export interface SortStep {
  array: number[]
  action: SortActionType
  indices: number[] // Indices being compared/swapped/moved
  description?: string // Human-readable description
  metadata?: {
    // Algorithm-specific information
    subarrayStart?: number
    subarrayEnd?: number
    pivotIndex?: number
    heapSize?: number
    [key: string]: any
  }
}

export type AlgorithmId =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap'
  | 'counting'
  | 'shell'
  | 'radix'
  | 'shaker'

export interface AlgorithmMetadata {
  id: AlgorithmId
  name: string
  description: string
  pseudocode: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  sortFunction: (array: number[]) => SortStep[]
}

