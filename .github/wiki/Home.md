# CalcuLab Wiki

CalcuLab is a browser-based toolkit of **39 molecular biology and biochemistry calculators**. Everything runs client-side in React 19 — no backend, no database, no API calls. Calculations execute instantly in the browser.

**Live site:** [calculab.bio](https://www.calculab.bio/)  
**Source:** [github.com/yuvalkolodkingal/Calculab](https://github.com/yuvalkolodkingal/Calculab)

---

## Architecture at a glance

![CalcuLab tech stack and file structure](https://raw.githubusercontent.com/yuvalkolodkingal/Calculab/main/docs/diagrams/calcuLab-tech-stack-structure.png)

The diagram maps how the tech stack, source directories, and deployment pipeline fit together. For a walkthrough of each layer, see [Architecture & File Structure](Architecture-and-File-Structure). The editable source lives in [FigJam](https://www.figma.com/board/TWSia3F77eh4wc9PIoq7bg).

---

## Documentation

| Page | What you'll find |
|------|------------------|
| [Architecture & File Structure](Architecture-and-File-Structure) | Tech stack, directory layout, routing, CI/CD, and how data flows through the app |
| [Developer Setup](Developer-Setup) | Clone, install, run, test, lint, build, and open a pull request |
| [Calculator Component Contract](Calculator-Component-Contract) | Required props, DOM classes, and shared components every calculator must use |
| [Mathematical Formulas](Mathematical-Formulas) | Scientific formulas, constants, and unit conversions implemented in the app |

---

## Quick start

```bash
git clone https://github.com/yuvalkolodkingal/Calculab
cd Calculab
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Before submitting changes, run:

```bash
npm run lint && npm run test:run && npm run build
```

---

## Key facts

- **39 calculators** across solution prep, spectrophotometry, cell culture, PCR/qPCR, flow cytometry, and enzyme kinetics
- **Pure client-side** — all math runs in the browser; nothing is sent to a server
- **PWA** — installable and usable offline via service worker assets in `public/`
- **Math-only tests** — Vitest verifies formulas without mounting React components
- **Dual deployment** — GitHub Pages and AWS Amplify on every merge to `main`

---

## Related docs in the repo

These live under `docs/` in the main repository and are not synced to this wiki:

- [Calculator Explanations](https://github.com/yuvalkolodkingal/Calculab/blob/main/docs/README_Calculator_Explanations.md) — scientific background for every tool
- [Developer Guide](https://github.com/yuvalkolodkingal/Calculab/blob/main/docs/DEVELOPER_GUIDE.md) — extended contributor reference
- [Design System](https://github.com/yuvalkolodkingal/Calculab/blob/main/docs/DESIGN.md) — visual standards ("Digital Lab Notebook")
- [Product Overview](https://github.com/yuvalkolodkingal/Calculab/blob/main/docs/PRODUCT.md) — product goals and UX principles
