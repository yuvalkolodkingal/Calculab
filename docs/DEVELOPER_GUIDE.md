# 🧪 CalcuLab Developer Guide

Welcome to the **CalcuLab** Developer Guide. This document provides a complete reference for developers and contributors looking to understand, maintain, or extend CalcuLab—a client-side suite of 39 molecular biology and biochemistry calculators built with React 19, Vite, and React Router.

---

## 🗺️ Architectural Overview

CalcuLab is a pure, serverless, client-side React application with zero external API dependencies. All calculations are run instantaneously in the user's browser.

**Architecture diagrams:** [View stack and file structure in FigJam](https://www.figma.com/board/1Z5xRD4guOUkDw5MjXVoLr/CalcuLab-Technology-Stack?node-id=0-1&t=qIqOZNHdWJMMjhVg-1)

### Directory Structure

```text
Calculab/
├── .github/
│   └── workflows/
│       ├── ci.yml               # Runs ESLint, Unit Tests, and Build on pushes/PRs
│       └── deploy.yml           # Deploys main branch to GitHub Pages
├── docs/
│   └── DEVELOPER_GUIDE.md       # This Guide
├── public/                      # Static assets (logo, web manifest, etc.)
├── src/
│   ├── assets/                  # CSS stylesheets, logos, SVGs
│   ├── calculators/             # Contains all 39 calculator components
│   ├── components/              # Shared UI components (Modal, UnitInput)
│   ├── pages/                   # Landing page components and configurations
│   ├── utils/                   # Math utilities and calculator panel definitions
│   ├── App.jsx                  # Main application router, modal & status logic
│   ├── main.jsx                 # Entrypoint (initializes React and routing)
│   └── test/                    # Math correctness unit test suites
└── package.json                 # Application dependencies and scripts
```

---

## 📜 Shared UI Components & Utilities

To ensure a unified user experience and reliable arithmetic, CalcuLab provides two core shared UI components and a package of mathematical utilities.

### 1. `UnitInput` Component (`src/components/UnitInput.jsx`)

The custom `<UnitInput />` component manages numeric inputs that require units with SI prefixes. It automatically handles the conversion between the **display value** (with its selected prefix) and the **underlying base value** (sent to the state in standard base units, e.g., Liters or Moles).

#### Example Usage

```jsx
import UnitInput from '../components/UnitInput';

// Inside a calculator component:
const [volume, setVolume] = useState(''); // Volume state is ALWAYS stored in Liters (base unit)

const volumeUnits = ['L', 'mL', 'μL', 'nL'];

<UnitInput
  label="Volume:"
  value={volume}
  onChange={setVolume}
  baseUnit="L"
  availableUnits={volumeUnits}
  defaultUnit="mL"
  placeholder="0.5"
/>
```

### 2. Math Utilities (`src/utils/mathUtils.js`)

All calculator components must import standard formulas and unit conversion calculations from `mathUtils.js` rather than implementing them locally.

#### Core Functions

#### `formatWithSIPrefix(value, baseUnit, decimals = 2, options = {})`
Formats a numeric value (given in standard base unit) with the most appropriate SI prefix.
- **By default**, uncommon prefixes in laboratory contexts like `centi` and `deci` are excluded (unless configured).
- **Format:** Returns a polished string (e.g., `1.50 mM`, `2.34 μL`).

```javascript
import { formatWithSIPrefix } from '../utils/mathUtils';

const formattedMass = formatWithSIPrefix(0.0015, 'g', 4);
// Returns: "1.5000 mg"
```

#### `linearRegression(x, y)`
Performs standard linear least-squares regression on x and y arrays.
- **Returns:** `{ slope, intercept, r2, yfit }`
- **Exceptions:** Throws an error if arrays differ in length or contain fewer than 2 data points.

```javascript
import { linearRegression } from '../utils/mathUtils';

const { slope, intercept, r2 } = linearRegression([1, 2, 3], [2, 4, 6]);
// slope: 2, intercept: 0, r2: 1
```

---

## 📑 The Calculator Component Contract

To integrate successfully into CalcuLab's main dashboard layout, every calculator component inside `src/calculators/` must implement the following contract:

### 1. Props Contract
Each component must accept the `{ onClose, onStatusUpdate }` props:
* `onClose`: Callback function to close the calculator's Modal when the user presses "Cancel" or "Close".
* `onStatusUpdate(message, color)`: Callback function to write updates to the global status bar. Call on success (using `#28a745` / `'green'`) or errors (using `#dc3545` / `'red'`).

### 2. Output Classes Contract
* All result boxes must be wrapped inside a `className="result"` div.
* All mathematical validation/execution error messages must be rendered inside a `className="error"` div.
* **Why:** The `<Modal>` component uses a `MutationObserver` to automatically scroll the result or error element smoothly into view as soon as they appear.

### 3. Structural Template

Use the following scaffolding as a template when writing new calculators:

```jsx
import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function SampleCalculator({ onClose, onStatusUpdate }) {
  const [inputVal, setInputVal] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const parsedVal = parseFloat(inputVal || '1.0');
      if (isNaN(parsedVal) || parsedVal <= 0) {
        throw new Error('Input must be a positive number.');
      }

      // Calculate output...
      const output = parsedVal * 2;

      setResult({ output: output.toFixed(2) });
      onStatusUpdate(`Status: Calculation successful!`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Enter Input (g):</label>
        <input
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="1.0"
        />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>

      {error && <div className="error">Error: {error}</div>}
      
      {result && (
        <div className="result">
          <strong>Resulting value: {result.output} g</strong>
        </div>
      )}
    </div>
  );
}
```

---

## 🛠️ Step-by-Step Guide: Adding a New Calculator

Adding a calculator to the CalcuLab suite takes exactly 5 simple steps:

### Step 1: Create the Component
Create a new file in `src/calculators/MyNewCalculator.jsx` conforming to the [Calculator Component Contract](#-the-calculator-component-contract).

### Step 2: Register in `App.jsx`
Import your component in `src/App.jsx` and map it inside the `calculatorComponents` mapping object:

```javascript
import MyNewCalculator from './calculators/MyNewCalculator';

const calculatorComponents = {
  // Existing calculators...
  myNewCalculator: MyNewCalculator,
};
```

### Step 3: Add to Dashboard Panels Config
Open `src/utils/calculatorConfig.js` and locate the appropriate dashboard category panel in `calculatorPanels`. Add an entry for your new calculator:

```javascript
  {
    title: 'Solution Preparation',
    calculators: [
      // ...
      { id: 'myNewCalculator', name: 'My New Calculator Name' },
    ],
  },
```

### Step 4: Write Correctness Unit Tests
Write math formula correctness tests in `src/test/calculators.test.js`.
> **Note:** Tests in CalcuLab verify math formulas directly. Do not mount React components or perform DOM interactions.

```javascript
describe('My New Calculator Formula', () => {
  it('correctly calculates the expected target output', () => {
    const input = 5;
    const expectedOutput = 10; // formula: input * 2
    expect(input * 2).toBe(expectedOutput);
  });
});
```

### Step 5: Lint & Verify
Run local validation checks to ensure zero lint errors and verify that all unit tests pass:

```bash
npm run lint
npm run test:run
npm run build
```

---

## 🧪 Testing Guidelines

CalcuLab uses **Vitest** for testing. 

### Core Concepts

1. **Pure Math Testing:** Tests reside in the `src/test/` directory. They validate mathematical models, edge cases, division-by-zero behaviors, and conversion scales.
2. **No DOM / Rendering Tests:** To keep test suites fast, lightweight, and robust, do not mount React components or test CSS layouts.
3. **Vitest Global Context:** Vitest global variables (`describe`, `it`, `expect`) are configured globally—no import statements are needed in test files.

### Test Commands

* **Run watch mode (local development):**
  ```bash
  npm test
  ```
* **Run once (CI style):**
  ```bash
  npm run test:run
  ```

---

## 🚀 GitHub Actions CI/CD Pipeline

To ensure quality and automatic publication, CalcuLab has two GitHub Actions pipelines configured:

### 1. Continuous Integration (`ci.yml`)
Runs on all pull requests and pushes to `main`/`master` branches:
- Checks out the branch.
- Standardizes Node.js v20.
- Restores npm package-cache and runs `npm ci` to install dependencies.
- Runs `npm run lint` to enforce ESLint policies.
- Runs `npm run test:run` to verify math correctness tests.
- Audits and builds the production bundle (`npm run build`).

### 2. CD Deployment (`deploy.yml`)
Triggered on successful merges/pushes to the `main` branch:
- Performs identical CI audits (installation, lint, test, build).
- Packages compiled assets from the `dist/` folder.
- Deploys the application directly to **GitHub Pages**.

---

## 🎨 Design System & Creative North Star

All modifications to CalcuLab must respect our primary design system specifications defined in `docs/DESIGN.md` and `docs/PRODUCT.md`.

* **Creative Theme:** *"The Digital Lab Notebook"* (pristine gridlines, soft-contrast text readability, thin 1px glassy borders, highly structured technical tables).
* **Primary Branding Accent:** Precision Cobalt (`#007bff`), limited to `<= 10%` of elements.
* **Border Radii:** Standard clean borders (`border-radius <= 16px`). Do not use overly rounded elements.
* **Micro-Sign Convention:** For microscopic symbols (e.g., micro-liters), always use the **micro sign `μ`** (U+00B5), rather than the Greek mu `μ` (U+03BC). This is strictly required for accurate string matches inside `UnitInput.jsx` and `mathUtils.js`.
