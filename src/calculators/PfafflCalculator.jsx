import { useState } from 'react';

export default function PfafflCalculator({ onClose, onStatusUpdate }) {
  const [effTarget, setEffTarget] = useState('');
  const [effRef, setEffRef] = useState('');
  const [deltaCtTarget, setDeltaCtTarget] = useState('');
  const [deltaCtRef, setDeltaCtRef] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const eTarget = parseFloat(effTarget || '2');
      const eRef = parseFloat(effRef || '2');
      const dCtTarget = parseFloat(deltaCtTarget || '2');
      const dCtRef = parseFloat(deltaCtRef || '0');

      if (isNaN(eTarget) || eTarget <= 0) throw new Error('Target efficiency must be positive.');
      if (isNaN(eRef) || eRef <= 0) throw new Error('Reference efficiency must be positive.');
      if (isNaN(dCtTarget)) throw new Error('ΔCt target must be a number.');
      if (isNaN(dCtRef)) throw new Error('ΔCt reference must be a number.');

      // Pfaffl method: Ratio = (E_target^ΔCt_target) / (E_ref^ΔCt_ref)
      // Where ΔCt = Ct_control - Ct_sample (i.e., positive if sample has lower Ct)
      const ratio = Math.pow(eTarget, dCtTarget) / Math.pow(eRef, dCtRef);

      setResult({
        ratio: ratio.toFixed(4),
        effTarget: eTarget.toFixed(2),
        effRef: eRef.toFixed(2),
        deltaCtTarget: dCtTarget.toFixed(2),
        deltaCtRef: dCtRef.toFixed(2)
      });
      onStatusUpdate(`Status: Pfaffl ratio = ${ratio.toFixed(4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Target gene efficiency (E):</label>
        <input type="number" value={effTarget} onChange={(e) => setEffTarget(e.target.value)} placeholder="2" step="any" />
      </div>
      <div className="form-group">
        <label>Reference gene efficiency (E):</label>
        <input type="number" value={effRef} onChange={(e) => setEffRef(e.target.value)} placeholder="2" step="any" />
      </div>
      <div className="form-group">
        <label>ΔCt Target (control - sample):</label>
        <input type="number" value={deltaCtTarget} onChange={(e) => setDeltaCtTarget(e.target.value)} placeholder="2" step="any" />
      </div>
      <div className="form-group">
        <label>ΔCt Reference (control - sample):</label>
        <input type="number" value={deltaCtRef} onChange={(e) => setDeltaCtRef(e.target.value)} placeholder="0" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Pfaffl Ratio: {result.ratio}</strong>
          <br /><br />
          Ratio = (E<sub>target</sub><sup>ΔCt_target</sup>) / (E<sub>ref</sub><sup>ΔCt_ref</sup>)
          <br />
          = ({result.effTarget}<sup>{result.deltaCtTarget}</sup>) / ({result.effRef}<sup>{result.deltaCtRef}</sup>)
        </div>
      )}
    </div>
  );
}
