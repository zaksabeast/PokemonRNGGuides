import { useId4State } from "./state";
import { match } from "ts-pattern";

type Id4ShowIfProps = {
  game?: string;
  isNdsDsi?: boolean;
  is3dsAltSettings?: boolean;
  is3dsNormalSettings?: boolean;
  children: React.ReactNode;
};

export const Id4ShowIf = ({ children, ...settings }: Id4ShowIfProps) => {
  const [state] = useId4State();

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
