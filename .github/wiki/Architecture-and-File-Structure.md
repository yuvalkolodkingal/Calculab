# Architecture & File Structure

CalcuLab is a single-page React application bundled by Vite and deployed as static files. There is no server-side logic, no database, and no external API dependency for calculations.

---

## Tech stack

| Layer | Technology | Role |
|-------|------------|------|
| UI | React 19 | Component model, state, and rendering |
| Routing | React Router 7 | Landing page route and dashboard navigation |
| Build | Vite 7 | Dev server (HMR), production bundling to `dist/` |
| Icons | Lucide React | UI icons (e.g. GitHub link in header) |
| Testing | Vitest 4 + jsdom | Pure math formula verification |
| Linting | ESLint 9 | Code style for `.js` / `.jsx` files |
| Deploy | GitHub Actions | CI on every push/PR; deploy on merge to `main` |
| Hosting | GitHub Pages + AWS Amplify | Static hosting of the production bundle |
| PWA | Service worker (`public/sw.js`) | Offline caching and installability |

---

## Architecture diagram

![CalcuLab tech stack and file structure](https://raw.githubusercontent.com/yuvalkolodkingal/Calculab/main/docs/diagrams/calcuLab-tech-stack-structure.png)

**Editable source:** [FigJam board](https://www.figma.com/board/TWSia3F77eh4wc9PIoq7bg)  
**Repo copy:** `docs/diagrams/calcuLab-tech-stack-structure.png`

---

## Request and render flow

```
index.html
    └── src/main.jsx          BrowserRouter + React root
            └── src/App.jsx   Routes, modal manager, status bar
                    ├── pages/LandingPage.jsx     Marketing / entry
                    └── Dashboard                   Calculator panels
                            └── calculators/*.jsx   Opened inside Modal
```

1. **`index.html`** loads the Vite bundle and mounts React on `#root`.
2. **`src/main.jsx`** wraps the app in `BrowserRouter` with the Vite `BASE_URL` basename.
3. **`src/App.jsx`** is the central hub: it registers all 39 calculators, renders dashboard panels from config, manages the global status bar, and opens calculators in a `<Modal>`.
4. **Calculator components** read user input, call pure functions from `src/utils/mathUtils.js`, and render results inside `.result` or `.error` containers.

---

## Directory structure

```text
Calculab/
├── .github/
│   ├── wiki/                  Wiki source (synced to GitHub Wiki on push)
│   └── workflows/
│       ├── ci.yml             Lint, test, build on push/PR
│       ├── deploy.yml         Build and deploy to GitHub Pages
│       ├── wiki-sync.yml      Push .github/wiki/ to GitHub Wiki
│       └── mirror.yml         Mirror to Codeberg
├── docs/
│   ├── diagrams/              Architecture diagrams (PNG + SVG)
│   ├── DESIGN.md              Visual design system
│   ├── PRODUCT.md             Product goals and UX
│   └── DEVELOPER_GUIDE.md     Extended contributor guide
├── public/                    Static assets served as-is
│   ├── sw.js                  Service worker
│   ├── manifest.json          PWA manifest
│   └── logo.svg               Brand assets
├── src/
│   ├── main.jsx               App entry point
│   ├── App.jsx                Router, modal manager, calculator registry
│   ├── index.css              Global styles
│   ├── calculators/           39 calculator components (one file each)
│   ├── components/
│   │   ├── Modal.jsx          Overlay with auto-scroll MutationObserver
│   │   ├── UnitInput.jsx      Unit-aware numeric input
│   │   └── ScrollToTop.jsx    Route change scroll reset
│   ├── pages/
│   │   ├── LandingPage.jsx    Marketing landing page
│   │   └── landingConfig.js   Landing page copy and section toggles
│   ├── utils/
│   │   ├── calculatorConfig.js  Panel layout and calculator IDs
│   │   └── mathUtils.js         Shared math, SI formatting, regression
│   └── test/
│       ├── calculators.test.js  Formula correctness tests
│       └── mathUtils.test.js    Utility function tests
├── amplify.yml                AWS Amplify build config
├── vite.config.js             Vite configuration
├── vitest.config.js           Test runner configuration
├── eslint.config.js           ESLint rules
└── package.json               Dependencies and npm scripts
```

The `legacy/` directory contains a deprecated prototype and must not be imported by current code.

---

## How calculators are wired

Adding a calculator touches three places:

| Step | File | Action |
|------|------|--------|
| 1 | `src/calculators/MyCalculator.jsx` | Create the component (see [Calculator Component Contract](Calculator-Component-Contract)) |
| 2 | `src/App.jsx` | Import and register in `calculatorComponents` map |
| 3 | `src/utils/calculatorConfig.js` | Add `{ id, name }` to the appropriate panel in `calculatorPanels` |

Panel categories (from `calculatorConfig.js`):

- Solution Preparation
- Dilutions & Concentrations
- Spectrophotometry & Analysis
- Cell Culture & Microbiology
- PCR & Molecular Biology
- qPCR Analysis
- Flow Cytometry & Centrifugation
- Additional Tools

---

## CI/CD pipeline

### Continuous integration (`ci.yml`)

Triggered on every push and pull request to `main`/`master`:

1. `npm ci` — install locked dependencies
2. `npm run lint` — ESLint
3. `npm run test:run` — Vitest (math only)
4. `npm run build` — Vite production build

### Deployment (`deploy.yml`)

Triggered on push to `main`:

1. Runs the same lint, test, and build steps
2. Uploads `dist/` as a GitHub Pages artifact
3. Deploys to GitHub Pages

AWS Amplify uses `amplify.yml` for a parallel deployment path.

---

## Design constraints worth knowing

- **Landing page copy** is controlled by `src/pages/landingConfig.js` — edit config, not `LandingPage.jsx` directly.
- **Micro sign** — always use `μ` (U+00B5 micro sign), not Greek mu `μ` (U+03BC), in unit strings. Wrong characters break `UnitInput` matching.
- **No TypeScript** — the project is plain JavaScript/JSX.
- **Modal scrolling** — results must use `className="result"` and errors `className="error"` so the Modal's MutationObserver can scroll them into view.
