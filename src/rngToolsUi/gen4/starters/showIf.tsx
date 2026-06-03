import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";
import { match } from "ts-pattern";

type Starter4ShowIfProps = {
  game?: string;
  isNdsDsi?: boolean;
  is3dsAltSettings?: boolean;
  is3dsNormalSettings?: boolean;
  children: React.ReactNode;
};

export const Starter4ShowIf = ({
  children,
  ...settings
}: Starter4ShowIfProps) => {
  const [{ config }] = useAtom(gen4StateAtom);

  const show = match(settings)
    .with({ game: config.game }, () => true)
    .with({ isNdsDsi: config.console === "NdsDsi" }, () => true)
    .with({ is3dsAltSettings: config.console === "3dsAltSettings" }, () => true)
    .with(
      { is3dsNormalSettings: config.console === "3dsNormalSettings" },
      () => true,
    )
    .otherwise(() => false);

  if (show) {
    return <>{children}</>;
  }

  return null;
};
