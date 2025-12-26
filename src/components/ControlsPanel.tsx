import { DEFAULT_ARRAY_SIZE, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE, DEFAULT_SPEED, MIN_SPEED, MAX_SPEED } from '@/config/defaults'
import type { AlgorithmId } from '@/algorithms/types'
import type { ArrayType } from '@/utils/arrayGeneration'

interface ControlsPanelProps {
  algorithm: AlgorithmId
  arraySize: number
  arrayType: ArrayType
  speed: number
  isPlaying: boolean
  showBarValues: boolean
  onAlgorithmChange: (algorithm: AlgorithmId) => void
  onArraySizeChange: (size: number) => void
  onArrayTypeChange: (type: ArrayType) => void
  onSpeedChange: (speed: number) => void
  onGenerateArray: () => void
  onStartPause: () => void
  onStep: () => void
  onReset: () => void
  onShowBarValuesChange: () => void
  algorithmOptions: { id: AlgorithmId; name: string }[]
}

export default function ControlsPanel({
  algorithm,
  arraySize,
  arrayType,
  speed,
  isPlaying,
  showBarValues,
  onAlgorithmChange,
  onArraySizeChange,
  onArrayTypeChange,
  onSpeedChange,
  onGenerateArray,
  onStartPause,
  onStep,
  onReset,
  onShowBarValuesChange,
  algorithmOptions,
}: ControlsPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Controls</h2>

      {/* Algorithm Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Algorithm
        </label>
        <select
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmId)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          disabled={isPlaying}
        >
          {algorithmOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Array Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Array Size: {arraySize}
        </label>
        <input
          type="range"
          min={MIN_ARRAY_SIZE}
          max={MAX_ARRAY_SIZE}
          value={arraySize}
          onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
          className="w-full"
          disabled={isPlaying}
        />
      </div>

      {/* Array Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Array Distribution
        </label>
        <div className="space-y-2">
          {(['random', 'nearlySorted', 'reversed', 'fewUnique'] as ArrayType[]).map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="arrayType"
                value={type}
                checked={arrayType === type}
                onChange={() => onArrayTypeChange(type)}
                className="mr-2"
                disabled={isPlaying}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {type === 'nearlySorted' ? 'Nearly Sorted' : type === 'fewUnique' ? 'Few Unique' : type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Speed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Speed: {speed}ms per step
        </label>
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Show Bar Values Toggle */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showBarValues}
            onChange={onShowBarValuesChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Show Bar Values</span>
        </label>
      </div>

      {/* Control Buttons */}
      <div className="space-y-2">
        <button
          onClick={onGenerateArray}
          disabled={isPlaying}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
        >
          Generate Array
        </button>
        <button
          onClick={onStartPause}
          className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
        >
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={onStep}
          disabled={isPlaying}
          className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
        >
          Step
        </button>
        <button
          onClick={onReset}
          disabled={isPlaying}
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

