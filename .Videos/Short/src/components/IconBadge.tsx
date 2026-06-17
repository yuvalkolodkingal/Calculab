import type { LucideIcon } from "lucide-react";
import { COLORS } from "../theme";

type IconBadgeProps = {
  icon: LucideIcon;
  color?: string;
  backgroundColor?: string;
  size?: number;
  iconSize?: number;
};

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon: Icon,
  color = COLORS.primary,
  backgroundColor = "rgba(0, 123, 255, 0.1)",
  size = 88,
  iconSize = 40,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        backgroundColor,
        border: `1px solid ${COLORS.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon
        size={iconSize}
        color={color}
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
};
