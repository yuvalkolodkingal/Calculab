# 🧪 CalcuLab


**CalcuLab** is a user-friendly toolkit for laboratory professionals, researchers, and students. It provides 39 calculators for common lab procedures, data analysis, and experimental design — all in your browser.

---

## 🚀 Features

- Solution preparation & dilutions
- Spectrophotometry & quantification
- Cell culture & microbiology
- PCR & qPCR analysis
- Flow cytometry & centrifugation
- Enzyme kinetics & activity
- Statistical analysis
- Extras: formula reference, unit conversions, constants, DNA reverse complement, batch calculations

---

## 🖥️ Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lucknite/Calculab.git
   cd Calculab
   npm install
   npm run dev
   ```
2. **Open** http://localhost:5173
3. **Calculate:** Select a calculator or tool from the interface.

Or visit the live website: https://www.calculab.bio/

---

## 📦 Tech Stack

- React 19 + Vite
- React Router
- Pure client-side (no backend)
- Deployed to GitHub Pages via GitHub Actions

---

## 🧪 Development

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Create production bundle |
| `npm run preview` | Serve built `dist/` locally |
| `npm run lint` | Run ESLint |
| `npm run lint -- --fix` | Auto-fix lint errors |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once (CI style) |

---

## 📚 Formula Reference

### Solution Preparation & Dilutions

| Calculation               | Formula                           |
|---------------------------|-----------------------------------|
| Molarity                  | `M = n / V` (mol/L)               |
| Mass                      | `Mass (g) = M × V × MW`           |
| Percent Solution (w/v)    | `Mass (g) = (% / 100) × V_ml`     |
| Percent Solution (v/v)    | `Vol Solute (mL) = (% / 100) × V_total` |
| Dilution                  | `C1V1 = C2V2`                     |
| Molality                  | `m = n_solute / mass_solvent_kg`  |

---

### Spectrophotometry & Quantification

| Calculation           | Formula                                    |
|-----------------------|--------------------------------------------|
| Beer-Lambert Law      | `A = ε × c × l`                            |
| Nucleic Acid Conc     | `Conc (µg/mL) = A260 × Factor × Dilution`  |
| Purity Ratio          | `A260 / A280`                              |
| Protein A280          | `Conc (mg/mL) = A280 / l_cm`               |
| Bradford Assay        | `Conc = (A595 - Intercept) / Slope`        |

*Factor: 50 for dsDNA, 40 for RNA, 33 for ssDNA*

---

### Cell Culture & Microbiology

| Calculation           | Formula                                    |
|-----------------------|--------------------------------------------|
| Hemocytometer         | `cells/mL = Count × Dilution × 10^4`       |
| CFU/mL                | `CFU/mL = (Colonies × Dilution) / Volume_plated_mL` |
| Cell Seeding          | `Volume (mL) = Desired Cells / Cell Conc`  |
| Cell Split            | `Volume to Transfer = Initial Total Volume / Split Ratio` |

---

### PCR & qPCR Analysis

| Calculation                  | Formula                                         |
|------------------------------|-------------------------------------------------|
| ΔCt                          | `ΔCt = Ct_target - Ct_reference`                |
| ΔΔCt                         | `ΔΔCt = ΔCt_test - ΔCt_control`                 |
| Fold Change                  | `Fold Change = 2^(-ΔΔCt)`                       |
| Efficiency (Slope)           | `E = 10^(-1/Slope) - 1`                         |
| Pfaffl Ratio                 | `Ratio = (E_target^-ΔCt_target) / (E_ref^-ΔCt_ref)` |
| Copy Number (Ct)             | `log10(Copies) = (Ct - Intercept) / Slope`      |
| Copy Number (Mass/Length)    | `Copies = (Mass_g / MW_per_molecule) × Avogadro's Number` |
| Amplification Efficiency     | `E = (10^(log10(Dilution) / ΔCt)) - 1`          |

---

### Flow Cytometry & Centrifugation

| Calculation     | Formula                                    |
|-----------------|--------------------------------------------|
| RCF (× g)       | `RCF = 1.118 × 10^-5 × r_cm × (RPM)^2`     |
| RPM             | `RPM = sqrt(RCF / (1.118 × 10^-5 × r_cm))` |

---

### pH & Osmolarity

| Calculation            | Formula                                    |
|------------------------|--------------------------------------------|
| Henderson-Hasselbalch  | `pH = pKa + log10([A-] / [HA])`           |
| Osmolarity             | `Osm = Molarity × i` (van 't Hoff factor) |

---

### Enzyme Kinetics & Activity

| Calculation         | Formula                                    |
|---------------------|--------------------------------------------|
| Enzyme Activity     | `Activity (U/mL) = Product (µmol) / (Time (min) × Volume (mL))` |
| Lineweaver-Burk     | `1/v = (Km/Vmax)(1/[S]) + 1/Vmax`          |

---

### Statistical Analysis

| Calculation          | Formula                                         |
|----------------------|-------------------------------------------------|
| Mean                 | `Mean = Σx_i / n`                               |
| Standard Deviation   | `SD = sqrt(Σ(x_i - x̄)^2 / (n-1))`              |
| Standard Error       | `SE = SD / sqrt(n)`                             |

---

## 🔄 Common Unit Conversions

| Quantity      | Conversion                          |
|---------------|-------------------------------------|
| Volume        | `1 L = 1000 mL = 1,000,000 µL`      |
| Concentration | `1 M = 1000 mM = 1,000,000 µM`      |
| Mass          | `1 g = 1000 mg = 1,000,000 µg`      |
| Amount        | `1 mol = 1000 mmol = 1,000,000 µmol`|
| Temperature   | `°C = (°F - 32) × 5/9; K = °C + 273.15` |
| Pressure      | `1 atm = 760 mmHg = 101.325 kPa`    |

---

## 🧷 Laboratory Constants

| Constant              | Value                              |
|-----------------------|------------------------------------|
| Avogadro's Number     | `6.022 × 10^23 mol⁻¹`              |
| Gas Constant          | `8.314 J/(mol·K)`                  |
| Faraday Constant      | `96,485 C/mol`                     |
| Planck Constant       | `6.626 × 10^-34 J·s`               |
| dsDNA Quant           | `50 µg/mL per A260 unit`           |
| RNA Quant             | `40 µg/mL per A260 unit`           |
| ssDNA Quant           | `33 µg/mL per A260 unit`           |

---

> **Created for laboratory professionals, researchers, and students. All calculations follow standard laboratory practices.**

---

## 📖 More: Calculator Explanations

For a detailed explanation of every calculator and function, see
[Calculator Explanations](./docs/README_Calculator_Explanations.md)

This document provides the scientific background, use cases, and formula logic for every tool in CalcuLab.

---

## 📄 License

[MIT](LICENSE)
