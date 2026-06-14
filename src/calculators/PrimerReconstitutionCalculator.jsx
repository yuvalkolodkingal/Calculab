import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function PrimerReconstitutionCalculator({ onClose, onStatusUpdate }) {
  const [nmoles, setNmoles] = useState(''); // 25 nmol in base mol
  const [finalConc, setFinalConc] = useState(''); // 100 µM in base M
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const moleUnits = ['mol', 'mmol', 'μmol', 'nmol'];
  const concentrationUnits = ['M', 'mM', 'μM', 'nM'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const n = parseFloat(nmoles || '0.000000025'); // in moles
      const conc = parseFloat(finalConc || '0.0001'); // in M

      if (isNaN(n) || n <= 0) throw new Error('Primer amount must be positive.');
      if (isNaN(conc) || conc <= 0) throw new Error('Final concentration must be positive.');

      // V = n / C  (volume in liters)
      const volume = n / conc;

      setResult({
        volume: formatWithSIPrefix(volume, 'L', 2),
        nmoles: formatWithSIPrefix(n, 'mol', 1),
        finalConc: formatWithSIPrefix(conc, 'M', 0)
      });
      onStatusUpdate(`Status: Add ${formatWithSIPrefix(volume, 'L', 2)} for ${formatWithSIPrefix(conc, 'M', 0)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <UnitInput
        label="Primer amount:"
        value={nmoles}
        onChange={setNmoles}
        baseUnit="mol"
        availableUnits={moleUnits}
        defaultUnit="nmol"
        placeholder="25"
      />
      <UnitInput
        label="Desired final concentration:"
        value={finalConc}
        onChange={setFinalConc}
        baseUnit="M"
        availableUnits={concentrationUnits}
        defaultUnit="μM"
        placeholder="100"
      />
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Add {result.volume} of TE buffer or nuclease-free water</strong>
          <br /><br />
          {result.nmoles} primer → {result.finalConc} stock
        </div>
      )}
    </div>
  );
}
