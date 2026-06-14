import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

export default function BeadCountCalculator({ onClose, onStatusUpdate }) {
  const [events, setEvents] = useState('');
  const [beadEvents, setBeadEvents] = useState('');
  const [beadConc, setBeadConc] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const totalEvents = parseFloat(events || '10000');
      const beads = parseFloat(beadEvents || '500');
      const concentration = parseFloat(beadConc || '1000');

      if (isNaN(totalEvents) || totalEvents <= 0) throw new Error('Total events must be positive.');
      if (isNaN(beads) || beads <= 0) throw new Error('Bead events must be positive.');
      if (isNaN(concentration) || concentration <= 0) throw new Error('Bead concentration must be positive.');

      const cellEvents = totalEvents - beads;
      const cellConc = (cellEvents / beads) * concentration;

      setResult({
        cellConc: formatWithSIPrefix(cellConc, 'cells/µL', 2),
        cellEvents: cellEvents.toFixed(0),
        beadEvents: beads.toFixed(0),
        beadConc: concentration.toFixed(0)
      });
      onStatusUpdate(`Status: Cell concentration = ${formatWithSIPrefix(cellConc, 'cells/µL', 2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Total events recorded:</label>
        <input type="number" value={events} onChange={(e) => setEvents(e.target.value)} placeholder="10000" step="any" />
      </div>
      <div className="form-group">
        <label>Bead events:</label>
        <input type="number" value={beadEvents} onChange={(e) => setBeadEvents(e.target.value)} placeholder="500" step="any" />
      </div>
      <div className="form-group">
        <label>Bead concentration (beads/µL):</label>
        <input type="number" value={beadConc} onChange={(e) => setBeadConc(e.target.value)} placeholder="1000" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Cell Concentration: {result.cellConc}</strong>
          <br /><br />
          Cell events: {result.cellEvents}
          <br />
          Bead events: {result.beadEvents}
          <br />
          Bead concentration: {result.beadConc} beads/µL
        </div>
      )}
    </div>
  );
}
