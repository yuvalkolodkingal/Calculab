import { Lock, Sparkles, WifiOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { IconBadge } from "../components/IconBadge";
import { GridBackground } from "../components/GridBackground";
import { bodyFont, displayFont } from "../fonts";
import { COLORS } from "../theme";

type Benefit = {
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: Sparkles,
    iconColor: COLORS.primary,
    iconBackground: "rgba(0, 123, 255, 0.1)",
    title: "Free to Use",
    description: "No signup. No paywall. Open the browser and calculate.",
  },
  {
    icon: Lock,
    iconColor: "#495057",
    iconBackground: "rgba(73, 80, 87, 0.08)",
    title: "100% Private",
    description: "All math runs in your browser. Data never leaves your device.",
  },
  {
    icon: WifiOff,
    iconColor: "#00897b",
    iconBackground: "rgba(0, 137, 123, 0.1)",
    title: "Works Offline",
    description: "PWA caching. Use it at the bench without Wi-Fi.",
  },
];

export const BenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <GridBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
          gap: 36,
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: "center",
            marginBottom: 20,
            letterSpacing: "-0.02em",
            opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Built for the lab
        </div>

        {BENEFITS.map((benefit, index) => {
          const delay = 0.4 * fps + index * 0.35 * fps;

          const opacity = interpolate(frame - delay, [0, 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          const slideX = interpolate(frame - delay, [0, 0.4 * fps], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={benefit.title}
              style={{
                opacity,
                transform: `translateX(${slideX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 32,
                width: "100%",
                maxWidth: 880,
                backgroundColor: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: "36px 40px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
              }}
            >
              <IconBadge
                icon={benefit.icon}
                color={benefit.iconColor}
                backgroundColor={benefit.iconBackground}
                size={72}
                iconSize={34}
              />
              <div>
                <div
                  style={{
                    fontFamily: displayFont,
                    fontSize: 38,
                    fontWeight: 700,
                    color: COLORS.text,
                    marginBottom: 6,
                  }}
                >
                  {benefit.title}
                </div>
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 28,
                    color: COLORS.textMuted,
                    lineHeight: 1.4,
                  }}
                >
                  {benefit.description}
                </div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
