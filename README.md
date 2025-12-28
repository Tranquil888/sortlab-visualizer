# Sorting Algorithm Visualizer

An interactive educational web application that visualizes classic sorting algorithms step-by-step. This tool helps learners understand how each algorithm works internally through animated visualizations.
Video - https://disk.360.yandex.ru/i/y6YQ12LGbeEBYw
## Features

- **10 Sorting Algorithms**: Visualize Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Counting Sort, Shell Sort, Radix Sort, and Shaker Sort
- **Interactive Controls**:
  - Choose from multiple sorting algorithms
  - Adjust array size (5-200 elements)
  - Select array distribution type (Random, Nearly Sorted, Reversed, Few Unique)
  - Control animation speed
  - Step through algorithms manually
  - Pause/Resume animations
- **Educational Information**:
  - Algorithm descriptions
  - Pseudocode display
  - Time and space complexity information
  - Live statistics (comparisons and swaps/moves)
- **Visual Highlights**:
  - Elements being compared (yellow)
  - Elements being swapped (red)
  - Partition boundaries (blue)
  - Heap operations (purple)
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Vitest** + React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sortlab-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Running Tests

```bash
npm test
```

## Project Structure

```
sortlab-visualizer/
├── src/
│   ├── algorithms/          # Sorting algorithm implementations
│   │   ├── types.ts        # Type definitions
│   │   ├── *.ts            # Individual algorithm implementations
│   │   └── index.ts        # Algorithm registry
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── ControlsPanel.tsx
│   │   ├── VisualizationCanvas.tsx
│   │   ├── AlgorithmInfoPanel.tsx
│   │   └── Bar.tsx
│   ├── utils/              # Utility functions
│   │   ├── arrayGeneration.ts
│   │   └── debounce.ts
│   ├── config/             # Configuration
│   │   └── defaults.ts
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── tests/              # Test utilities
│   │   └── setup.ts
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html
└── package.json
```

## How to Add a New Sorting Algorithm

To add a new sorting algorithm to the visualizer:

1. **Create the algorithm file** in `src/algorithms/`:
   - Create a new file, e.g., `mySort.ts`
   - Export a function that takes `array: number[]` and returns `SortStep[]`
   - Each step should include:
     - `array`: The current state of the array
     - `action`: The type of operation ('compare', 'swap', 'move', etc.)
     - `indices`: The indices involved in the operation
     - `description`: Human-readable description (optional)
     - `metadata`: Algorithm-specific information (optional)

Example:
```typescript
import type { SortStep } from './types'

export function mySort(array: number[]): SortStep[] {
  const steps: SortStep[] = []
  const arr = [...array] // Clone to avoid mutation
  
  // Your sorting logic here
  // Add steps as the algorithm progresses
  steps.push({
    array: [...arr],
    action: 'compare',
    indices: [i, j],
    description: `Comparing ${arr[i]} and ${arr[j]}`,
  })
  
  return steps
}
```

2. **Add the algorithm to the registry** in `src/algorithms/index.ts`:
   - Import your algorithm function
   - Add metadata entry to the `algorithms` object:
     ```typescript
     mySort: {
       id: 'mySort',
       name: 'My Sort',
       description: 'Description of the algorithm',
       pseudocode: `function mySort(arr):\n  // pseudocode here`,
       timeComplexity: {
         best: 'O(n)',
         average: 'O(n log n)',
         worst: 'O(n²)',
       },
       spaceComplexity: 'O(1)',
       sortFunction: mySort,
     }
     ```

3. **Update the type** in `src/algorithms/types.ts`:
   - Add your algorithm ID to the `AlgorithmId` type:
     ```typescript
     type AlgorithmId = ... | 'mySort'
     ```

4. **Write tests** in `src/algorithms/mySort.test.ts`

That's it! Your algorithm will automatically appear in the dropdown menu.

## Algorithm Implementation Details

Each algorithm implementation:
- Takes an input array and returns a sequence of steps
- Each step represents a single operation (comparison, swap, etc.)
- Steps are pre-computed, enabling smooth animations and instant pause/resume
- Algorithms are pure functions with no side effects
- Array mutations are done on clones to maintain immutability

## Testing

Tests are written using Vitest and React Testing Library. The test suite includes:
- Algorithm correctness tests (ensures all algorithms produce sorted output)
- Step generation validation (valid indices, preserved array length)
- Component rendering tests

Run tests with:
```bash
npm test
```

## Browser Support

This application works in all modern browsers that support:
- ES2020 JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (for theming)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

