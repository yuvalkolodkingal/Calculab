import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function RPMToRCFCalculator({ onClose, onStatusUpdate }) {
  const [rpm, setRpm] = useState('');
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const r = parseFloat(rpm || '3000');
      const rad = parseFloat(radius || '10');

      if (isNaN(r) || r <= 0) throw new Error('RPM must be positive.');
      if (isNaN(rad) || rad <= 0) throw new Error('Radius must be positive.');

      // RCF = 1.118 × 10^-5 × r × RPM²
      const rcf = 1.118e-5 * rad * Math.pow(r, 2);

      setResult({
        rcf: formatWithSIPrefix(rcf, '× g', 1),
        rpm: r.toFixed(0),
        radius: rad.toFixed(1)
      });
      onStatusUpdate(`Status: RCF = ${formatWithSIPrefix(rcf, '× g', 1)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>RPM:</label>
        <input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} placeholder="3000" step="any" />
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
          <strong>RCF: {result.rcf}</strong>
          <br /><br />
          At {result.rpm} RPM with radius {result.radius} cm
          <br /><br />
          <em>RCF = 1.118 × 10⁻⁵ × r × RPM²</em>
        </div>
      )}
    </div>
  );
}
