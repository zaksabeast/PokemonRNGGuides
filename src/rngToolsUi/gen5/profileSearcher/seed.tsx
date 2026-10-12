import { z } from "zod";
import { FormBigIntField, FormSection } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { initialProfile5Values, Profile5Validator } from "./shared/validator";
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

const mapValidator: ValidatorMapper<FormState> = (opts) => ({
  Seed: { seed: opts.seed.toString(10) },
});

export const Profile5SearcherSeed = () => {
  const t = useActiveRouteTranslations();

  return (
    <Profile5Searcher<FormState>
      initialValues={initialValues}
      validationSchema={Validator}
      cancelTrackerId="profile5-searcher-seed-cancel"
      submitTrackerId="profile5-searcher-seed"
      mapValidator={mapValidator}
    >
      <FormSection title={t["Calibration"]}>
        <FormBigIntField<FormState> name="seed" label={t["Seed"]} />
      </FormSection>
    </Profile5Searcher>
  );
};
