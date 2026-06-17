import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BenefitsScene } from "./scenes/BenefitsScene";
import { CTAScene } from "./scenes/CTAScene";
import { DemoScene } from "./scenes/DemoScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { HookScene } from "./scenes/HookScene";
import { IntroScene } from "./scenes/IntroScene";

const TRANSITION_FRAMES = 12;

export const CalcuLabShort: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const fadeFrames = Math.round(fps * 2);

  return (
    <AbsoluteFill style={{ backgroundColor: "#f0f4f8" }}>
      <Audio
        src={staticFile("bgm.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
            [0, 0.35, 0.35, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={105}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={300}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={105}>
          <DemoScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={210}>
          <BenefitsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={150}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

/** Total: 960 − (5 × 12) = 900 frames = 30 s @ 30 fps */
export const CALCULAB_SHORT_DURATION = 900;
