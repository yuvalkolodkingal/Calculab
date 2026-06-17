# CalcuLab Promo Video

~8s Remotion promo for [CalcuLab](https://calculab.bio).

## Preview

```bash
cd promo-video
npm install
npm run dev
```

Opens Remotion Studio. Composition: **CalcuLabPromo** (1920×1080, 30 fps, ~8 s).

## Render

```bash
npm run render
```

Output: `out/calculab-promo.mp4`

Single-frame check:

```bash
npx remotion still CalcuLabPromo --scale=0.25 --frame=90
```

## Scenes

1. **Intro** — Logo + CalcuLab title
2. **Hook** — Headline + value prop
3. **Categories** — Six calculator category cards
4. **Demo** — C1V1 dilution calculator with animated result
5. **Benefits** — 39+ tools, free, browser, offline PWA
6. **CTA** — calculab.bio call to action

Design follows CalcuLab "Digital Lab Notebook" system: lab bench gray grid, Precision Cobalt accent, Outfit/Inter fonts.
