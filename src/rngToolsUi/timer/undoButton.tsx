import { useFormContext } from "~/hooks/form";
import { GenericForm } from "~/types";
import { Path } from "react-hook-form";
import { Button } from "~/components";
import { StateHistory } from "~/hooks/useStateHistory";

type UndoButtonProps<T> = {
  trackerId: string;
  history: StateHistory<T>;
  fields: Record<Extract<keyof T, string>, true>;
};

export const UndoButton = <T extends GenericForm>({
  trackerId,
  history,
  fields,
}: UndoButtonProps<T>) => {
  const { setFieldValue } = useFormContext<T>();
  const fieldNames = Object.keys(fields) as Path<T>[];

  return (
    <Button
      trackerId={trackerId}
      disabled={!history.canUndo}
      onClick={async () => {
        if (history.previous == null) {
          return;
        }

        fieldNames.forEach((fieldName) => {
          const value = history.previous?.[fieldName];
          setFieldValue(fieldName, value as T[typeof fieldName]);
        });

        await history.undo();
      }}
    >
      Undo Changes
    </Button>
  );
};
