import { useHeldEggState } from "./state";

type EmeraldEggStateTextProps = {
  // Very loose since this is used in mdx where TS checks aren't run
  item?: string;
};

export const RetailEmeraldEggStateText = ({
  item,
}: EmeraldEggStateTextProps) => {
  const [state] = useHeldEggState();

  if (item === "pokedex") {
    return state.target?.redraws ?? "???";
  }

  return "???";
};
