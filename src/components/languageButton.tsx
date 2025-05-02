import { Dropdown } from "antd";
import { Flex } from "./flex";
import { Button } from "./button";
import { Icon } from "./icons";
import { match, P } from "ts-pattern";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Route } from "~/routes/defs";
import { LanguageKey } from "~/guides";

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
  en: Route;
  es?: Route;
  zh?: Route;
};

export const LanguageButton = ({
  en: enSlug,
  es: esSlug,
  zh: zhSlug,
}: Props) => {
  const [route, setLocation] = useActiveRoute();

  const setLanguageKey = (key: string) => {
    const slug = match({ key, enSlug, esSlug, zhSlug })
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

  const currentLanguageKey = match<string | undefined, LanguageKey>(route)
    .with(enSlug, () => "en")
    .with(esSlug, () => "es")
    .with(zhSlug, () => "zh")
    .otherwise(() => "en");

  const availableLanguages = languages.filter((lang) => {
    return match(lang.key)
      .with("en", () => true)
      .with("es", () => esSlug != null)
      .with("zh", () => zhSlug != null)
      .otherwise(() => false);
  });

  return (
    <Flex>
      <Dropdown
        menu={{
          items: availableLanguages,
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
