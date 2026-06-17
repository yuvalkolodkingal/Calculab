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

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = interpolate(frame, [0, 0.8 * fps], [0.6, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [0.5 * fps, 1.1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [0.5 * fps, 1.1 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subtitleOpacity = interpolate(frame, [1 * fps, 1.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [1.5 * fps, 2.1 * fps], [0, 1], {
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
          padding: "0 60px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Img
            src={staticFile("logo.svg")}
            style={{
              width: 280,
              height: 280,
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              margin: "0 auto 36px",
            }}
          />
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              fontFamily: displayFont,
              fontSize: 96,
              fontWeight: 800,
              color: COLORS.text,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            CalcuLab
          </div>
          <div
            style={{
              opacity: subtitleOpacity,
              fontFamily: displayFont,
              fontSize: 40,
              fontWeight: 600,
              color: COLORS.primary,
              marginBottom: 32,
            }}
          >
            The Digital Lab Notebook
          </div>
          <div
            style={{
              opacity: taglineOpacity,
              fontFamily: bodyFont,
              fontSize: 34,
              fontWeight: 400,
              color: COLORS.textMuted,
              lineHeight: 1.5,
              maxWidth: 780,
              margin: "0 auto",
            }}
          >
            39+ verified calculators for molecular biology &amp; biochemistry
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
