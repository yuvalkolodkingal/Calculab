# Mathematical Formulas

Reference for the scientific formulas, constants, and unit conversions implemented across CalcuLab's 39 calculators. For calculator-specific context and use cases, see the [Calculator Explanations](https://github.com/yuvalkolodkingal/Calculab/blob/main/docs/README_Calculator_Explanations.md) doc in the main repository.

---

## Solution Preparation & Dilutions

### Mass from molarity

$$\text{Mass (g)} = \text{Molarity (mol/L)} \times \text{Volume (L)} \times \text{Molecular Weight (g/mol)}$$

### C₁V₁ = C₂V₂ dilution

$$C_1 \times V_1 = C_2 \times V_2$$

### Molality

$$b = \frac{n_{\text{solute}}}{\text{Mass}_{\text{solvent}} \text{ (kg)}}$$

### Percent solutions

**Weight/volume (w/v):**

$$\text{Mass (g)} = \frac{\%_{\text{w/v}}}{100} \times \text{Volume (mL)}$$

**Volume/volume (v/v):**

$$\text{Volume of Solute (mL)} = \frac{\%_{\text{v/v}}}{100} \times \text{Total Volume (mL)}$$

---

## Spectrophotometry & Quantification

### Beer-Lambert law

$$A = \varepsilon \times c \times l$$

Where $A$ is absorbance, $\varepsilon$ is molar attenuation coefficient (L·mol⁻¹·cm⁻¹), $c$ is concentration (mol·L⁻¹), and $l$ is path length (cm).

### Nucleic acid quantification (A260)

$$\text{Concentration (μg/mL)} = A_{260} \times \text{Factor} \times \text{Dilution Factor}$$

| Nucleic acid | Factor |
|--------------|--------|
| dsDNA | 50 |
| ssDNA | 33 |
| RNA | 40 |

### Purity ratio (A260/A280)

Pure DNA ≈ 1.8; pure RNA ≈ 2.0.

### Protein A280

$$\text{Concentration (mg/mL)} = \frac{A_{280}}{l \text{ (cm)}}$$

### Bradford assay

$$\text{Concentration} = \frac{A_{595} - \text{Intercept}}{\text{Slope}}$$

---

## Cell Culture & Microbiology

### Hemocytometer count

$$\text{Cells/mL} = \frac{\text{Total Cells Counted}}{\text{Number of Squares}} \times \text{Dilution Factor} \times 10^4$$

(Assumes 0.1 mm³ volume per large square.)

### Seeding volume

$$\text{Volume to Seed (mL)} = \frac{\text{Target Number of Cells}}{\text{Stock Concentration (cells/mL)}}$$

### CFU/mL

$$\text{CFU/mL} = \frac{\text{Colonies Counted} \times \text{Dilution Factor}}{\text{Volume Plated (mL)}}$$

---

## PCR & qPCR Analysis

### ΔCt and ΔΔCt

$$\Delta C_T = C_{T,\text{target}} - C_{T,\text{reference}}$$

$$\Delta\Delta C_T = \Delta C_{T,\text{test}} - \Delta C_{T,\text{control}}$$

$$\text{Fold Change} = 2^{-\Delta\Delta C_T}$$

### Amplification efficiency from slope

$$E = 10^{-1/\text{Slope}} - 1$$

Ideal qPCR: slope ≈ −3.32, efficiency ≈ 100% ($E = 1.0$).

### Pfaffl method

$$\text{Ratio} = \frac{(E_{\text{target}})^{-\Delta C_{T,\text{target}}}}{(E_{\text{reference}})^{-\Delta C_{T,\text{reference}}}}$$

### Copy number from Ct (standard curve)

$$\log_{10}(\text{Copies}) = \frac{C_T - \text{Intercept}}{\text{Slope}}$$

### Copy number from mass

$$\text{Copies} = \frac{\text{Mass (g)}}{\text{MW per molecule}} \times N_A$$

---

## Centrifugation

### RCF and RPM conversion

$$\text{RCF (× g)} = 1.118 \times 10^{-5} \times r \text{ (cm)} \times (\text{RPM})^2$$

$$\text{RPM} = \sqrt{\frac{\text{RCF}}{1.118 \times 10^{-5} \times r \text{ (cm)}}}$$

---

## pH & Osmolarity

### Henderson-Hasselbalch

$$\text{pH} = \text{p}K_a + \log_{10}\left(\frac{[\text{A}^-]}{[\text{HA}]}\right)$$

### Osmolarity

$$\text{Osmolarity} = \text{Molarity} \times i$$

Where $i$ is the van 't Hoff factor.

---

## Enzyme kinetics

### Enzyme activity

$$\text{Activity (U/mL)} = \frac{\text{Product (μmol)}}{\text{Time (min)} \times \text{Volume (mL)}}$$

### Lineweaver-Burk (Michaelis-Menten linearization)

$$\frac{1}{v} = \frac{K_m}{V_{\max}}\left(\frac{1}{[S]}\right) + \frac{1}{V_{\max}}$$

---

## Statistical analysis

| Statistic | Formula |
|-----------|---------|
| Mean | $\bar{x} = \frac{\sum x_i}{n}$ |
| Standard deviation | $s = \sqrt{\frac{\sum(x_i - \bar{x})^2}{n - 1}}$ |
| Standard error | $\text{SE} = \frac{s}{\sqrt{n}}$ |

---

## SI metric prefixes

| Prefix | Symbol | Factor |
|--------|--------|--------|
| Mega | M | $10^6$ |
| Kilo | k | $10^3$ |
| (base) | — | $10^0$ |
| Milli | m | $10^{-3}$ |
| Micro | μ | $10^{-6}$ |
| Nano | n | $10^{-9}$ |
| Pico | p | $10^{-12}$ |

---

## Physical constants

| Constant | Value |
|----------|-------|
| Avogadro's number ($N_A$) | $6.022 \times 10^{23}$ mol⁻¹ |
| Gas constant ($R$) | $8.314$ J/(mol·K) |
| Faraday constant | $96{,}485$ C/mol |
| Planck constant ($h$) | $6.626 \times 10^{-34}$ J·s |

---

## Common unit conversions

| Quantity | Conversion |
|----------|------------|
| Volume | 1 L = 1000 mL = 1,000,000 μL |
| Concentration | 1 M = 1000 mM = 1,000,000 μM |
| Mass | 1 g = 1000 mg = 1,000,000 μg |
| Amount | 1 mol = 1000 mmol = 1,000,000 μmol |
| Temperature | °C = (°F − 32) × 5/9; K = °C + 273.15 |
| Pressure | 1 atm = 760 mmHg = 101.325 kPa |
