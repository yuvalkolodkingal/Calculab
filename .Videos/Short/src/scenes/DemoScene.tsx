import { CheckCircle2 } from "lucide-react";
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

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const panelY = interpolate(frame, [0, 0.5 * fps], [60, 0], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const inputProgress = interpolate(frame, [0.6 * fps, 1.35 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonAppear = 1.35 * fps;
  const buttonPulseStart = 1.48 * fps;
  const buttonPulsePeak = 1.58 * fps;
  const buttonPressStart = 1.62 * fps;
  const buttonPressEnd = 1.72 * fps;
  const resultStart = 1.75 * fps;
  const resultEnd = 2.25 * fps;

  const buttonOpacity = interpolate(
    frame,
    [buttonAppear, buttonAppear + 0.2 * fps, resultStart + 0.3 * fps, resultEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const buttonEnterScale = interpolate(
    frame,
    [buttonAppear, buttonAppear + 0.25 * fps],
    [0.92, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_OUT },
  );

  const buttonPulse = interpolate(
    frame,
    [buttonPulseStart, buttonPulsePeak, buttonPressStart],
    [1, 1.03, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const buttonPressScale = interpolate(
    frame,
    [buttonPressStart, buttonPressStart + 0.06 * fps, buttonPressEnd],
    [1, 0.96, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const buttonScale = buttonEnterScale * buttonPulse * buttonPressScale;

  const isPressed =
    frame >= buttonPressStart && frame < buttonPressStart + 0.1 * fps;

  const buttonBg = isPressed ? COLORS.primaryDeep : COLORS.primary;

  const pressRipple = interpolate(
    frame,
    [buttonPressStart, buttonPressStart + 0.25 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const resultOpacity = interpolate(frame, [resultStart, resultEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const resultScale = interpolate(frame, [resultStart, resultEnd], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const c1Display = (10 * inputProgress).toFixed(1);
  const v1Display = (50 * inputProgress).toFixed(0);
  const c2Display = (1 * inputProgress).toFixed(1);

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
        <div
          style={{
            opacity: panelOpacity,
            transform: `translateY(${panelY}px)`,
            width: 900,
            backgroundColor: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "36px 44px 28px",
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                fontFamily: displayFont,
                fontSize: 44,
                fontWeight: 800,
                color: COLORS.text,
              }}
            >
              C₁V₁ Dilution
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 28,
                color: COLORS.textMuted,
                marginTop: 8,
              }}
            >
              Enter values, get instant results
            </div>
          </div>

          <div style={{ padding: "36px 44px" }}>
            {[
              { label: "C₁ (stock)", value: `${c1Display} mM` },
              { label: "V₁ (volume needed)", value: `${v1Display} µL` },
              { label: "C₂ (target)", value: `${c2Display} mM` },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "22px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 30,
                    fontWeight: 500,
                    color: COLORS.text,
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 30,
                    fontWeight: 600,
                    color: COLORS.text,
                    backgroundColor: COLORS.bg,
                    padding: "10px 24px",
                    borderRadius: 10,
                    border: `1px solid ${COLORS.border}`,
                    minWidth: 180,
                    textAlign: "right",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}

            <div
              style={{
                marginTop: 32,
                opacity: buttonOpacity,
                transform: `scale(${buttonScale})`,
                transformOrigin: "center center",
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {pressRipple > 0 && pressRipple < 1 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    margin: "auto",
                    width: 280,
                    height: 64,
                    borderRadius: 10,
                    border: `2px solid ${COLORS.primary}`,
                    opacity: (1 - pressRipple) * 0.5,
                    transform: `scale(${1 + pressRipple * 0.35})`,
                    pointerEvents: "none",
                  }}
                />
              )}
              <div
                style={{
                  backgroundColor: buttonBg,
                  color: COLORS.card,
                  fontFamily: bodyFont,
                  fontSize: 32,
                  fontWeight: 600,
                  padding: "18px 64px",
                  borderRadius: 10,
                  minWidth: 280,
                  textAlign: "center",
                  boxShadow: isPressed
                    ? "0 2px 8px rgba(0, 123, 255, 0.2)"
                    : "0 4px 15px rgba(0, 123, 255, 0.25)",
                }}
              >
                Calculate
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                opacity: resultOpacity,
                transform: `scale(${resultScale})`,
                backgroundColor: COLORS.successBg,
                border: `1px solid ${COLORS.success}`,
                borderRadius: 10,
                padding: "28px 32px",
              }}
            >
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 26,
                  fontWeight: 500,
                  color: COLORS.textMuted,
                  marginBottom: 8,
                }}
              >
                Result
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: displayFont,
                  fontSize: 40,
                  fontWeight: 800,
                  color: COLORS.success,
                }}
              >
                <span>V₂ = 500 µL</span>
                <CheckCircle2
                  size={36}
                  color={COLORS.success}
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
