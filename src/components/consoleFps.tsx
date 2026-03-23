import React from "react";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { GBA_FPS, NDS_SLOT2_FPS } from "~/utils/consts";
import { useField } from "~/hooks/form";
import { Select } from "./select";

type FormikConsoleFpsProps<FormState extends GenericForm> = {
  generation: 3;
  name: GuaranteeFormNameType<FormState, number>;
};

type Value = "GBA" | "NDS" | "mGBA_60" | "mGBA_Native";

const gen3Options: {
  label: string;
  value: Value;
  fps: number;
}[] = [
  { label: "GBA", value: "GBA", fps: GBA_FPS },
  { label: "NDS - GBA Slot", value: "NDS", fps: NDS_SLOT2_FPS },
  { label: "mGBA (60 FPS target)", value: "mGBA_60", fps: 60 },
  { label: "mGBA (Native FPS target)", value: "mGBA_Native", fps: GBA_FPS },
];

export const FormikConsoleFps = <FormState extends GenericForm>({
  name,
}: FormikConsoleFpsProps<FormState>) => {
  const [{ value: fpsValue }, , { setValue: setFpsValue }] =
    useField<number>(name);

  const [valueStr, setValueStr] = React.useState<Value>("GBA");

  React.useEffect(() => {
    const curEl = gen3Options.find((opt) => opt.value === valueStr);
    if (curEl != null) {
      setFpsValue(curEl.fps);
    }
  }, [fpsValue, setFpsValue, valueStr]);

  // Note: We can't use the FPS as the value, because multiple entries share the same FPS.
  // This is a workaround so that FormikConsoleFps acts like a Formik component.
  return (
    <Select options={gen3Options} value={valueStr} onChange={setValueStr} />
  );
};
