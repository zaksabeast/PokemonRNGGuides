import { Field } from "~/components";
import { z } from "zod";
import { initialProfile5Values, Profile5Validator } from "./shared/validator";
import { profile5Fields } from "./shared/fields";
import { Profile5Searcher, ValidatorMapper } from "./shared/form";
import { IvInput, IvsSchema } from "~/components/ivInput";
import { maxIvs, minIvs } from "~/types/ivs";

const Validator = z
  .object({
    min_ivs: IvsSchema,
    max_ivs: IvsSchema,
  })
  .extend(Profile5Validator.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  ...initialProfile5Values,
  min_ivs: minIvs,
  max_ivs: maxIvs,
};

const fields: Field[] = [
  ...profile5Fields,
  {
    label: "Min IVs",
    input: <IvInput<FormState> name="min_ivs" />,
  },
  {
    label: "Max IVs",
    input: <IvInput<FormState> name="max_ivs" />,
  },
];

const mapValidator: ValidatorMapper<FormState> = (opts) => ({
  Ivs: {
    min_ivs: opts.min_ivs,
    max_ivs: opts.max_ivs,
  },
});

export const Profile5SearcherIvs = () => {
  return (
    <Profile5Searcher<FormState>
      fields={fields}
      initialValues={initialValues}
      validationSchema={Validator}
      cancelTrackerId="profile5-searcher-seed-cancel"
      submitTrackerId="profile5-searcher-seed"
      mapValidator={mapValidator}
    />
  );
};
