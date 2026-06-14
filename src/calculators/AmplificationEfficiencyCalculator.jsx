import { useState } from 'react';

export default function AmplificationEfficiencyCalculator({ onClose, onStatusUpdate }) {
  const [ct1, setCt1] = useState('');
  const [ct2, setCt2] = useState('');
  const [dilutionFactor, setDilutionFactor] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const c1 = parseFloat(ct1 || '20');
      const c2 = parseFloat(ct2 || '23.32');
      const df = parseFloat(dilutionFactor || '10');

      if (isNaN(c1) || c1 < 0) throw new Error('Ct1 must be non-negative.');
      if (isNaN(c2) || c2 < 0) throw new Error('Ct2 must be non-negative.');
      if (isNaN(df) || df <= 1) throw new Error('Dilution factor must be greater than 1.');

      const deltaCt = c2 - c1;
      if (deltaCt === 0) throw new Error('ΔCt cannot be zero.');

      // E = 10^(log10(dilution)/ΔCt) - 1
      const efficiency = (Math.pow(10, Math.log10(df) / deltaCt) - 1) * 100;

      let quality = '';
      if (efficiency >= 90 && efficiency <= 110) quality = 'Optimal';
      else if (efficiency >= 80 && efficiency < 90) quality = 'Acceptable';
      else if (efficiency > 110 && efficiency <= 120) quality = 'Slightly high';
      else quality = 'Requires optimization';

      setResult({
        efficiency: efficiency.toFixed(2),
        deltaCt: deltaCt.toFixed(2),
        quality
      });
      onStatusUpdate(`Status: Efficiency = ${efficiency.toFixed(2)}%`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Ct at dilution 1 (more concentrated):</label>
        <input type="number" value={ct1} onChange={(e) => setCt1(e.target.value)} placeholder="20" step="any" />
      </div>
      <div className="form-group">
        <label>Ct at dilution 2 (more dilute):</label>
        <input type="number" value={ct2} onChange={(e) => setCt2(e.target.value)} placeholder="23.32" step="any" />
      </div>
      <div className="form-group">
        <label>Dilution factor between samples:</label>
        <input type="number" value={dilutionFactor} onChange={(e) => setDilutionFactor(e.target.value)} placeholder="10" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Amplification Efficiency: {result.efficiency}%</strong>
          <br /><br />
          ΔCt: {result.deltaCt}
          <br />
          Quality: {result.quality}
          <br /><br />
          <em>E = 10^(log₁₀(dilution)/ΔCt) - 1</em>
        </div>
      )}
    </div>
  );
}
