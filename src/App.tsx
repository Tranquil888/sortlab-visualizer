import { useReducer, useEffect, useRef } from 'react'
import Header from './components/Header'
import ControlsPanel from './components/ControlsPanel'
import VisualizationCanvas from './components/VisualizationCanvas'
import AlgorithmInfoPanel from './components/AlgorithmInfoPanel'
import { generateArray } from './utils/arrayGeneration'
import { algorithms, getAllAlgorithmIds } from './algorithms'
import {
  DEFAULT_ARRAY_SIZE,
  DEFAULT_SPEED,
  MIN_ARRAY_SIZE,
  MAX_ARRAY_SIZE,
  DEFAULT_ARRAY_MIN,
  DEFAULT_ARRAY_MAX,
} from './config/defaults'
import type { AlgorithmId } from './algorithms/types'
import type { ArrayType } from './utils/arrayGeneration'
import type { SortStep } from './algorithms/types'

interface AppState {
  algorithm: AlgorithmId
  array: number[]
  arraySize: number
  arrayType: ArrayType
  steps: SortStep[]
  currentStepIndex: number
  isPlaying: boolean
  speed: number
  stats: {
    comparisons: number
    swaps: number
  }
  isDark: boolean
}

type AppAction =
  | { type: 'SET_ALGORITHM'; payload: AlgorithmId }
  | { type: 'GENERATE_ARRAY' }
  | { type: 'SET_ARRAY_SIZE'; payload: number }
  | { type: 'SET_ARRAY_TYPE'; payload: ArrayType }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'STEP' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'TOGGLE_THEME' }

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ALGORITHM': {
      const newArray = generateArray(state.arrayType, state.arraySize, DEFAULT_ARRAY_MIN, DEFAULT_ARRAY_MAX)
      const algorithm = algorithms[action.payload]
      const steps = algorithm.sortFunction(newArray)
      return {
        ...state,
        algorithm: action.payload,
        array: newArray,
        steps,
        currentStepIndex: 0,
        isPlaying: false,
        stats: { comparisons: 0, swaps: 0 },
      }
    }

    case 'GENERATE_ARRAY': {
      const newArray = generateArray(state.arrayType, state.arraySize, DEFAULT_ARRAY_MIN, DEFAULT_ARRAY_MAX)
      const algorithm = algorithms[state.algorithm]
      const steps = algorithm.sortFunction(newArray)
      return {
        ...state,
        array: newArray,
        steps,
        currentStepIndex: 0,
        isPlaying: false,
        stats: { comparisons: 0, swaps: 0 },
      }
    }

    case 'SET_ARRAY_SIZE': {
      const newArray = generateArray(state.arrayType, action.payload, DEFAULT_ARRAY_MIN, DEFAULT_ARRAY_MAX)
      const algorithm = algorithms[state.algorithm]
      const steps = algorithm.sortFunction(newArray)
      return {
        ...state,
        arraySize: action.payload,
        array: newArray,
        steps,
        currentStepIndex: 0,
        isPlaying: false,
        stats: { comparisons: 0, swaps: 0 },
      }
    }

    case 'SET_ARRAY_TYPE': {
      const newArray = generateArray(action.payload, state.arraySize, DEFAULT_ARRAY_MIN, DEFAULT_ARRAY_MAX)
      const algorithm = algorithms[state.algorithm]
      const steps = algorithm.sortFunction(newArray)
      return {
        ...state,
        arrayType: action.payload,
        array: newArray,
        steps,
        currentStepIndex: 0,
        isPlaying: false,
        stats: { comparisons: 0, swaps: 0 },
      }
    }

    case 'SET_SPEED':
      return { ...state, speed: action.payload }

    case 'START':
      return { ...state, isPlaying: true }

    case 'PAUSE':
      return { ...state, isPlaying: false }

    case 'STEP': {
      if (state.currentStepIndex < state.steps.length - 1) {
        const nextIndex = state.currentStepIndex + 1
        const step = state.steps[nextIndex]
        const newStats = { ...state.stats }
        if (step.action === 'compare') {
          newStats.comparisons++
        }
        if (step.action === 'swap' || step.action === 'move') {
          newStats.swaps++
        }
        return {
          ...state,
          currentStepIndex: nextIndex,
          array: step.array,
          stats: newStats,
        }
      }
      return { ...state, isPlaying: false }
    }

    case 'RESET': {
      const initialArray = generateArray(state.arrayType, state.arraySize, DEFAULT_ARRAY_MIN, DEFAULT_ARRAY_MAX)
      const algorithm = algorithms[state.algorithm]
      const steps = algorithm.sortFunction(initialArray)
      return {
        ...state,
        array: initialArray,
        steps,
        currentStepIndex: 0,
        isPlaying: false,
        stats: { comparisons: 0, swaps: 0 },
      }
    }

    case 'TICK': {
      if (state.isPlaying && state.currentStepIndex < state.steps.length - 1) {
        const nextIndex = state.currentStepIndex + 1
        const step = state.steps[nextIndex]
        const newStats = { ...state.stats }
        if (step.action === 'compare') {
          newStats.comparisons++
        }
        if (step.action === 'swap' || step.action === 'move') {
          newStats.swaps++
        }
        return {
          ...state,
          currentStepIndex: nextIndex,
          array: step.array,
          stats: newStats,
        }
      }
      return { ...state, isPlaying: false }
    }

    case 'TOGGLE_THEME': {
      const newIsDark = !state.isDark
      if (newIsDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { ...state, isDark: newIsDark }
    }

    default:
      return state
  }
}

function getInitialState(): AppState {
  const initialArray = generateArray('random', DEFAULT_ARRAY_SIZE, DEFAULT_ARRAY_MIN, DEFAULT_ARRAY_MAX)
  const initialAlgorithm: AlgorithmId = 'bubble'
  const algorithm = algorithms[initialAlgorithm]
  const steps = algorithm.sortFunction(initialArray)

  // Check if dark mode is preferred
  const isDark = localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  if (isDark) {
    document.documentElement.classList.add('dark')
  }

  return {
    algorithm: initialAlgorithm,
    array: initialArray,
    arraySize: DEFAULT_ARRAY_SIZE,
    arrayType: 'random',
    steps,
    currentStepIndex: 0,
    isPlaying: false,
    speed: DEFAULT_SPEED,
    stats: {
      comparisons: 0,
      swaps: 0,
    },
    isDark,
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState)
  const intervalRef = useRef<number | null>(null)

  // Animation loop
  useEffect(() => {
    if (state.isPlaying) {
      intervalRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' })
      }, state.speed)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state.isPlaying, state.speed])

  const currentStep = state.steps[state.currentStepIndex]
  const currentArray = currentStep?.array || state.array
  const algorithm = algorithms[state.algorithm]
  const algorithmOptions = getAllAlgorithmIds().map((id) => ({
    id,
    name: algorithms[id].name,
  }))

  const handleThemeToggle = () => {
    dispatch({ type: 'TOGGLE_THEME' })
    const newIsDark = !state.isDark
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header isDark={state.isDark} onThemeToggle={handleThemeToggle} />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1">
            <ControlsPanel
              algorithm={state.algorithm}
              arraySize={state.arraySize}
              arrayType={state.arrayType}
              speed={state.speed}
              isPlaying={state.isPlaying}
              onAlgorithmChange={(alg) => dispatch({ type: 'SET_ALGORITHM', payload: alg })}
              onArraySizeChange={(size) => {
                const clampedSize = Math.max(MIN_ARRAY_SIZE, Math.min(MAX_ARRAY_SIZE, size))
                dispatch({ type: 'SET_ARRAY_SIZE', payload: clampedSize })
              }}
              onArrayTypeChange={(type) => dispatch({ type: 'SET_ARRAY_TYPE', payload: type })}
              onSpeedChange={(speed) => dispatch({ type: 'SET_SPEED', payload: speed })}
              onGenerateArray={() => dispatch({ type: 'GENERATE_ARRAY' })}
              onStartPause={() => dispatch({ type: state.isPlaying ? 'PAUSE' : 'START' })}
              onStep={() => dispatch({ type: 'STEP' })}
              onReset={() => dispatch({ type: 'RESET' })}
              algorithmOptions={algorithmOptions}
            />
          </div>

          {/* Middle Column - Visualization */}
          <div className="lg:col-span-1">
            <VisualizationCanvas array={currentArray} currentStep={currentStep} />
          </div>

          {/* Right Column - Algorithm Info */}
          <div className="lg:col-span-1">
            <AlgorithmInfoPanel
              algorithm={algorithm}
              comparisons={state.stats.comparisons}
              swaps={state.stats.swaps}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

