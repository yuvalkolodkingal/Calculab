import { useState } from 'react';

export default function DeltaDeltaCtCalculator({ onClose, onStatusUpdate }) {
  const [deltaCtTest, setDeltaCtTest] = useState('');
  const [deltaCtControl, setDeltaCtControl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const test = parseFloat(deltaCtTest || '5');
      const control = parseFloat(deltaCtControl || '0');

      if (isNaN(test)) throw new Error('ΔCt test must be a number.');
      if (isNaN(control)) throw new Error('ΔCt control must be a number.');

      const deltaDeltaCt = test - control;

      setResult({
        deltaDeltaCt: deltaDeltaCt.toFixed(4),
        deltaCtTest: test.toFixed(2),
        deltaCtControl: control.toFixed(2)
      });
      onStatusUpdate(`Status: ΔΔCt = ${deltaDeltaCt.toFixed(4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>ΔCt Test (treated/sample):</label>
        <input type="number" value={deltaCtTest} onChange={(e) => setDeltaCtTest(e.target.value)} placeholder="5" step="any" />
      </div>
      <div className="form-group">
        <label>ΔCt Control (untreated/calibrator):</label>
        <input type="number" value={deltaCtControl} onChange={(e) => setDeltaCtControl(e.target.value)} placeholder="0" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>ΔΔCt = {result.deltaDeltaCt}</strong>
          <br /><br />
          ΔCt<sub>test</sub> ({result.deltaCtTest}) - ΔCt<sub>control</sub> ({result.deltaCtControl})
        </div>
      )}
    </div>
  );
}
