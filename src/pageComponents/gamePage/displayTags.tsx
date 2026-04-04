import { Flex, Tag } from "~/components";
import { match } from "ts-pattern";
import styled from "@emotion/styled";
import { uniq } from "lodash-es";
import { GuideMeta } from "~/guides";
import { languageByKey, LanguageKey } from "~/types/language";

export type DisplayAttribute = GuideMeta["displayAttributes"][number] | "new";

const DisplayTag = styled(Tag)<{ tag: DisplayAttribute | "translated" }>(({
  tag,
}) => {
  const colors = match(tag)
    .with("new", () => ({
      color: "#AF52DE",
      backgroundColor: "rgba(175, 82, 222, 0.1)",
    }))
    .with("web_tool", () => ({
      color: "#7E5BEF",
      backgroundColor: "rgba(126, 91, 239, 0.08)",
    }))
    .with("video_guide", () => ({
      color: "#007AFF",
      backgroundColor: "rgba(0, 122, 255, 0.1)",
    }))
    .with("rough_draft", () => ({
      color: "#FF3B30",
      backgroundColor: "rgba(255, 59, 48, 0.1)",
    }))
    .with("translated", () => ({
      color: "#00B894",
      backgroundColor: "rgba(0, 184, 148, 0.1)",
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
