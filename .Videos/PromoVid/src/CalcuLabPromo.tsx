import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Audio } from "@remotion/media";
import { BenefitsScene } from "./scenes/BenefitsScene";
import { CTAScene } from "./scenes/CTAScene";
import { CalculatorDemoScene } from "./scenes/CalculatorDemoScene";
import { CategoriesScene } from "./scenes/CategoriesScene";
import { HookScene } from "./scenes/HookScene";
import { IntroScene } from "./scenes/IntroScene";
import {
  CALCULAB_PROMO_DURATION,
  SCENE_DURATIONS,
  TRANSITION_FRAMES,
} from "./timing";

export { CALCULAB_PROMO_DURATION };

export const CalcuLabPromo: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const fadeFrames = Math.round(fps * 1.5);

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("bgm.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
            [0, 0.4, 0.4, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hook}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.categories}>
          <CategoriesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.calculator}>
          <CalculatorDemoScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.benefits}>
          <BenefitsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
