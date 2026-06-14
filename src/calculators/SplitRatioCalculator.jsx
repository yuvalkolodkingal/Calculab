import { useState } from 'react';

export default function SplitRatioCalculator({ onClose, onStatusUpdate }) {
  const [initialVolume, setInitialVolume] = useState('');
  const [splitRatio, setSplitRatio] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const volume = parseFloat(initialVolume || '10');
      const ratio = parseFloat(splitRatio || '3');

      if (isNaN(volume) || volume <= 0) throw new Error('Initial volume must be positive.');
      if (isNaN(ratio) || ratio <= 0) throw new Error('Split ratio must be positive.');

      const volumeToTransfer = volume / ratio;
      const newMedia = volume - volumeToTransfer;

      setResult({
        volumeToTransfer: volumeToTransfer.toFixed(4),
        newMedia: newMedia.toFixed(4),
        initialVolume: volume.toFixed(2),
        ratio: ratio.toFixed(0)
      });
      onStatusUpdate(`Status: Transfer ${volumeToTransfer.toFixed(4)} mL for 1:${ratio.toFixed(0)} split`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Initial total volume (mL):</label>
        <input type="number" value={initialVolume} onChange={(e) => setInitialVolume(e.target.value)} placeholder="10" step="any" />
      </div>
      <div className="form-group">
        <label>Split ratio (e.g., 3 for 1:3):</label>
        <input type="number" value={splitRatio} onChange={(e) => setSplitRatio(e.target.value)} placeholder="3" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Volume to transfer: {result.volumeToTransfer} mL</strong>
          <br />
          <strong>Add new media: {result.newMedia} mL</strong>
          <br /><br />
          For 1:{result.ratio} split from {result.initialVolume} mL
        </div>
      )}
    </div>
  );
}
