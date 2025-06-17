import { useId4State } from "./state";
import { match } from "ts-pattern";

type Id4ShowIfProps = {
  is3ds?: boolean;
  children: React.ReactNode;
};

export const Id4ShowIf = ({ is3ds, children }: Id4ShowIfProps) => {
  const [state] = useId4State();

  const show = match<{ game: string; is3ds: boolean }, boolean>(state)
    .with({ is3ds }, () => true)
    .otherwise(() => false);

  if (show) {
    return <>{children}</>;
  }

  return null;
};
