import { Gen4ShowIf, Gen4ShowIfProps } from "../shared/gen4ShowIf";
import { Id4State, useId4State } from "./state";

type Id4ShowIfProps = Gen4ShowIfProps<Id4State>;

export const Id4ShowIf = (props: Omit<Id4ShowIfProps, "state">) => {
  const [state] = useId4State();
  return <Gen4ShowIf state={state} {...props} />;
};
