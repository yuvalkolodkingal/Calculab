import { describe, it, expect } from 'vitest';
import { formatWithSIPrefix } from '../utils/mathUtils';

/**
 * Tests for SI unit auto-formatting
 */

describe('formatWithSIPrefix', () => {
  describe('Basic formatting with common units', () => {
    it('should format 1 M as "1.00 M"', () => {
      expect(formatWithSIPrefix(1, 'M')).toBe('1.00 M');
    });

    it('should format 0.001 M as "1.00 mM"', () => {
      expect(formatWithSIPrefix(0.001, 'M')).toBe('1.00 mM');
    });

    it('should format 0.000001 M as "1.00 μM"', () => {
      expect(formatWithSIPrefix(0.000001, 'M')).toBe('1.00 μM');
    });

    it('should format 1000 M as "1.00 kM"', () => {
      expect(formatWithSIPrefix(1000, 'M')).toBe('1.00 kM');
    });

    it('should format 1000000 M as "1.00 MM"', () => {
      expect(formatWithSIPrefix(1000000, 'M')).toBe('1.00 MM');
    });

    it('should format 0.000000001 M as "1.00 nM"', () => {
      expect(formatWithSIPrefix(0.000000001, 'M')).toBe('1.00 nM');
    });
  });

  describe('Volume formatting', () => {
    it('should format 0.001 L as "1.00 mL"', () => {
      expect(formatWithSIPrefix(0.001, 'L')).toBe('1.00 mL');
    });

    it('should format 0.000001 L as "1.00 μL"', () => {
      expect(formatWithSIPrefix(0.000001, 'L')).toBe('1.00 μL');
    });

    it('should format 0.000000001 L as "1.00 nL"', () => {
      expect(formatWithSIPrefix(0.000000001, 'L')).toBe('1.00 nL');
    });

    it('should format 0.5 L as "500.00 mL"', () => {
      expect(formatWithSIPrefix(0.5, 'L')).toBe('500.00 mL');
    });
  });

  describe('Mass formatting', () => {
    it('should format 0.001 g as "1.00 mg"', () => {
      expect(formatWithSIPrefix(0.001, 'g')).toBe('1.00 mg');
    });

    it('should format 0.000001 g as "1.00 μg"', () => {
      expect(formatWithSIPrefix(0.000001, 'g')).toBe('1.00 μg');
    });

    it('should format 1000 g as "1.00 kg"', () => {
      expect(formatWithSIPrefix(1000, 'g')).toBe('1.00 kg');
    });
  });

  describe('Cell count formatting', () => {
    it('should format 1000000 cells as "1.00 Mcells"', () => {
      expect(formatWithSIPrefix(1000000, 'cells')).toBe('1.00 Mcells');
    });

    it('should format 1000000000 cells as "1.00 Gcells"', () => {
      expect(formatWithSIPrefix(1000000000, 'cells')).toBe('1.00 Gcells');
    });

    it('should format 500 cells as "500.00 cells"', () => {
      expect(formatWithSIPrefix(500, 'cells')).toBe('500.00 cells');
    });
  });

  describe('Decimal places', () => {
    it('should format with 4 decimals when specified', () => {
      expect(formatWithSIPrefix(0.001, 'M', 4)).toBe('1.0000 mM');
    });

    it('should format with 0 decimals when specified', () => {
      expect(formatWithSIPrefix(0.001, 'M', 0)).toBe('1 mM');
    });

    it('should format with 1 decimal when specified', () => {
      expect(formatWithSIPrefix(0.0025, 'M', 1)).toBe('2.5 mM');
    });
  });

  describe('Edge cases', () => {
    it('should handle zero', () => {
      expect(formatWithSIPrefix(0, 'M')).toBe('0.00 M');
    });

    it('should handle negative values', () => {
      expect(formatWithSIPrefix(-0.001, 'M')).toBe('-1.00 mM');
    });

    it('should handle very small values (pico)', () => {
      expect(formatWithSIPrefix(0.000000000001, 'M')).toBe('1.00 pM');
    });

    it('should handle very large values (tera)', () => {
      expect(formatWithSIPrefix(1000000000000, 'cells')).toBe('1.00 Tcells');
    });

    it('should handle Infinity', () => {
      expect(formatWithSIPrefix(Infinity, 'M')).toBe('Infinity M');
    });

    it('should handle NaN', () => {
      expect(formatWithSIPrefix(NaN, 'M')).toBe('NaN M');
    });
  });

  describe('Custom prefix restrictions', () => {
    it('should only use allowed prefixes', () => {
      const result = formatWithSIPrefix(0.001, 'M', 2, {
        allowedPrefixes: ['', 'k', 'M']
      });
      // Should use base unit since milli is not allowed
      expect(result).toBe('0.00 M');
    });

    it('should use milli when allowed', () => {
      const result = formatWithSIPrefix(0.001, 'M', 2, {
        allowedPrefixes: ['', 'm', 'μ']
      });
      expect(result).toBe('1.00 mM');
    });
  });

  describe('Custom range thresholds', () => {
    it('should respect custom minValue', () => {
      const result = formatWithSIPrefix(0.5, 'M', 2, {
        minValue: 2,
        maxValue: 1000
      });
      // 0.5 M is below minValue of 2, so should convert to 500 mM
      expect(result).toBe('500.00 mM');
    });

    it('should respect custom maxValue', () => {
      const result = formatWithSIPrefix(500, 'M', 2, {
        minValue: 1,
        maxValue: 100
      });
      // 500 M exceeds maxValue of 100, so should convert to 0.5 kM
      expect(result).toBe('0.50 kM');
    });
  });

  describe('Real-world lab scenarios', () => {
    it('should format DNA concentration: 0.000050 M', () => {
      expect(formatWithSIPrefix(0.000050, 'M')).toBe('50.00 μM');
    });

    it('should format PCR volume: 0.000020 L', () => {
      expect(formatWithSIPrefix(0.000020, 'L')).toBe('20.00 μL');
    });

    it('should format protein mass: 0.000005 g', () => {
      expect(formatWithSIPrefix(0.000005, 'g')).toBe('5.00 μg');
    });

    it('should format cell count: 2500000 cells', () => {
      expect(formatWithSIPrefix(2500000, 'cells')).toBe('2.50 Mcells');
    });

    it('should format enzyme activity: 0.0001 units', () => {
      expect(formatWithSIPrefix(0.0001, 'U')).toBe('100.00 μU');
    });

    it('should format very dilute solution: 0.0000000001 M', () => {
      expect(formatWithSIPrefix(0.0000000001, 'M')).toBe('100.00 pM');
    });
  });

  describe('Beer-Lambert calculator scenarios', () => {
    it('should format 0.000048 M as "48.00 μM"', () => {
      expect(formatWithSIPrefix(0.000048, 'M')).toBe('48.00 μM');
    });

    it('should format 0.0001 M as "100.00 μM"', () => {
      expect(formatWithSIPrefix(0.0001, 'M')).toBe('100.00 μM');
    });
  });

  describe('Value boundary conditions', () => {
    it('should handle values at minValue threshold', () => {
      expect(formatWithSIPrefix(1, 'M')).toBe('1.00 M');
    });

    it('should handle values just below minValue threshold', () => {
      expect(formatWithSIPrefix(0.1, 'M')).toBe('100.00 mM');
    });

    it('should handle values at maxValue threshold', () => {
      expect(formatWithSIPrefix(999, 'M')).toBe('999.00 M');
    });

    it('should handle values just at maxValue', () => {
      expect(formatWithSIPrefix(1000, 'M')).toBe('1.00 kM');
    });
  });
});
