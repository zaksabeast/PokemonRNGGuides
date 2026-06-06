import { Static3Game } from "./constants";
import {
  Field,
  FormFieldTable,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  Typography,
} from "~/components";
import { toOptions } from "~/utils/options";
import { gen3StaticMethods } from "./static3TargetSetupInput";
import { usingTargetSetupInputs } from "../pokemonRng/generatorResultColumns";
import { FormState } from "./static3TargetSetupSearcher";

const getSetupFields = (_game: Static3Game): Field[] => [
  {
    label: "TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: "SID",
    input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
  },
  {
    label: "Methods",
    input: (
      <FormikSelect<FormState, "methods">
        name="methods"
        options={toOptions(gen3StaticMethods)}
        mode="multiple"
        selectAllNoneButtons
      />
    ),
  },
  ...usingTargetSetupInputs(false, 0, ["usingPaintingReseeding"]),
  {
    label: "Let searcher find painting seed",
    input: <FormikSwitch<FormState> name="letSearcherFindPaintingSeed" />,
  },
  {
    label: "Initial seed",
    input: <FormikNumberInput<FormState> name="initial_seed" numType="hex" />,
  },
  {
    label: "Initial advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Min frame before painting",
    input: (
      <FormikNumberInput<FormState>
        name="min_frame_before_painting"
        numType="decimal"
      />
    ),
  },
  {
    label: "Min advances after painting",
    input: (
      <FormikNumberInput<FormState>
        name="min_adv_after_painting"
        numType="decimal"
      />
    ),
  },
  {
    label: "Max advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Max results",
    input: (
      <FormikNumberInput<FormState> name="max_result_count" numType="decimal" />
    ),
  },
];

export const Static3SetupFilter = ({ game }: { game: Static3Game }) => {
  return (
    <>
      <Typography.Title level={4} p={0} m={0}>
        Setup
      </Typography.Title>
      <FormFieldTable fields={getSetupFields(game)} />
    </>
  );
};
