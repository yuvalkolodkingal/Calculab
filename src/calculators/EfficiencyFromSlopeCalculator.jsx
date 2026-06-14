import { useState } from 'react';

export default function EfficiencyFromSlopeCalculator({ onClose, onStatusUpdate }) {
  const [slope, setSlope] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const s = parseFloat(slope || '-3.32');

      if (isNaN(s)) throw new Error('Slope must be a number.');
      if (s === 0) throw new Error('Slope cannot be zero.');
      if (s > 0) throw new Error('Slope should be negative for qPCR standard curves.');

      // E = 10^(-1/slope) - 1
      const efficiency = (Math.pow(10, -1 / s) - 1) * 100;

      let quality = '';
      if (efficiency >= 90 && efficiency <= 110) quality = 'Optimal (90-110%)';
      else if (efficiency >= 80 && efficiency < 90) quality = 'Acceptable (may need optimization)';
      else if (efficiency > 110 && efficiency <= 120) quality = 'Acceptable (may indicate inhibition or pipetting errors)';
      else quality = 'Poor - requires optimization';

      setResult({
        efficiency: efficiency.toFixed(2),
        slope: s.toFixed(4),
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
        <label>Standard curve slope:</label>
        <input type="number" value={slope} onChange={(e) => setSlope(e.target.value)} placeholder="-3.32" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>PCR Efficiency: {result.efficiency}%</strong>
          <br /><br />
          Slope: {result.slope}
          <br />
          Quality: {result.quality}
          <br /><br />
          <em>E = 10^(-1/slope) - 1</em>
          <br />
          <em>Perfect efficiency (100%) = slope of -3.32</em>
        </div>
      )}
    </div>
  );
}
