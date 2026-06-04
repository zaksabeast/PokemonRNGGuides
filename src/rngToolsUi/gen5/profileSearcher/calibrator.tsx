import { match } from "ts-pattern";
import { useProfile5State } from "./state";
import { Profile5SearcherNeedle } from "./needle";
import { Profile5SearcherSeed } from "./seed";
import { Profile5SearcherIvs } from "./ivs";

export const Profile5Calibrator = () => {
  const [state] = useProfile5State();

  return match(state.calibrationType)
    .with("ivs", () => <Profile5SearcherIvs />)
    .with("needles", () => <Profile5SearcherNeedle />)
    .with("seed", () => <Profile5SearcherSeed />)
    .exhaustive();
};
