import { useState } from 'react';

export default function PurityRatioCalculator({ onClose, onStatusUpdate }) {
  const [a260, setA260] = useState('');
  const [a280, setA280] = useState('');
  const [a230, setA230] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const A260 = parseFloat(a260 || '0.5');
      const A280 = parseFloat(a280 || '0.27');
      const A230 = parseFloat(a230 || '0.25');

      if (isNaN(A260) || A260 < 0) throw new Error('A260 must be non-negative.');
      if (isNaN(A280) || A280 <= 0) throw new Error('A280 must be positive.');

      const ratio260_280 = A260 / A280;
      let ratio260_230 = null;
      if (!isNaN(A230) && A230 > 0) {
        ratio260_230 = A260 / A230;
      }

      let quality260_280 = 'Good (pure DNA)';
      if (ratio260_280 < 1.8) quality260_280 = 'Low - possible protein contamination';
      else if (ratio260_280 > 2.0) quality260_280 = 'High - possible RNA contamination';

      let quality260_230 = '';
      if (ratio260_230 !== null) {
        if (ratio260_230 < 2.0) quality260_230 = 'Low - possible organic contamination';
        else if (ratio260_230 > 2.2) quality260_230 = 'Good';
        else quality260_230 = 'Acceptable';
      }

      setResult({
        ratio260_280: ratio260_280.toFixed(2),
        ratio260_230: ratio260_230 ? ratio260_230.toFixed(2) : null,
        quality260_280,
        quality260_230
      });
      onStatusUpdate(`Status: A260/A280 = ${ratio260_280.toFixed(2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>A260 Reading:</label>
        <input type="number" value={a260} onChange={(e) => setA260(e.target.value)} placeholder="0.5" step="any" />
      </div>
      <div className="form-group">
        <label>A280 Reading:</label>
        <input type="number" value={a280} onChange={(e) => setA280(e.target.value)} placeholder="0.27" step="any" />
      </div>
      <div className="form-group">
        <label>A230 Reading (optional):</label>
        <input type="number" value={a230} onChange={(e) => setA230(e.target.value)} placeholder="0.25" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>A260/A280 Ratio: {result.ratio260_280}</strong>
          <br />
          Quality: {result.quality260_280}
          {result.ratio260_230 && (
            <>
              <br /><br />
              <strong>A260/A230 Ratio: {result.ratio260_230}</strong>
              <br />
              Quality: {result.quality260_230}
            </>
          )}
        </div>
      )}
    </div>
  );
}
