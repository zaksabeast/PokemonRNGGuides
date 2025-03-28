import { Dropdown } from "antd";
import { Flex } from "./flex";
import { Button } from "./button";
import { Icon } from "./icons";
import { match, P } from "ts-pattern";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Route } from "~/routes/defs";

type LanguageKey = "en" | "es" | "zh";

type LanguageItem = {
  key: LanguageKey;
  label: string;
  type: "item";
};

const languages: LanguageItem[] = [
  {
    key: "en",
    label: "English",
    type: "item",
  },
  {
    key: "es",
    label: "Español",
    type: "item",
  },
  {
    key: "zh",
    label: "简体中文",
    type: "item",
  },
];

type Props = {
  enSlug: Route;
  esSlug?: Route;
  zhSlug?: Route;
};

export const LanguageButton = ({ enSlug, esSlug ,zhSlug}: Props) => {
  const [route, setLocation] = useActiveRoute();

  const currentLanguageKey = match<string | undefined, LanguageKey>(route)
    .with(enSlug, () => "en")
    .with(esSlug, () => "es")
    .with(zhSlug, () => "zh")
    .otherwise(() => "en");

  const setLanguageKey = (key: string) => {
    const slug = match({ key, enSlug, esSlug ,zhSlug })
      .with(
        { key: "en", enSlug: P.not(P.nullish) },
        (matched) => matched.enSlug,
      )
      .with(
        { key: "es", esSlug: P.not(P.nullish) },
        (matched) => matched.esSlug,
      )
      .with(
        { key: "zh", zhSlug: P.not(P.nullish) },
        (matched) => matched.zhSlug,
      )
      .otherwise(() => enSlug);
    setLocation(slug);
  };

  return (
    <Flex>
      <Dropdown
        menu={{
          items: languages,
          onClick: (item) => setLanguageKey(item.key),
        }}
        placement="bottom"
      >
        <Button
          trackerId="change_language"
          icon={<Icon name="Language" />}
          size="middle"
        >
          {languages.find((lang) => lang.key === currentLanguageKey)?.label}
        </Button>
      </Dropdown>
    </Flex>
  );
};
