import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GridBackground } from "../components/GridBackground";
import { bodyFont, displayFont } from "../fonts";
import { benefits, colors } from "../theme";

const BenefitItem: React.FC<{
  label: string;
  detail: string;
  wave: number;
}> = ({ label, detail, wave }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = wave * 0.08 * fps;
  const opacity = interpolate(frame, [delay, delay + 0.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + 0.2 * fps], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        padding: "18px 16px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: displayFont,
          fontSize: 24,
          fontWeight: 700,
          color: colors.primary,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 15,
          color: colors.muted,
        }}
      >
        {detail}
      </div>
    </div>
  );
};

export const BenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.18 * fps], [0, 1], {
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
          padding: "0 64px",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            fontFamily: displayFont,
            fontSize: 42,
            fontWeight: 800,
            color: colors.text,
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          Built for the lab
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 12,
            width: "100%",
          }}
        >
          {benefits.map((b, i) => (
            <BenefitItem
              key={b.label}
              label={b.label}
              detail={b.detail}
              wave={i < 2 ? 0 : 1}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
