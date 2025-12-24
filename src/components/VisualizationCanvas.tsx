import Bar from './Bar'
import type { SortStep } from '@/algorithms/types'

interface VisualizationCanvasProps {
  array: number[]
  currentStep?: SortStep
}

export default function VisualizationCanvas({ array, currentStep }: VisualizationCanvasProps) {
  const maxValue = array.length > 0 ? Math.max(...array) : 1
  const barWidth = array.length > 0 ? 100 / array.length : 0

  const getBarState = (index: number) => {
    if (!currentStep) {
      return {
        isComparing: false,
        isSwapping: false,
        isSorted: false,
        isPartition: false,
        isHeap: false,
      }
    }

    const { action, indices, metadata } = currentStep

    const isInIndices = indices.includes(index)

    return {
      isComparing: action === 'compare' && isInIndices,
      isSwapping: action === 'swap' && isInIndices,
      isSorted: false, // Could be enhanced to track sorted portion
      isPartition:
        action === 'partition' &&
        metadata?.subarrayStart !== undefined &&
        metadata?.subarrayEnd !== undefined &&
        index >= metadata.subarrayStart &&
        index <= metadata.subarrayEnd,
      isHeap: action === 'heapify' && isInIndices,
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Visualization
      </h2>
      <div className="flex items-end justify-center gap-1 h-96 border-b-2 border-gray-300 dark:border-gray-600">
        {array.map((value, index) => {
          const state = getBarState(index)
          return (
            <Bar
              key={index}
              value={value}
              maxValue={maxValue}
              width={barWidth}
              {...state}
            />
          )
        })}
      </div>
      {currentStep?.description && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-center text-gray-700 dark:text-gray-300 text-sm">
          {currentStep.description}
        </div>
      )}
    </div>
  )
}

