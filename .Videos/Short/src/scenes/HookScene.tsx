import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GridBackground } from "../components/GridBackground";
import { bodyFont, displayFont } from "../fonts";
import { COLORS } from "../theme";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line1Y = interpolate(frame, [0, 0.6 * fps], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line2Opacity = interpolate(frame, [0.4 * fps, 1.1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line2Y = interpolate(frame, [0.4 * fps, 1.1 * fps], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const strikeOpacity = interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const strikeWidth = interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <GridBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 920 }}>
          <div
            style={{
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
              fontFamily: displayFont,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.text,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            Lab math at the bench
          </div>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              opacity: line2Opacity,
              transform: `translateY(${line2Y}px)`,
              fontFamily: displayFont,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.textMuted,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            shouldn&apos;t mean spreadsheets
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "52%",
                height: 6,
                width: `${strikeWidth}%`,
                backgroundColor: COLORS.primary,
                opacity: strikeOpacity,
                borderRadius: 3,
              }}
            />
          </div>
          <div
            style={{
              opacity: interpolate(frame, [2 * fps, 2.6 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginTop: 48,
              fontFamily: bodyFont,
              fontSize: 34,
              fontWeight: 500,
              color: COLORS.primary,
            }}
          >
            There&apos;s a better way →
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
