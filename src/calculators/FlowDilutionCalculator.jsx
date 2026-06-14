import { useState } from 'react';
import UnitInput from '../components/UnitInput';

export default function FlowDilutionCalculator({ onClose, onStatusUpdate }) {
  const [stockConc, setStockConc] = useState('');
  const [finalConc, setFinalConc] = useState('');
  const [totalFlow, setTotalFlow] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const concentrationUnits = ['M', 'mM', 'μM', 'nM'];

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const stock = parseFloat(stockConc || '100');
      const final = parseFloat(finalConc || '10');
      const flow = parseFloat(totalFlow || '100');

      if (isNaN(stock) || stock <= 0) throw new Error('Stock concentration must be positive.');
      if (isNaN(final) || final <= 0) throw new Error('Final concentration must be positive.');
      if (isNaN(flow) || flow <= 0) throw new Error('Total flow rate must be positive.');
      if (final > stock) throw new Error('Final concentration cannot exceed stock concentration.');

      const stockFlow = (final / stock) * flow;
      const diluentFlow = flow - stockFlow;

      setResult({
        stockFlow: stockFlow.toFixed(4),
        diluentFlow: diluentFlow.toFixed(4),
        totalFlow: flow.toFixed(2)
      });
      onStatusUpdate(`Status: Stock flow = ${stockFlow.toFixed(4)}, Diluent flow = ${diluentFlow.toFixed(4)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <UnitInput
        label="Stock Concentration:"
        value={stockConc}
        onChange={setStockConc}
        baseUnit="M"
        availableUnits={concentrationUnits}
        defaultUnit="M"
        placeholder="100"
      />
      <UnitInput
        label="Final Concentration:"
        value={finalConc}
        onChange={setFinalConc}
        baseUnit="M"
        availableUnits={concentrationUnits}
        defaultUnit="M"
        placeholder="10"
      />
      <div className="form-group">
        <label>Total Flow Rate:</label>
        <input type="number" value={totalFlow} onChange={(e) => setTotalFlow(e.target.value)} placeholder="100" step="any" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <strong>Stock Flow Rate: {result.stockFlow}</strong>
          <br />
          <strong>Diluent Flow Rate: {result.diluentFlow}</strong>
          <br />
          Total Flow: {result.totalFlow}
        </div>
      )}
    </div>
  );
}
