import { useState } from 'react';
import { linearRegression } from '../utils/mathUtils';

export default function StandardCurveCalculator({ onClose, onStatusUpdate }) {
  const [numPoints, setNumPoints] = useState('');
  const [showDataEntry, setShowDataEntry] = useState(false);
  const [copies, setCopies] = useState(['1000000', '100000', '10000', '1000', '100']);
  const [cts, setCts] = useState(['15', '18.3', '21.6', '25', '28.3']);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSetupDataEntry = () => {
    const n = parseInt(numPoints || '5');
    if (isNaN(n) || n < 3 || n > 10) {
      setError('Need 3-10 data points for standard curve.');
      return;
    }
    setError(null);
    const newCopies = Array(n).fill('').map((_, i) => Math.pow(10, 6 - i).toString());
    const newCts = Array(n).fill('').map((_, i) => (15 + i * 3.32).toFixed(1));
    setCopies(newCopies);
    setCts(newCts);
    setShowDataEntry(true);
    onStatusUpdate('Status: Ready for standard curve data entry', 'blue');
  };

  const handleCopiesChange = (index, value) => {
    const newCopies = [...copies];
    newCopies[index] = value;
    setCopies(newCopies);
  };

  const handleCtsChange = (index, value) => {
    const newCts = [...cts];
    newCts[index] = value;
    setCts(newCts);
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const copyValues = copies.map((c, i) => {
        const val = parseFloat(c);
        if (isNaN(val) || val <= 0) throw new Error(`Copy number ${i + 1} must be positive.`);
        return val;
      });

      const ctValues = cts.map((ct, i) => {
        const val = parseFloat(ct);
        if (isNaN(val) || val < 0) throw new Error(`Ct value ${i + 1} must be non-negative.`);
        return val;
      });

      // Log transform copy numbers for linear regression
      const logCopies = copyValues.map(c => Math.log10(c));
      const regression = linearRegression(logCopies, ctValues);

      // Calculate efficiency from slope: E = 10^(-1/slope) - 1
      const efficiency = (Math.pow(10, -1 / regression.slope) - 1) * 100;

      setResult({
        slope: regression.slope.toFixed(4),
        intercept: regression.intercept.toFixed(4),
        r2: regression.r2.toFixed(4),
        efficiency: efficiency.toFixed(2)
      });
      onStatusUpdate(`Status: Slope = ${regression.slope.toFixed(4)}, R² = ${regression.r2.toFixed(4)}, Efficiency = ${efficiency.toFixed(2)}%`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  if (!showDataEntry) {
    return (
      <div>
        <div className="form-group">
          <label>Number of standards (3-10):</label>
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
      <h4>Enter Standard Curve Data:</h4>
      <div className="two-column">
        <div>
          <h5>Copy Numbers:</h5>
          {copies.map((value, index) => (
            <div className="form-group" key={`copy-${index}`}>
              <label>Standard {index + 1}:</label>
              <input type="number" value={value} onChange={(e) => handleCopiesChange(index, e.target.value)} step="any" />
            </div>
          ))}
        </div>
        <div>
          <h5>Ct Values:</h5>
          {cts.map((value, index) => (
            <div className="form-group" key={`ct-${index}`}>
              <label>Ct {index + 1}:</label>
              <input type="number" value={value} onChange={(e) => handleCtsChange(index, e.target.value)} step="any" />
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
          <h4>Standard Curve Analysis:</h4>
          <p><strong>Slope:</strong> {result.slope}</p>
          <p><strong>Y-Intercept:</strong> {result.intercept}</p>
          <p><strong>R²:</strong> {result.r2}</p>
          <p><strong>Efficiency:</strong> {result.efficiency}%</p>
          <br />
          <p><em>Formula: Ct = slope × log₁₀(copies) + intercept</em></p>
          <p><em>Efficiency = 10^(-1/slope) - 1</em></p>
        </div>
      )}
    </div>
  );
}
