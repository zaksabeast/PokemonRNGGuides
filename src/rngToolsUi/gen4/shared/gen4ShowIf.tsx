import { match } from "ts-pattern";
import { gen4StateAtom } from "./state";
import { useAtom } from "jotai";

export type Gen4ShowIfProps = {
  game?: string;
  isNdsDsi?: boolean;
  is3dsAltSettings?: boolean;
  is3dsNormalSettings?: boolean;
  children: React.ReactNode;
};

export const Gen4ShowIf = ({ children, ...settings }: Gen4ShowIfProps) => {
  const [state] = useAtom(gen4StateAtom);
  const show = match(settings)
    .with({ game: state.config.game }, () => true)
    .with({ isNdsDsi: state.config.console === "NdsDsi" }, () => true)
    .with(
      { is3dsAltSettings: state.config.console === "3dsAltSettings" },
      () => true,
    )
    .with(
      { is3dsNormalSettings: state.config.console === "3dsNormalSettings" },
      () => true,
    )
    .otherwise(() => false);

  if (show) {
    return <>{children}</>;
  }

  return null;
};
