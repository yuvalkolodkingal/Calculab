import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function BradfordCalculator({ onClose, onStatusUpdate }) {
  const [a595, setA595] = useState('');
  const [slope, setSlope] = useState('');
  const [intercept, setIntercept] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const A = parseFloat(a595 || '0.5');
      const m = parseFloat(slope || '0.05');
      const b = parseFloat(intercept || '0.02');

      if (isNaN(A) || A < 0) throw new Error('A595 must be non-negative.');
      if (isNaN(m) || m === 0) throw new Error('Slope cannot be zero.');
      if (isNaN(b)) throw new Error('Intercept must be a number.');

      const concentration = (A - b) / m;
      if (concentration < 0) throw new Error('Calculated concentration is negative. Check your standard curve parameters.');

      // Convert µg/mL to g/L (they are the same numerically but need to convert for base unit)
      const concentrationInGPerL = concentration / 1000;

      setResult({
        concentration: formatWithSIPrefix(concentrationInGPerL, 'g/L', 2),
        a595: A.toFixed(3)
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
        <label>A595 Reading:</label>
        <input type="number" value={a595} onChange={(e) => setA595(e.target.value)} placeholder="0.5" step="any" />
      </div>
      <div className="form-group">
        <label>Standard Curve Slope:</label>
        <input type="number" value={slope} onChange={(e) => setSlope(e.target.value)} placeholder="0.05" step="any" />
      </div>
      <div className="form-group">
        <label>Standard Curve Intercept:</label>
        <input type="number" value={intercept} onChange={(e) => setIntercept(e.target.value)} placeholder="0.02" step="any" />
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
          From A595 = {result.a595}
          <br />
          Using: Concentration = (A595 - Intercept) / Slope
        </div>
      )}
    </div>
  );
}
