import { Dropdown } from "antd";
import { Flex } from "./flex";
import { Button } from "./button";
import { Icon } from "./icons";
import { match } from "ts-pattern";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Route } from "~/routes/defs";
import { LanguageKey } from "~/guides";
import { Link } from "./link";

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
  {
    key: "fr",
    label: "Français",
    type: "item",
  },
  {
    key: "it",
    label: "Italiano",
    type: "item",
  },
  {
    key: "de",
    label: "Deutsch",
    type: "item",
  },
];

type Props = {
  en: Route;
  es?: Route;
  zh?: Route;
  fr?: Route;
  it?: Route;
  de?: Route;
};

export const LanguageButton = (props: Props) => {
  const route = useActiveRoute();
  const slugs = props;

  const currentLanguageKey = match<string | undefined, LanguageKey>(route)
    .with(slugs.en, () => "en")
    .with(slugs.es, () => "es")
    .with(slugs.zh, () => "zh")
    .with(slugs.fr, () => "fr")
    .with(slugs.it, () => "it")
    .with(slugs.de, () => "de")
    .otherwise(() => "en");

  const availableLanguages = languages
    .map((lang) => {
      const slug = slugs[lang.key];
      if (slug == null) {
        return null;
      }

      return {
        key: lang.key,
        label: (
          <Link href={slug} key={lang.key}>
            {lang.label}
          </Link>
        ),
      };
    })
    .filter((link) => link != null);

  return (
    <Flex>
      <Dropdown menu={{ items: availableLanguages }} placement="bottom">
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
