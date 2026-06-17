import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";

export const GridBackground: React.FC<{ opacity?: number }> = ({
  opacity = 1,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        opacity,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.border} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.55,
        }}
      />
    </AbsoluteFill>
  );
};
