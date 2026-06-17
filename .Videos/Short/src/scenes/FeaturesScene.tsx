import { BarChart3, Bug, Dna, Droplet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CARD_STAGGER,
  CARD_TOTAL,
  FeatureCard,
} from "../components/FeatureCard";
import { GridBackground } from "../components/GridBackground";
import { displayFont } from "../fonts";
import { COLORS } from "../theme";

type Feature = {
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Droplet,
    iconColor: COLORS.primary,
    iconBackground: "rgba(0, 123, 255, 0.1)",
    title: "Solution & Dilutions",
    description:
      "Molarity, C₁V₁, serial dilutions. Prep solutions in seconds.",
  },
  {
    icon: Dna,
    iconColor: "#5e35b1",
    iconBackground: "rgba(94, 53, 177, 0.1)",
    title: "PCR & qPCR",
    description: "ΔCt, ΔΔCt, fold change, copy number, and Pfaffl ratio.",
  },
  {
    icon: BarChart3,
    iconColor: "#00897b",
    iconBackground: "rgba(0, 137, 123, 0.1)",
    title: "Spectrophotometry",
    description: "Beer-Lambert, NA A260, protein A280, and Bradford assays.",
  },
  {
    icon: Bug,
    iconColor: COLORS.success,
    iconBackground: "rgba(40, 167, 69, 0.1)",
    title: "Cell Culture",
    description:
      "Hemocytometer counts, CFU, seeding volume, and split ratios.",
  },
];

const ProgressDots: React.FC<{ activeIndex: number; frame: number }> = ({
  activeIndex,
  frame,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {FEATURES.map((feature, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;

        const dotScale = isActive
          ? interpolate(
              (frame - index * CARD_STAGGER) % CARD_STAGGER,
              [0, 12],
              [0.85, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          : 1;

        return (
          <div
            key={feature.title}
            style={{
              width: isActive ? 36 : 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: isActive
                ? feature.iconColor
                : isPast
                  ? COLORS.primary
                  : COLORS.border,
              opacity: isPast ? 0.45 : isActive ? 1 : 0.7,
              transform: `scale(${dotScale})`,
            }}
          />
        );
      })}
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [0, 0.7 * fps], [28, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleLineWidth = interpolate(frame, [0.3 * fps, 1 * fps], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const dotsOpacity = interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const activeIndex = Math.min(
    FEATURES.length - 1,
    Math.max(0, Math.floor((frame + CARD_STAGGER * 0.3) / CARD_STAGGER)),
  );

  return (
    <AbsoluteFill>
      <GridBackground />
      <AbsoluteFill
        style={{
          padding: "120px 80px 100px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              fontFamily: displayFont,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.text,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Everything at the bench
          </div>
          <div
            style={{
              width: titleLineWidth,
              height: 3,
              backgroundColor: COLORS.primary,
              margin: "0 auto",
              borderRadius: 2,
              opacity: titleOpacity,
            }}
          />
        </div>

        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            top: 60,
            bottom: 80,
          }}
        >
          {FEATURES.map((feature, index) => (
            <Sequence
              key={feature.title}
              from={index * CARD_STAGGER}
              durationInFrames={CARD_TOTAL}
              layout="none"
            >
              <AbsoluteFill
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FeatureCard
                  icon={feature.icon}
                  iconColor={feature.iconColor}
                  iconBackground={feature.iconBackground}
                  title={feature.title}
                  description={feature.description}
                />
              </AbsoluteFill>
            </Sequence>
          ))}
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 72,
            opacity: dotsOpacity,
          }}
        >
          <ProgressDots activeIndex={activeIndex} frame={frame} />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
