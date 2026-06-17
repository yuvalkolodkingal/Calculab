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
import { COLORS } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoScale = interpolate(frame, [0, 0.5 * fps], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const urlOpacity = interpolate(frame, [0.5 * fps, 1.1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const urlY = interpolate(frame, [0.5 * fps, 1.1 * fps], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaOpacity = interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = interpolate(
    frame,
    [2 * fps, 2.5 * fps, 3 * fps, 3.5 * fps],
    [1, 1.04, 1, 1.04],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill>
      <GridBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Img
            src={staticFile("logo.svg")}
            style={{
              width: 200,
              height: 200,
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              margin: "0 auto 48px",
            }}
          />

          <div
            style={{
              opacity: urlOpacity,
              transform: `translateY(${urlY}px)`,
              fontFamily: displayFont,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.primary,
              letterSpacing: "-0.02em",
              marginBottom: 36,
            }}
          >
            calculab.bio
          </div>

          <div
            style={{
              opacity: ctaOpacity,
              transform: `scale(${pulse})`,
              display: "inline-block",
              backgroundColor: COLORS.primary,
              color: COLORS.card,
              fontFamily: bodyFont,
              fontSize: 36,
              fontWeight: 600,
              padding: "24px 56px",
              borderRadius: 10,
              marginBottom: 40,
            }}
          >
            Start Calculating, Free
          </div>

          <div
            style={{
              opacity: ctaOpacity,
              fontFamily: bodyFont,
              fontSize: 30,
              color: COLORS.textMuted,
            }}
          >
            Free forever. No account. 39+ calculators.
          </div>
          <div
            style={{
              opacity: ctaOpacity,
              fontFamily: bodyFont,
              fontSize: 26,
              color: COLORS.textMuted,
              marginTop: 16,
            }}
          >
            For bench scientists &amp; grad students.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
