# Developer Setup

This guide covers local development from clone to pull request. For architecture context, see [Architecture & File Structure](Architecture-and-File-Structure).

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 LTS or higher |
| npm | 10 or higher |

---

## 1. Clone and install

```bash
git clone https://github.com/yuvalkolodkingal/Calculab
cd Calculab
npm install
```

`package-lock.json` is tracked — use `npm install` locally and `npm ci` in CI.

---

## 2. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite provides hot module replacement, so calculator and component edits reload instantly.

---

## 3. Available commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production bundle to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint on all `.js`/`.jsx` (excludes `legacy/`, `dist/`) |
| `npm run lint -- --fix` | Auto-fix lint violations |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Vitest once (CI style) |

---

## 4. Pre-PR checklist

Run all three before opening a pull request:

```bash
npm run lint && npm run test:run && npm run build
```

GitHub Actions runs the same checks on every push and PR via `.github/workflows/ci.yml`.

---

## 5. Adding a new calculator

### Step 1 — Create the component

Add `src/calculators/MyCalculator.jsx` following the [Calculator Component Contract](Calculator-Component-Contract). Use `<UnitInput />` for unit-aware fields and `formatWithSIPrefix()` from `mathUtils.js` for output.

### Step 2 — Register in App.jsx

```javascript
import MyCalculator from './calculators/MyCalculator';

const calculatorComponents = {
  // ...existing entries
  myCalculator: MyCalculator,
};
```

### Step 3 — Add to panel config

In `src/utils/calculatorConfig.js`, add an entry to the appropriate panel:

```javascript
{ id: 'myCalculator', name: 'My Calculator' },
```

The `id` must match the key in `calculatorComponents`.

### Step 4 — Write math tests

Add formula tests to `src/test/calculators.test.js`. Tests verify math only — do not mount React components or interact with the DOM.

```javascript
describe('My Calculator Formula', () => {
  it('computes the expected value', () => {
    const input = 5;
    expect(input * 2).toBe(10);
  });
});
```

### Step 5 — Verify

```bash
npm run lint && npm run test:run && npm run build
```

---

## 6. Testing philosophy

CalcuLab tests **mathematical correctness**, not UI behavior.

- Tests live in `src/test/`
- Vitest globals (`describe`, `it`, `expect`) are configured — no imports needed
- Focus on edge cases: zero inputs, negative values, division by zero, unit conversions
- Do not mount React components in tests

Run a single test file:

```bash
npm run test:run -- src/test/calculators.test.js
```

---

## 7. Landing page changes

Landing page content and section visibility are controlled by `src/pages/landingConfig.js`. Do not edit `LandingPage.jsx` directly unless you are changing layout structure.

---

## 8. Design and product references

Before making visual changes, read:

- `docs/DESIGN.md` — "Digital Lab Notebook" aesthetic, grid lines, border-radius limits, Precision Cobalt accent (`#007bff`, ≤ 10% of UI)
- `docs/PRODUCT.md` — product goals and UX principles

---

## 9. CI/CD overview

| Workflow | Trigger | Action |
|----------|---------|--------|
| `ci.yml` | Push/PR to `main` | Lint, test, build |
| `deploy.yml` | Push to `main` | Build and deploy to GitHub Pages |
| `wiki-sync.yml` | Push to `main` (`.github/wiki/**`) | Sync wiki source to GitHub Wiki |
| `mirror.yml` | Push to `main` | Mirror to Codeberg |

Production URL: [calculab.bio](https://www.calculab.bio/)  
Codeberg mirror: [codeberg.org/YuvalKolodkin/Calculab](https://codeberg.org/YuvalKolodkin/Calculab)
