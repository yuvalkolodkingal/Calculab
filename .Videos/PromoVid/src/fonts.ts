import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const { fontFamily: displayFont } = loadOutfit("normal", {
  weights: ["400", "600", "800"],
  subsets: ["latin"],
});

export const { fontFamily: bodyFont } = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
