import type { AlgorithmMetadata } from '@/algorithms/types'

interface AlgorithmInfoPanelProps {
  algorithm: AlgorithmMetadata
  comparisons: number
  swaps: number
}

export default function AlgorithmInfoPanel({
  algorithm,
  comparisons,
  swaps,
}: AlgorithmInfoPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Algorithm Name and Description */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {algorithm.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{algorithm.description}</p>
        </div>

        {/* Complexity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Time Complexity
          </h3>
          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Best:</span>
              <span className="font-mono font-semibold">{algorithm.timeComplexity.best}</span>
            </div>
            <div className="flex justify-between">
              <span>Average:</span>
              <span className="font-mono font-semibold">{algorithm.timeComplexity.average}</span>
            </div>
            <div className="flex justify-between">
              <span>Worst:</span>
              <span className="font-mono font-semibold">{algorithm.timeComplexity.worst}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Space:</span>
              <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                {algorithm.spaceComplexity}
              </span>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Live Statistics
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Comparisons:</span>
              <span className="font-mono font-semibold">{comparisons}</span>
            </div>
            <div className="flex justify-between">
              <span>Swaps/Moves:</span>
              <span className="font-mono font-semibold">{swaps}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pseudocode - Full Width Below */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Pseudocode
        </h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-xs text-gray-800 dark:text-gray-200">
          {algorithm.pseudocode}
        </pre>
      </div>
    </div>
  )
}

