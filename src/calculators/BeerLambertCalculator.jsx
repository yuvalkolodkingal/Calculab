import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function BeerLambertCalculator({ onClose, onStatusUpdate }) {
  const [absorbance, setAbsorbance] = useState('');
  const [extinctionCoeff, setExtinctionCoeff] = useState('');
  const [pathLength, setPathLength] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const lengthUnits = ['m', 'cm', 'mm', 'μm'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const A = parseFloat(absorbance || '0.5');
      const eps = parseFloat(extinctionCoeff || '1000');
      // Default path length: 1 cm = 0.01 m (in base unit meters)
      const l = parseFloat(pathLength || '0.01');

      if (isNaN(A) || A < 0) throw new Error('Absorbance must be non-negative.');
      if (isNaN(eps) || eps <= 0) throw new Error('Molar extinction coefficient must be positive.');
      if (isNaN(l) || l <= 0) throw new Error('Path length must be positive.');

      // Convert path length from meters to cm for calculation (since ε is in M⁻¹cm⁻¹)
      const l_cm = l * 100;
      const c = A / (eps * l_cm);

      // Format concentration with appropriate SI prefix
      const formattedConc = formatWithSIPrefix(c, 'M', 4);

      setResult({
        concentration: formattedConc,
        absorbance: A.toFixed(3),
        eps: eps.toFixed(0),
        pathLength: l_cm.toFixed(1)
      });
      onStatusUpdate(`Status: Calculated concentration = ${formattedConc}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Absorbance (A):</label>
        <input type="number" value={absorbance} onChange={(e) => setAbsorbance(e.target.value)} placeholder="0.5" step="any" />
      </div>
      <div className="form-group">
        <label>Molar Extinction coefficient (ε, M⁻¹cm⁻¹):</label>
        <input type="number" value={extinctionCoeff} onChange={(e) => setExtinctionCoeff(e.target.value)} placeholder="1000" step="any" />
      </div>
      <UnitInput
        label="Path length (l):"
        value={pathLength}
        onChange={setPathLength}
        baseUnit="m"
        availableUnits={lengthUnits}
        defaultUnit="cm"
        placeholder="1"
      />
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Concentration: {result.concentration}</strong>
          <br /><br />
          A = {result.absorbance}, ε = {result.eps} M⁻¹cm⁻¹, l = {result.pathLength} cm
        </div>
      )}
    </div>
  );
}
