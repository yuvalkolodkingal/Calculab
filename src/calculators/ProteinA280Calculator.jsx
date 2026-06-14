import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function ProteinA280Calculator({ onClose, onStatusUpdate }) {
  const [a280, setA280] = useState('');
  const [pathLength, setPathLength] = useState('');
  const [extinctionCoeff, setExtinctionCoeff] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const lengthUnits = ['m', 'cm', 'mm', 'μm'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const A = parseFloat(a280 || '1.0');
      // Default path length: 1 cm = 0.01 m (in base unit meters)
      const l = parseFloat(pathLength || '0.01');
      const eps = extinctionCoeff ? parseFloat(extinctionCoeff) : null;

      if (isNaN(A) || A < 0) throw new Error('A280 must be non-negative.');
      if (isNaN(l) || l <= 0) throw new Error('Path length must be positive.');
      if (eps !== null && (isNaN(eps) || eps <= 0)) throw new Error('Extinction coefficient must be positive if provided.');

      // Convert path length from meters to cm for calculation
      const l_cm = l * 100;
      
      let concentration;
      let method;
      if (eps) {
        concentration = A / (eps * l_cm);
        method = `Using ε = ${eps.toFixed(0)} M⁻¹cm⁻¹`;
      } else {
        // Rule of thumb: 1 A280 ≈ 1 mg/mL for 1 cm path length
        concentration = A / l_cm;
        method = 'Using rule of thumb (1 A280 ≈ 1 mg/mL)';
      }

      // Convert mg/mL to g/L (they are the same numerically)
      const concentrationInGPerL = concentration / 1000;

      setResult({
        concentration: formatWithSIPrefix(concentrationInGPerL, 'g/L', 2),
        method
      });
      onStatusUpdate(`Status: Calculated concentration = ${formatWithSIPrefix(concentrationInGPerL, 'g/L', 2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>A280 Reading:</label>
        <input type="number" value={a280} onChange={(e) => setA280(e.target.value)} placeholder="1.0" step="any" />
      </div>
      <UnitInput
        label="Path length:"
        value={pathLength}
        onChange={setPathLength}
        baseUnit="m"
        availableUnits={lengthUnits}
        defaultUnit="cm"
        placeholder="1"
      />
      <div className="form-group">
        <label>Extinction coefficient (M⁻¹cm⁻¹) - optional:</label>
        <input type="number" value={extinctionCoeff} onChange={(e) => setExtinctionCoeff(e.target.value)} step="any" placeholder="Leave empty for rule of thumb" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Protein Concentration: {result.concentration}</strong>
          <br /><br />
          {result.method}
        </div>
      )}
    </div>
  );
}
