# CalcuLab Ad Campaign — Full Playbook

> **Product:** CalcuLab — free, client-side lab calculators  
> **URL:** https://www.calculab.bio/  
> **Calculators:** 39 verified tools (per `calculatorConfig.js` + `landingConfig.js`)  
> **Stage:** Bootstrapped / pre-seed — no paid tiers, no signup funnel  
> **Brand voice:** Clinical, precise, "Digital Lab Notebook" (see `docs/DESIGN.md`)  
> **Context doc:** `.agents/product-marketing.md`

---

## A. Campaign Overview

### Objectives

| Layer | Goal | AARRR Stage |
|-------|------|-------------|
| **Primary** | Drive first calculator use (dashboard activation) | Activation |
| **Secondary** | Capture high-intent search traffic for specific tools (qPCR, dilutions, spectrophotometry) | Acquisition |
| **Tertiary** | Build brand recall among bench scientists | Awareness |

CalcuLab has no signup — success = **landing → dashboard → calculator opened → result copied**. There is no revenue event today; optimize for traffic quality and activation depth, not ROAS.

### Primary KPIs

| KPI | Definition | Target (90-day) |
|-----|------------|-----------------|
| **CPA-Activate** | Ad spend ÷ sessions where a calculator modal opens | <$2.00 at $500/mo tier |
| **CTR (Search)** | Clicks ÷ impressions on Google RSAs | >4% on branded; >2% on non-brand |
| **Landing → Dashboard** | Clicks "Get Started" or lands on `/dashboard` | >35% |
| **Calculator Open Rate** | Dashboard visitors who open ≥1 calculator | >50% |
| **Bounce Rate (paid)** | Single-page sessions from paid traffic | <55% |
| **Offline PWA install** | `beforeinstallprompt` accept (once tracked) | Baseline in month 1 |

**North-star metric:** Weekly active calculator sessions (WACS) — unique sessions with ≥1 calculator computation.

### Budget Tiers & Allocation

#### Tier 0 — $0/mo (Organic + Test)

| Channel | Allocation | Tactics |
|---------|------------|---------|
| Google Ads | $0 | Build RSA assets; use Keyword Planner only |
| Reddit | $0 | Organic posts in r/labrats, r/biology, r/molecularbiology |
| SEO | Time | Target calculator-intent keywords per tool |
| Community | Time | Protocol.io forums, ResearchGate, university Slack groups |
| Video | $0 | Ship Remotion assets from `.Videos/` organically |

**Goal:** Validate messaging angles before spending. Track referral traffic manually via UTM links in posts.

#### Tier 1 — $500/mo (Lean Test)

| Channel | $/mo | % | Rationale |
|---------|------|---|-----------|
| **Google Search** | $350 | 70% | Highest intent; calculator queries convert |
| **Reddit Ads** | $100 | 20% | Cheap CPM; lab audience clusters |
| **Meta Retargeting** | $50 | 10% | Only after pixel + 500+ site visitors |

**Daily budget:** ~$16/day. Run 2 weeks minimum before killing ad groups.

#### Tier 2 — $2,000/mo (Scale Winners)

| Channel | $/mo | % | Rationale |
|---------|------|---|-----------|
| **Google Search** | $1,200 | 60% | Scale winning AGs (qPCR, dilutions, brand) |
| **Meta Prospecting + RT** | $400 | 20% | Pain/outcome creative; lookalikes after data |
| **LinkedIn** | $300 | 15% | Lab managers, biotech R&D titles |
| **Reddit** | $100 | 5% | Maintain community presence |

**Rule:** 70% to proven campaigns, 30% to new angle/creative tests (per ads skill).

---

## B. Audience & Targeting

### ICP Summary

| Segment | Role | Pain | CalcuLab Hook |
|---------|------|------|---------------|
| **Grad students** | Daily bench work | Spreadsheet errors, Googling one-off calcs | Free, instant, 39 tools in one tab |
| **Postdocs / bench scientists** | Protocol execution | Unit conversion mistakes, qPCR math | Verified formulas, SI-unit aware |
| **Lab managers** | Team oversight | Inconsistent calculations across lab | Standardized, validated toolkit |
| **Biotech R&D** | Proprietary data | Cloud tools leak data | 100% client-side, no server calls |

### Platform Matrix

| Platform | Fit | Priority | Best Use |
|----------|-----|----------|----------|
| **Google Search** | ★★★★★ | P0 | High-intent calculator queries |
| **Reddit** | ★★★★☆ | P1 | r/labrats, r/biotech, r/molecularbiology |
| **Meta (FB/IG)** | ★★★☆☆ | P2 | Demand gen, retargeting, video (.Videos) |
| **LinkedIn** | ★★★☆☆ | P2 | Lab managers, biotech scientists |
| **Twitter/X** | ★★☆☆☆ | P3 | Skip until organic traction |

### Audience Segments

**Google Search — Ad Groups:**
1. qPCR & gene expression (ΔCt, ΔΔCt, fold change, Pfaffl)
2. Dilutions & solutions (C1V1, serial dilution, molarity)
3. Spectrophotometry (Beer-Lambert, A260, Bradford)
4. Brand (calculab, calculab bio)

**Meta — Ad Sets:**
1. Interest: molecular biology, PCR, biochemistry, cell culture
2. Behavior: science & technology pages, university alumni
3. Retargeting: site visitors 7–30 days

**LinkedIn — Campaigns:**
1. Job titles: Research Scientist, Lab Manager, Postdoctoral Researcher
2. Industries: Biotechnology Research, Higher Education, Pharmaceuticals
3. Company size: 1–200 (startups + academic labs)

**Reddit — Subreddits:**
- r/labrats (primary), r/molecularbiology, r/biotech, r/GradSchool, r/chemistry

### Exclusions

| Platform | Exclude |
|----------|---------|
| Google | "jobs", "salary", "course", "degree", "ppt", "pdf download", "python script" |
| Meta | Ages <22, non-English, countries outside target geo initially |
| LinkedIn | Students (unless grad-level targeting available), HR, Sales titles |
| All | Existing site visitors from retargeting prospecting campaigns |

### Retargeting Windows

| Stage | Window | Message | Frequency |
|-------|--------|---------|-----------|
| Hot | 1–7 days | "Pick up where you left off — 39 free calculators" | 3–5×/week |
| Warm | 8–30 days | Category-specific (qPCR, dilutions) based on landing page | 2–3×/week |
| Cold | 31–90 days | Brand recall + offline/PWA angle | 1×/week |

---

## C. Creative Angles (5 Distinct)

| # | Angle | Core Message | Best Channels |
|---|-------|--------------|---------------|
| **1 — Pain** | Spreadsheet errors cost experiments | "Stop guessing dilution volumes at the bench" | Google Search, Reddit, Meta video |
| **2 — Outcome** | Fast, verified results | "ΔΔCt to fold change in seconds — verified formulas" | Google Search (qPCR AG), LinkedIn |
| **3 — Social proof** | Built for lab workflows (no fake stats) | "39 calculators used at the bench — free, no signup" | Meta carousel, Reddit organic |
| **4 — Identity** | For bench scientists, not generic SaaS | "Built for molecular biologists who live at the bench" | LinkedIn, Meta, video |
| **5 — Contrarian** | Your data shouldn't leave the lab | "Why cloud calculators are wrong for proprietary experiments" | LinkedIn, Reddit, Meta static |

**Note:** Social proof angle uses **product facts only** (39 tools, verified formulas, free) — no fabricated testimonials or institution logos. `landingConfig.testimonials` is disabled; keep it that way until real quotes exist.

### Angle → Channel Map

```
Pain       → Google RSA (dilutions AG), Meta 15s video, Reddit text ads
Outcome    → Google RSA (qPCR AG), LinkedIn sponsored content
Social     → Meta carousel (tool screenshots), Reddit organic
Identity   → LinkedIn, 30s Remotion video, Meta static
Contrarian → LinkedIn thought-leadership, Reddit comment marketing
```

---

## D. Google Ads (Full RSA Output)

**Campaign:** `GOOG_Search_Calculators_Ongoing`  
**Final URL (all RSAs):** `https://www.calculab.bio/`  
**Bidding:** Start Manual CPC or Maximize Clicks (no conversion data yet); switch to Maximize Conversions after 50+ calculator_open events.

### Ad Group Structure

- **AG1 — qPCR & Gene Expression:** [delta ct calculator] (exact), [delta delta ct calculator] (exact), [qpcr fold change calculator] (phrase), [pfaffl method calculator] (phrase), [copy number qpcr calculator] (phrase) → RSA1
- **AG2 — Dilutions & Solutions:** [c1v1 calculator] (exact), [serial dilution calculator] (phrase), [molarity calculator] (phrase), [percent solution calculator] (phrase), [henderson hasselbalch calculator] (phrase) → RSA2
- **AG3 — Brand & General Lab:** [calculab] (exact), [calculab bio] (exact), [lab calculator online] (phrase), [molecular biology calculator] (phrase), [beer lambert calculator] (phrase) → RSA3

### Negative Keywords

**Campaign-level:**
- jobs
- salary
- hiring
- course
- degree
- python
- excel template free download
- graphpad prism
- benchling

**Ad-group level:**
- AG1: tutorial, ppt, worksheet, lab report
- AG2: recipe, cooking, pool chemical
- AG3: calculadora (Spanish), calculator app paid

### Sitelinks (≥4)

| Title (≤25) | Desc 1 (≤35) | Desc 2 (≤35) | URL |
|-------------|--------------|--------------|-----|
| qPCR Calculators (16) | ΔCt, ΔΔCt & fold change (24) | Pfaffl & copy number tools (26) | https://www.calculab.bio/ |
| Dilution Tools (14) | C1V1 & serial dilution (22) | Molarity & percent solutions (26) | https://www.calculab.bio/ |
| All 39 Calculators (18) | Browse the full toolkit (22) | Free — no signup needed (23) | https://www.calculab.bio/ |
| How CalcuLab Works (18) | Client-side & private (21) | Works offline at the bench (26) | https://www.calculab.bio/#how-it-works |

### Callouts (≥4, each ≤25 chars)

| Callout | Chars |
|---------|-------|
| 39 Verified Calculators | 23 |
| 100% Free — No Signup | 21 |
| Works Offline (PWA) | 19 |
| Client-Side & Private | 21 |
| SI-Unit Aware Inputs | 20 |
| Peer-Reviewed Formulas | 22 |

### RSA1 — qPCR & Gene Expression

**Final URL:** https://www.calculab.bio/  
**Path1:** qPCR **Path2:** Tools  
**Pinning:** All unpinned (let Google optimize combinations)

**Headlines (15, each ≤30 chars):**
1. ΔΔCt Calculator Online (22 chars)
2. qPCR Fold Change Calculator (27 chars)
3. Free ΔCt & ΔΔCt Tools (21 chars)
4. 39 Lab Calculators, Free (24 chars)
5. Instant qPCR Analysis (21 chars)
6. CalcuLab — Bench Math (21 chars)
7. No Login. Start Now. (20 chars)
8. Verified Lab Formulas (21 chars)
9. Pfaffl Ratio Calculator (23 chars)
10. Copy Number Calculator (22 chars)
11. Works Offline at Bench (22 chars)
12. Browser Lab Calculator (22 chars)
13. Free Gene Expression Math (25 chars)
14. Try CalcuLab — Free (19 chars)
15. Open & Calculate Now (20 chars)

**Descriptions (4, each ≤90 chars):**
1. Free ΔCt, ΔΔCt, fold change & Pfaffl calculators. Verified formulas. No signup. (79 chars)
2. 39 molecular biology calculators in one tab. Client-side, private, works offline. (81 chars)
3. Stop spreadsheet errors at the bench. Instant results, SI-unit aware. calculab.bio (82 chars)
4. Open calculab.bio. Pick a calculator. Get validated results in seconds. Free. (77 chars)

### RSA2 — Dilutions & Solutions

**Final URL:** https://www.calculab.bio/  
**Path1:** Dilutions **Path2:** Free  
**Pinning:** All unpinned

**Headlines (15, each ≤30 chars):**
1. C1V1 Dilution Calculator (24 chars)
2. Serial Dilution Calculator (26 chars)
3. Free Molarity Calculator (24 chars)
4. Dilution Math, Verified (23 chars)
5. 39 Lab Calculators, Free (24 chars)
6. CalcuLab — Bench Math (21 chars)
7. No Login. Start Now. (20 chars)
8. Percent Solution Calculator (27 chars)
9. Mass to Molar Calculator (24 chars)
10. Henderson-Hasselbalch Calc (26 chars)
11. Works Offline at Bench (22 chars)
12. SI-Unit Aware Calculators (25 chars)
13. Stop Dilution Mistakes (22 chars)
14. Open calculab.bio — Free (24 chars)
15. Instant Lab Math Results (24 chars)

**Descriptions (4, each ≤90 chars):**
1. Free C1V1, serial dilution & molarity calculators. Verified formulas. No signup required. (89 chars)
2. Prepare solutions without errors. 39 calculators in one tab. calculab.bio (73 chars)
3. Client-side only — your data never leaves the browser. Works offline at the bench. (82 chars)
4. Pick a calculator, enter values, copy results. Free molecular biology math tools. (81 chars)

### RSA3 — Brand & General Lab

**Final URL:** https://www.calculab.bio/  
**Path1:** Lab **Path2:** Calc  
**Pinning:** All unpinned

**Headlines (15, each ≤30 chars):**
1. CalcuLab — Lab Calculators (26 chars)
2. Free Lab Math Tools Online (26 chars)
3. 39 Verified Calculators (23 chars)
4. Molecular Biology Math (22 chars)
5. Browser Lab Calculator (22 chars)
6. No Signup. No Paywall. (22 chars)
7. Works Offline at Bench (22 chars)
8. 100% Client-Side & Private (26 chars)
9. Beer-Lambert Calculator (23 chars)
10. Hemocytometer Calculator (24 chars)
11. Bradford Assay Calculator (25 chars)
12. PCR & qPCR Tools Included (25 chars)
13. Built for Bench Scientists (26 chars)
14. Open calculab.bio Today (23 chars)
15. Accurate Lab Math, Fast (23 chars)

**Descriptions (4, each ≤90 chars):**
1. 39 free calculators for molecular biology & biochemistry. Verified formulas. calculab.bio (89 chars)
2. Dilutions, spectrophotometry, qPCR, cell culture & more — one free toolkit. (75 chars)
3. All computation runs in your browser. No data sent to servers. Works offline. (77 chars)
4. Replace error-prone spreadsheets. Instant, SI-unit aware results at the bench. (78 chars)

---

## E. Meta Ads

**Objective:** Traffic (optimize for landing page views until pixel has calculator_open events)  
**Final URL:** https://www.calculab.bio/?utm_source=meta&utm_medium=social&utm_campaign={campaign}

### Ad Set 1 — Pain (Spreadsheet Errors)

| Element | Copy | Chars |
|---------|------|-------|
| **Primary text** | Dilution math on a napkin? One wrong decimal ruins your experiment. CalcuLab runs 39 verified lab calculators in your browser — free, no signup, works offline at the bench. | 125 visible hook: "Dilution math on a napkin? One wrong decimal ruins your experiment." |
| **Headline** | Stop Spreadsheet Errors at the Bench | 36 |
| **Description** | 39 free lab calculators | 23 |
| **CTA button** | Learn More → / Open Link | — |

**Static creative brief:** Split-screen — left: messy Excel sheet with red error cell; right: CalcuLab C1V1 modal with clean result. Clinical white/gray palette per DESIGN.md. Precision Cobalt (#007bff) on CTA only. Text overlay: "C1V1 in 3 seconds."

**Video creative brief:** Use `.Videos/Short/` 30s vertical — HookScene pain angle → BenefitsScene → CTAScene. Captions mandatory.

### Ad Set 2 — Outcome (qPCR Speed)

| Element | Copy | Chars |
|---------|------|-------|
| **Primary text** | ΔCt → ΔΔCt → fold change. Three steps, one tab, zero spreadsheets. CalcuLab's qPCR calculators use peer-reviewed formulas. Free at calculab.bio. | 125 |
| **Headline** | qPCR Math Done in Seconds | 25 |
| **Description** | ΔΔCt, Pfaffl & copy # | 20 |
| **CTA button** | Learn More | — |

**Static creative brief:** Calculator grid screenshot showing qPCR panel (ΔCt, ΔΔCt, Fold Change, Pfaffl). Headline on image: "Gene expression math. Verified."

**Video creative brief:** `.Videos/PromoVid/` 8s cut — fast tool montage ending on calculab.bio.

### Ad Set 3 — Identity (Bench Scientists)

| Element | Copy | Chars |
|---------|------|-------|
| **Primary text** | Built for researchers who'd rather pipette than fight Excel. 39 molecular biology calculators — molarity, spectrophotometry, cell culture, qPCR. Client-side. Private. Offline. | 125 |
| **Headline** | Your Digital Lab Notebook for Math | 36 |
| **Description** | Free. No login. | 15 |
| **CTA button** | Learn More | — |

**Static creative brief:** Hero shot of phone at lab bench (gloved hand, harsh overhead light) showing CalcuLab dashboard. Matches "bench-ready clarity" from PRODUCT.md.

**Carousel option:** 5 cards — Dilutions | qPCR | Spectrophotometry | Cell Culture | Enzyme Kinetics — each with one calculator screenshot + tool name.

---

## F. LinkedIn Ads

**Fit:** Moderate B2B — lab managers and biotech scientists have LinkedIn profiles; CPC is high ($8–15). Use only at $2K/mo tier or as organic thought-leadership at $0 tier.

### Campaign 1 — Lab Manager Efficiency

| Element | Copy | Chars |
|---------|------|-------|
| **Intro text** | Inconsistent dilution math across your lab costs time and reproducibility. CalcuLab gives your team 39 verified calculators — same formulas, same interface, no signup. | 150 |
| **Headline** | Standardize Lab Calculations — Free Browser Toolkit for Your Team | 63 |

**Format:** Single image — dashboard screenshot with category panels visible.  
**Targeting:** Lab Manager, Research Associate, Principal Scientist | Biotechnology, Higher Education | US, UK, CA, IL.

### Campaign 2 — Data Privacy (Contrarian)

| Element | Copy | Chars |
|---------|------|-------|
| **Intro text** | Your qPCR data shouldn't hit a server just to run ΔΔCt math. CalcuLab is 100% client-side — all 39 calculators run in the browser. No account. No uploads. Works offline. | 150 |
| **Headline** | Lab Calculators That Never Touch Your Data | 42 |

**Format:** Document ad or short text post boost.  
**Targeting:** Research Scientist, Postdoctoral Researcher | Pharmaceuticals, Biotechnology | Company size 11–200.

---

## G. Video Ad Scripts

Tie to Remotion production in `.Videos/PromoVid/` and `.Videos/Short/`. Visual style: clinical grid, white cards, Precision Cobalt accents ≤10%, captions always.

### 15-Second Script (Vertical 9:16)

| Sec | Visual | Audio / Caption |
|-----|--------|-----------------|
| 0–2 | **Hook:** Pipette + blurred Excel error cell | "Wrong dilution math kills experiments." |
| 2–5 | **Problem:** Frustrated researcher at bench | "Spreadsheets. Unit errors. Googling one calculator at a time." |
| 5–11 | **Solution:** CalcuLab dashboard → C1V1 modal → instant result | "CalcuLab — 39 verified lab calculators. Free. In your browser." |
| 11–15 | **CTA:** Logo + calculab.bio | "calculab.bio — open and calculate." |

### 30-Second Script (Vertical 9:16)

| Sec | Visual | Audio / Caption |
|-----|--------|-----------------|
| 0–3 | **Hook:** qPCR curve on screen, researcher pauses | "Still running ΔΔCt in Excel?" |
| 3–8 | **Problem:** Montage — serial dilution on paper, unit conversion confusion, phone Google search | "Manual math at the bench is slow, error-prone, and scattered across a dozen websites." |
| 8–18 | **Solution:** CalcuLab tool montage — ΔΔCt → fold change, Beer-Lambert, hemocytometer, C1V1 | "CalcuLab — 39 molecular biology calculators. Verified formulas. SI-unit aware. Runs client-side so your data stays private. Works offline." |
| 18–24 | **Proof points:** Trust row — 39+ Calculators, Free, Secure (no fake testimonials) | "Free. No signup. No server. Just accurate results." |
| 24–30 | **CTA:** calculab.bio on clean clinical background | "calculab.bio — accurate lab calculations, fast." |

---

## H. Landing Page & Tracking

### UTM Structure

```
https://www.calculab.bio/?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}&utm_term={keyword}
```

| Parameter | Values |
|-----------|--------|
| `utm_source` | google, meta, linkedin, reddit |
| `utm_medium` | cpc, social, display, organic |
| `utm_campaign` | brand, qpcr, dilutions, spectrophotometry, retargeting, general-lab |
| `utm_content` | rsa1, rsa2, rsa3, carousel-pain, video-15s, video-30s, reddit-post |
| `utm_term` | {keyword} — Google only, auto-tag |

**Example:** `https://www.calculab.bio/?utm_source=google&utm_medium=cpc&utm_campaign=qpcr&utm_content=rsa1&utm_term=delta+ct+calculator`

### Conversion Events to Track

| Event | Trigger | Priority |
|-------|---------|----------|
| `page_view` | Landing or dashboard load | P0 — baseline |
| `cta_click` | "Get Started" or "Explore Calculators" | P0 |
| `calculator_open` | Modal opens for any calculator | P0 — primary conversion |
| `calculation_complete` | Result div appears (`.result` mutation) | P1 |
| `result_copy` | User copies result text | P2 |
| `pwa_install` | PWA install prompt accepted | P2 |
| `feedback_click` | Contact form link clicked | P3 |

**Implementation note:** No analytics (GA4/gtag) exists in codebase yet. Add GA4 or Plausible before spending on paid ads. Wire `calculator_open` via existing modal mount in `App.jsx`.

### Landing Page Recommendations

Changes via `landingConfig.js` only — do not edit `LandingPage.jsx`:

| Change | Config key | Rationale |
|--------|------------|-----------|
| Enable beta disclaimer during ad test | `betaDisclaimer.enabled: true` | Sets accuracy expectations; reduces bounce from skeptical scientists |
| Keep testimonials disabled | `testimonials.enabled: false` | No fake social proof in ads or landing |
| Add campaign-specific hero variant (future) | `hero.headline` per UTM | Defer until analytics proves lift; use single hero for now |

**Post-click path:** Ad → `calculab.bio` landing → "Get Started" → `/dashboard` → calculator modal. Ensure ad final URL matches landing (not deep-linked to dashboard — let user see trust signals first).

---

## I. 90-Day Rollout

### Weeks 1–2: Test & Instrument

| Task | Owner | AARRR |
|------|-------|-------|
| Install GA4 or Plausible + UTM convention | Dev | Acquisition |
| Fire `calculator_open` conversion event | Dev | Activation |
| Launch Google Search — AG1 (qPCR) only, $10/day | Marketing | Acquisition |
| Publish RSA assets (Section D) | Marketing | — |
| Post organic Reddit value thread (no hard sell) | Marketing | Acquisition |
| Ship 15s Remotion video to `.Videos/Short/` | Creative | Awareness |

**Exit criteria:** ≥200 clicks, ≥50 calculator_open events, CPA-Activate baseline established.

### Weeks 3–4: Scale Winners

| Task | Owner | AARRR |
|------|-------|-------|
| Add AG2 (dilutions) if AG1 CTR >2% | Marketing | Acquisition |
| Kill headlines with <1% CTR after 1,000 impressions | Marketing | — |
| Launch Meta retargeting ($50/mo) if ≥500 site visitors | Marketing | Acquisition |
| A/B test hero CTA copy in `landingConfig.js` | Marketing | Activation |
| Reddit promoted post in r/labrats ($50 test) | Marketing | Acquisition |

**Exit criteria:** Identify winning AG + top 3 headlines; CPA-Activate stable or declining.

### Weeks 5–8: Expand Channels

| Task | Owner | AARRR |
|------|-------|-------|
| Scale Google budget to 60% of total spend | Marketing | Acquisition |
| Launch Meta prospecting ad sets (pain + outcome) | Marketing | Awareness |
| Launch LinkedIn Campaign 2 (privacy angle) at $10/day | Marketing | Acquisition |
| Programmatic SEO: one page per top calculator keyword | Content | Acquisition |
| Ship 30s video; use in Meta + organic | Creative | Awareness |

**Exit criteria:** 3+ channels live; WACS growing week-over-week.

### Weeks 9–12: Retarget + Co-Marketing

| Task | Owner | AARRR |
|------|-------|-------|
| Full retargeting funnel (hot/warm/cold windows) | Marketing | Activation |
| Newsletter swap with lab/science newsletter | Partnerships | Acquisition |
| Guest post or tool mention on Bitesize Bio / similar | Partnerships | Awareness |
| Comparison page: "CalcuLab vs spreadsheet templates" | Content | Acquisition |
| Quarterly creative refresh — new RSA headlines | Marketing | — |

**Exit criteria:** Blended CPA-Activate <$2; co-marketing partner live; 90-day WACS report.

---

## J. Co-Marketing Opportunities

### Partner Scoring (1–5)

| Partner | Audience Fit | Reach | Brand Align | Ease | Priority |
|---------|-------------|-------|-------------|------|----------|
| **Bitesize Bio** | 5 | 4 | 5 | 4 | P0 — guest post / tool roundup |
| **protocols.io** | 5 | 4 | 5 | 3 | P0 — "calculators for your protocol" sidebar |
| **Addgene Blog** | 4 | 4 | 5 | 3 | P1 — molecular biology audience |
| **LabX / Lab Manager magazine** | 4 | 3 | 4 | 3 | P1 — newsletter swap |
| **SnapGene** (adjacent, non-competing) | 4 | 4 | 4 | 2 | P2 — DNA tools cross-promo |
| **Benchling** | 3 | 5 | 3 | 1 | P3 — ecosystem mention only; not a competitor attack |
| **Thermo Fisher / Sigma calculators** | 3 | 5 | 3 | 1 | P3 — "complement your workflow" angle |

### Campaign Concepts

**1. protocols.io — "Calculate Before You Protocol"**
- Co-authored short guide: top 5 calculations every molecular biology protocol needs
- CTA links to CalcuLab with `utm_source=protocolsio&utm_medium=referral`
- Lead sharing: N/A (free tool; measure via UTM traffic)

**2. Bitesize Bio — Newsletter Swap**
- CalcuLab provides: "39 Free Lab Calculators" exclusive mention in their weekly tips
- Bitesize provides: mention in CalcuLab FAQ or About modal
- Format: 2–3 sentence tool blurb + screenshot

**3. "Better Together" Landing (future)**
- `/integrations` page listing adjacent tools (SnapGene for sequence, CalcuLab for math)
- No API integration required — workflow positioning only

**4. University Lab Slack Groups**
- Offer free "lab calculator bookmark" one-pager PDF
- Low effort, high trust in academic circles

### Cold Outreach Template

```
Subject: CalcuLab + [Partner] — free lab calculators for your readers

Hi [Name],

I'm [Name] at CalcuLab — a free suite of 39 browser-based lab calculators
(molarity, qPCR, dilutions, spectrophotometry). All client-side, no signup.

Your audience at [Partner] overlaps heavily with ours. I'd love to contribute
a short guest post: "5 calculations every [molecular biology] lab runs daily
(and how to stop doing them in Excel)."

No sponsorship — just a useful resource with a link to calculab.bio.

Open to a quick chat?

[Name]
```

---

## K. Marketing Ideas Cross-Reference

From the 139-idea library (`marketing-ideas` skill). Status keyed to bootstrapped CalcuLab stage.

| # | Idea | AARRR | Status | Notes |
|---|------|-------|--------|-------|
| **1** | Easy Keyword Ranking | Acquisition | **Now** | Target long-tail calculator queries per tool |
| **4** | Programmatic SEO | Acquisition | **Q2** | One landing page per calculator after Google test proves keywords |
| **11** | Competitor Comparison Pages | Acquisition | **Q2** | "CalcuLab vs Excel templates" — honest, no fake wins |
| **15** | Engineering as Marketing | Acquisition | **Now** | CalcuLab *is* the free tool — ads drive awareness of it |
| **18** | Calculator Marketing | Acquisition | **Now** | Core strategy; double down on SEO + paid for calc intent |
| **31** | Google Ads | Acquisition | **Now** | Primary paid channel at $500+ tiers |
| **34** | Retargeting | Activation | **Q2** | After 500+ visitors and pixel live |
| **38** | Reddit Marketing | Acquisition | **Now** | Organic + $100/mo promoted at Tier 1 |
| **44** | Comment Marketing | Acquisition | **Now** | Answer calc questions on Reddit/ResearchGate with helpful links |
| **59** | Newsletter Swaps | Acquisition | **Q2** | Bitesize Bio, Lab Manager, Addgene blog |
| **62** | Integration Marketing | Acquisition | **Q2** | protocols.io workflow positioning |
| **78** | Product Hunt Launch | Awareness | **Skip** | Wrong audience; scientists aren't on PH |
| **93** | Viral Loops | Referral | **Skip** | No signup/share mechanic yet |
| **129** | Review Sites (G2, Capterra) | Acquisition | **Skip** | Not SaaS; wrong category |

---

## Appendix: Pre-Launch Checklist

- [ ] Analytics installed (GA4 or Plausible)
- [ ] `calculator_open` conversion fires correctly
- [ ] UTM links tested end-to-end
- [ ] Landing page loads <3s on mobile
- [ ] RSA character counts verified (Section D)
- [ ] No fake testimonials in ads or landing
- [ ] Google Ads account + billing set up
- [ ] Negative keywords loaded
- [ ] Remotion video assets exported (15s + 30s)
- [ ] Reddit account has karma before promoting

---

*Last updated: June 17, 2026 — aligned with codebase (`landingConfig.js`, `calculatorConfig.js`, `docs/PRODUCT.md`, `docs/DESIGN.md`)*
