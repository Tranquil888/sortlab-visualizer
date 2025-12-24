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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {algorithm.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{algorithm.description}</p>
      </div>

      {/* Pseudocode */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Pseudocode
        </h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
          {algorithm.pseudocode}
        </pre>
      </div>

      {/* Complexity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Time Complexity
        </h3>
        <table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="text-left py-2">Case</th>
              <th className="text-left py-2">Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-2">Best</td>
              <td className="py-2 font-mono">{algorithm.timeComplexity.best}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-2">Average</td>
              <td className="py-2 font-mono">{algorithm.timeComplexity.average}</td>
            </tr>
            <tr>
              <td className="py-2">Worst</td>
              <td className="py-2 font-mono">{algorithm.timeComplexity.worst}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Space Complexity
        </h3>
        <p className="text-gray-700 dark:text-gray-300 font-mono">{algorithm.spaceComplexity}</p>
      </div>

      {/* Live Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Live Statistics
        </h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
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
  )
}

