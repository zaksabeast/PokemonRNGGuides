import { Dropdown } from "antd";
import { Flex } from "./flex";
import { Button } from "./button";
import { Icon } from "./icons";
import { match } from "ts-pattern";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Route } from "~/routes/defs";
import { Link } from "./link";
import { LanguageKey, languages } from "~/types/language";
import styled from "@emotion/styled";

const StyledLink = styled(Link)({
  fontWeight: "normal",
});

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
          <StyledLink href={slug} key={lang.key}>
            {lang.label}
          </StyledLink>
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
