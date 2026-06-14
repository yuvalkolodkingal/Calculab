import { useState } from 'react';
import { formatWithSIPrefix } from '../utils/mathUtils';

// Molecular weights per base pair/nucleotide (g/mol per bp or nt) - defaults
const molecularWeights = {
  'dsDNA': 660,   // g/mol per base pair
  'ssDNA': 330,   // g/mol per nucleotide
  'ssRNA': 340,   // g/mol per nucleotide
  'dsRNA': 660    // g/mol per base pair (similar to dsDNA)
};

export default function CopyNumberFromMassCalculator({ onClose, onStatusUpdate }) {
  const [mass, setMass] = useState('');
  const [length, setLength] = useState('');
  const [nucleicAcidType, setNucleicAcidType] = useState('dsDNA');
  const [molecularWeightPerBase, setMolecularWeightPerBase] = useState('660');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleNucleicAcidTypeChange = (e) => {
    const newType = e.target.value;
    setNucleicAcidType(newType);
    setMolecularWeightPerBase(String(molecularWeights[newType] || 660));
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const m = parseFloat(mass || '100');
      const len = parseFloat(length || '1000');
      const mwPerBase = parseFloat(molecularWeightPerBase || '660');

      if (isNaN(m) || m <= 0) throw new Error('Mass must be positive.');
      if (isNaN(len) || len <= 0) throw new Error('Length must be positive.');
      if (isNaN(mwPerBase) || mwPerBase <= 0) throw new Error('Molecular weight per base must be positive.');

      // Constants
      const avogadro = 6.022e23;

      const massInGrams = m * 1e-9;         // convert ng -> g
      const molarMass = len * mwPerBase;   // g/mol for the whole molecule

      // moles = mass (g) / molar mass (g/mol)
      const moles = massInGrams / molarMass;

      // copies (particles) = moles * Avogadro
      const copies = moles * avogadro;

      // Determine unit string based on type
      const unitStr = (nucleicAcidType === 'dsDNA' || nucleicAcidType === 'dsRNA') ? 'bp' : 'nt';

      setResult({
        copies: formatWithSIPrefix(copies, 'copies', 2),
        moles: formatWithSIPrefix(moles, 'mol', 2),
        mass: m.toFixed(2),
        length: len.toFixed(0),
        molarMass: formatWithSIPrefix(molarMass, 'g/mol', 2),
        type: nucleicAcidType,
        unitStr,
        massPerBase: mwPerBase
      });

      onStatusUpdate(`Status: ${formatWithSIPrefix(moles, 'mol', 2)} ≈ ${formatWithSIPrefix(copies, 'copies', 2)}`, 'green');
    } catch (err) {
      setError(err.message);
      onStatusUpdate(`Status: Calculation failed - ${err.message}`, 'red');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Nucleic acid type:</label>
        <select value={nucleicAcidType} onChange={handleNucleicAcidTypeChange}>
          <option value="dsDNA">dsDNA (double-stranded DNA)</option>
          <option value="ssDNA">ssDNA (single-stranded DNA)</option>
          <option value="ssRNA">ssRNA (single-stranded RNA)</option>
          <option value="dsRNA">dsRNA (double-stranded RNA)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Mass (ng):</label>
        <input type="number" value={mass} onChange={(e) => setMass(e.target.value)} placeholder="100" step="any" />
      </div>

      <div className="form-group">
        <label>Length ({nucleicAcidType === 'dsDNA' || nucleicAcidType === 'dsRNA' ? 'bp' : 'nt'}):</label>
        <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="1000" step="1" />
      </div>

      <div className="form-group">
        <label>Molecular weight per {nucleicAcidType === 'dsDNA' || nucleicAcidType === 'dsRNA' ? 'base pair' : 'nucleotide'} (g/mol):</label>
        <input
          type="number"
          value={molecularWeightPerBase}
          onChange={(e) => setMolecularWeightPerBase(e.target.value)}
          placeholder="660"
          step="any"
        />
        <small className="muted">
          Default values: dsDNA/dsRNA 660, ssDNA 330, ssRNA 340. You can override (e.g. use 650).
        </small>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>

      {error && <div className="error">Error: {error}</div>}

      {result && (
        <div className="result">
          <strong>Results</strong>
          <br /><br />
          Mass: {result.mass} ng
          <br />
          Length: {result.length} {result.unitStr}
          <br />
          Molecular weight per base used: {result.massPerBase} g/mol
          <br />
          Molar mass (whole molecule): {result.molarMass}
          <br /><br />
          <strong>Moles:</strong> {result.moles}
          <br />
          <strong>Number of particles (copies):</strong> {result.copies}
          <br /><br />
          <em>Note: copies = moles × Avogadro's number (6.022×10²³)</em>
        </div>
      )}
    </div>
  );
}
