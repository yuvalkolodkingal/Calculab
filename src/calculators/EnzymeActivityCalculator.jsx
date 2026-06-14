import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function EnzymeActivityCalculator({ onClose, onStatusUpdate }) {
  const [product, setProduct] = useState('');
  const [time, setTime] = useState('');
  const [volume, setVolume] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const amountUnits = ['mol', 'mmol', 'μmol', 'nmol'];
  const timeUnits = ['s', 'min', 'h'];
  const volumeUnits = ['L', 'mL', 'μL'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const p = parseFloat(product || '0.00001'); // 10 μmol = 0.00001 mol in base unit
      const t = parseFloat(time || '300'); // 5 min = 300 s in base unit
      const v = parseFloat(volume || '0.001'); // 1 mL = 0.001 L in base unit

      if (isNaN(p) || p < 0) throw new Error('Product formed must be non-negative.');
      if (isNaN(t) || t <= 0) throw new Error('Time must be positive.');
      if (isNaN(v) || v <= 0) throw new Error('Volume must be positive.');

      // Convert to standard units: mol/s/L
      const activity_mol_s_L = p / (t * v);
      
      // Convert to U/mL (1 U = 1 μmol/min)
      // Conversion steps:
      // - mol to μmol: multiply by 1e6
      // - seconds to minutes: multiply by 60
      // - L to mL: multiply by 0.001
      const activity_U_mL = activity_mol_s_L * 1e6 * 60 * 0.001;

      setResult({
        activity: formatWithSIPrefix(activity_U_mL, 'U/mL', 4),
        product: formatWithSIPrefix(p, 'mol', 2),
        time: formatWithSIPrefix(t, 's', 1),
        volume: formatWithSIPrefix(v, 'L', 2)
      });
      onStatusUpdate(`Status: Calculated enzyme activity = ${formatWithSIPrefix(activity_U_mL, 'U/mL', 4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <UnitInput
        label="Product formed:"
        value={product}
        onChange={setProduct}
        baseUnit="mol"
        availableUnits={amountUnits}
        defaultUnit="μmol"
        placeholder="10"
      />
      <UnitInput
        label="Time:"
        value={time}
        onChange={setTime}
        baseUnit="s"
        availableUnits={timeUnits}
        defaultUnit="min"
        placeholder="5"
      />
      <UnitInput
        label="Volume:"
        value={volume}
        onChange={setVolume}
        baseUnit="L"
        availableUnits={volumeUnits}
        defaultUnit="mL"
        placeholder="1"
      />
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Enzyme Activity: {result.activity}</strong>
          <br /><br />
          {result.product} product in {result.time}, {result.volume}
          <br />
          <em>1 Unit = 1 µmol substrate/min</em>
        </div>
      )}
    </div>
  );
}
