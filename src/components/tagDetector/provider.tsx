import React from "react";

type DetectableTag = "web_tool" | "video_guide";

type TagCollector = Partial<Record<DetectableTag, boolean>>;
export type SetTags = (tag: TagCollector) => void;

export const TagContext = React.createContext<SetTags | undefined>(undefined);

export const withTags = <Props extends Record<string, unknown>>(
  Component: React.ComponentType<Props>,
  tags: Partial<Record<DetectableTag, true>>,
) => {
  return (props: Props) => {
    const setTags = React.useContext(TagContext);
    setTags?.(tags);

    return <Component {...props} />;
  };
};
