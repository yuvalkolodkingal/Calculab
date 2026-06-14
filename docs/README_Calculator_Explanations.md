# 🧮 CalcuLab: Calculator Explanations

This document provides detailed explanations for each calculator and function available in the CalcuLab project. Use it to understand the scientific background, use cases, and formula logic of every tool.

---

## 🧫 Solution Preparation & Dilutions

**Molarity**  
Calculates the molar concentration (mol/L) of a solution.  
`M = n / V`  
Where `n` is the number of moles of solute, and `V` is the volume (L) of solution.  
*Use for preparing chemical solutions to a precise molar strength.*

**Mass Calculation**  
Finds the mass of solute needed for a given molarity and volume.  
`Mass (g) = M × V × MW`  
Where `MW` is molecular weight.  
*Ensures accurate weighing of solutes for solution prep.*

**Percent Solution (w/v)**  
Calculates required mass for weight/volume percent solutions.  
`Mass (g) = (% / 100) × V_ml`  
*Common for buffers, disinfectants, agar plates.*

**Percent Solution (v/v)**  
Calculates volume of solute for volume/volume percent solutions.  
`Vol Solute (mL) = (% / 100) × V_total`  
*Used for liquid-liquid mixtures, e.g., ethanol in water.*

**Dilution (C1V1 = C2V2)**  
Determines how to dilute a stock solution to a desired concentration.  
`C1V1 = C2V2`  
*Essential for titrations, standard curve prep, enzyme assays.*

**Molality**  
Calculates molality (mol/kg solvent).  
`m = n_solute / mass_solvent_kg`  
*Used in physical chemistry, colligative properties.*

---

## 🔬 Spectrophotometry & Quantification

**Beer-Lambert Law**  
Relates absorbance to concentration.  
`A = ε × c × l`  
Where `A` is absorbance, `ε` is molar extinction coefficient, `c` is concentration, `l` is path length.  
*Used for quantifying DNA, RNA, protein, chemicals in solution.*

**Nucleic Acid Concentration**  
Calculates DNA/RNA concentration from absorbance.  
`Conc (µg/mL) = A260 × Factor × Dilution`  
*Factor: 50 for dsDNA, 40 for RNA, 33 for ssDNA.*  
*Fast quantification after extraction or purification.*

**Purity Ratio**  
Checks nucleic acid purity.  
`A260 / A280`  
*Values ~1.8 (DNA) or ~2.0 (RNA) indicate high purity.*

**Protein A280**  
Estimates protein concentration from absorbance at 280 nm.  
`Conc (mg/mL) = A280 / l_cm`  
*Quick protein quantification; less accurate for mixed samples.*

**Bradford Assay**  
Determines protein concentration using dye-binding.  
`Conc = (A595 - Intercept) / Slope`  
*Sensitive, used for crude extracts and purified proteins.*

---

## 🧬 Cell Culture & Microbiology

**Hemocytometer**  
Counts cells/mL using a hemocytometer grid.  
`cells/mL = Count × Dilution × 10^4`  
*Standard for cell culture, yeast, bacteria enumeration.*

**CFU/mL (Colony-Forming Units)**  
Calculates viable cells in a sample.  
`CFU/mL = (Colonies × Dilution) / Volume_plated_mL`  
*Used for microbial quantification in water, food, clinical samples.*

**Cell Seeding**  
Determines volume of culture needed to seed desired cell number.  
`Volume (mL) = Desired Cells / Cell Conc`  
*Critical for setting up experiments with precise cell density.*

**Cell Split**  
Calculates how much culture to transfer for a split ratio.  
`Volume to Transfer = Initial Total Volume / Split Ratio`  
*Maintains healthy cell growth and passage consistency.*

---

## 🧪 PCR & qPCR Analysis

**ΔCt (Delta Ct)**  
Measures relative gene expression.  
`ΔCt = Ct_target - Ct_reference`  
*Compares expression of gene of interest to a reference.*

**ΔΔCt (Delta Delta Ct)**  
Calculates fold change in gene expression between samples.  
`ΔΔCt = ΔCt_test - ΔCt_control`  
*Widely used in qPCR data analysis.*

**Fold Change**  
Determines relative change in gene expression.  
`Fold Change = 2^(-ΔΔCt)`  
*Simple calculation for up/down-regulation.*

**Efficiency (Slope)**  
Estimates PCR efficiency from standard curve slope.  
`E = 10^(-1/Slope) - 1`  
*Should be ~90-110% for good qPCR assays.*

**Pfaffl Ratio**  
Advanced fold change accounting for PCR efficiency.  
`Ratio = (E_target^-ΔCt_target) / (E_ref^-ΔCt_ref)`  
*Improves accuracy when reference/target have different efficiencies.*

**Copy Number (Ct)**  
Estimates number of DNA copies from Ct value.  
`log10(Copies) = (Ct - Intercept) / Slope`  
*Used for viral load, plasmid quantification.*

**Copy Number (Mass/Length)**  
Calculates DNA molecules from mass and length.  
`Copies = (Mass_g / MW_per_molecule) × Avogadro's Number`  
*Useful for standard curve creation and cloning.*

**Amplification Efficiency (from ΔCt and Dilution)**  
Alternative PCR efficiency calculation.  
`E = (10^(log10(Dilution) / ΔCt)) - 1`  
*Checks efficiency between dilutions.*

---

## 🌡️ Flow Cytometry & Centrifugation

**RCF (Relative Centrifugal Force)**  
Converts RPM to g-force.  
`RCF = 1.118 × 10^-5 × r_cm × (RPM)^2`  
*Ensures correct pellet formation and sample separation.*

**RPM**  
Calculates required RPM for a given RCF.  
`RPM = sqrt(RCF / (1.118 × 10^-5 × r_cm))`  
*Used to set centrifuge speed for protocols.*

---

## ⚗️ pH & Osmolarity

**Henderson-Hasselbalch Equation**  
Calculates pH of buffer systems.  
`pH = pKa + log10([A-] / [HA])`  
*Design and adjust buffer solutions for experiments.*

**Osmolarity**  
Determines osmotic strength of solutions.  
`Osm = Molarity × i`  
Where `i` is the van 't Hoff factor.  
*Important for cell culture, physiological solutions.*

---

## 🧫 Enzyme Kinetics & Activity

**Enzyme Activity**  
Calculates enzyme units per mL.  
`Activity (U/mL) = Product (µmol) / (Time (min) × Volume (mL))`  
*Used to characterize enzyme preparations.*

**Lineweaver-Burk Plot**  
Linearizes Michaelis-Menten equation for kinetic analysis.  
`1/v = (Km/Vmax)(1/[S]) + 1/Vmax`  
*Helps determine enzyme kinetics parameters.*

---

## 📊 Statistical Analysis

**Mean**  
Calculates average value.  
`Mean = Σx_i / n`  
*Basic descriptive statistic.*

**Standard Deviation (SD)**  
Measures spread or variability.  
`SD = sqrt(Σ(x_i - x̄)^2 / (n-1))`  
*Indicates data dispersion.*

**Standard Error (SE)**  
Estimates precision of mean.  
`SE = SD / sqrt(n)`  
*Used for error bars, confidence intervals.*

---

## 🔄 Common Unit Conversions

**Volume**  
`1 L = 1000 mL = 1,000,000 µL`  
*Convert between liters, milliliters, microliters.*

**Concentration**  
`1 M = 1000 mM = 1,000,000 µM`  
*Convert between molar, millimolar, micromolar.*

**Mass**  
`1 g = 1000 mg = 1,000,000 µg`  
*Convert between grams, milligrams, micrograms.*

**Amount**  
`1 mol = 1000 mmol = 1,000,000 µmol`  
*Convert between moles, millimoles, micromoles.*

**Temperature**  
`°C = (°F - 32) × 5/9; K = °C + 273.15`  
*Convert between Celsius, Fahrenheit, Kelvin.*

**Pressure**  
`1 atm = 760 mmHg = 101.325 kPa`  
*Convert between atmosphere, mmHg, kilopascals.*

---

## 🧷 Laboratory Constants

**Avogadro's Number**  
`6.022 × 10^23 mol⁻¹`  
*Number of molecules in a mole.*

**Gas Constant**  
`8.314 J/(mol·K)`  
*Physical chemistry calculations.*

**Faraday Constant**  
`96,485 C/mol`  
*Electrochemistry applications.*

**Planck Constant**  
`6.626 × 10^-34 J·s`  
*Quantum mechanics and spectroscopy.*

**dsDNA Quant**  
`50 µg/mL per A260 unit`  
*Used for DNA quantification.*

**RNA Quant**  
`40 µg/mL per A260 unit`  
*Used for RNA quantification.*

**ssDNA Quant**  
`33 µg/mL per A260 unit`  
*Used for single-stranded DNA quantification.*

---

> **This guide explains the logic and scientific background for each calculator and function in Lab-Calculator. For usage, see the main README.**