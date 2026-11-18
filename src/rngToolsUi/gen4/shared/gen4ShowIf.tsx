import { match, P } from "ts-pattern";
import { useAtomValue } from "jotai";
import { gen4SetupAtom, getGen4AdvanceMethod } from "./state/setup";

export type Gen4ShowIfProps = {
  game?: string; // A game or game group, not a strict type in case mdx has bad value
  advanceMethod?: string;
  isNdsDsi?: boolean;
  is3dsAltSettings?: boolean;
  is3dsNormalSettings?: boolean;
  children: React.ReactNode;
};

export const Gen4ShowIf = ({ children, ...settings }: Gen4ShowIfProps) => {
  const setup = useAtomValue(gen4SetupAtom);
  const advanceMethod = getGen4AdvanceMethod(setup);
  const show = match(settings)
    .with(
      {
        game: P.union(setup.game, setup.group),
        advanceMethod: P.optional(advanceMethod),
      },
      () => true,
    )
    .with({ game: P.optional(P.nullish), advanceMethod }, () => true)
    .with({ isNdsDsi: setup.console === "NdsDsi" }, () => true)
    .with({ is3dsAltSettings: setup.console === "3dsAltSettings" }, () => true)
    .with(
      { is3dsNormalSettings: setup.console === "3dsNormalSettings" },
      () => true,
    )
    .otherwise(() => false);

  if (show) {
    return <>{children}</>;
  }

  return null;
};
