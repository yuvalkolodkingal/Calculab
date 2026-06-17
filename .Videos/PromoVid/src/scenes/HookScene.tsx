import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GridBackground } from "../components/GridBackground";
import { bodyFont, displayFont } from "../fonts";
import { colors } from "../theme";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 0.35 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const headlineY = interpolate(frame, [0, 0.35 * fps], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subOpacity = interpolate(frame, [0.15 * fps, 0.45 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <GridBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily: displayFont,
            fontSize: 68,
            fontWeight: 800,
            color: colors.text,
            textAlign: "center",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 1100,
          }}
        >
          Get Accurate Lab Calculations —{" "}
          <span style={{ color: colors.primary }}>Fast</span>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontFamily: bodyFont,
            fontSize: 28,
            fontWeight: 400,
            color: colors.muted,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          39+ calculators for molecular biology and biochemistry. Free,
          browser-based, always accessible.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
