import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function SerialDilutionCalculator({ onClose, onStatusUpdate }) {
  const [dilutionFactor, setDilutionFactor] = useState('');
  const [steps, setSteps] = useState('');
  const [finalVolume, setFinalVolume] = useState(''); // 1 mL in base unit (L)
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const volumeUnits = ['L', 'mL', 'μL', 'nL'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const factor = parseFloat(dilutionFactor || '10');
      const numSteps = parseInt(steps || '5');
      const Vfinal = parseFloat(finalVolume || '0.001');

      if (isNaN(factor) || factor <= 1) throw new Error('Dilution factor must be greater than 1.');
      if (isNaN(numSteps) || numSteps <= 0 || !Number.isInteger(numSteps)) throw new Error('Number of steps must be a positive integer.');
      if (isNaN(Vfinal) || Vfinal <= 0) throw new Error('Final volume per step must be positive.');

      const sampleVol = Vfinal / factor;
      const diluentVol = Vfinal - sampleVol;
      const dilutions = [];

      for (let i = 1; i <= numSteps; i++) {
        const totalDilution = Math.pow(factor, i);
        dilutions.push({ step: i, totalDilution: totalDilution.toExponential(0) });
      }

      // Format volumes with appropriate SI units
      const formattedSampleVol = formatWithSIPrefix(sampleVol, 'L', 2);
      const formattedDiluentVol = formatWithSIPrefix(diluentVol, 'L', 2);
      const formattedFinalVol = formatWithSIPrefix(Vfinal, 'L', 2);

      setResult({
        sampleVol: formattedSampleVol,
        diluentVol: formattedDiluentVol,
        finalVol: formattedFinalVol,
        factor: factor,
        dilutions
      });
      onStatusUpdate(`Status: Calculated ${numSteps}-step serial dilution`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Dilution factor (e.g., 10 for 1:10):</label>
        <input type="number" value={dilutionFactor} onChange={(e) => setDilutionFactor(e.target.value)} placeholder="10" step="any" />
      </div>
      <div className="form-group">
        <label>Number of steps:</label>
        <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="5" min="1" max="10" />
      </div>
      <UnitInput
        label="Final volume per step:"
        value={finalVolume}
        onChange={setFinalVolume}
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
          <h4>Serial Dilution Protocol (1:{result.factor} factor):</h4>
          <p>Each step requires <strong>{result.sampleVol}</strong> of sample and <strong>{result.diluentVol}</strong> of diluent to reach a final volume of {result.finalVol}.</p>
          <ul>
            {result.dilutions.map((d) => (
              <li key={d.step}>
                Step {d.step}: Transfer {result.sampleVol} from previous dilution (or stock for step 1) into {result.diluentVol} diluent. Final dilution: 1:{d.totalDilution}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
