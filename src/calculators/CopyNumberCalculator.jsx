import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function CopyNumberCalculator({ onClose, onStatusUpdate }) {
  const [ct, setCt] = useState('');
  const [slope, setSlope] = useState('');
  const [intercept, setIntercept] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const ctVal = parseFloat(ct || '25');
      const s = parseFloat(slope || '-3.32');
      const b = parseFloat(intercept || '40');

      if (isNaN(ctVal) || ctVal < 0) throw new Error('Ct must be non-negative.');
      if (isNaN(s) || s === 0) throw new Error('Slope cannot be zero.');
      if (isNaN(b)) throw new Error('Intercept must be a number.');

      // log10(copies) = (Ct - intercept) / slope
      const log10Copies = (ctVal - b) / s;
      const copies = Math.pow(10, log10Copies);

      setResult({
        copies: formatWithSIPrefix(copies, 'copies', 2),
        log10Copies: log10Copies.toFixed(4),
        ct: ctVal.toFixed(2)
      });
      onStatusUpdate(`Status: Copy number = ${formatWithSIPrefix(copies, 'copies', 2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Ct value:</label>
        <input type="number" value={ct} onChange={(e) => setCt(e.target.value)} placeholder="25" step="any" />
      </div>
      <div className="form-group">
        <label>Standard curve slope:</label>
        <input type="number" value={slope} onChange={(e) => setSlope(e.target.value)} placeholder="-3.32" step="any" />
      </div>
      <div className="form-group">
        <label>Standard curve intercept:</label>
        <input type="number" value={intercept} onChange={(e) => setIntercept(e.target.value)} placeholder="40" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Copy Number: {result.copies}</strong>
          <br /><br />
          Log₁₀(copies): {result.log10Copies}
          <br />
          Ct: {result.ct}
          <br /><br />
          <em>log₁₀(copies) = (Ct - intercept) / slope</em>
        </div>
      )}
    </div>
  );
}
