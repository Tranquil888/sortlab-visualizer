import Bar from './Bar'
import type { SortStep } from '@/algorithms/types'

interface VisualizationCanvasProps {
  array: number[]
  currentStep?: SortStep
  showBarValues: boolean
}

export default function VisualizationCanvas({ array, currentStep, showBarValues }: VisualizationCanvasProps) {
  const maxValue = array.length > 0 ? Math.max(...array) : 1
  // Use a smaller minimum bar width to fit more bars
  const MIN_BAR_WIDTH = 6
  const BAR_GAP = 2 // gap between bars in pixels (reduced to fit more bars)

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
      <div className="overflow-x-auto w-full">
        <div
          className="flex items-end justify-center h-[600px] border-b-2 border-gray-300 dark:border-gray-600"
          style={{
            minWidth: `${array.length * (MIN_BAR_WIDTH + BAR_GAP)}px`,
            width: array.length <= 100 ? '100%' : `${array.length * (MIN_BAR_WIDTH + BAR_GAP)}px`,
            gap: `${BAR_GAP}px`,
          }}
        >
          {array.map((value, index) => {
            const state = getBarState(index)
            return (
              <Bar
                key={index}
                value={value}
                maxValue={maxValue}
                width={MIN_BAR_WIDTH}
                showValue={showBarValues}
                {...state}
              />
            )
          })}
        </div>
      </div>
      {currentStep?.description && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-center text-gray-700 dark:text-gray-300 text-sm">
          {currentStep.description}
        </div>
      )}
    </div>
  )
}

