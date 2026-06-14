import { useState } from 'react';

export default function MgLToPpmCalculator({ onClose, onStatusUpdate }) {
  const [mgL, setMgL] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const value = parseFloat(mgL || '100');
      if (isNaN(value) || value < 0) throw new Error('Concentration must be non-negative.');

      // For dilute aqueous solutions, 1 mg/L ≈ 1 ppm
      setResult({ mgL: value.toFixed(4), ppm: value.toFixed(4) });
      onStatusUpdate(`Status: ${value.toFixed(4)} mg/L ≈ ${value.toFixed(4)} ppm`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Concentration (mg/L):</label>
        <input type="number" value={mgL} onChange={(e) => setMgL(e.target.value)} placeholder="100" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>{result.mgL} mg/L ≈ {result.ppm} ppm</strong>
          <br /><br />
          <em>Note: For dilute aqueous solutions (density ≈ 1 g/mL), 1 mg/L = 1 ppm</em>
        </div>
      )}
    </div>
  );
}
