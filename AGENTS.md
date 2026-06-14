# AGENTS.md — CalcuLab

Compact instructions to help future OpenCode sessions avoid errors and ramp up quickly.

## ⚡ Essential Commands
- `npm install` — Installs local dependencies. Standard `package-lock.json` is tracked.
- `npm run dev` — Starts Vite dev server (HMR) on http://localhost:5173.
- `npm run build` — Compiles production bundle into `dist/`.
- `npm run lint` — Runs ESLint on all `.js`/`.jsx` files (excluding `legacy/` and `dist/`).
- `npm run lint -- --fix` — Automatically corrects style violations.
- `npm run test:run` — Executes all Vitest math tests once.
- `npm run test:run -- src/test/calculators.test.js` — Runs a specific test file.

---

## 🏗️ Core Architecture & Boundaries
* **Pure Client-Side React 19 + Vite.** No TypeScript, no backend, no database.
* **Entry Point:** `src/main.jsx` (initializes routing and mounting).
* **Dashboard Router & Modal Manager:** `src/App.jsx` registers calculators, handles global status state, and mounts modals.
* **Dashboard Categories Config:** `src/utils/calculatorConfig.js` determines which calculators map to which panel sections.
* **Landing Page Config:** `src/pages/landingConfig.js` toggles sections and copy. **Do not edit `LandingPage.jsx` directly.**
* **Legacy Prototype:** Directory `legacy/` is deprecated and must not be imported or referenced by current code.

---

## 📜 Calculator Component Contract
All components under `src/calculators/` must strictly implement this contract:
1. **Props:** Accept `{ onClose, onStatusUpdate }`.
2. **Global Status Feedback:** Call `onStatusUpdate(message, color)` on success (green/`#28a745`) and failure (red/`#dc3545`).
3. **Modal Scrolling Bindings:** Wrap results in a `className="result"` div and errors in a `className="error"` div. The `<Modal>` container uses a `MutationObserver` to automatically scroll these classes into view.
4. **Shared Unit Input:** Always use the `<UnitInput />` component for inputs with units.

---

## 🧪 Testing Guidelines
* **Pure Math Verification:** Tests (in `src/test/`) check mathematical formula correctness only. Do not mount React components or perform DOM interactions.
* **Vitest Global Context:** Globals are configured (`globals: true`). Do not import `describe`, `it`, or `expect` inside test files.

---

## ⚠️ High-Signal Conventions & Gotchas
* **`μ` Unicode Sign:** For micro-units, always use the **micro sign `μ`** (U+00B5), **not** the Greek mu `μ` (U+03BC). Metric scale conversion and `UnitInput` matching will fail if the incorrect Unicode symbol is used.
* **No TypeScript:** There is no `tsconfig.json`. React imports are standard JS/JSX.
* **Style Rules:** ESLint is configured with `varsIgnorePattern: '^[A-Z_]'` allowing unused uppercase variables (constants and component imports).
* **Design Standards:** Read `docs/PRODUCT.md` and `docs/DESIGN.md` before making any stylistic changes. Respect the "Digital Lab Notebook" aesthetics: clinical grids, 1px glassware borders, border-radius `<= 16px`, and limited Precision Cobalt (`#007bff` `<= 10%`).
* **CI/CD Pipelines:** Pushes/PRs are validated by GitHub Actions (`.github/workflows/ci.yml`). Merges to `main` deploy automatically to GitHub Pages (`.github/workflows/deploy.yml`) and AWS Amplify (`amplify.yml`).
