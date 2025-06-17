import { useStarterState } from "./state";

type Starter4ShowIfProps = {
  game?: string;
  children: React.ReactNode;
};

export const Starter4ShowIf = ({ game, children }: Starter4ShowIfProps) => {
  const [state] = useStarterState();

  const show = state.game === game;

  if (show) {
    return <>{children}</>;
  }

  return null;
};
