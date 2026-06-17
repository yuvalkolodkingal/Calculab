import type { LucideIcon } from "lucide-react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { IconBadge } from "./IconBadge";
import { bodyFont, displayFont } from "../fonts";
import { COLORS } from "../theme";

export const CARD_ENTER = 18;
export const CARD_HOLD = 54;
export const CARD_EXIT = 16;
export const CARD_TOTAL = CARD_ENTER + CARD_HOLD + CARD_EXIT;
export const CARD_STAGGER = 58;

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN = Easing.bezier(0.4, 0, 1, 1);

type FeatureCardProps = {
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconColor,
  iconBackground,
  title,
  description,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, CARD_ENTER, CARD_ENTER + CARD_HOLD, CARD_TOTAL],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const enterSlide = interpolate(frame, [0, CARD_ENTER], [72, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const exitSlide = interpolate(
    frame,
    [CARD_ENTER + CARD_HOLD, CARD_TOTAL],
    [0, -72],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_IN,
    },
  );

  const slideX =
    frame < CARD_ENTER + CARD_HOLD ? enterSlide : exitSlide;

  const scale = interpolate(
    frame,
    [0, CARD_ENTER, CARD_ENTER + CARD_HOLD, CARD_TOTAL],
    [0.94, 1, 1, 0.94],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_OUT },
  );

  const iconScale = interpolate(frame, [4, CARD_ENTER + 4], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.4, 0.64, 1),
  });

  const titleOpacity = interpolate(frame, [6, CARD_ENTER + 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const titleY = interpolate(frame, [6, CARD_ENTER + 2], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const descOpacity = interpolate(frame, [10, CARD_ENTER + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const descY = interpolate(frame, [10, CARD_ENTER + 6], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const accentWidth = interpolate(frame, [8, CARD_ENTER + 8], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  if (frame < 0 || frame > CARD_TOTAL) {
    return null;
  }

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
        backgroundColor: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "44px 48px",
        width: 880,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 3,
          width: `${accentWidth}%`,
          backgroundColor: iconColor,
          borderRadius: "16px 0 0 0",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          marginBottom: 24,
        }}
      >
        <div style={{ transform: `scale(${iconScale})` }}>
          <IconBadge
            icon={icon}
            color={iconColor}
            backgroundColor={iconBackground}
          />
        </div>
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontFamily: displayFont,
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
          fontFamily: bodyFont,
          fontSize: 36,
          fontWeight: 400,
          color: COLORS.textMuted,
          lineHeight: 1.45,
          maxWidth: "62ch",
        }}
      >
        {description}
      </div>
    </div>
  );
};
