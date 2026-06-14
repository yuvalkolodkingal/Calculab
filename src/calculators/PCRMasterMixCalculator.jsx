import { useState } from 'react';

export default function PCRMasterMixCalculator({ onClose, onStatusUpdate }) {
  const [reactions, setReactions] = useState('');
  const [reactionVolume, setReactionVolume] = useState('');
  const [extraFactor, setExtraFactor] = useState('');
  const [templateVolume, setTemplateVolume] = useState('');
  
  // Stock concentrations
  const [bufferStock, setBufferStock] = useState('');  // 10X buffer
  const [mgCl2Stock, setMgCl2Stock] = useState('');    // 25 mM
  const [dNTPsStock, setDNTPsStock] = useState('');    // 10 mM each
  const [primerFStock, setPrimerFStock] = useState(''); // 10 µM
  const [primerRStock, setPrimerRStock] = useState(''); // 10 µM
  
  // Final concentrations
  const [bufferFinal, setBufferFinal] = useState('');    // 1X
  const [mgCl2Final, setMgCl2Final] = useState('');      // 2 mM
  const [dNTPsFinal, setDNTPsFinal] = useState('');    // 0.2 mM each
  const [primerFFinal, setPrimerFFinal] = useState(''); // 0.2 µM
  const [primerRFinal, setPrimerRFinal] = useState(''); // 0.2 µM
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const n = parseInt(reactions || '10');
      const vol = parseFloat(reactionVolume || '25');
      const extra = parseFloat(extraFactor || '0.1');
      const templateVol = parseFloat(templateVolume || '1');

      // Stock concentrations
      const bufferStockVal = parseFloat(bufferStock || '10');
      const mgCl2StockVal = parseFloat(mgCl2Stock || '25');
      const dNTPsStockVal = parseFloat(dNTPsStock || '10');
      const primerFStockVal = parseFloat(primerFStock || '10');
      const primerRStockVal = parseFloat(primerRStock || '10');

      // Final concentrations
      const bufferFinalVal = parseFloat(bufferFinal || '1');
      const mgCl2FinalVal = parseFloat(mgCl2Final || '2');
      const dNTPsFinalVal = parseFloat(dNTPsFinal || '0.2');
      const primerFFinalVal = parseFloat(primerFFinal || '0.2');
      const primerRFinalVal = parseFloat(primerRFinal || '0.2');

      if (isNaN(n) || n <= 0) throw new Error('Number of reactions must be positive.');
      if (isNaN(vol) || vol <= 0) throw new Error('Reaction volume must be positive.');
      if (isNaN(extra) || extra < 0) throw new Error('Extra factor must be non-negative.');
      if (isNaN(templateVol) || templateVol < 0) throw new Error('Template volume must be non-negative.');
      if (isNaN(bufferStockVal) || bufferStockVal <= 0) throw new Error('Buffer stock concentration must be positive.');
      if (isNaN(mgCl2StockVal) || mgCl2StockVal <= 0) throw new Error('MgCl₂ stock concentration must be positive.');
      if (isNaN(dNTPsStockVal) || dNTPsStockVal <= 0) throw new Error('dNTPs stock concentration must be positive.');
      if (isNaN(primerFStockVal) || primerFStockVal <= 0) throw new Error('Forward primer stock concentration must be positive.');
      if (isNaN(primerRStockVal) || primerRStockVal <= 0) throw new Error('Reverse primer stock concentration must be positive.');
      if (isNaN(bufferFinalVal) || bufferFinalVal <= 0) throw new Error('Buffer final concentration must be positive.');
      if (isNaN(mgCl2FinalVal) || mgCl2FinalVal <= 0) throw new Error('MgCl₂ final concentration must be positive.');
      if (isNaN(dNTPsFinalVal) || dNTPsFinalVal <= 0) throw new Error('dNTPs final concentration must be positive.');
      if (isNaN(primerFFinalVal) || primerFFinalVal <= 0) throw new Error('Forward primer final concentration must be positive.');
      if (isNaN(primerRFinalVal) || primerRFinalVal <= 0) throw new Error('Reverse primer final concentration must be positive.');
      
      // Validate that final concentrations don't exceed stock concentrations (C2 <= C1 for dilutions)
      if (bufferFinalVal > bufferStockVal) throw new Error('Buffer final concentration cannot exceed stock concentration.');
      if (mgCl2FinalVal > mgCl2StockVal) throw new Error('MgCl₂ final concentration cannot exceed stock concentration.');
      if (dNTPsFinalVal > dNTPsStockVal) throw new Error('dNTPs final concentration cannot exceed stock concentration.');
      if (primerFFinalVal > primerFStockVal) throw new Error('Forward primer final concentration cannot exceed stock concentration.');
      if (primerRFinalVal > primerRStockVal) throw new Error('Reverse primer final concentration cannot exceed stock concentration.');

      const totalReactions = n * (1 + extra);
      
      // Usable volume for master mix (total volume minus template volume)
      const usableVol = vol - templateVol;
      if (usableVol <= 0) throw new Error('Template volume is greater than or equal to total reaction volume.');

      // Calculate volumes using C1V1 = C2V2 formula
      // V1 = (C2 × V2) / C1
      const bufferVol = (bufferFinalVal * usableVol) / bufferStockVal;
      const mgCl2Vol = (mgCl2FinalVal * usableVol) / mgCl2StockVal;
      const dNTPsVol = (dNTPsFinalVal * usableVol) / dNTPsStockVal;
      const primerFVol = (primerFFinalVal * usableVol) / primerFStockVal;
      const primerRVol = (primerRFinalVal * usableVol) / primerRStockVal;

      // Calculate water to fill remaining volume
      const totalComponentsVol = bufferVol + mgCl2Vol + dNTPsVol + primerFVol + primerRVol;
      const waterVol = usableVol - totalComponentsVol;

      if (waterVol < 0) {
        throw new Error(`Component volumes exceed available volume (excluding template) by ${-waterVol.toFixed(2)} µL.`);
      }

      // Calculate total volumes for all reactions
      const components = {
        buffer: bufferVol * totalReactions,
        mgCl2: mgCl2Vol * totalReactions,
        dNTPs: dNTPsVol * totalReactions,
        primerF: primerFVol * totalReactions,
        primerR: primerRVol * totalReactions,
        water: waterVol * totalReactions
      };

      const totalMasterMixVolume = Object.values(components).reduce((sum, val) => sum + val, 0);

      setResult({
        totalReactions: totalReactions.toFixed(1),
        totalMasterMixVolume: totalMasterMixVolume.toFixed(2),
        buffer: components.buffer.toFixed(2),
        mgCl2: components.mgCl2.toFixed(2),
        dNTPs: components.dNTPs.toFixed(2),
        primerF: components.primerF.toFixed(2),
        primerR: components.primerR.toFixed(2),
        water: components.water.toFixed(2),
        perReaction: vol.toFixed(2),
        templatePerReaction: templateVol.toFixed(2),
        masterMixPerReaction: usableVol.toFixed(2)
      });
      onStatusUpdate(`Status: Calculated master mix for ${n} reactions`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <h4>Reaction Setup</h4>
      <div className="form-group">
        <label>Number of reactions:</label>
        <input type="number" value={reactions} onChange={(e) => setReactions(e.target.value)} placeholder="10" min="1" />
      </div>
      <div className="form-group">
        <label>Total reaction volume (µL):</label>
        <input type="number" value={reactionVolume} onChange={(e) => setReactionVolume(e.target.value)} placeholder="25" step="any" />
      </div>
      <div className="form-group">
        <label>Extra factor (e.g., 0.1 for 10% extra):</label>
        <input type="number" value={extraFactor} onChange={(e) => setExtraFactor(e.target.value)} placeholder="0.1" step="0.01" />
      </div>
      <div className="form-group">
        <label>Template/sample volume per reaction (µL):</label>
        <input type="number" value={templateVolume} onChange={(e) => setTemplateVolume(e.target.value)} placeholder="1" step="any" />
      </div>

      <h4>Stock Concentrations</h4>
      <div className="form-group">
        <label>Buffer stock (X):</label>
        <input type="number" value={bufferStock} onChange={(e) => setBufferStock(e.target.value)} placeholder="10" step="any" />
      </div>
      <div className="form-group">
        <label>MgCl₂ stock (mM):</label>
        <input type="number" value={mgCl2Stock} onChange={(e) => setMgCl2Stock(e.target.value)} placeholder="25" step="any" />
      </div>
      <div className="form-group">
        <label>dNTPs stock (mM each):</label>
        <input type="number" value={dNTPsStock} onChange={(e) => setDNTPsStock(e.target.value)} placeholder="10" step="any" />
      </div>
      <div className="form-group">
        <label>Forward primer stock (µM):</label>
        <input type="number" value={primerFStock} onChange={(e) => setPrimerFStock(e.target.value)} placeholder="10" step="any" />
      </div>
      <div className="form-group">
        <label>Reverse primer stock (µM):</label>
        <input type="number" value={primerRStock} onChange={(e) => setPrimerRStock(e.target.value)} placeholder="10" step="any" />
      </div>

      <h4>Final Concentrations</h4>
      <div className="form-group">
        <label>Buffer final (X):</label>
        <input type="number" value={bufferFinal} onChange={(e) => setBufferFinal(e.target.value)} placeholder="1" step="any" />
      </div>
      <div className="form-group">
        <label>MgCl₂ final (mM):</label>
        <input type="number" value={mgCl2Final} onChange={(e) => setMgCl2Final(e.target.value)} placeholder="2" step="any" />
      </div>
      <div className="form-group">
        <label>dNTPs final (mM each):</label>
        <input type="number" value={dNTPsFinal} onChange={(e) => setDNTPsFinal(e.target.value)} placeholder="0.2" step="any" />
      </div>
      <div className="form-group">
        <label>Forward primer final (µM):</label>
        <input type="number" value={primerFFinal} onChange={(e) => setPrimerFFinal(e.target.value)} placeholder="0.2" step="any" />
      </div>
      <div className="form-group">
        <label>Reverse primer final (µM):</label>
        <input type="number" value={primerRFinal} onChange={(e) => setPrimerRFinal(e.target.value)} placeholder="0.2" step="any" />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <h4>Master Mix Recipe ({result.totalReactions} reactions)</h4>
          <p>Includes <strong>{(parseFloat(extraFactor) * 100).toFixed(0)}% extra</strong> for pipetting error.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '4px' }}>Component</th>
                <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: '4px' }}>Volume (µL)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Buffer ({bufferStock}X)</td><td style={{ textAlign: 'right' }}>{result.buffer}</td></tr>
              <tr><td>MgCl₂ ({mgCl2Stock}mM)</td><td style={{ textAlign: 'right' }}>{result.mgCl2}</td></tr>
              <tr><td>dNTPs ({dNTPsStock}mM each)</td><td style={{ textAlign: 'right' }}>{result.dNTPs}</td></tr>
              <tr><td>Forward Primer ({primerFStock}µM)</td><td style={{ textAlign: 'right' }}>{result.primerF}</td></tr>
              <tr><td>Reverse Primer ({primerRStock}µM)</td><td style={{ textAlign: 'right' }}>{result.primerR}</td></tr>
              <tr><td>Nuclease-free Water</td><td style={{ textAlign: 'right' }}>{result.water}</td></tr>
              <tr style={{ fontWeight: 'bold', borderTop: '1px solid #ddd' }}>
                <td>Total Master Mix</td>
                <td style={{ textAlign: 'right' }}>{result.totalMasterMixVolume}</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: '10px' }}>
            <strong>Usage:</strong> Add {result.masterMixPerReaction} µL of master mix per tube, 
            then add {result.templatePerReaction} µL of template separately for a total of {result.perReaction} µL per reaction.
          </p>
        </div>
      )}
    </div>
  );
}
