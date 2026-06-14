# Calculator Component Contract 📜

To maintain a consistent look, standard behavior, and reliable layouts across all 39 calculators in CalcuLab, every component inside `src/calculators/` must strictly adhere to the project's technical interface contract.

---

## 🛠️ Props Contract

Each calculator is rendered inside a global React Modal overlay controlled by `src/App.jsx`. To integrate safely, it must accept and utilize the following two props:

```jsx
export default function NewCalculator({ onClose, onStatusUpdate }) { ... }
```

### 1. `onClose`
* **Type:** `function`
* **Trigger:** Call when the user clicks the "Cancel" or "Close" button.
* **Effect:** Clears active modal states and restores standard main dashboard page scrolling.

### 2. `onStatusUpdate`
* **Type:** `function`
* **Signature:** `onStatusUpdate(message: string, color?: string)`
* **Effect:** Overwrites the text inside the global sticky status bar.
* **Conventions:**
  * For successful calculations, output a success message in green: `onStatusUpdate('Status: Calculated successfully!', 'green')` (or `#28a745`).
  * For errors or validation failures, output a detailed message in red: `onStatusUpdate('Status: Calculation failed - Input is out of bounds', 'red')` (or `#dc3545`).

---

## 📐 DOM Output Layout Contract

The global `<Modal>` container implements a `MutationObserver` that monitors the calculator viewport. It searches dynamically for specific elements when children update and automatically scrolls the user's viewport smoothy to keep results or errors in center view.

### 1. Results Element (`.result`)
* **Requirement:** Wrap all final mathematical output details inside a container with `className="result"`.
* **Example:**
  ```jsx
  {result && (
    <div className="result">
      <strong>Molarity required: {result.molarity}</strong>
    </div>
  )}
  ```

### 2. Errors Element (`.error`)
* **Requirement:** Wrap all validation, out-of-bounds, or division-by-zero exceptions inside a container with `className="error"`.
* **Example:**
  ```jsx
  {error && (
    <div className="error">
      Error: {error}
    </div>
  )}
  ```

---

## ⚡ Shared Component Integrations

### 1. Using `<UnitInput />`
When asking the user for quantities that require scientific units (e.g., Volumes in Liters, Milliliters, Microliters), use the shared `<UnitInput />` component found under `src/components/UnitInput.jsx`.

* State variables coupled with `UnitInput` are **always stored in standard base units** (e.g. standard Liters for Volume, standard Molar for Concentration, standard Grams for Mass).
* The component automatically renders dropdowns and updates parent states with correct multiplier factors.

```jsx
import UnitInput from '../components/UnitInput';

const volumeUnits = ['L', 'mL', 'μL', 'nL'];

<UnitInput
  label="Total Solution Volume:"
  value={volume}
  onChange={setVolume}
  baseUnit="L"
  availableUnits={volumeUnits}
  defaultUnit="mL"
  placeholder="1.0"
/>
```

### 2. Result Formatting with `formatWithSIPrefix()`
Display mathematical results using the `formatWithSIPrefix` helper in `src/utils/mathUtils.js` to automatically attach clean unit suffixes.

```javascript
import { formatWithSIPrefix } from '../utils/mathUtils';

const formattedVal = formatWithSIPrefix(0.0000045, 'M', 3);
// Returns: "4.500 μM"
```

> ⚠️ **Critical mu (μ) character convention:** Always use the Unicode character **`μ`** (U+00B5, micro sign), rather than the Greek mu **`μ`** (U+03BC) inside unit list strings. Using incorrect mu characters will break `UnitInput` multiplier matches.
