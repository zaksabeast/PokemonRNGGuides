import { type Nature } from "~/rngTools";
import { getNatureInputProps } from "~/components/pkmFilter";
import { Translations } from "~/translations";
import { type SelectOption } from "~/components/form/base/selectField";

export const getNatureOptions = (t: Translations): SelectOption<Nature>[] =>
  getNatureInputProps(t).options.map((option) => ({
    value: option.value,
    label: option.label,
    selectedLabel: option.labelWhenSelected,
    searchText: option.labelWhenSelected,
  }));
