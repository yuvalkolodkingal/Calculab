/**
 * Shared mathematical utilities for calculators
 */

/**
 * Performs linear regression on x,y data
 * @param {number[]} x - Independent variable values
 * @param {number[]} y - Dependent variable values
 * @returns {object} - { slope, intercept, r2, yfit }
 */
export function linearRegression(x, y) {
  const n = x.length;
  if (n !== y.length) throw new Error('X and Y data arrays must have the same length.');
  if (n < 2) throw new Error('At least two data points are required for linear regression.');

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) throw new Error('Cannot perform linear regression: X values are all the same.');

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  const yfit = x.map((xi) => slope * xi + intercept);
  const SSresid = y.reduce((acc, yi, i) => acc + Math.pow(yi - yfit[i], 2), 0);
  const meanY = sumY / n;
  const SStotal = y.reduce((acc, yi) => acc + Math.pow(yi - meanY, 2), 0);
  const r2 = SStotal === 0 ? 1 : 1 - SSresid / SStotal;

  return { slope, intercept, r2, yfit };
}

/**
 * SI Unit Prefixes and their conversion factors
 */
export const SI_PREFIXES = {
  // Large units
  'T': { name: 'tera', factor: 1e12 },
  'G': { name: 'giga', factor: 1e9 },
  'M': { name: 'mega', factor: 1e6 },
  'k': { name: 'kilo', factor: 1e3 },
  // Base unit
  '': { name: 'base', factor: 1 },
  // Small units
  'd': { name: 'deci', factor: 1e-1 },
  'c': { name: 'centi', factor: 1e-2 },
  'm': { name: 'milli', factor: 1e-3 },
  'μ': { name: 'micro', factor: 1e-6 },
  'n': { name: 'nano', factor: 1e-9 },
  'p': { name: 'pico', factor: 1e-12 },
  'f': { name: 'femto', factor: 1e-15 },
};

/**
 * Convert a value from one SI unit to another
 * @param {number} value - The value to convert
 * @param {string} fromPrefix - The source SI prefix (e.g., 'm' for milli)
 * @param {string} toPrefix - The target SI prefix (e.g., 'μ' for micro)
 * @returns {number} - The converted value
 */
export function convertSIUnit(value, fromPrefix, toPrefix) {
  const fromFactor = SI_PREFIXES[fromPrefix]?.factor || 1;
  const toFactor = SI_PREFIXES[toPrefix]?.factor || 1;
  return value * (fromFactor / toFactor);
}

/**
 * Convert value with unit to base unit
 * @param {number} value - The value
 * @param {string} prefix - The SI prefix
 * @returns {number} - Value in base unit
 */
export function toBaseUnit(value, prefix) {
  return convertSIUnit(value, prefix, '');
}

/**
 * Convert value from base unit to specified prefix
 * @param {number} value - The value in base unit
 * @param {string} prefix - The target SI prefix
 * @returns {number} - Value in target unit
 */
export function fromBaseUnit(value, prefix) {
  return convertSIUnit(value, '', prefix);
}

/**
 * Automatically format a number with the most appropriate SI prefix
 * @param {number} value - The value to format (in base unit)
 * @param {string} baseUnit - The base unit symbol (e.g., 'M', 'L', 'g', 'cells')
 * @param {number} decimals - Number of decimal places (default: 2)
 * @param {object} options - Additional options
 * @param {string[]} options.allowedPrefixes - Array of allowed prefixes (default: excludes 'c' and 'd' which are rarely used in lab contexts)
 * @param {number} options.minValue - Lower bound of the preferred value range (default: 1.0)
 * @param {number} options.maxValue - Upper bound of the preferred value range (default: 1000)
 * @returns {string} - Formatted string with value and unit (e.g., "1.50 mM", "2.3 μL")
 */
export function formatWithSIPrefix(value, baseUnit, decimals = 2, options = {}) {
  const {
    // Exclude 'c' (centi) and 'd' (deci) by default - rarely used in scientific contexts
    // except for specific cases like centimeters
    allowedPrefixes = ['T', 'G', 'M', 'k', '', 'm', 'μ', 'n', 'p', 'f'],
    minValue = 1.0,
    maxValue = 1000
  } = options;

  // Handle zero or invalid values
  if (value === 0 || !isFinite(value)) {
    return `${value.toFixed(decimals)} ${baseUnit}`;
  }

  // Handle negative values by formatting absolute value
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // Find the best prefix
  let bestPrefix = '';
  let bestValue = absValue;
  let bestScore = Infinity;

  // Filter SI_PREFIXES to only allowed prefixes and sort by factor
  const sortedPrefixes = allowedPrefixes
    .filter(prefix => prefix in SI_PREFIXES) // Only include valid prefixes
    .map(prefix => ({ prefix, factor: SI_PREFIXES[prefix].factor }))
    .sort((a, b) => b.factor - a.factor);

  // Find the prefix that produces a value closest to the "ideal" range
  // Prefer values between minValue and maxValue, with preference for values closer to minValue
  for (const { prefix, factor } of sortedPrefixes) {
    const convertedValue = absValue / factor;
    
    // Calculate score: lower is better
    let score;
    if (convertedValue >= minValue && convertedValue < maxValue) {
      // Value is in range - score based on distance from minValue (prefer values like 1.5, 2.5, etc.)
      // Using log scale to prefer values between 1 and 100
      score = Math.abs(Math.log10(convertedValue / minValue));
    } else if (convertedValue < minValue) {
      // Value too small - heavily penalize
      score = 1000 + Math.abs(Math.log10(convertedValue / minValue));
    } else {
      // Value too large - heavily penalize
      score = 1000 + Math.abs(Math.log10(convertedValue / maxValue));
    }
    
    if (score < bestScore) {
      bestScore = score;
      bestPrefix = prefix;
      bestValue = convertedValue;
    }
  }

  // Format the final value
  const sign = isNegative ? '-' : '';
  const formattedValue = bestValue.toFixed(decimals);
  return `${sign}${formattedValue} ${bestPrefix}${baseUnit}`;
}
