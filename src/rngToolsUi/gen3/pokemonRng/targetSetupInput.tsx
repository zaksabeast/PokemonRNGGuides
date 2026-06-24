import { Field, FormikNumberInput, FormikSwitch } from "~/components";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { usingPaintingReseedingLabel } from "../pokemonRng/labels";
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
    label: "Target advance after painting",
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
        Equivalent to {formatLargeInteger(equivalentInitialAdvs)} advances
        without painting reseeding
      </>
    ),
    indent: 1,
  },
];
