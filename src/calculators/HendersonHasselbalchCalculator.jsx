import { useState } from 'react';

export default function HendersonHasselbalchCalculator({ onClose, onStatusUpdate }) {
  const [pKa, setPKa] = useState('');
  const [concAcid, setConcAcid] = useState('');
  const [concBase, setConcBase] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const pKaVal = parseFloat(pKa || '7.2');
      const HA = parseFloat(concAcid || '0.1');
      const A = parseFloat(concBase || '0.1');

      if (isNaN(pKaVal)) throw new Error('pKa must be a number.');
      if (isNaN(HA) || HA <= 0) throw new Error('Acid concentration must be positive.');
      if (isNaN(A) || A <= 0) throw new Error('Base concentration must be positive.');

      const pH = pKaVal + Math.log10(A / HA);
      setResult({ pH: pH.toFixed(2), pKa: pKaVal.toFixed(2), ratio: (A / HA).toFixed(4) });
      onStatusUpdate(`Status: Calculated pH = ${pH.toFixed(2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>pKa:</label>
        <input type="number" value={pKa} onChange={(e) => setPKa(e.target.value)} placeholder="7.2" step="any" />
      </div>
      <div className="form-group">
        <label>[HA] Acid concentration (M):</label>
        <input type="number" value={concAcid} onChange={(e) => setConcAcid(e.target.value)} placeholder="0.1" step="any" />
      </div>
      <div className="form-group">
        <label>[A⁻] Base concentration (M):</label>
        <input type="number" value={concBase} onChange={(e) => setConcBase(e.target.value)} placeholder="0.1" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>pH: {result.pH}</strong>
          <br />
          pKa = {result.pKa}, [A⁻]/[HA] = {result.ratio}
        </div>
      )}
    </div>
  );
}
