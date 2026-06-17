export const colors = {
  primary: "#007bff",
  primaryHover: "#0056b3",
  bg: "#f0f4f8",
  card: "#ffffff",
  text: "#333333",
  muted: "#666666",
  border: "#e0e0e0",
  success: "#28a745",
  successBg: "#d4edda",
  successText: "#155724",
} as const;

export const panelColors = [
  "hsl(210, 100%, 50%)",
  "hsl(200, 100%, 42%)",
  "hsl(195, 100%, 45%)",
  "hsl(150, 100%, 40%)",
  "hsl(270, 100%, 60%)",
  "hsl(255, 100%, 55%)",
  "hsl(330, 100%, 50%)",
  "hsl(30, 100%, 50%)",
  "hsl(170, 100%, 38%)",
] as const;

/** Mirrors src/utils/calculatorConfig.js — all calculators & reference tools */
export const calculatorPanels = [
  {
    title: "Solution Preparation",
    tools: [
      "Molar Mass",
      "Percent Solution",
      "Molality",
      "Osmolarity",
      "Henderson-Hasselbalch",
    ],
  },
  {
    title: "Dilutions & Concentrations",
    tools: [
      "C1V1 Dilution",
      "Serial Dilution",
      "Flow Dilution",
      "mg/L to ppm",
      "Mass to Molar",
      "Molar to Mass",
    ],
  },
  {
    title: "Spectrophotometry & Analysis",
    tools: [
      "Beer-Lambert Law",
      "Nucleic Acid A260",
      "Purity Ratio A260/A280",
      "Protein A280",
      "Bradford Assay",
    ],
  },
  {
    title: "Cell Culture & Microbiology",
    tools: [
      "Hemocytometer Count",
      "Seeding Volume",
      "Split Ratio",
      "CFU Calculation",
      "Enzyme Activity",
    ],
  },
  {
    title: "PCR & Molecular Biology",
    tools: [
      "PCR Master Mix",
      "Primer Reconstitution",
      "Delta Ct",
      "Delta Delta Ct",
      "Fold Change",
      "Pfaffl Ratio",
    ],
  },
  {
    title: "qPCR Analysis",
    tools: [
      "Standard Curve Analysis",
      "Efficiency from Slope",
      "Copy Number (Ct)",
      "Copy Number (Mass/Length)",
      "Amplification Efficiency",
    ],
  },
  {
    title: "Flow Cytometry & Centrifugation",
    tools: ["Bead Count", "RPM to RCF", "RCF to RPM", "Basic Statistics"],
  },
  {
    title: "Additional Tools",
    tools: [
      "Michaelis-Menten",
      "Formula Reference",
      "Unit Conversions",
      "Laboratory Constants",
      "DNA Reverse Complement",
    ],
  },
  {
    title: "Utilities & Help",
    tools: ["Batch Calculator", "About CalcuLab"],
  },
] as const;

export const benefits = [
  { label: "39+ Calculators", detail: "Molecular biology & biochemistry" },
  { label: "100% Free", detail: "No account required" },
  { label: "Browser-Based", detail: "Works on any device" },
  { label: "Offline Ready", detail: "PWA with full caching" },
] as const;
