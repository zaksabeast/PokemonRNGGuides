import {
  FieldRow,
  FormDateField,
  FormNumberField,
  FormSection,
  FormTimeField,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { type Translation } from "~/translations";
import { type SeedTimeSearchFormState } from "./utils";

type Props = {
  filterItemCountLabel: Translation;
};

export const SeedTimeSearchFields = ({ filterItemCountLabel }: Props) => {
  const t = useActiveRouteTranslations();

  return (
    <FormSection>
      <FieldRow>
        <FormDateField<SeedTimeSearchFormState> name="date" label={t["Date"]} />
        <FormTimeField<SeedTimeSearchFormState> name="time" label={t["Time"]} />
      </FieldRow>
      <FieldRow>
        <FormNumberField<SeedTimeSearchFormState>
          name="minSeconds"
          label={t["Min Seconds"]}
          numType="decimal"
        />
        <FormNumberField<SeedTimeSearchFormState>
          name="maxSeconds"
          label={t["Max Seconds"]}
          numType="decimal"
        />
      </FieldRow>
      <FieldRow>
        <FormNumberField<SeedTimeSearchFormState>
          name="minDelay"
          label={t["Min Delay"]}
          numType="decimal"
        />
        <FormNumberField<SeedTimeSearchFormState>
          name="maxDelay"
          label={t["Max Delay"]}
          numType="decimal"
        />
      </FieldRow>
      <FormNumberField<SeedTimeSearchFormState>
        name="filterItemCount"
        label={t[filterItemCountLabel]}
        numType="decimal"
      />
    </FormSection>
  );
};
