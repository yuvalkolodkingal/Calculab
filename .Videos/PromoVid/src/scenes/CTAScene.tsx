import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GridBackground } from "../components/GridBackground";
import { bodyFont, displayFont } from "../fonts";
import { colors } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const groupOpacity = interpolate(frame, [0, 0.25 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const groupY = interpolate(frame, [0, 0.25 * fps], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaOpacity = interpolate(frame, [0.2 * fps, 0.45 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = interpolate(
    frame,
    [0.55 * fps, 0.7 * fps, 0.85 * fps],
    [1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <GridBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            opacity: groupOpacity,
            transform: `translateY(${groupY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Img
            src={staticFile("logo.svg")}
            style={{ width: 96, height: 96 }}
          />
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 56,
              fontWeight: 800,
              color: colors.primary,
              letterSpacing: "-0.02em",
            }}
          >
            calculab.bio
          </div>
        </div>
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${buttonScale})`,
            backgroundColor: colors.primary,
            color: colors.card,
            fontFamily: bodyFont,
            fontSize: 22,
            fontWeight: 600,
            padding: "14px 36px",
            borderRadius: 8,
          }}
        >
          Start Calculating — Free
        </div>
        <div
          style={{
            opacity: ctaOpacity,
            fontFamily: bodyFont,
            fontSize: 17,
            color: colors.muted,
          }}
        >
          No signup · Offline · 100% client-side
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
