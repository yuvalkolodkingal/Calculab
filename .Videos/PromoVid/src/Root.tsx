import "./index.css";
import { Composition } from "remotion";
import { CalcuLabPromo, CALCULAB_PROMO_DURATION } from "./CalcuLabPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CalcuLabPromo"
        component={CalcuLabPromo}
        durationInFrames={CALCULAB_PROMO_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
