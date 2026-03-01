import { Flex, Tag } from "~/components";
import { match } from "ts-pattern";
import styled from "@emotion/styled";
import { GuideMeta } from "~/guides";

export type DisplayAttribute = GuideMeta["displayAttributes"][number] | "new";

const getUniqueDisplayTags = (
  displayAttributes: readonly DisplayAttribute[],
): DisplayAttribute[] => {
  const uniqueTags = new Set<DisplayAttribute>();

  for (const tag of displayAttributes) {
    if (tag != null) {
      uniqueTags.add(tag);
    }
  }

  return [...uniqueTags];
};

const DisplayTag = styled(Tag)<{ tag: DisplayAttribute }>(({ tag }) => {
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
    .exhaustive();

  return {
    ...colors,
    borderRadius: 20,
    border: 0,
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.04)",
  };
});

const getDisplayAttributeLabel = (tag: DisplayAttribute) => {
  return match(tag)
    .with("new", () => "New")
    .with("web_tool", () => "Web Tool")
    .with("video_guide", () => "Video")
    .exhaustive();
};

type DisplayTagsProps = {
  attributes: readonly DisplayAttribute[];
};

export const DisplayTags = ({ attributes }: DisplayTagsProps) => {
  if (attributes.length === 0) {
    return null;
  }

  const uniqueAttributes = getUniqueDisplayTags(attributes);

  return (
    <Flex wrap>
      {uniqueAttributes.map((tag) => (
        <Flex key={tag}>
          <DisplayTag tag={tag}>{getDisplayAttributeLabel(tag)}</DisplayTag>
        </Flex>
      ))}
    </Flex>
  );
};
