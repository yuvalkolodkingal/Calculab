import { useState } from 'react';

export default function DNAReverseComplementCalculator({ onClose, onStatusUpdate }) {
  const [sequence, setSequence] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      if (!sequence || sequence.trim() === '') throw new Error('Sequence cannot be empty.');

      // Clean and uppercase
      const clean = sequence.toUpperCase().replace(/[^ATGC]/g, '');
      if (clean.length === 0) throw new Error('No valid nucleotides found (A, T, G, C only).');

      const complementMap = { A: 'T', T: 'A', G: 'C', C: 'G' };
      const complement = clean.split('').map(base => complementMap[base]).join('');
      const reverse = clean.split('').reverse().join('');
      const reverseComplement = complement.split('').reverse().join('');

      setResult({
        original: clean,
        complement,
        reverse,
        reverseComplement,
        length: clean.length
      });
      onStatusUpdate(`Status: Processed ${clean.length} bp sequence`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Processing failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>DNA Sequence (5&apos; to 3&apos;):</label>
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          style={{ width: '100%', height: '80px', fontFamily: 'monospace' }}
          placeholder="ATGCGATCGATCGATCG"
        />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <p><strong>Length:</strong> {result.length} bp</p>
          <br />
          <p><strong>Original (5&apos;→3&apos;):</strong></p>
          <pre style={{ fontFamily: 'monospace', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{result.original}</pre>
          <br />
          <p><strong>Complement (5&apos;→3&apos;):</strong></p>
          <pre style={{ fontFamily: 'monospace', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{result.complement}</pre>
          <br />
          <p><strong>Reverse (5&apos;→3&apos;):</strong></p>
          <pre style={{ fontFamily: 'monospace', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{result.reverse}</pre>
          <br />
          <p><strong>Reverse Complement (5&apos;→3&apos;):</strong></p>
          <pre style={{ fontFamily: 'monospace', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{result.reverseComplement}</pre>
        </div>
      )}
    </div>
  );
}
