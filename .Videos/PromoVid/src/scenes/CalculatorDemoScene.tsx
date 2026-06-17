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

const InputField: React.FC<{
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
}> = ({ label, value, unit, highlight }) => (
  <div style={{ flex: 1 }}>
    <div
      style={{
        fontFamily: bodyFont,
        fontSize: 13,
        fontWeight: 500,
        color: colors.muted,
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div
      style={{
        display: "flex",
        border: `1px solid ${highlight ? colors.primary : colors.border}`,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: highlight ? "#f0f7ff" : colors.card,
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          fontFamily: bodyFont,
          fontSize: 18,
          fontWeight: 600,
          color: colors.text,
        }}
      >
        {value}
      </div>
      <div
        style={{
          padding: "10px 12px",
          borderLeft: `1px solid ${colors.border}`,
          fontFamily: bodyFont,
          fontSize: 14,
          color: colors.muted,
          backgroundColor: colors.bg,
        }}
      >
        {unit}
      </div>
    </div>
  </div>
);

export const CalculatorDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardOpacity = interpolate(frame, [0, 0.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const buttonPulse = interpolate(
    frame,
    [0.45 * fps, 0.6 * fps, 0.75 * fps],
    [1, 0.94, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const resultOpacity = interpolate(frame, [0.8 * fps, 1.05 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const resultY = interpolate(frame, [0.8 * fps, 1.05 * fps], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const showResult = frame >= 0.75 * fps;

  return (
    <AbsoluteFill>
      <GridBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            opacity: cardOpacity,
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: "28px 32px",
            width: "100%",
            maxWidth: 860,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 28,
              fontWeight: 700,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            C1V1 Dilution Calculator
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <InputField label="C1" value="10" unit="mM" />
            <InputField label="C2" value="1" unit="mM" />
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <InputField
              label="V1"
              value={showResult ? "50.0" : "?"}
              unit="μL"
              highlight={showResult}
            />
            <InputField label="V2" value="500" unit="μL" />
          </div>

          <div
            style={{
              transform: `scale(${buttonPulse})`,
              backgroundColor: colors.primary,
              color: colors.card,
              fontFamily: bodyFont,
              fontSize: 16,
              fontWeight: 600,
              padding: "10px 24px",
              borderRadius: 8,
              display: "inline-block",
              marginBottom: showResult ? 12 : 0,
            }}
          >
            Calculate
          </div>

          {showResult ? (
            <div
              style={{
                opacity: resultOpacity,
                transform: `translateY(${resultY}px)`,
                backgroundColor: colors.successBg,
                border: `1px solid ${colors.success}`,
                borderRadius: 8,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontFamily: displayFont,
                  fontSize: 30,
                  fontWeight: 800,
                  color: colors.success,
                }}
              >
                V1 = 50.0 μL
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 14,
                  color: colors.successText,
                  marginTop: 4,
                }}
              >
                1:10 dilution · add 450.0 μL solvent
              </div>
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
