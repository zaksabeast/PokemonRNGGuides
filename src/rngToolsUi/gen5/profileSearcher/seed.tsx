import { Field, FormikBigIntInput } from "~/components";
import { z } from "zod";
import { initialProfile5Values, Profile5Validator } from "./shared/validator";
import { profile5Fields } from "./shared/fields";
import { Profile5Searcher, ValidatorMapper } from "./shared/form";

const Validator = z
  .object({
    seed: z.bigint().min(0n).max(0xffff_ffff_ffff_ffffn),
  })
  .extend(Profile5Validator.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  ...initialProfile5Values,
  seed: 0n,
};

const fields: Field[] = [
  ...profile5Fields,
  {
    label: "Seed",
    input: <FormikBigIntInput<FormState> name="seed" numType="hex_bigint" />,
  },
];

const mapValidator: ValidatorMapper<FormState> = (opts) => ({
  Seed: { seed: opts.seed.toString(10) },
});

export const Profile5SearcherSeed = () => {
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
