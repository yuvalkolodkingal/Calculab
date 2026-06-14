import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function MolarToMassCalculator({ onClose, onStatusUpdate }) {
  const [molarity, setMolarity] = useState('');
  const [volume, setVolume] = useState('');
  const [molecularWeight, setMolecularWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const concentrationUnits = ['M', 'mM', 'μM', 'nM'];
  const volumeUnits = ['L', 'mL', 'μL', 'nL'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const M = parseFloat(molarity || '0.1');
      const V = parseFloat(volume || '1');
      const MW = parseFloat(molecularWeight || '58.44');

      if (isNaN(M) || M <= 0) throw new Error('Molarity must be positive.');
      if (isNaN(V) || V <= 0) throw new Error('Volume must be positive.');
      if (isNaN(MW) || MW <= 0) throw new Error('Molecular weight must be positive.');

      const moles = M * V;
      const mass = moles * MW;

      // Format results with appropriate SI units
      const formattedMass = formatWithSIPrefix(mass, 'g', 4);
      const formattedMoles = formatWithSIPrefix(moles, 'mol', 4);

      setResult({
        mass: formattedMass,
        moles: formattedMoles
      });
      onStatusUpdate(`Status: Calculated mass = ${formattedMass}`, 'green');
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
        placeholder="0.1"
      />
      <UnitInput
        label="Volume:"
        value={volume}
        onChange={setVolume}
        baseUnit="L"
        availableUnits={volumeUnits}
        defaultUnit="L"
        placeholder="1"
      />
      <div className="form-group">
        <label>Molecular Weight (g/mol):</label>
        <input type="number" value={molecularWeight} onChange={(e) => setMolecularWeight(e.target.value)} placeholder="58.44" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Mass needed: {result.mass}</strong>
          <br />
          Moles: {result.moles}
        </div>
      )}
    </div>
  );
}
