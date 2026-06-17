import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GridBackground } from "../components/GridBackground";
import { bodyFont, displayFont } from "../fonts";
import { calculatorPanels, colors, panelColors } from "../theme";

const ToolChip: React.FC<{ label: string }> = ({ label }) => (
  <span
    style={{
      fontFamily: bodyFont,
      fontSize: 13,
      fontWeight: 500,
      color: colors.text,
      backgroundColor: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: 4,
      padding: "5px 10px",
      lineHeight: 1.2,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

const PanelCard: React.FC<{
  title: string;
  tools: readonly string[];
  color: string;
  index: number;
}> = ({ title, tools, color, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const row = Math.floor(index / 3);
  const delay = row * 0.08 * fps + (index % 3) * 0.03 * fps;
  const cardOpacity = interpolate(frame, [delay, delay + 0.18 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardY = interpolate(frame, [delay, delay + 0.18 * fps], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.bg,
        }}
      >
        <div
          style={{
            width: 4,
            alignSelf: "stretch",
            borderRadius: 2,
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 16,
            fontWeight: 700,
            color: colors.text,
            lineHeight: 1.2,
            flex: 1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 12,
            fontWeight: 600,
            color: colors.muted,
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 999,
            padding: "2px 8px",
            flexShrink: 0,
          }}
        >
          {tools.length}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          padding: "10px 14px 12px",
        }}
      >
        {tools.map((tool) => (
          <ToolChip key={tool} label={tool} />
        ))}
      </div>
    </div>
  );
};

export const CategoriesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sheetOpacity = interpolate(frame, [0, 0.15 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sheetY = interpolate(frame, [0, 0.15 * fps], [8, 0], {
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
          padding: "36px 56px",
        }}
      >
        <div
          style={{
            opacity: sheetOpacity,
            transform: `translateY(${sheetY}px)`,
            width: "100%",
            maxWidth: 1780,
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            boxShadow: "0 6px 28px rgba(0, 0, 0, 0.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 24px 16px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                fontFamily: displayFont,
                fontSize: 34,
                fontWeight: 800,
                color: colors.text,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Everything you need at the bench
            </div>
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 17,
                color: colors.muted,
                marginTop: 6,
              }}
            >
              39+ calculators & reference tools across 9 panels
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridAutoRows: "max-content",
              alignItems: "start",
              gap: 12,
              padding: 16,
              backgroundColor: colors.bg,
            }}
          >
            {calculatorPanels.map((panel, i) => (
              <PanelCard
                key={panel.title}
                title={panel.title}
                tools={panel.tools}
                color={panelColors[i]}
                index={i}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
