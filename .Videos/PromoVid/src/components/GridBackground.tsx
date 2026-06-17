import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

export const GridBackground: React.FC = () => {
  const gridSize = 40;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern
            id="lab-grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={colors.border}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lab-grid)" opacity={0.6} />
      </svg>
    </AbsoluteFill>
  );
};
