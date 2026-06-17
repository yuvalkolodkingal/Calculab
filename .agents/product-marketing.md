# Product Marketing Context — CalcuLab

> Auto-generated from codebase research. Keep this file updated as the product evolves.
> Used as pre-read context by ads, ad-creative, co-marketing, and related marketing skills.

---

## Product

**Name:** CalcuLab  
**Tagline:** Accurate Lab Calculations, Fast  
**URL:** https://www.calculab.bio/  
**GitHub:** https://github.com/yuvalkolodkingal/Calculab  
**Contact:** calculab.help@proton.me  

**What it is:** A free, browser-based suite of 39+ verified scientific calculators for molecular biology and biochemistry. Zero signup. Zero backend. Fully client-side React app with offline support (PWA via Service Workers).

**What it replaces:** Manual bench math, Excel spreadsheet templates, and error-prone scratchpad calculations.

---

## Core Value Proposition

> 39 verified molecular biology and biochemistry calculators — free, offline-capable, no login required, no data leaves your browser.

**Key differentiators:**
- **Privacy:** 100% client-side. No data, inputs, or results sent to any server. Critical for labs with proprietary experimental data.
- **Offline-first:** PWA with Service Workers. Works at the bench without internet.
- **Breadth:** 39+ calculators across 9 categories (most competitors cover 1-3 categories).
- **Verified formulas:** Peer-reviewed equations cross-validated against benchmark sources.
- **Zero friction:** No account, no install, no paywall. Open and calculate immediately.
- **SI-unit aware:** All calculators handle unit conversions natively (μ, mM, nmol, etc.).

---

## Calculator Categories (39+ total)

| Category | Count | Flagship Tools |
|----------|-------|----------------|
| Solution Preparation | 5 | Molar Mass, Henderson-Hasselbalch, Osmolarity |
| Dilutions & Concentrations | 6 | C1V1, Serial Dilution, Mass↔Molar |
| Spectrophotometry | 5 | Beer-Lambert, Nucleic Acid A260, Bradford Assay |
| Cell Culture & Microbiology | 5 | Hemocytometer, CFU, Seeding Volume |
| PCR & Molecular Biology | 6 | PCR Master Mix, Primer Reconstitution, ΔCt, ΔΔCt, Fold Change, Pfaffl |
| qPCR Analysis | 5 | Standard Curve, Efficiency from Slope, Copy Number (Ct), Copy Number (Mass) |
| Flow Cytometry & Centrifugation | 4 | Bead Count, RPM↔RCF |
| Enzyme Kinetics | 2 | Michaelis-Menten, Enzyme Activity |
| Additional / Utilities | 7 | DNA Reverse Complement, Unit Conversions, Lab Constants, Batch Calculator |

---

## Ideal Customer Profile (ICP)

**Primary:**
- Graduate students in molecular biology, biochemistry, genetics, cell biology
- Postdoctoral researchers at academic institutions
- Bench scientists at biotech and pharma startups (1–200 employees)

**Secondary:**
- Lab managers and research coordinators overseeing day-to-day protocols
- Undergraduate students in STEM lab courses
- Independent researchers and contract research labs

**Geography:** English-speaking markets first (US, UK, Canada, Australia, Israel). Academic hubs: Boston, San Francisco Bay Area, San Diego, NYC, Seattle.

**Search intent signals:**
- "delta delta ct calculator"
- "C1V1 dilution calculator"
- "serial dilution calculator online"
- "molarity calculator"
- "beer lambert calculator"
- "hemocytometer count calculator"
- "qPCR fold change calculator"
- "bradford assay calculator"

---

## Business Model

- **Free.** No paid tiers, no subscription, no data monetization (all client-side).
- **Stage:** Pre-revenue, bootstrapped. Growth goal = traffic + brand awareness in the scientific community.
- **Monetization path (potential):** Sponsored features, institutional licensing, premium export/batch features, or lab notebook integrations.

---

## Brand Voice

- **Clinical and precise.** The voice of a knowledgeable lab assistant, not a startup marketer.
- **Direct.** No fluff, no superlatives without specificity.
- **Trustworthy.** Lead with verification and accuracy, not excitement.
- **Tone keywords:** accurate, verified, instant, bench-ready, reliable, frictionless

**Anti-patterns to avoid:**
- "Revolutionary," "game-changing," "best-in-class" (unverifiable)
- Fake social proof or testimonials
- Overly casual or emoji-heavy copy
- "AI-powered" claims (no AI involved)

---

## Competitive Landscape

| Competitor | Gap CalcuLab fills |
|------------|-------------------|
| Bitesize Bio calculators | Limited to 5–8 tools, no offline |
| GraphPad (Prism web tools) | Paid, overkill for quick bench math |
| Sigma-Aldrich calculators | Single category (molarity only) |
| Excel spreadsheet templates | Error-prone, not unit-aware, no validation |
| Benchling | Full LIMS — overkill for fast calculations |
| Random online calculators | One-at-a-time, unverified, no SI-unit support |

**CalcuLab's moat:** Breadth + verified + offline + privacy + zero friction.

---

## Landing Page Structure (current)

1. Hero: "Accurate Lab Calculations, Fast" + CTAs
2. Trust row: 39+ Calculators | Free to Use | Secure
3. Features: 6 category cards
4. How It Works: 3-step
5. Calculator showcase grid
6. FAQ (4 items — accuracy, privacy, offline, what it is)
7. Contact/Feedback form

**Conversion goal:** Click "Get Started" or "Explore Calculators" → dashboard with all 39 tools.

---

## UTM Conventions (proposed)

```
utm_source=google|meta|linkedin|reddit|organic
utm_medium=cpc|social|organic|email|referral
utm_campaign=brand|qpcr|dilutions|general-lab|retargeting
utm_content=rsa1|carousel-pain|video-15s|reddit-post
```

---

## Key Facts for Ad Copy

- 39 verified calculators (use "39" or "39+" — accurate as of June 2026; 4 reference panels excluded)
- Free forever — no paywall, no signup
- 100% client-side / browser-based
- Works offline (PWA)
- No data leaves your browser (privacy angle)
- Peer-reviewed formulas
- Built by Yuval Kolodkin-Gal & Avichay Nahami
- Domain: calculab.bio

---

## Campaign Assets

- **Full ad playbook:** `docs/marketing/ad-campaign.md` (Google RSAs, Meta, LinkedIn, video scripts, 90-day plan)
- **Video production:** `.Videos/PromoVid/` (8s), `.Videos/Short/` (30s vertical)

## Gaps (as of June 2026)

- No analytics (GA4/Plausible) in codebase — required before paid spend
- No UTM parsing on landing — use static UTM links in ad platforms
- Testimonials disabled in `landingConfig.js` — keep disabled until real quotes exist
