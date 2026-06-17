export const TRANSITION_FRAMES = 6;

export const SCENE_DURATIONS = {
  intro: 40,
  hook: 38,
  categories: 72,
  calculator: 54,
  benefits: 40,
  cta: 44,
} as const;

export const CALCULAB_PROMO_DURATION =
  SCENE_DURATIONS.intro +
  SCENE_DURATIONS.hook +
  SCENE_DURATIONS.categories +
  SCENE_DURATIONS.calculator +
  SCENE_DURATIONS.benefits +
  SCENE_DURATIONS.cta -
  TRANSITION_FRAMES * 5;
