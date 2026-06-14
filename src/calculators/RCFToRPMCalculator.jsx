import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function RCFToRPMCalculator({ onClose, onStatusUpdate }) {
  const [rcf, setRcf] = useState('');
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const g = parseFloat(rcf || '1000');
      const rad = parseFloat(radius || '10');

      if (isNaN(g) || g <= 0) throw new Error('RCF must be positive.');
      if (isNaN(rad) || rad <= 0) throw new Error('Radius must be positive.');

      // RPM = sqrt(RCF / (1.118 × 10^-5 × r))
      const rpm = Math.sqrt(g / (1.118e-5 * rad));

      setResult({
        rpm: rpm.toFixed(0),
        rcf: formatWithSIPrefix(g, '× g', 1),
        radius: rad.toFixed(1)
      });
      onStatusUpdate(`Status: RPM = ${rpm.toFixed(0)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>RCF:</label>
        <input type="number" value={rcf} onChange={(e) => setRcf(e.target.value)} placeholder="1000" step="any" />
      </div>
      <div className="form-group">
        <label>Rotor radius (cm):</label>
        <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="10" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>RPM: {result.rpm}</strong>
          <br /><br />
          For {result.rcf} with radius {result.radius} cm
          <br /><br />
          <em>RPM = √(RCF / (1.118 × 10⁻⁵ × r))</em>
        </div>
      )}
    </div>
  );
}
