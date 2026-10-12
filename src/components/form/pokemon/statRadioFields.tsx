import { range } from "lodash-es";
import { z } from "zod";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { GenericForm, type RequireFormFields } from "~/types/form";
import {
  statLabels,
  stats,
  StatFieldsSchema,
  type MinMaxStats,
} from "~/types/stat";
import { toOptions } from "~/utils/options";
import { FormRadioField } from "~/components/form/base/radioField";

type StatValues = z.infer<typeof StatFieldsSchema>;

type Props<FormState extends GenericForm> = {
  minMaxStats: MinMaxStats;
} & RequireFormFields<FormState, StatValues>;

export const StatRadioFields = <FormState extends GenericForm>({
  minMaxStats,
}: Props<FormState>) => {
  const t = useActiveRouteTranslations();

  return stats.map((stat) => (
    <FormRadioField<StatValues>
      key={stat}
      name={`${stat}Stat`}
      label={t[statLabels[stat]]}
      cellSize="number"
      options={toOptions(
        range(minMaxStats[stat].min, minMaxStats[stat].max + 1),
      )}
    />
  ));
};
