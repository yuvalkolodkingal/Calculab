import { useState, useEffect } from 'react';

/**
 * UnitInput - A reusable input component with SI unit selection
 * @param {string} label - Label for the input
 * @param {number|string} value - Current value (in base unit)
 * @param {function} onChange - Callback when value changes (returns value in base unit)
 * @param {string} baseUnit - Base unit symbol (e.g., 'L', 'g', 'M')
 * @param {string[]} availableUnits - Array of available unit prefixes with symbols (e.g., ['L', 'mL', 'μL'])
 * @param {string} defaultUnit - Default selected unit
 * @param {string} placeholder - Placeholder text to show when input is empty
 */
export default function UnitInput({ 
  label, 
  value, 
  onChange, 
  baseUnit, 
  availableUnits,
  defaultUnit,
  placeholder 
}) {
  const [displayValue, setDisplayValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(defaultUnit || availableUnits[0]);
  const [displayPlaceholder, setDisplayPlaceholder] = useState(placeholder);

  // Parse unit string to get prefix (e.g., 'mL' -> 'm', 'μM' -> 'μ')
  const getPrefix = (unit) => {
    return unit.replace(baseUnit, '');
  };

  const getPrefixFactor = (prefix) => {
    // Handle special cases for time units
    if (prefix === 'min') return 60;
    if (prefix === 'h') return 3600;
    
    const factors = {
      'T': 1e12,
      'G': 1e9,
      'M': 1e6,
      'k': 1e3,
      '': 1,
      'd': 1e-1,
      'c': 1e-2,
      'm': 1e-3,
      'μ': 1e-6,
      'n': 1e-9,
      'p': 1e-12,
      'f': 1e-15,
    };
    return factors[prefix] || 1;
  };

  // Convert base unit value to display value when component loads or value changes externally
  useEffect(() => {
    if (value !== null && value !== undefined && value !== '') {
      const prefix = getPrefix(selectedUnit);
      const factor = getPrefixFactor(prefix);
      const displayVal = (parseFloat(value) / factor).toString();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayValue(displayVal);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, selectedUnit]);

  const handleValueChange = (e) => {
    const newDisplayValue = e.target.value;
    setDisplayValue(newDisplayValue);
    
    if (newDisplayValue === '' || newDisplayValue === '-') {
      onChange('');
      return;
    }
    
    const numValue = parseFloat(newDisplayValue);
    if (!isNaN(numValue)) {
      const prefix = getPrefix(selectedUnit);
      const factor = getPrefixFactor(prefix);
      const baseValue = numValue * factor;
      onChange(baseValue);
    }
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    
    // Keep display value unchanged, but recalculate base value with new unit
    if (displayValue !== '' && displayValue !== '-') {
      const numValue = parseFloat(displayValue);
      if (!isNaN(numValue)) {
        const newPrefix = getPrefix(newUnit);
        const newFactor = getPrefixFactor(newPrefix);
        
        // Calculate base value using the display value with the new unit
        const baseValue = numValue * newFactor;
        
        // Update selected unit
        setSelectedUnit(newUnit);
        
        // Notify parent component of the new base value
        onChange(baseValue);
        
        // Update placeholder if it exists
        if (placeholder) {
          updatePlaceholderForUnit(newUnit);
        }
        return;
      }
    }
    
    // If no valid value, just update the selected unit
    setSelectedUnit(newUnit);
    
    // Update placeholder if it exists
    if (placeholder) {
      updatePlaceholderForUnit(newUnit);
    }
  };

  const updatePlaceholderForUnit = (targetUnit) => {
    // Convert placeholder from default unit to target unit
    const placeholderNum = parseFloat(placeholder);
    if (!isNaN(placeholderNum)) {
      const defaultPrefix = getPrefix(defaultUnit || availableUnits[0]);
      const targetPrefix = getPrefix(targetUnit);
      const defaultFactor = getPrefixFactor(defaultPrefix);
      const targetFactor = getPrefixFactor(targetPrefix);
      
      // Convert placeholder to base unit, then to target unit
      const baseValue = placeholderNum * defaultFactor;
      const displayValue = baseValue / targetFactor;
      
      // Format the display value appropriately - remove unnecessary decimals
      let formattedValue;
      const absValue = Math.abs(displayValue);
      
      if (absValue >= 1e6 || (absValue < 0.001 && displayValue !== 0)) {
        // Use scientific notation for very large or very small numbers
        formattedValue = displayValue.toExponential(2);
      } else if (absValue >= 1) {
        // For numbers >= 1, use toPrecision then clean up trailing zeros
        const preciseValue = parseFloat(displayValue.toPrecision(6));
        formattedValue = preciseValue.toString();
      } else {
        // For small numbers, use fixed decimal places
        formattedValue = displayValue.toFixed(8).replace(/\.?0+$/, '');
      }
      setDisplayPlaceholder(formattedValue);
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '5px' }}>
        <input
          type="number"
          value={displayValue}
          onChange={handleValueChange}
          placeholder={displayPlaceholder}
          step="any"
          style={{ flex: 1 }}
        />
        <select 
          value={selectedUnit} 
          onChange={handleUnitChange}
          style={{ width: 'auto' }}
        >
          {availableUnits.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
