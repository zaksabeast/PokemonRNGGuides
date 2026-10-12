import {
  FormNumberField,
  FormSwitchField,
  FrameBeforePaintingField,
  TargetAdvanceField,
} from "~/components/form";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { usingPaintingReseedingLabel } from "../pokemonRng/labels";
import { FormState as WildFormState } from "../wild/wild3TargetSetupInput";
import { FormState as StaticFormState } from "../static/static3TargetSetupInput";

type FormState = WildFormState | StaticFormState;

type Props = {
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
};

export const PaintingReseedingFields = ({
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: Props) => (
  <>
    <FormSwitchField<FormState>
      name="usingPaintingReseeding"
      {...usingPaintingReseedingLabel()}
    >
      <FrameBeforePaintingField<FormState>
        name="targetFrameBeforePainting"
        label="Target frame before painting (Painting seed)"
      />
      <FormNumberField<FormState>
        name="targetAdvance"
        label="Target advance after painting"
        numType="decimal"
        helperText={`Equivalent to ${formatLargeInteger(equivalentInitialAdvs)} advances without painting reseeding`}
      />
    </FormSwitchField>
    {!usingPaintingReseeding && (
      <TargetAdvanceField<FormState>
        name="targetAdvance"
        label="Target RNG state"
      />
    )}
  </>
);
