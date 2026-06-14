import { useState } from 'react';
import UnitInput from '../components/UnitInput';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function C1V1Calculator({ onClose, onStatusUpdate }) {
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [solveFor, setSolveFor] = useState('V1'); // V1, C1, C2, or V2
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const concentrationUnits = ['M', 'mM', 'μM', 'nM'];
  const volumeUnits = ['L', 'mL', 'μL', 'nL'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      // Use placeholder values if input is empty
      const C1 = parseFloat(c1 || '10');
      const C2 = parseFloat(c2 || '1');
      const V1 = parseFloat(v1 || '10');
      const V2 = parseFloat(v2 || '100');

      // Validate inputs based on what we're solving for
      if (solveFor === 'V1') {
        if (isNaN(C1) || C1 <= 0) throw new Error('Initial concentration (C1) must be positive.');
        if (isNaN(C2) || C2 <= 0) throw new Error('Final concentration (C2) must be positive.');
        if (isNaN(V2) || V2 <= 0) throw new Error('Final volume (V2) must be positive.');
        if (C2 > C1) throw new Error('Final concentration (C2) cannot be greater than initial concentration (C1).');

        const calculatedV1 = (C2 * V2) / C1;
        const solvent = V2 - calculatedV1;
        const dilutionRatio = `1:${(C1 / C2).toFixed(1)}`;

        setResult({
          variable: 'V1',
          value: formatWithSIPrefix(calculatedV1, 'L', 4),
          v1: formatWithSIPrefix(calculatedV1, 'L', 4),
          solvent: formatWithSIPrefix(solvent, 'L', 4),
          dilutionRatio
        });
        onStatusUpdate(`Status: Calculated V1 = ${formatWithSIPrefix(calculatedV1, 'L', 4)}`, 'green');
      } else if (solveFor === 'C1') {
        if (isNaN(C2) || C2 <= 0) throw new Error('Final concentration (C2) must be positive.');
        if (isNaN(V1) || V1 <= 0) throw new Error('Initial volume (V1) must be positive.');
        if (isNaN(V2) || V2 <= 0) throw new Error('Final volume (V2) must be positive.');
        if (V1 > V2) throw new Error('Initial volume (V1) cannot be greater than final volume (V2).');

        const calculatedC1 = (C2 * V2) / V1;
        const dilutionRatio = `1:${(calculatedC1 / C2).toFixed(1)}`;

        setResult({
          variable: 'C1',
          value: formatWithSIPrefix(calculatedC1, 'M', 4),
          c1: formatWithSIPrefix(calculatedC1, 'M', 4),
          dilutionRatio
        });
        onStatusUpdate(`Status: Calculated C1 = ${formatWithSIPrefix(calculatedC1, 'M', 4)}`, 'green');
      } else if (solveFor === 'C2') {
        if (isNaN(C1) || C1 <= 0) throw new Error('Initial concentration (C1) must be positive.');
        if (isNaN(V1) || V1 <= 0) throw new Error('Initial volume (V1) must be positive.');
        if (isNaN(V2) || V2 <= 0) throw new Error('Final volume (V2) must be positive.');
        if (V1 > V2) throw new Error('Initial volume (V1) cannot be greater than final volume (V2).');

        const calculatedC2 = (C1 * V1) / V2;
        if (calculatedC2 > C1) throw new Error('Calculated final concentration would be greater than initial concentration.');
        const dilutionRatio = `1:${(C1 / calculatedC2).toFixed(1)}`;

        setResult({
          variable: 'C2',
          value: formatWithSIPrefix(calculatedC2, 'M', 4),
          c2: formatWithSIPrefix(calculatedC2, 'M', 4),
          dilutionRatio
        });
        onStatusUpdate(`Status: Calculated C2 = ${formatWithSIPrefix(calculatedC2, 'M', 4)}`, 'green');
      } else if (solveFor === 'V2') {
        if (isNaN(C1) || C1 <= 0) throw new Error('Initial concentration (C1) must be positive.');
        if (isNaN(C2) || C2 <= 0) throw new Error('Final concentration (C2) must be positive.');
        if (isNaN(V1) || V1 <= 0) throw new Error('Initial volume (V1) must be positive.');
        if (C2 > C1) throw new Error('Final concentration (C2) cannot be greater than initial concentration (C1).');

        const calculatedV2 = (C1 * V1) / C2;
        const solvent = calculatedV2 - V1;
        const dilutionRatio = `1:${(C1 / C2).toFixed(1)}`;

        setResult({
          variable: 'V2',
          value: formatWithSIPrefix(calculatedV2, 'L', 4),
          v2: formatWithSIPrefix(calculatedV2, 'L', 4),
          solvent: formatWithSIPrefix(solvent, 'L', 4),
          dilutionRatio
        });
        onStatusUpdate(`Status: Calculated V2 = ${formatWithSIPrefix(calculatedV2, 'L', 4)}`, 'green');
      }
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Solve for:</label>
        <select value={solveFor} onChange={(e) => setSolveFor(e.target.value)}>
          <option value="V1">V1 (Initial Volume)</option>
          <option value="C1">C1 (Initial Concentration)</option>
          <option value="C2">C2 (Final Concentration)</option>
          <option value="V2">V2 (Final Volume)</option>
        </select>
      </div>

      {solveFor !== 'C1' && (
        <UnitInput
          label="Initial Concentration (C1):"
          value={c1}
          onChange={setC1}
          baseUnit="M"
          availableUnits={concentrationUnits}
          defaultUnit="mM"
          placeholder="10"
        />
      )}

      {solveFor !== 'C2' && (
        <UnitInput
          label="Final Concentration (C2):"
          value={c2}
          onChange={setC2}
          baseUnit="M"
          availableUnits={concentrationUnits}
          defaultUnit="mM"
          placeholder="1"
        />
      )}

      {solveFor !== 'V1' && (
        <UnitInput
          label="Initial Volume (V1):"
          value={v1}
          onChange={setV1}
          baseUnit="L"
          availableUnits={volumeUnits}
          defaultUnit="mL"
          placeholder="10"
        />
      )}

      {solveFor !== 'V2' && (
        <UnitInput
          label="Final Volume (V2):"
          value={v2}
          onChange={setV2}
          baseUnit="L"
          availableUnits={volumeUnits}
          defaultUnit="mL"
          placeholder="100"
        />
      )}

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>
          Calculate
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          {result.variable === 'V1' && (
            <>
              <strong>Stock volume needed (V1): {result.v1}</strong>
              <br />
              <strong>Solvent volume needed: {result.solvent}</strong>
              <br />
              Dilution ratio: {result.dilutionRatio}
            </>
          )}
          {result.variable === 'C1' && (
            <>
              <strong>Initial concentration needed (C1): {result.c1}</strong>
              <br />
              Dilution ratio: {result.dilutionRatio}
            </>
          )}
          {result.variable === 'C2' && (
            <>
              <strong>Final concentration (C2): {result.c2}</strong>
              <br />
              Dilution ratio: {result.dilutionRatio}
            </>
          )}
          {result.variable === 'V2' && (
            <>
              <strong>Final volume needed (V2): {result.v2}</strong>
              <br />
              <strong>Solvent volume needed: {result.solvent}</strong>
              <br />
              Dilution ratio: {result.dilutionRatio}
            </>
          )}
        </div>
      )}
    </div>
  );
}
