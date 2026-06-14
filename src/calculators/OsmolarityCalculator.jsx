import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function OsmolarityCalculator({ onClose, onStatusUpdate }) {
  const [molarity, setMolarity] = useState('');
  const [vantHoff, setVantHoff] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const concentrationUnits = ['M', 'mM', 'μM', 'nM'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const M = parseFloat(molarity || '0.15');
      const i = parseFloat(vantHoff || '2');

      if (isNaN(M) || M <= 0) throw new Error('Molarity must be positive.');
      if (isNaN(i) || i < 1) throw new Error("Van't Hoff factor must be at least 1.");

      const osm = M * i;
      setResult({ 
        osmolarity: formatWithSIPrefix(osm, 'Osm/L', 4), 
        molarity: M.toFixed(4), 
        vantHoff: i.toFixed(0) 
      });
      onStatusUpdate(`Status: Calculated osmolarity = ${formatWithSIPrefix(osm, 'Osm/L', 4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <UnitInput
        label="Molarity:"
        value={molarity}
        onChange={setMolarity}
        baseUnit="M"
        availableUnits={concentrationUnits}
        defaultUnit="M"
        placeholder="0.15"
      />
      <div className="form-group">
        <label>Van&apos;t Hoff factor (i):</label>
        <input type="number" value={vantHoff} onChange={(e) => setVantHoff(e.target.value)} placeholder="2" step="1" min="1" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Osmolarity: {result.osmolarity}</strong>
          <br />
          {result.molarity} M × i = {result.vantHoff}
        </div>
      )}
    </div>
  );
}
