import { z } from "zod";
import { FormSection, IvRangeFields } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { initialProfile5Values, Profile5Validator } from "./shared/validator";
import { Profile5Searcher, ValidatorMapper } from "./shared/form";
import { IvsSchema } from "~/components/ivInput";
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

const mapValidator: ValidatorMapper<FormState> = (opts) => ({
  Ivs: {
    min_ivs: opts.min_ivs,
    max_ivs: opts.max_ivs,
  },
});

export const Profile5SearcherIvs = () => {
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
        <IvRangeFields<FormState> minName="min_ivs" maxName="max_ivs" />
      </FormSection>
    </Profile5Searcher>
  );
};
