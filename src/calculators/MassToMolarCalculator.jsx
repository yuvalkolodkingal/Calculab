import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function MassToMolarCalculator({ onClose, onStatusUpdate }) {
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [molecularWeight, setMolecularWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const massUnits = ['kg', 'g', 'mg', 'μg'];
  const volumeUnits = ['L', 'mL', 'μL', 'nL'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const m = parseFloat(mass || '5.844');
      const V = parseFloat(volume || '1');
      const MW = parseFloat(molecularWeight || '58.44');

      if (isNaN(m) || m <= 0) throw new Error('Mass must be positive.');
      if (isNaN(V) || V <= 0) throw new Error('Volume must be positive.');
      if (isNaN(MW) || MW <= 0) throw new Error('Molecular weight must be positive.');

      // Convert mass from kg to g (base unit kg, MW in g/mol)
      const massInGrams = m * 1000;
      const moles = massInGrams / MW;
      const molarity = moles / V;

      // Format results with appropriate SI units
      const formattedMolarity = formatWithSIPrefix(molarity, 'M', 4);
      const formattedMoles = formatWithSIPrefix(moles, 'mol', 4);

      setResult({
        molarity: formattedMolarity,
        moles: formattedMoles
      });
      onStatusUpdate(`Status: Calculated molarity = ${formattedMolarity}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <UnitInput
        label="Mass:"
        value={mass}
        onChange={setMass}
        baseUnit="kg"
        availableUnits={massUnits}
        defaultUnit="g"
        placeholder="5.844"
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
          <strong>Molarity: {result.molarity}</strong>
          <br />
          Moles: {result.moles}
        </div>
      )}
    </div>
  );
}
