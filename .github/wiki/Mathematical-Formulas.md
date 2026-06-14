# Mathematical Formulas & scientific references 🔬

This page details the scientific background, formulas, constants, and standard conversions implemented across CalcuLab's 39 calculators. All mathematical models are peer-referenced and follow standard molecular biochemistry protocols.

---

## 🧪 Solution Preparation & Dilutions

### 1. Mass from Molarity
Calculates the absolute weight in grams of solute required to prepare a solution of a given volume and molarity.
$$\text{Mass (g)} = \text{Molarity (mol/L)} \times \text{Volume (L)} \times \text{Molecular Weight (g/mol)}$$

### 2. $C_1V_1 = C_2V_2$ Dilutions
The fundamental conservation equation for diluting stock solutions.
$$C_1 \times V_1 = C_2 \times V_2$$
*Where $C_1, V_1$ represent initial concentration/volume, and $C_2, V_2$ represent target concentration/volume.*

### 3. Molality
Calculates moles of solute per kilogram of solvent (temperature-independent concentration scale).
$$b = \frac{n_{\text{solute}}}{\text{Mass}_{\text{solvent}} \text{ (kg)}}$$

### 4. Percent Solutions
* **Weight/Volume (w/v):** 
  $$\text{Mass (g)} = \frac{\%_{\text{w/v}}}{100} \times \text{Volume (mL)}$$
* **Volume/Volume (v/v):** 
  $$\text{Volume of Solute (mL)} = \frac{\%_{\text{v/v}}}{100} \times \text{Total Volume (mL)}$$

---

## 📊 Spectrophotometry & Quantification

### 1. Beer-Lambert Law
Relates the absorption of light to the properties of the material through which the light is traveling.
$$A = \varepsilon \times c \times l$$
*Where $A$ is absorbance (dimensionless), $\varepsilon$ is molar attenuation coefficient ($\text{L}\cdot\text{mol}^{-1}\cdot\text{cm}^{-1}$), $c$ is concentration ($\text{mol}\cdot\text{L}^{-1}$), and $l$ is optical path length ($\text{cm}$).*

### 2. Nucleic Acid Quantification (A260)
Estimates nucleic acid concentrations from UV absorbance measurements at 260 nm.
$$\text{Concentration (}\mu\text{g/mL)} = A_{260} \times \text{Multiplier} \times \text{Dilution Factor}$$
* **dsDNA Multiplier:** 50
* **ssDNA Multiplier:** 33
* **RNA Multiplier:** 40

### 3. Purity Ratios (A260/A280)
Measures the purity of nucleic acids. Standard pure DNA has an $A_{260}/A_{280}$ ratio of $\approx 1.8$; pure RNA has $\approx 2.0$.

---

## 🧫 Cell Culture & Microbiology

### 1. Hemocytometer Cell Concentration
Calculates cell density from grids of a standard hemocytometer chamber (assuming $0.1\text{ mm}^3$ volume per large square).
$$\text{Cells/mL} = \frac{\text{Total Cells Counted}}{\text{Number of Squares}} \times \text{Dilution Factor} \times 10^4$$

### 2. Seeding Volume
Determines the volume of a cell stock solution required to seed a target number of cells into a culture vessel.
$$\text{Volume to Seed (mL)} = \frac{\text{Target Number of Cells}}{\text{Stock Concentration (cells/mL)}}$$

### 3. Colony Forming Units (CFU/mL)
Determines viable bacterial cell counts from plate inoculation.
$$\text{CFU/mL} = \frac{\text{Colonies Counted} \times \text{Dilution Factor}}{\text{Volume Plated (mL)}}$$

---

## 🧬 PCR & qPCR Analysis

### 1. Comparative $C_T$ Method ($\Delta\Delta C_T$)
Calculates relative gene expression fold-change from qPCR cycle thresholds.
$$\Delta C_T = C_{T,\text{target}} - C_{T,\text{reference}}$$
$$\Delta\Delta C_T = \Delta C_{T,\text{test}} - \Delta C_{T,\text{control}}$$
$$\text{Fold Change} = 2^{-\Delta\Delta C_T}$$

### 2. Amplification Efficiency (E)
Calculates efficiency from standard curve slopes.
$$E = 10^{-1/\text{Slope}} - 1$$
*An ideal qPCR reaction has a slope of $-3.32$, corresponding to an efficiency of $100\%$ ($E = 1.0$).*

### 3. Pfaffl Method
Calculates relative gene expression ratio taking individual primer amplification efficiencies into account.
$$\text{Ratio} = \frac{(E_{\text{target}})^{-\Delta C_{T,\text{target}}}}{(E_{\text{reference}})^{-\Delta C_{T,\text{reference}}}}$$

---

## 🌀 Centrifugation

### Relative Centrifugal Force (RCF / g-Force)
Converts rotational speed (RPM) to gravitational acceleration (g) based on rotor radius ($r$).
$$\text{RCF (}\times\text{ g)} = 1.118 \times 10^{-5} \times r \text{ (cm)} \times (\text{RPM})^2$$
$$\text{RPM} = \sqrt{\frac{\text{RCF}}{1.118 \times 10^{-5} \times r \text{ (cm)}}}$$

---

## 🧷 Essential Constants & Prefixes

### SI Metric Prefixes
All conversions utilize standardized multiplier scales:

| Prefix | Symbol | Factor |
| :--- | :---: | :---: |
| Mega | M | $10^6$ |
| Kilo | k | $10^3$ |
| (Base) | - | $10^0$ |
| Milli | m | $10^{-3}$ |
| Micro | $\mu$ | $10^{-6}$ |
| Nano | n | $10^{-9}$ |
| Pico | p | $10^{-12}$ |

### Constants
* **Avogadro's Number ($N_A$):** $6.02214076 \times 10^{23}\text{ mol}^{-1}$
* **Gas Constant ($R$):** $8.314462618\text{ J}/(\text{mol}\cdot\text{K})$
* **Planck's Constant ($h$):** $6.62607015 \times 10^{-34}\text{ J}\cdot\text{s}$
