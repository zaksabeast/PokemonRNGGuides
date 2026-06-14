import { Field, FormikNumberInput, FormikSwitch } from "~/components";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { usingPaintingReseedingLabel } from "../wild/wild3Labels";
import { FormState as WildFormState } from "../wild/wild3TargetSetupInput";
import { FormState as StaticFormState } from "../static/static3TargetSetupInput";
import { FormikEmeraldTargetAdvance } from "~/components/emeraldTargetAdvance";

type FormState = WildFormState | StaticFormState;

export const getPaintingReseedingFields = ({
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: {
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
}): Field[] => [
  {
    ...usingPaintingReseedingLabel(),
    input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
  },
  {
    label: "Target frame before painting (Painting seed)",
    input: (
      <FormikEmeraldFrameBeforePaintingInput<FormState> name="targetFrameBeforePainting" />
    ),
    indent: 1,
    show: usingPaintingReseeding,
  },
  {
    label: "Target advances after painting",
    input: (
      <FormikNumberInput<FormState> name="targetAdvance" numType="decimal" />
    ),
    show: usingPaintingReseeding,
    indent: 1,
  },
  {
    label: "Target RNG state",
    input: <FormikEmeraldTargetAdvance<FormState> name="targetAdvance" />,
    show: !usingPaintingReseeding,
  },
  {
    label: "",
    key: "Equivalent to Advances",
    show: usingPaintingReseeding,
    input: (
      <>
        Equivalent to Advances = {formatLargeInteger(equivalentInitialAdvs)}{" "}
        without painting reseeding
      </>
    ),
    indent: 1,
  },
];
