import { useStarterState } from "./state";
import { match } from "ts-pattern";

type Starter4ShowIfProps = {
  game?: string;
  is3ds?: boolean;
  children: React.ReactNode;
};

export const Starter4ShowIf = ({
  game,
  is3ds,
  children,
}: Starter4ShowIfProps) => {
  const [state] = useStarterState();

  const show = match<{ game: string; is3ds: boolean }, boolean>(state)
    .with({ game }, () => true)
    .with({ is3ds }, () => true)
    .otherwise(() => false);

  if (show) {
    return <>{children}</>;
  }

  return null;
};
