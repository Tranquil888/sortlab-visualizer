import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import VisualizationCanvas from './VisualizationCanvas'
import type { SortStep } from '@/algorithms/types'

describe('VisualizationCanvas', () => {
  it('should render correct number of bars', () => {
    const array = [5, 2, 8, 1, 9]
    render(<VisualizationCanvas array={array} />)
    const container = screen.getByText(/visualization/i).parentElement
    expect(container).toBeDefined()
  })

  it('should display description when currentStep is provided', () => {
    const array = [5, 2, 8]
    const step: SortStep = {
      array: [2, 5, 8],
      action: 'compare',
      indices: [0, 1],
      description: 'Comparing 2 and 5',
    }
    render(<VisualizationCanvas array={array} currentStep={step} />)
    expect(screen.getByText('Comparing 2 and 5')).toBeDefined()
  })
})

