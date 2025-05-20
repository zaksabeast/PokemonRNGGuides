import React from "react";

type DetectableTag = "web_tool" | "video_guide";

type TagCollector = Partial<Record<DetectableTag, boolean>>;
export type SetTags = (tag: TagCollector) => void;

export const TagContext = React.createContext<SetTags | undefined>(undefined);

export const withTags = (
  Component: React.FC,
  tags: Partial<Record<DetectableTag, true>>,
) => {
  return (props: React.ComponentProps<typeof Component>) => {
    const setTags = React.useContext(TagContext);
    setTags?.(tags);

    return <Component {...props} />;
  };
};
