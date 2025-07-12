import React from "react";
import { Skeleton } from "antd";
import { memoize, map } from "lodash-es";
import { useTranslationState } from "./state";
import { guides } from "~/guides";
import { Flex, CopyToClipboardButton, TextArea } from "~/components";
import { useTranslations } from "~/translations";

const noop = memoize(async () => "");

const InnerTranslationHelperEditGuide = () => {
  const [{ type, selectedGuide, selectedLanguage }] = useTranslationState();
  const [file, setFile] = React.useState<string>("");
  const rawTranslations = useTranslations(selectedLanguage ?? "en");
  const translations = map(
    rawTranslations,
    (value, key) => `"${key}": "${value}"`,
  ).join("\n");

  const guide = selectedGuide == null ? null : guides[selectedGuide];

  const getRawFile = guide?.getRawFile ?? noop;
  const rawFile = React.use(getRawFile());

  React.useEffect(() => {
    if (type === "tools") {
      setFile(translations);
      return;
    }

    const splitFile = rawFile.split("---");
    if (splitFile.length < 2) {
      return;
    }

    const frontMatter = `
title: "${guide?.meta.title}"
navDrawerTitle: "${guide?.meta.navDrawerTitle}"
description: "${guide?.meta.description}"
slug: "${guide?.meta.slug}"
`;

    const content = ["", frontMatter, ...splitFile.slice(2)].join("---").trim();
    setFile(content);
  }, [type, translations, rawFile, guide?.meta]);

  return (
    <Flex vertical gap={16}>
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
