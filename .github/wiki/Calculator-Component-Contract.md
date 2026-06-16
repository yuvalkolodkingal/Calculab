# Calculator Component Contract

Every file in `src/calculators/` must follow this contract so calculators integrate cleanly with the dashboard, modal system, and status bar.

---

## Props

Calculators are rendered inside a global `<Modal>` managed by `src/App.jsx`.

```jsx
export default function MyCalculator({ onClose, onStatusUpdate }) {
  // ...
}
```

### `onClose`

- **Type:** `function`
- **When to call:** User clicks Cancel or Close
- **Effect:** Closes the modal and restores page scrolling

### `onStatusUpdate(message, color?)`

- **Type:** `function`
- **When to call:** After every calculation attempt (success or failure)
- **Effect:** Updates the global sticky status bar

| Outcome | Color | Example |
|---------|-------|---------|
| Success | `'green'` or `'#28a745'` | `onStatusUpdate('Status: Calculated successfully!', 'green')` |
| Failure | `'red'` or `'#dc3545'` | `onStatusUpdate('Status: Input out of bounds', 'red')` |

---

## DOM output classes

The `<Modal>` component uses a `MutationObserver` to auto-scroll results and errors into view. Use these exact class names:

### Results — `className="result"`

```jsx
{result && (
  <div className="result">
    <strong>Molarity: {result.value}</strong>
  </div>
)}
```

### Errors — `className="error"`

```jsx
{error && (
  <div className="error">
    Error: {error}
  </div>
)}
```

---

## Shared components

### UnitInput

Use for any numeric field that needs unit selection (volume, mass, concentration, etc.).

```jsx
import UnitInput from '../components/UnitInput';

const volumeUnits = ['L', 'mL', 'μL', 'nL'];

<UnitInput
  label="Total Volume:"
  value={volume}
  onChange={setVolume}
  baseUnit="L"
  availableUnits={volumeUnits}
  defaultUnit="mL"
  placeholder="1.0"
/>
```

State values paired with `UnitInput` are **always stored in base units** (e.g. liters for volume, moles for amount). The component handles prefix conversion.

### formatWithSIPrefix

Display results with appropriate SI prefixes:

```javascript
import { formatWithSIPrefix } from '../utils/mathUtils';

formatWithSIPrefix(0.0000045, 'M', 3);
// "4.500 μM"
```

---

## Micro sign convention

Always use the Unicode **micro sign** `μ` (U+00B5), not the Greek letter mu `μ` (U+03BC), in unit strings:

```javascript
// Correct
const units = ['L', 'mL', 'μL', 'nL'];

// Wrong — breaks UnitInput and mathUtils matching
const units = ['L', 'mL', 'μL', 'nL'];
```

---

## Minimal template

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
      const parsed = parseFloat(inputVal);
      if (isNaN(parsed) || parsed <= 0) {
        throw new Error('Input must be a positive number.');
      }

      const output = parsed * 2;
      setResult({ output: formatWithSIPrefix(output, 'g', 3) });
      onStatusUpdate('Status: Calculation successful!', 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Value (g):</label>
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
          <strong>Result: {result.output}</strong>
        </div>
      )}
    </div>
  );
}
```

For the full registration workflow, see [Developer Setup](Developer-Setup#5-adding-a-new-calculator).
