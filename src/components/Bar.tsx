interface BarProps {
  value: number
  maxValue: number
  isComparing?: boolean
  isSwapping?: boolean
  isSorted?: boolean
  isPartition?: boolean
  isHeap?: boolean
  width: number
  showValue?: boolean
}

export default function Bar({
  value,
  maxValue,
  isComparing = false,
  isSwapping = false,
  isSorted = false,
  isPartition = false,
  isHeap = false,
  width,
  showValue = false,
}: BarProps) {
  const height = maxValue > 0 ? (value / maxValue) * 100 : 0

  let bgColor = 'bg-gray-400 dark:bg-gray-600'
  if (isSorted) {
    bgColor = 'bg-green-500 dark:bg-green-600'
  } else if (isSwapping) {
    bgColor = 'bg-red-500 dark:bg-red-600'
  } else if (isComparing) {
    bgColor = 'bg-yellow-400 dark:bg-yellow-500'
  } else if (isPartition) {
    bgColor = 'bg-blue-400 dark:bg-blue-500'
  } else if (isHeap) {
    bgColor = 'bg-purple-400 dark:bg-purple-500'
  }

  return (
    <div className="flex flex-col items-center flex-1 self-stretch" style={{ minWidth: `${width}px`, maxWidth: '100%', height: '100%' }}>
      <div className="flex-1 w-full flex items-end">
        <div
          className={`${bgColor} transition-all duration-75 rounded-t text-xs text-gray-800 dark:text-gray-200 w-full`}
          style={{
            height: `${height}%`,
            minHeight: '4px',
          }}
          title={`Value: ${value}`}
        />
      </div>
      {showValue && (
        <span className="mt-1 text-[10px] text-gray-700 dark:text-gray-300 font-mono whitespace-nowrap flex-shrink-0">
          {value}
        </span>
      )}
    </div>
  )
}

