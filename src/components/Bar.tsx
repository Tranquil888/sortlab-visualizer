interface BarProps {
  value: number
  maxValue: number
  isComparing?: boolean
  isSwapping?: boolean
  isSorted?: boolean
  isPartition?: boolean
  isHeap?: boolean
  width: number
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
    <div
      className={`${bgColor} transition-all duration-75 flex items-end justify-center rounded-t text-xs text-gray-800 dark:text-gray-200`}
      style={{
        height: `${height}%`,
        width: `${width}%`,
        minHeight: '4px',
      }}
      title={`Value: ${value}`}
    >
      {value > 0 && height > 15 && (
        <span className="mb-1 text-[10px]">{value}</span>
      )}
    </div>
  )
}

