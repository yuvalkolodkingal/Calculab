import { useState } from 'react';
import { linearRegression } from '../utils/mathUtils';

export default function MichaelisMentenCalculator({ onClose, onStatusUpdate }) {
  const [numPoints, setNumPoints] = useState('');
  const [showDataEntry, setShowDataEntry] = useState(false);
  const [substrates, setSubstrates] = useState(['0.01', '0.02', '0.03', '0.04', '0.05']);
  const [velocities, setVelocities] = useState(['0.05', '0.10', '0.15', '0.20', '0.25']);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSetupDataEntry = () => {
    const n = parseInt(numPoints || '5');
    if (isNaN(n) || n < 3 || n > 10) {
      setError('Need 3-10 data points for Michaelis-Menten analysis.');
      return;
    }
    setError(null);
    const newSubstrates = Array(n).fill('').map((_, i) => ((i + 1) * 0.01).toFixed(2));
    const newVelocities = Array(n).fill('').map((_, i) => ((i + 1) * 0.05).toFixed(2));
    setSubstrates(newSubstrates);
    setVelocities(newVelocities);
    setShowDataEntry(true);
    onStatusUpdate('Status: Ready for Michaelis-Menten data entry', 'blue');
  };

  const handleSubstrateChange = (index, value) => {
    const newSubstrates = [...substrates];
    newSubstrates[index] = value;
    setSubstrates(newSubstrates);
  };

  const handleVelocityChange = (index, value) => {
    const newVelocities = [...velocities];
    newVelocities[index] = value;
    setVelocities(newVelocities);
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const S = substrates.map((s, i) => {
        const val = parseFloat(s);
        if (isNaN(val) || val <= 0) throw new Error(`Substrate concentration ${i + 1} must be positive.`);
        return val;
      });

      const v = velocities.map((vel, i) => {
        const val = parseFloat(vel);
        if (isNaN(val) || val <= 0) throw new Error(`Velocity ${i + 1} must be positive.`);
        return val;
      });

      // Lineweaver-Burk transformation: 1/v vs 1/[S]
      const x = S.map(s => 1 / s);
      const y = v.map(vel => 1 / vel);

      const regression = linearRegression(x, y);

      if (regression.intercept === 0) throw new Error('Cannot determine Vmax: Lineweaver-Burk intercept is zero.');
      const Vmax = 1 / regression.intercept;
      const Km = regression.slope * Vmax;

      setResult({
        Vmax: Vmax.toFixed(4),
        Km: Km.toFixed(4),
        r2: regression.r2.toFixed(4),
        slope: regression.slope.toFixed(4),
        intercept: regression.intercept.toFixed(4)
      });
      onStatusUpdate(`Status: Vmax = ${Vmax.toFixed(4)}, Km = ${Km.toFixed(4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  if (!showDataEntry) {
    return (
      <div>
        <div className="form-group">
          <label>Number of data points (3-10):</label>
          <input type="number" value={numPoints} onChange={(e) => setNumPoints(e.target.value)} placeholder="5" min="3" max="10" />
        </div>
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleSetupDataEntry}>Setup Data Entry</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
        {error && <div className="error">Error: {error}</div>}
      </div>
    );
  }

  return (
    <div>
      <h4>Enter Michaelis-Menten Data:</h4>
      <div className="two-column">
        <div>
          <h5>Substrate Concentrations [S]:</h5>
          {substrates.map((value, index) => (
            <div className="form-group" key={`substrate-${index}`}>
              <label>Substrate {index + 1}:</label>
              <input type="number" value={value} onChange={(e) => handleSubstrateChange(index, e.target.value)} step="any" />
            </div>
          ))}
        </div>
        <div>
          <h5>Initial Velocities (v):</h5>
          {velocities.map((value, index) => (
            <div className="form-group" key={`velocity-${index}`}>
              <label>Velocity {index + 1}:</label>
              <input type="number" value={value} onChange={(e) => handleVelocityChange(index, e.target.value)} step="any" />
            </div>
          ))}
        </div>
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={() => setShowDataEntry(false)}>Back</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <h4>Michaelis-Menten Analysis:</h4>
          <p><strong>Vmax:</strong> {result.Vmax}</p>
          <p><strong>Km:</strong> {result.Km}</p>
          <p><strong>R² (Lineweaver-Burk):</strong> {result.r2}</p>
          <br />
          <p><em>Lineweaver-Burk plot parameters:</em></p>
          <p>Slope: {result.slope}</p>
          <p>Intercept: {result.intercept}</p>
          <br />
          <p><em>1/v = (Km/Vmax)(1/[S]) + 1/Vmax</em></p>
        </div>
      )}
    </div>
  );
}
