import "./index.css";
import { Composition } from "remotion";
import {
  CALCULAB_SHORT_DURATION,
  CalcuLabShort,
} from "./CalcuLabShort";
import { SHORTS } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CalcuLabShort"
        component={CalcuLabShort}
        durationInFrames={CALCULAB_SHORT_DURATION}
        fps={SHORTS.fps}
        width={SHORTS.width}
        height={SHORTS.height}
      />
    </>
  );
};
