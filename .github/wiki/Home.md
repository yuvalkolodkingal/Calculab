# Welcome to the CalcuLab Wiki! 🧪

**CalcuLab** is a browser-based, client-side suite of 39 molecular biology and biochemistry calculators. Designed for laboratory professionals, researchers, and students, it runs entirely in the browser using React 19 and Vite with zero backend or API dependencies.

This Wiki serves as the official documentation portal for the project, detailing scientific formulas, developer standards, component integration, and contribution guidelines.

---

## 🗺️ Documentation Portal

### [🔬 Mathematical Formulas](Mathematical-Formulas)
A complete scientific reference sheet of the formulas, constants, and unit conversion models implemented in CalcuLab. Covers dilutions, qPCR, spectrophotometry, cell culture, and enzyme kinetics.

### [📜 Calculator Component Contract](Calculator-Component-Contract)
A guide to the technical contract and interface specifications that all 39 calculator components in CalcuLab must implement to integrate into the dashboard.

### [💻 Developer Setup & Guidelines](Developer-Setup)
Step-by-step instructions for checking out the codebase, setting up local development servers, running test suites (Vitest), and preparing pull requests.

---

## 📦 Core Architecture Highlights

* **Pure Client-Side React 19:** Instantaneous computation with zero server latency or database round-trips.
* **Progressive Web App (PWA):** Installable directly on mobile and desktop platforms, working offline for critical calculations inside containment or low-connectivity lab environments.
* **Extensible Architecture:** Adding a calculator takes just 5 minutes of writing standard React state/logic and registering it on the dashboard config.
* **Math-Only Test Suites:** Comprehensive math verification tests covering over 120+ calculation test cases.
