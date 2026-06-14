import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function SeedingVolumeCalculator({ onClose, onStatusUpdate }) {
  const [desiredCells, setDesiredCells] = useState('');
  const [cellConcentration, setCellConcentration] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const desired = parseFloat(desiredCells || '1000000');
      const concentration = parseFloat(cellConcentration || '500000');

      if (isNaN(desired) || desired <= 0) throw new Error('Desired cell number must be positive.');
      if (isNaN(concentration) || concentration <= 0) throw new Error('Cell concentration must be positive.');

      // Calculate volume in mL (cells / (cells/mL))
      const volumeMl = desired / concentration;
      const volumeL = volumeMl / 1000; // Convert to base unit (L)

      setResult({
        volume: formatWithSIPrefix(volumeL, 'L', 2),
        desired: formatWithSIPrefix(desired, 'cells', 2),
        concentration: formatWithSIPrefix(concentration, 'cells/mL', 2)
      });
      onStatusUpdate(`Status: Calculated seeding volume = ${formatWithSIPrefix(volumeL, 'L', 2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Desired cell number:</label>
        <input type="number" value={desiredCells} onChange={(e) => setDesiredCells(e.target.value)} placeholder="1000000" step="any" />
      </div>
      <div className="form-group">
        <label>Cell concentration (cells/mL):</label>
        <input type="number" value={cellConcentration} onChange={(e) => setCellConcentration(e.target.value)} placeholder="500000" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Volume to seed: {result.volume}</strong>
          <br /><br />
          {result.desired} at {result.concentration}
        </div>
      )}
    </div>
  );
}
