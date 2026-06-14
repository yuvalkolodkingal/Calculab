import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function NAQuantCalculator({ onClose, onStatusUpdate }) {
  const [a260, setA260] = useState('');
  const [factor, setFactor] = useState('50');
  const [dilution, setDilution] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const A = parseFloat(a260 || '0.5');
      const f = parseFloat(factor || '50');
      const d = parseFloat(dilution || '1');

      if (isNaN(A) || A < 0) throw new Error('A260 must be non-negative.');
      if (isNaN(f) || f <= 0) throw new Error('Factor must be positive.');
      if (isNaN(d) || d <= 0) throw new Error('Dilution factor must be positive.');

      // Concentration in μg/mL (standard output) converted to base unit g/L
      const concentration = A * f * d;
      const concentrationInGPerL = concentration / 1000; // Convert μg/mL to g/L
      const naType = f === 50 ? 'dsDNA' : f === 40 ? 'RNA' : f === 33 ? 'ssDNA' : 'Custom';

      setResult({
        concentration: formatWithSIPrefix(concentrationInGPerL, 'g/L', 2),
        naType,
        a260: A.toFixed(3)
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
        <label>A260 Reading:</label>
        <input type="number" value={a260} onChange={(e) => setA260(e.target.value)} placeholder="0.5" step="any" />
      </div>
      <div className="form-group">
        <label>Conversion Factor:</label>
        <select value={factor} onChange={(e) => setFactor(e.target.value)}>
          <option value="50">dsDNA (50)</option>
          <option value="40">RNA (40)</option>
          <option value="33">ssDNA (33)</option>
        </select>
      </div>
      <div className="form-group">
        <label>Dilution Factor:</label>
        <input type="number" value={dilution} onChange={(e) => setDilution(e.target.value)} placeholder="1" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Concentration: {result.concentration}</strong>
          <br /><br />
          {result.naType} at A260 = {result.a260}
        </div>
      )}
    </div>
  );
}
