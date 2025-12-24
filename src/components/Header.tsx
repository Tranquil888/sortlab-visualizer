interface HeaderProps {
  isDark: boolean
  onThemeToggle: () => void
}

export default function Header({ isDark, onThemeToggle }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Sorting Algorithm Visualizer
        </h1>
        <button
          onClick={onThemeToggle}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  )
}

