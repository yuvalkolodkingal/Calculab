# Developer Setup & Guidelines 💻

Follow this guide to check out the CalcuLab source, run local development servers, write tests, and verify lint rules.

---

## 🛠️ Local Installation

### Prerequisites
* **Node.js:** v20 (LTS) or higher
* **npm:** v10 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/yuvalkolodkingal/Calculab
cd Calculab
```

### 2. Install Dependencies
Install all package dependencies. Note that the `package-lock.json` file is tracked in git for lock consistency.
```bash
npm install
```

### 3. Run Development Server
Launches the Vite HMR (Hot Module Replacement) development server locally.
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🧪 Running Tests & Lints

CalcuLab implements zero-DOM math correctness testing. Our focus is on absolute calculation reliability.

### 1. Running Unit Tests
We use **Vitest** for testing:
* **Interactive watch mode (for active development):**
  ```bash
  npm test
  ```
* **Run once (CI style):**
  ```bash
  npm run test:run
  ```

### 2. Running Lint Rules
We enforce strict ESLint guidelines on all `.js` and `.jsx` files:
```bash
# Check code style rules
npm run lint

# Auto-fix fixable stylistic issues
npm run lint -- --fix
```

### 3. Verification Checklist Before Pull Requests
Ensure all three checks succeed locally before opening a pull request:
```bash
npm run lint && npm run test:run && npm run build
```

---

## 🚀 GitHub Actions CI/CD Workflows

Every commit pushed to a pull request or the `main` branch undergoes automated validation.

* **Continuous Integration (`ci.yml`):** Automatically triggered on all pushes and pull requests. Installs dependencies (`npm ci`), runs ESLint audits, runs Vitest suites, and runs the Vite build to confirm compilation.
* **Continuous Deployment (`deploy.yml`):** Triggered on pushes to `main`. Automatically compiles the production assets and deploys them to **GitHub Pages**.
