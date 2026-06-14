import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function PercentSolutionCalculator({ onClose, onStatusUpdate }) {
  const [percentage, setPercentage] = useState('');
  const [finalVolume, setFinalVolume] = useState(''); // Base unit (L)
  const [solutionType, setSolutionType] = useState('w/v');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const volumeUnits = ['L', 'mL', 'μL', 'nL'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      // Use placeholder values if input is empty
      const pct = parseFloat(percentage || '10');
      const V = parseFloat(finalVolume || '0.1'); // 100 mL in liters

      if (isNaN(pct) || pct <= 0 || pct >= 100) throw new Error('Percentage must be between 0 and 100 (exclusive).');
      if (isNaN(V) || V <= 0) throw new Error('Final volume must be a positive number.');

      if (solutionType === 'w/v') {
        // w/v: grams per 100 mL
        const gSolute = (pct / 100) * (V * 1000); // Convert L to mL for w/v calculation
        setResult({
          type: 'w/v',
          solute: formatWithSIPrefix(gSolute / 1000, 'kg', 4), // Convert g to kg for base unit
          finalVolume: formatWithSIPrefix(V, 'L', 2),
          percentage: pct.toFixed(1)
        });
        onStatusUpdate(`Status: Calculated ${pct.toFixed(1)}% w/v solution`, 'green');
      } else {
        const mlSolute = (pct / 100) * (V * 1000); // Convert L to mL
        const mlSolvent = (V * 1000) - mlSolute;
        setResult({
          type: 'v/v',
          solute: formatWithSIPrefix(mlSolute / 1000, 'L', 4), // Convert mL to L
          solvent: formatWithSIPrefix(mlSolvent / 1000, 'L', 4), // Convert mL to L
          finalVolume: formatWithSIPrefix(V, 'L', 2),
          percentage: pct.toFixed(1)
        });
        onStatusUpdate(`Status: Calculated ${pct.toFixed(1)}% v/v solution`, 'green');
      }
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Percentage (%):</label>
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="10"
          step="any"
        />
      </div>
      <UnitInput
        label="Final Volume:"
        value={finalVolume}
        onChange={setFinalVolume}
        baseUnit="L"
        availableUnits={volumeUnits}
        defaultUnit="mL"
        placeholder="100"
      />
      <div className="form-group">
        <label>Type:</label>
        <select value={solutionType} onChange={(e) => setSolutionType(e.target.value)}>
          <option value="w/v">w/v (weight/volume)</option>
          <option value="v/v">v/v (volume/volume)</option>
        </select>
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          {result.type === 'w/v' ? (
            <>
              <strong>Solute needed: {result.solute}</strong>
              <br />
              To make a total volume of {result.finalVolume}
              <br />
              For {result.percentage}% {result.type} solution
            </>
          ) : (
            <>
              <strong>Solute needed: {result.solute}</strong>
              <br />
              <strong>Solvent needed: {result.solvent}</strong>
              <br />
              For {result.percentage}% {result.type} solution in {result.finalVolume}
            </>
          )}
        </div>
      )}
    </div>
  );
}
