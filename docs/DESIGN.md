---
name: CalcuLab
description: Precise, utilitarian browser-based laboratory calculators.
colors:
  primary: "#007bff"
  primary-hover: "#0056b3"
  neutral-bg: "#f0f4f8"
  card-bg: "#ffffff"
  text-dark: "#333333"
  text-muted: "#666666"
  border-color: "#e0e0e0"
  success-color: "#28a745"
  error-bg: "#f8d7da"
  error-text: "#721c24"
  success-bg: "#d4edda"
  success-text: "#155724"
typography:
  display:
    fontFamily: "Outfit, Inter, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "10px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "10px"
  sm: "12px"
  md: "25px"
  lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.card-bg}"
    rounded: "{rounded.md}"
    padding: "12px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: CalcuLab

## 1. Overview

**Creative North Star: "The Digital Lab Notebook"**

CalcuLab replicates the aesthetic clarity and structured layout of a high-quality physical laboratory notebook. The design emphasizes high visual density, clean rectangular lines, and extreme information hierarchy to serve active bench research. Distractions, non-functional embellishments, and over-rounded containers are strictly rejected. Information is bounded by sharp 1px gridlines, mimicking columns of a scientific data sheet, enabling rapid left-to-right eye scanning under harsh overhead fluorescent lab lighting.

**Key Characteristics:**
- High contrast typography for effortless legibility.
- Strict 1px gridlines to segment calculations and units.
- Highly predictable, non-disruptive transitions for active tools.

## 2. Colors

The color palette is built for ultimate precision, restricting saturated colors to active indicators while employing clinical neutrals for layouts.

### Primary
- **Precision Cobalt** (#007bff): The core brand accent. Used selectively (<=10% of any given screen) to call attention to primary buttons, active panels, and computed results.
- **Cobalt Deep** (#0056b3): The hover state for primary triggers.

### Neutral
- **Cleanroom White** (#ffffff): The main canvas surface for modals and active cards.
- **Lab Bench Gray** (#f0f4f8): The background body tint to provide soft, non-glare relief.
- **Graphite Ink** (#333333): High-contrast ink for body text, ensuring a >= 4.5:1 contrast ratio.
- **Faded Ink** (#666666): Secondary text for labels and inactive helpers.
- **Glassware Border** (#e0e0e0): Standard 1px divider and border color.

### Named Rules
**The Rarity Rule.** Precision Cobalt is used exclusively as an interactive beacon. Under no circumstances should more than 10% of a screen use this accent. If everything stands out, nothing stands out.

## 3. Typography

**Display Font:** Outfit (with Inter fallback)
**Body Font:** Inter (with system-ui fallback)

The typographic system pairs the clean geometric authority of Outfit with the highly neutral and legible text rendering of Inter.

### Hierarchy
- **Display** (800 weight, 3rem, 1.1 line-height): Header title branding.
- **Headline** (700 weight, 1.3rem, 1.3 line-height): Calculator panel section titles.
- **Title** (800 weight, 1.8rem, 1.2 line-height): Modal calculator title.
- **Body** (400 weight, 1rem, 1.5 line-height): Explanations, result readouts, and supporting copy. Under 70ch maximum line length.
- **Label** (500 weight, 1rem, 1.2 line-height): Form input labels.

## 4. Elevation

CalcuLab is flat-by-default to ensure structure is conveyed through layout and alignment rather than artificial depth. Soft ambient depth is introduced exclusively to signal container boundaries and active states.

### Shadow Vocabulary
- **Ambient Low** (`box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03)`): Applied to structural calculator panels to anchor them cleanly.
- **Focused Lift** (`box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06)`): Hover response for panels and modals, signaling user focus.

### Named Rules
**The Flat-By-Default Rule.** Layout elements are perfectly flat at rest. Elevation increases only in response to a direct user action (e.g., hovering or activating a modal).

## 5. Components

Components are styled with sharp boundaries and highly descriptive states to prevent bench mistakes.

### Buttons
- **Shape:** Softly-squared edges (10px radius / md)
- **Primary:** Precision Cobalt background, Cleanroom White text, 12px padding.
- **Hover / Focus:** Cobalt Deep background with crisp border transitions.

### Cards / Containers
- **Corner Style:** Bounded radius (16px radius / lg)
- **Background:** Cleanroom White for active modulators, Lab Bench Gray for layout panels.
- **Shadow Strategy:** Flat at rest, applying Focused Lift only on interaction.
- **Border:** Delicate glassware border (1px solid #e0e0e0).

### Inputs / Fields
- **Style:** Cleanroom White background, 1px solid #e0e0e0 stroke, 10px radius.
- **Focus:** Crisp focus borders matching the active calculator theme.
- **Error:** Clinical red warning (#721c24 text, #f8d7da background).

## 6. Do's and Don'ts

### Do:
- **Do** maintain a minimum contrast ratio of 4.5:1 on all input helper labels and placeholders.
- **Do** align the unit selection dropdown perfectly alongside the numeric input.
- **Do** use `formatWithSIPrefix()` to display results cleanly with scientific notation where appropriate.

### Don't:
- **Don't** use border-left or border-right greater than 1px as a colored stripe on cards or inputs.
- **Don't** use gradient text under any circumstances.
- **Don't** use overly round corners (e.g., card corner radius > 16px).
- **Don't** import or reference code inside `/legacy/` to maintain a modern React 19 codebase.
