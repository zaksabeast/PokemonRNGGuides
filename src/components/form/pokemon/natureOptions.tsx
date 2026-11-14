import { type Nature } from "~/rngTools";
import { Translations } from "~/translations";
import { type SelectOption } from "~/components/form/base/selectField";
import { Flex } from "~/components/flex";
import { Icon } from "~/components/icons";

const toNatureLabel = (nat: string, up: string, down: string) => {
  return (
    <Flex mr={8}>
      <Flex width={100}>{nat}</Flex>{" "}
      <Flex width={80}>
        <Icon name="ArrowUp" /> {up.toUpperCase()}
      </Flex>{" "}
      <Flex>
        <Icon name="ArrowDown" /> {down.toUpperCase()}
      </Flex>
    </Flex>
  );
};

const getNatureInputProps = (translations?: Translations) => {
  const t = (text: keyof Translations) => {
    return translations?.[text] ?? text;
  };

  const options = [
    {
      value: "Adamant",
      labelWhenSelected: t("Adamant"),
      label: toNatureLabel(t("Adamant"), t("Atk"), t("SpA")),
    },
    { value: "Bashful", labelWhenSelected: t("Bashful"), label: t("Bashful") },
    {
      value: "Bold",
      labelWhenSelected: t("Bold"),
      label: toNatureLabel(t("Bold"), t("Def"), t("Atk")),
    },
    {
      value: "Brave",
      labelWhenSelected: t("Brave"),
      label: toNatureLabel(t("Brave"), t("Atk"), t("Spe")),
    },
    {
      value: "Calm",
      labelWhenSelected: t("Calm"),
      label: toNatureLabel(t("Calm"), t("SpD"), t("Atk")),
    },
    {
      value: "Careful",
      labelWhenSelected: t("Careful"),
      label: toNatureLabel(t("Careful"), t("SpD"), t("SpA")),
    },
    { value: "Docile", labelWhenSelected: t("Docile"), label: t("Docile") },
    {
      value: "Gentle",
      labelWhenSelected: t("Gentle"),
      label: toNatureLabel(t("Gentle"), t("SpD"), t("Def")),
    },
    { value: "Hardy", labelWhenSelected: t("Hardy"), label: t("Hardy") },
    {
      value: "Hasty",
      labelWhenSelected: t("Hasty"),
      label: toNatureLabel(t("Hasty"), t("Spe"), t("Def")),
    },
    {
      value: "Impish",
      labelWhenSelected: t("Impish"),
      label: toNatureLabel(t("Impish"), t("Def"), t("SpA")),
    },
    {
      value: "Jolly",
      labelWhenSelected: t("Jolly"),
      label: toNatureLabel(t("Jolly"), t("Spe"), t("SpA")),
    },
    {
      value: "Lax",
      labelWhenSelected: t("Lax"),
      label: toNatureLabel(t("Lax"), t("Def"), t("SpD")),
    },
    {
      value: "Lonely",
      labelWhenSelected: t("Lonely"),
      label: toNatureLabel(t("Lonely"), t("Atk"), t("Def")),
    },
    {
      value: "Mild",
      labelWhenSelected: t("Mild"),
      label: toNatureLabel(t("Mild"), t("SpA"), t("Def")),
    },
    {
      value: "Modest",
      labelWhenSelected: t("Modest"),
      label: toNatureLabel(t("Modest"), t("SpA"), t("Atk")),
    },
    {
      value: "Naive",
      labelWhenSelected: t("Naive"),
      label: toNatureLabel(t("Naive"), t("Spe"), t("SpD")),
    },
    {
      value: "Naughty",
      labelWhenSelected: t("Naughty"),
      label: toNatureLabel(t("Naughty"), t("Atk"), t("SpD")),
    },
    {
      value: "Quiet",
      labelWhenSelected: t("Quiet"),
      label: toNatureLabel(t("Quiet"), t("SpA"), t("Spe")),
    },
    { value: "Quirky", labelWhenSelected: t("Quirky"), label: t("Quirky") },
    {
      value: "Rash",
      labelWhenSelected: t("Rash"),
      label: toNatureLabel(t("Rash"), t("SpA"), t("SpD")),
    },
    {
      value: "Relaxed",
      labelWhenSelected: t("Relaxed"),
      label: toNatureLabel(t("Relaxed"), t("Def"), t("Spe")),
    },
    {
      value: "Sassy",
      labelWhenSelected: t("Sassy"),
      label: toNatureLabel(t("Sassy"), t("SpD"), t("Spe")),
    },
    { value: "Serious", labelWhenSelected: t("Serious"), label: t("Serious") },
    {
      value: "Timid",
      labelWhenSelected: t("Timid"),
      label: toNatureLabel(t("Timid"), t("Spe"), t("Atk")),
    },
  ] satisfies {
    value: Nature;
    labelWhenSelected: string;
    label: React.ReactNode;
  }[];

  return {
    options,
    optionLabelProp: "labelWhenSelected",
    showSearch: { optionFilterProp: "labelWhenSelected" },
  };
};

export const getNatureOptions = (t: Translations): SelectOption<Nature>[] =>
  getNatureInputProps(t).options.map((option) => ({
    value: option.value,
    label: option.label,
    selectedLabel: option.labelWhenSelected,
    searchText: option.labelWhenSelected,
  }));
