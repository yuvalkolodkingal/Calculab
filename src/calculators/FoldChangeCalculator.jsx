import { useState } from 'react';

export default function FoldChangeCalculator({ onClose, onStatusUpdate }) {
  const [deltaDeltaCt, setDeltaDeltaCt] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const ddCt = parseFloat(deltaDeltaCt || '-2');

      if (isNaN(ddCt)) throw new Error('ΔΔCt must be a number.');

      const foldChange = Math.pow(2, -ddCt);
      let interpretation = '';
      if (foldChange > 1) {
        interpretation = `Upregulated ${foldChange.toFixed(2)}-fold`;
      } else if (foldChange < 1) {
        interpretation = `Downregulated ${(1/foldChange).toFixed(2)}-fold`;
      } else {
        interpretation = 'No change';
      }

      setResult({
        foldChange: foldChange.toFixed(4),
        deltaDeltaCt: ddCt.toFixed(2),
        interpretation
      });
      onStatusUpdate(`Status: Fold change = ${foldChange.toFixed(4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>ΔΔCt:</label>
        <input type="number" value={deltaDeltaCt} onChange={(e) => setDeltaDeltaCt(e.target.value)} placeholder="-2" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Fold Change: {result.foldChange}</strong>
          <br /><br />
          2<sup>-ΔΔCt</sup> = 2<sup>-({result.deltaDeltaCt})</sup>
          <br /><br />
          <em>{result.interpretation}</em>
        </div>
      )}
    </div>
  );
}
