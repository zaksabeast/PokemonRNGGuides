import { Flex, Tag } from "~/components";
import { match } from "ts-pattern";
import styled from "@emotion/styled";
import { uniq } from "lodash-es";
import { GuideMeta } from "~/guides";
import { languageByKey, LanguageKey } from "~/types/language";
import { styledPropGuard } from "~/utils/styled";

export type DisplayAttribute = GuideMeta["displayAttributes"][number] | "new";

const DisplayTag = styled(
  Tag,
  styledPropGuard,
)<{ tag: DisplayAttribute | "translated" }>(({ tag, theme }) => {
  const colors = match(tag)
    .with("new", () => ({
      color: theme.token.colorGuideTagNew,
      backgroundColor: theme.token.colorGuideTagNewBg,
    }))
    .with("web_tool", () => ({
      color: theme.token.colorGuideTagWebTool,
      backgroundColor: theme.token.colorGuideTagWebToolBg,
    }))
    .with("video_guide", () => ({
      color: theme.token.colorGuideTagVideoGuide,
      backgroundColor: theme.token.colorGuideTagVideoGuideBg,
    }))
    .with("rough_draft", () => ({
      color: theme.token.colorGuideTagRoughDraft,
      backgroundColor: theme.token.colorGuideTagRoughDraftBg,
    }))
    .with("translated", () => ({
      color: theme.token.colorGuideTagTranslated,
      backgroundColor: theme.token.colorGuideTagTranslatedBg,
    }))
    .exhaustive();

  return {
    ...colors,
    marginRight: 0,
    border: 0,
  };
});

const getDisplayAttributeLabel = (
  tag: Exclude<DisplayAttribute, "translated">,
) => {
  return match(tag)
    .with("new", () => "New")
    .with("web_tool", () => "Web Tool")
    .with("video_guide", () => "Video")
    .with("rough_draft", () => "Rough Draft")
    .exhaustive();
};

type DisplayTagsProps = {
  attributes: readonly DisplayAttribute[];
  translations: LanguageKey[];
};

export const DisplayTags = ({ attributes, translations }: DisplayTagsProps) => {
  const uniqueAttributes = uniq(attributes);
  const uniqueTranslations = uniq(["en", ...translations])
    .map((lang) => languageByKey[lang].shortLabel)
    .join(" · ");

  return (
    <Flex wrap gap={8}>
      {uniqueAttributes.map((tag) => (
        <DisplayTag key={tag} tag={tag}>
          {getDisplayAttributeLabel(tag)}
        </DisplayTag>
      ))}
      <DisplayTag tag="translated">{uniqueTranslations}</DisplayTag>
    </Flex>
  );
};
