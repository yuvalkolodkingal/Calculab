import { useState } from 'react';

export default function DeltaCtCalculator({ onClose, onStatusUpdate }) {
  const [ctTarget, setCtTarget] = useState('');
  const [ctReference, setCtReference] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const target = parseFloat(ctTarget || '25');
      const reference = parseFloat(ctReference || '20');

      if (isNaN(target) || target < 0) throw new Error('Ct target must be non-negative.');
      if (isNaN(reference) || reference < 0) throw new Error('Ct reference must be non-negative.');

      const deltaCt = target - reference;

      setResult({
        deltaCt: deltaCt.toFixed(4),
        ctTarget: target.toFixed(2),
        ctReference: reference.toFixed(2)
      });
      onStatusUpdate(`Status: ΔCt = ${deltaCt.toFixed(4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Ct Target:</label>
        <input type="number" value={ctTarget} onChange={(e) => setCtTarget(e.target.value)} placeholder="25" step="any" />
      </div>
      <div className="form-group">
        <label>Ct Reference (housekeeping gene):</label>
        <input type="number" value={ctReference} onChange={(e) => setCtReference(e.target.value)} placeholder="20" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>ΔCt = {result.deltaCt}</strong>
          <br /><br />
          Ct<sub>target</sub> ({result.ctTarget}) - Ct<sub>reference</sub> ({result.ctReference})
        </div>
      )}
    </div>
  );
}
