/**
 * Calculator configuration and panel definitions
 */

export const calculatorPanels = [
  {
    title: 'Solution Preparation',
    calculators: [
      { id: 'molarMass', name: 'Molar Mass Calculator' },
      { id: 'percentSolution', name: 'Percent Solution' },
      { id: 'molality', name: 'Molality Calculator' },
      { id: 'osmolarity', name: 'Osmolarity Calculator' },
      { id: 'hendersonHasselbalch', name: 'Henderson-Hasselbalch' },
    ],
  },
  {
    title: 'Dilutions & Concentrations',
    calculators: [
      { id: 'c1v1', name: 'C1V1 Dilution' },
      { id: 'serialDilution', name: 'Serial Dilution' },
      { id: 'flowDilution', name: 'Flow Dilution' },
      { id: 'mgLToPpm', name: 'mg/L to ppm' },
      { id: 'massToMolar', name: 'Mass to Molar' },
      { id: 'molarToMass', name: 'Molar to Mass' },
    ],
  },
  {
    title: 'Spectrophotometry & Analysis',
    calculators: [
      { id: 'beerLambert', name: 'Beer-Lambert Law' },
      { id: 'naQuant', name: 'Nucleic Acid A260' },
      { id: 'purityRatio', name: 'Purity Ratio A260/A280' },
      { id: 'proteinA280', name: 'Protein A280' },
      { id: 'bradford', name: 'Bradford Assay' },
    ],
  },
  {
    title: 'Cell Culture & Microbiology',
    calculators: [
      { id: 'hemocytometer', name: 'Hemocytometer Count' },
      { id: 'seedingVolume', name: 'Seeding Volume' },
      { id: 'splitRatio', name: 'Split Ratio' },
      { id: 'cfu', name: 'CFU Calculation' },
      { id: 'enzymeActivity', name: 'Enzyme Activity' },
    ],
  },
  {
    title: 'PCR & Molecular Biology',
    calculators: [
      { id: 'pcrMasterMix', name: 'PCR Master Mix' },
      { id: 'primerReconstitution', name: 'Primer Reconstitution' },
      { id: 'deltaCt', name: 'Delta Ct' },
      { id: 'deltaDeltaCt', name: 'Delta Delta Ct' },
      { id: 'foldChange', name: 'Fold Change' },
      { id: 'pfaffl', name: 'Pfaffl Ratio' },
    ],
  },
  {
    title: 'qPCR Analysis',
    calculators: [
      { id: 'standardCurve', name: 'Standard Curve Analysis' },
      { id: 'efficiencyFromSlope', name: 'Efficiency from Slope' },
      { id: 'copyNumber', name: 'Copy Number (Ct)' },
      { id: 'copyNumberFromMass', name: 'Copy Number (Mass/Length)' },
      { id: 'amplificationEfficiency', name: 'Amplification Efficiency' },
    ],
  },
  {
    title: 'Flow Cytometry & Centrifugation',
    calculators: [
      { id: 'beadCount', name: 'Bead Count' },
      { id: 'rpmToRcf', name: 'RPM to RCF' },
      { id: 'rcfToRpm', name: 'RCF to RPM' },
      { id: 'basicStats', name: 'Basic Statistics' },
    ],
  },
  {
    title: 'Additional Tools',
    calculators: [
      { id: 'michaelisMenten', name: 'Michaelis-Menten' },
      { id: 'formulas', name: 'Formula Reference', isReference: true },
      { id: 'conversions', name: 'Unit Conversions', isReference: true },
      { id: 'constants', name: 'Laboratory Constants', isReference: true },
      { id: 'dnaReverseComplement', name: 'DNA Reverse Complement' },
    ],
  },
  {
    title: 'Utilities & Help',
    calculators: [
      { id: 'about', name: 'About CalcuLab', isReference: true },
      { id: 'batchCalculator', name: 'Batch Calculator' },
    ],
  },
];

export const referenceContent = {
  formulas: {
    title: 'Key Laboratory Formulas',
    content: `
SOLUTION PREPARATION:
• Molarity: M = n / V (mol/L)
• Mass (g) = Molarity (mol/L) × Volume (L) × Molecular Weight (g/mol)
• Percent Solution (w/v): Mass (g) = (% / 100) × V_mL
• Percent Solution (v/v): Volume Solute (mL) = (% / 100) × V_total_mL
• Dilution: C₁V₁ = C₂V₂
• Molality: m = n_solute / mass_solvent_kg

SPECTROPHOTOMETRY:
• Beer-Lambert Law: A = εcl
• Nucleic Acid Conc: Conc (µg/mL) = A₂₆₀ × Factor × Dilution
  (Factor: 50 for dsDNA, 40 for RNA, 33 for ssDNA)
• Purity Ratio: A₂₆₀/A₂₈₀
• Protein A280 (Rule of Thumb): Conc (mg/mL) = A₂₈₀ / l_cm
• Bradford Assay: Conc = (A₅₉₅ - Intercept) / Slope

CELL CULTURE:
• Hemocytometer: cells/mL = Count × Dilution × 10⁴
• CFU/mL = (Colonies × Dilution) / Volume_plated_mL
• Cell Seeding: Volume (mL) = Desired Cells / Cell Conc (cells/mL)
• Cell Split: Volume to Transfer (mL) = Initial Total Volume (mL) / Split Ratio

PCR/qPCR:
• ΔCt = Ct_target - Ct_reference
• ΔΔCt = ΔCt_test - ΔCt_control
• Fold Change = 2^(-ΔΔCt)
• Efficiency (from slope): E = 10^(-1/Slope) - 1
• Pfaffl Ratio: Ratio = (E_target^(-ΔCt_target)) / (E_ref^(-ΔCt_ref))
• Copy Number (from Ct): Log₁₀(Copies) = (Ct - Intercept) / Slope

CENTRIFUGATION:
• RCF (× g) = 1.118 × 10⁻⁵ × r_cm × (RPM)²
• RPM = √(RCF / (1.118 × 10⁻⁵ × r_cm))

pH & OSMOLARITY:
• Henderson-Hasselbalch: pH = pKa + Log₁₀([A⁻] / [HA])
• Osmolarity: Osm = Molarity × i (van 't Hoff factor)

ENZYME KINETICS:
• Enzyme Activity: Activity (U/mL) = Product (µmol) / (Time (min) × Volume (mL))
• Lineweaver-Burk: 1/v = (Km/Vmax)(1/[S]) + 1/Vmax

STATISTICS:
• Mean = Σx_i / n
• Standard Deviation (SD) = √(Σ(x_i - x̄)² / (n-1))
• Standard Error (SE) = SD / √n
    `,
  },
  conversions: {
    title: 'Common Unit Conversions',
    content: `
VOLUME:
• 1 L = 1000 mL = 1,000,000 µL
• 1 mL = 1000 µL

CONCENTRATION:
• 1 M = 1000 mM = 1,000,000 µM
• 1 mM = 1000 µM
• 1 mg/mL = 1000 µg/mL = 1,000,000 ng/mL
• 1 µg/mL = 1000 ng/mL
• 1 mg/L ≈ 1 ppm (dilute aqueous solutions)

MASS:
• 1 g = 1000 mg = 1,000,000 µg
• 1 mg = 1000 µg = 1,000,000 ng
• 1 µg = 1000 ng

MOLECULAR AMOUNTS:
• 1 mol = 1000 mmol = 1,000,000 µmol
• 1 mmol = 1000 µmol = 1,000,000 nmol
• 1 µmol = 1000 nmol = 1,000,000 pmol

TEMPERATURE:
• °C = (°F - 32) × 5/9
• K = °C + 273.15

PRESSURE:
• 1 atm = 760 mmHg = 101.325 kPa
• 1 bar = 100 kPa ≈ 1 atm
    `,
  },
  constants: {
    title: 'Laboratory Constants',
    content: `
PHYSICAL CONSTANTS:
• Avogadro's number: 6.022 × 10²³ mol⁻¹
• Gas constant: 8.314 J/(mol·K)
• Faraday constant: 96,485 C/mol
• Planck constant: 6.626 × 10⁻³⁴ J·s

SPECTROPHOTOMETRY:
• dsDNA: 50 µg/mL per A₂₆₀ unit
• RNA: 40 µg/mL per A₂₆₀ unit
• ssDNA: 33 µg/mL per A₂₆₀ unit
• Protein (average): 1 mg/mL per A₂₈₀ unit (for 1 cm path length)

CELL CULTURE:
• Hemocytometer factor: 10⁴ (for 1 large square to cells/mL)
• Trypan blue exclusion: live cells = clear (dye excluded)
• Doubling time: varies by cell type

PCR EFFICIENCY:
• Perfect efficiency: 100% (slope = -3.32 for Log10 quantity vs Ct)
• Acceptable range: 90-110%
• Typical slope range: -3.1 to -3.6

CENTRIFUGATION:
• RCF conversion constant: 1.118 × 10⁻⁵ (when radius in cm)
• Earth gravity: 9.81 m/s²

pH BUFFERS:
• Phosphate buffer: pKa ≈ 7.2
• Tris buffer: pKa ≈ 8.1
• HEPES buffer: pKa ≈ 7.5

ENZYME ACTIVITY:
• 1 Unit (U) = 1 µmol substrate/min
• 1 Katal = 1 mol substrate/s
    `,
  },
  about: {
    title: 'About CalcuLab',
    content: `
A comprehensive collection of laboratory calculators for:

• Solution Preparation & Dilutions
• Spectrophotometry & Quantification
• Cell Culture & Microbiology
• PCR & qPCR Analysis
• Protein & Nucleic Acid Analysis
• Flow Cytometry & Centrifugation
• Enzyme Kinetics & Activity
• Statistical Analysis

Features:
• 30+ validated scientific calculators
• Professional web interface
• Input validation & error handling
• Comprehensive result displays
• Formula references & constants
• Copy Number calculation from Mass/Length
• DNA Reverse Complement Converter
• Batch calculation capabilities

Created for laboratory professionals,
researchers, and students.

Made by Yuval Kolodkin-Gal & Avichay Nahami

    `,
  },
};
