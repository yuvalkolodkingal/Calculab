import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function MolalityCalculator({ onClose, onStatusUpdate }) {
  const [moles, setMoles] = useState('');
  const [massSolvent, setMassSolvent] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const moleUnits = ['mol', 'mmol', 'μmol', 'nmol'];
  const massUnits = ['kg', 'g', 'mg', 'μg'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const nMol = parseFloat(moles || '0.5');
      const massSolventKg = parseFloat(massSolvent || '1.0');

      if (isNaN(nMol) || nMol <= 0) throw new Error('Moles of solute must be positive.');
      if (isNaN(massSolventKg) || massSolventKg <= 0) throw new Error('Mass of solvent must be positive.');

      // Molality = moles / kg_solvent
      // Convert mass from base (kg) to kg if needed
      const m = nMol / massSolventKg;
      setResult({ 
        molality: formatWithSIPrefix(m, 'm', 4), 
        moles: nMol.toFixed(4), 
        mass: massSolventKg.toFixed(4) 
      });
      onStatusUpdate(`Status: Calculated molality = ${formatWithSIPrefix(m, 'm', 4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <UnitInput
        label="Moles of solute:"
        value={moles}
        onChange={setMoles}
        baseUnit="mol"
        availableUnits={moleUnits}
        defaultUnit="mol"
        placeholder="0.5"
      />
      <UnitInput
        label="Mass of solvent:"
        value={massSolvent}
        onChange={setMassSolvent}
        baseUnit="kg"
        availableUnits={massUnits}
        defaultUnit="kg"
        placeholder="1.0"
      />
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Molality: {result.molality}</strong>
          <br />
          {result.moles} mol solute in {result.mass} kg solvent
        </div>
      )}
    </div>
  );
}
