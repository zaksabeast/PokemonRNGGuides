import { match } from "ts-pattern";
import { Gen4GameAndConsole } from "../gen4types";

export type Gen4ShowIfProps<State extends Gen4GameAndConsole> = {
  game?: string;
  isNdsDsi?: boolean;
  is3dsAltSettings?: boolean;
  is3dsNormalSettings?: boolean;
  children: React.ReactNode;
  state: State;
};

export const Gen4ShowIf = <State extends Gen4GameAndConsole>({
  children,
  state,
  ...settings
}: Gen4ShowIfProps<State>) => {
  const show = match(settings)
    .with({ game: state.game }, () => true)
    .with({ isNdsDsi: state.console === "NdsDsi" }, () => true)
    .with({ is3dsAltSettings: state.console === "3dsAltSettings" }, () => true)
    .with(
      { is3dsNormalSettings: state.console === "3dsNormalSettings" },
      () => true,
    )
    .otherwise(() => false);

  if (show) {
    return <>{children}</>;
  }

  return null;
};
