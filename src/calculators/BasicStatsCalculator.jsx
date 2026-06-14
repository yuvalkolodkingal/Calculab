import { useState } from 'react';

export default function BasicStatsCalculator({ onClose, onStatusUpdate }) {
  const [numPoints, setNumPoints] = useState('');
  const [dataPoints, setDataPoints] = useState(['10', '20', '30', '40', '50']);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showDataEntry, setShowDataEntry] = useState(false);

  const handleSetupDataEntry = () => {
    const n = parseInt(numPoints || '5');
    if (isNaN(n) || n < 1 || n > 100) {
      setError('Number of data points must be between 1 and 100');
      return;
    }
    setError(null);
    const newDataPoints = Array(n)
      .fill('')
      .map((_, i) => ((i + 1) * 10).toString());
    setDataPoints(newDataPoints);
    setShowDataEntry(true);
    onStatusUpdate('Status: Ready for data entry', 'blue');
  };

  const handleDataPointChange = (index, value) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index] = value;
    setDataPoints(newDataPoints);
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const data = dataPoints.map((val, i) => {
        const parsed = parseFloat(val);
        if (isNaN(parsed)) throw new Error(`Data point ${i + 1} must be a numeric value.`);
        return parsed;
      });

      if (data.length === 0) throw new Error('No data points entered.');

      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      
      let variance = 0;
      if (n > 1) {
        variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);
      }
      
      const standardDeviation = Math.sqrt(variance);
      const standardError = standardDeviation / Math.sqrt(n);

      setResult({
        mean: mean.toFixed(4),
        standardDeviation: standardDeviation.toFixed(4),
        standardError: standardError.toFixed(4),
        sampleSize: n
      });
      onStatusUpdate(
        `Status: Mean = ${mean.toFixed(4)} ± ${standardError.toFixed(4)} (SE)`,
        'green'
      );
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  if (!showDataEntry) {
    return (
      <div>
        <div className="form-group">
          <label>Number of data points:</label>
          <input
            type="number"
            value={numPoints}
            onChange={(e) => setNumPoints(e.target.value)}
            placeholder="5"
            min="1"
            max="100"
          />
        </div>
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleSetupDataEntry}>
            Setup Data Entry
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
        {error && <div className="error">Error: {error}</div>}
      </div>
    );
  }

  return (
    <div>
      <h4>Enter Data Points:</h4>
      {dataPoints.map((value, index) => (
        <div className="form-group" key={index}>
          <label>Data point {index + 1}:</label>
          <input
            type="number"
            value={value}
            onChange={(e) => handleDataPointChange(index, e.target.value)}
            step="any"
          />
        </div>
      ))}
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>
          Calculate
        </button>
        <button className="btn btn-secondary" onClick={() => setShowDataEntry(false)}>
          Back
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <h4>Basic Statistics:</h4>
          <p>
            Mean: <strong>{result.mean}</strong>
          </p>
          <p>
            Standard Deviation (SD): <strong>{result.standardDeviation}</strong>
          </p>
          <p>
            Standard Error (SE): <strong>{result.standardError}</strong>
          </p>
          <p>
            Sample Size (N): <strong>{result.sampleSize}</strong>
          </p>
          <br />
          <p>Data: [{dataPoints.map((v) => parseFloat(v).toFixed(3)).join(', ')}]</p>
        </div>
      )}
    </div>
  );
}
