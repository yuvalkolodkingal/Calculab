import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function HemocytometerCalculator({ onClose, onStatusUpdate }) {
  const [cellCount, setCellCount] = useState('');
  const [dilutionFactor, setDilutionFactor] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      // Use placeholder values if input is empty
      const count = parseFloat(cellCount || '25');
      const dilution = parseFloat(dilutionFactor || '2');

      if (isNaN(count) || count < 0) throw new Error('Average cell count must be non-negative.');
      if (isNaN(dilution) || dilution <= 0) throw new Error('Dilution factor must be positive.');

      const cellsPerMl = count * dilution * 1e4;

      // Format cell concentration with appropriate SI prefix
      const formattedCells = formatWithSIPrefix(cellsPerMl, 'cells/mL', 2);

      setResult({
        cellsPerMl: formattedCells,
        count: count.toFixed(1),
        dilution: dilution.toFixed(1)
      });
      onStatusUpdate(`Status: Calculated ${formattedCells}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Average cell count per large square:</label>
        <input 
          type="number" 
          value={cellCount} 
          onChange={(e) => setCellCount(e.target.value)} 
          placeholder="25"
          step="any" 
        />
      </div>
      <div className="form-group">
        <label>Dilution factor:</label>
        <input 
          type="number" 
          value={dilutionFactor} 
          onChange={(e) => setDilutionFactor(e.target.value)} 
          placeholder="2"
          step="any" 
        />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Cell concentration: {result.cellsPerMl}</strong>
          <br /><br />
          Count per square: {result.count}
          <br />
          Dilution factor: {result.dilution}
          <br />
          Hemocytometer conversion factor: 10<sup>4</sup>
        </div>
      )}
    </div>
  );
}
