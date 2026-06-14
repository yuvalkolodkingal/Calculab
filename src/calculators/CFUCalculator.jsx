import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function CFUCalculator({ onClose, onStatusUpdate }) {
  const [colonies, setColonies] = useState('');
  const [dilution, setDilution] = useState('');
  const [volumePlated, setVolumePlated] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const count = parseFloat(colonies || '150');
      const dilutionFactor = parseFloat(dilution || '1000000');
      const volume = parseFloat(volumePlated || '0.1');

      if (isNaN(count) || count < 0) throw new Error('Colony count must be non-negative.');
      if (isNaN(dilutionFactor) || dilutionFactor <= 0) throw new Error('Dilution factor must be positive.');
      if (isNaN(volume) || volume <= 0) throw new Error('Volume plated must be positive.');

      const cfuPerMl = (count * dilutionFactor) / volume;

      setResult({
        cfuPerMl: formatWithSIPrefix(cfuPerMl, 'CFU/mL', 2),
        colonies: count.toFixed(0),
        dilution: dilutionFactor.toExponential(0),
        volume: volume.toFixed(2)
      });
      onStatusUpdate(`Status: Calculated ${formatWithSIPrefix(cfuPerMl, 'CFU/mL', 2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Colony count:</label>
        <input type="number" value={colonies} onChange={(e) => setColonies(e.target.value)} placeholder="150" step="any" />
      </div>
      <div className="form-group">
        <label>Dilution factor:</label>
        <input type="number" value={dilution} onChange={(e) => setDilution(e.target.value)} placeholder="1000000" step="any" />
      </div>
      <div className="form-group">
        <label>Volume plated (mL):</label>
        <input type="number" value={volumePlated} onChange={(e) => setVolumePlated(e.target.value)} placeholder="0.1" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>{result.cfuPerMl}</strong>
          <br /><br />
          {result.colonies} colonies × {result.dilution} dilution / {result.volume} mL
        </div>
      )}
    </div>
  );
}
