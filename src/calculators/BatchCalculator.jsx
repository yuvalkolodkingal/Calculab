import { useState } from 'react';

export default function BatchCalculator({ onClose, onStatusUpdate }) {
  const [batchType, setBatchType] = useState('molarSolutions');
  const [numEntries, setNumEntries] = useState('');
  const [showDataEntry, setShowDataEntry] = useState(false);
  const [entries, setEntries] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSetup = () => {
    const n = parseInt(numEntries || '3');
    if (isNaN(n) || n < 1 || n > 10) {
      setError('Number of entries must be between 1 and 10.');
      return;
    }
    setError(null);

    // Initialize entries based on batch type
    const newEntries = [];
    for (let i = 0; i < n; i++) {
      switch (batchType) {
        case 'molarSolutions':
          newEntries.push({ molarity: (i + 1) * 0.1, volume: 0.5, mw: 180 });
          break;
        case 'dilutions':
          newEntries.push({ c1: 10 + i, c2: 1 + i * 0.1, v2: 100 });
          break;
        case 'statistics':
          newEntries.push({ data: i === 0 ? '10,12,11,13,10' : i === 1 ? '5,6,5.5,6.2' : '1,2,3,4,5' });
          break;
        default:
          break;
      }
    }
    setEntries(newEntries);
    setShowDataEntry(true);
    onStatusUpdate('Status: Ready for batch data entry', 'blue');
  };

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleCalculate = () => {
    setError(null);
    setResults(null);

    try {
      const calculatedResults = entries.map((entry) => {
        switch (batchType) {
          case 'molarSolutions': {
            const M = parseFloat(entry.molarity);
            const V = parseFloat(entry.volume);
            const MW = parseFloat(entry.mw);
            if (isNaN(M) || M <= 0 || isNaN(V) || V <= 0 || isNaN(MW) || MW <= 0) {
              return { error: 'Invalid input' };
            }
            const mass = M * V * MW;
            return { mass: mass.toFixed(4), details: `${M.toFixed(1)} M × ${V.toFixed(1)} L × ${MW.toFixed(2)} g/mol` };
          }
          case 'dilutions': {
            const C1 = parseFloat(entry.c1);
            const C2 = parseFloat(entry.c2);
            const V2 = parseFloat(entry.v2);
            if (isNaN(C1) || C1 <= 0 || isNaN(C2) || C2 <= 0 || isNaN(V2) || V2 <= 0 || C2 > C1) {
              return { error: 'Invalid input' };
            }
            const V1 = (C2 * V2) / C1;
            const solvent = V2 - V1;
            return { v1: V1.toFixed(4), solvent: solvent.toFixed(4), details: `${C1} → ${C2} in ${V2} mL` };
          }
          case 'statistics': {
            const dataVector = entry.data.split(',').map(Number).filter(n => !isNaN(n));
            if (dataVector.length === 0) {
              return { error: 'No valid data points' };
            }
            const n = dataVector.length;
            const mean = dataVector.reduce((a, b) => a + b, 0) / n;
            let variance = 0;
            if (n > 1) {
              variance = dataVector.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);
            }
            const SD = Math.sqrt(variance);
            const SE = SD / Math.sqrt(n);
            return { mean: mean.toFixed(4), sd: SD.toFixed(4), se: SE.toFixed(4), n };
          }
          default:
            return { error: 'Unknown batch type' };
        }
      });

      setResults(calculatedResults);
      onStatusUpdate(`Status: Batch calculation completed for ${entries.length} entries`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Batch calculation failed - ${err.message}`, 'red');
    }
  };

  if (!showDataEntry) {
    return (
      <div>
        <div className="form-group">
          <label>Select batch calculation type:</label>
          <select value={batchType} onChange={(e) => setBatchType(e.target.value)}>
            <option value="molarSolutions">Batch Molar Solutions</option>
            <option value="dilutions">Batch Dilutions</option>
            <option value="statistics">Batch Statistics</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of entries (1-10):</label>
          <input type="number" value={numEntries} onChange={(e) => setNumEntries(e.target.value)} placeholder="3" min="1" max="10" />
        </div>
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleSetup}>Setup</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
        {error && <div className="error">Error: {error}</div>}
      </div>
    );
  }

  return (
    <div>
      <h4>Batch {batchType === 'molarSolutions' ? 'Molar Solutions' : batchType === 'dilutions' ? 'Dilutions' : 'Statistics'}</h4>
      {entries.map((entry, index) => (
        <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <strong>Entry {index + 1}:</strong>
          {batchType === 'molarSolutions' && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Molarity (M):</label>
                <input type="number" value={entry.molarity} onChange={(e) => handleEntryChange(index, 'molarity', e.target.value)} step="any" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Volume (L):</label>
                <input type="number" value={entry.volume} onChange={(e) => handleEntryChange(index, 'volume', e.target.value)} step="any" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>MW (g/mol):</label>
                <input type="number" value={entry.mw} onChange={(e) => handleEntryChange(index, 'mw', e.target.value)} step="any" />
              </div>
            </div>
          )}
          {batchType === 'dilutions' && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>C1:</label>
                <input type="number" value={entry.c1} onChange={(e) => handleEntryChange(index, 'c1', e.target.value)} step="any" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>C2:</label>
                <input type="number" value={entry.c2} onChange={(e) => handleEntryChange(index, 'c2', e.target.value)} step="any" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>V2 (mL):</label>
                <input type="number" value={entry.v2} onChange={(e) => handleEntryChange(index, 'v2', e.target.value)} step="any" />
              </div>
            </div>
          )}
          {batchType === 'statistics' && (
            <div className="form-group">
              <label>Data (comma-separated):</label>
              <input type="text" value={entry.data} onChange={(e) => handleEntryChange(index, 'data', e.target.value)} placeholder="e.g., 1.2, 3.4, 5.6" />
            </div>
          )}
        </div>
      ))}
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate Batch</button>
        <button className="btn btn-secondary" onClick={() => setShowDataEntry(false)}>Back</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {results && (
        <div className="result">
          <h4>Batch Results:</h4>
          {results.map((res, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>Entry {index + 1}:</strong>
              {res.error ? (
                <span style={{ color: 'red' }}> {res.error}</span>
              ) : batchType === 'molarSolutions' ? (
                <span> Mass: <strong>{res.mass} g</strong> ({res.details})</span>
              ) : batchType === 'dilutions' ? (
                <span> V1: <strong>{res.v1} mL</strong>, Solvent: <strong>{res.solvent} mL</strong> ({res.details})</span>
              ) : (
                <span> Mean: <strong>{res.mean}</strong>, SD: <strong>{res.sd}</strong>, SE: <strong>{res.se}</strong> (N={res.n})</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
