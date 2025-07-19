import React from "react";
import { Skeleton } from "antd";
import { memoize, map, get } from "lodash-es";
import { useTranslationState } from "./state";
import { guides, GuideSlug, LanguageKey } from "~/guides";
import {
  Flex,
  CopyToClipboardButton,
  TextArea,
  Typography,
  Input,
  Field,
  FormFieldTable,
} from "~/components";
import { Translations, useTranslations } from "~/translations";
import { formatRelativeUrl } from "~/utils/formatRelativeUrl";
import { match, P } from "ts-pattern";

const noop = memoize(async () => "");

const selectGuide = ({
  selectedGuide,
  selectedLanguage,
}: {
  selectedGuide: GuideSlug;
  selectedLanguage: LanguageKey;
}) => {
  const guide = guides[selectedGuide];

  const translatedGuideSlug = get(guide.meta.translations, selectedLanguage);
  if (translatedGuideSlug != null) {
    return guides[translatedGuideSlug];
  }

  return guide;
};

type TranslateGuideProps = {
  selectedGuide: GuideSlug;
  selectedLanguage: LanguageKey;
};

const TranslateGuide = ({
  selectedGuide,
  selectedLanguage,
}: TranslateGuideProps) => {
  const [file, setFile] = React.useState<string>("");
  const guide = selectGuide({ selectedGuide, selectedLanguage });

  const getRawFile = guide?.getRawFile ?? noop;
  const rawFile = React.use(getRawFile());

  React.useEffect(() => {
    const splitFile = rawFile.split("---");
    if (splitFile.length < 2) {
      return;
    }

    const slug = guide?.meta.slug ?? "";
    const formattedSlug = formatRelativeUrl({
      url: slug,
      leadingSlash: false,
      trailingSlash: false,
    });

    const frontMatter = `
- title: "${guide?.meta.title}"
  navDrawerTitle: "${guide?.meta.navDrawerTitle}"
  description: "${guide?.meta.description}"
  slug: "${selectedLanguage}-${formattedSlug}"
  translation:
    enSlug: "${formattedSlug}"
    language: "${selectedLanguage}"
`;

    const content = ["", frontMatter, ...splitFile.slice(2)].join("---").trim();
    setFile(content);
  }, [selectedLanguage, rawFile, guide?.meta]);

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={3}>Translate Guide</Typography.Title>
      <TextArea
        value={file}
        fontFamily="monospace"
        onChange={(event) => setFile(event.target.value)}
        rows={25}
      />
      <CopyToClipboardButton text={file} />
    </Flex>
  );
};

type TranslateToolsProps = {
  selectedLanguage: LanguageKey;
};

const TranslateTools = ({ selectedLanguage }: TranslateToolsProps) => {
  const [translations, setTranslations] = React.useState<Partial<Translations>>(
    {},
  );
  const rawTranslations = useTranslations(selectedLanguage);

  React.useEffect(() => {
    setTranslations(rawTranslations);
  }, [rawTranslations]);

  const fields: Field[] = React.useMemo(() => {
    return map(rawTranslations, (value, key) => ({
      label: key,
      input: (
        <Input
          defaultValue={value}
          onChange={(event) =>
            setTranslations((prev) => ({
              ...prev,
              [key]: event.target.value,
            }))
          }
        />
      ),
    }));
  }, [rawTranslations]);

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={3}>Translate Tools</Typography.Title>
      <FormFieldTable fields={fields} />
      <CopyToClipboardButton text={JSON.stringify(translations, null, 2)} />
    </Flex>
  );
};

const InnerTranslationHelperEditGuide = () => {
  const [state] = useTranslationState();

  return match(state)
    .with({ type: "tools" }, (matched) => (
      <TranslateTools selectedLanguage={matched.selectedLanguage} />
    ))
    .with({ type: "guide", selectedGuide: P.nonNullable }, (matched) => (
      <TranslateGuide
        selectedGuide={matched.selectedGuide}
        selectedLanguage={matched.selectedLanguage}
      />
    ))
    .with({ type: "guide", selectedGuide: null }, () => (
      <Flex vertical gap={20}>
        <Typography.Text>Select a guide or tool to translate!</Typography.Text>
      </Flex>
    ))
    .exhaustive();
};

export const TranslationHelperEditGuide = () => {
  return (
    <React.Suspense
      fallback={
        <Flex vertical gap={20}>
          <Skeleton.Input block size="large" />
        </Flex>
      }
    >
      <InnerTranslationHelperEditGuide />
    </React.Suspense>
  );
};
