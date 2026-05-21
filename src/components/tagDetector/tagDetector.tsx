import React from "react";
import { TagContext, SetTags } from "./provider";

type TagDetectorProps = {
  setTags?: SetTags;
  children: React.ReactNode;
};

export const TagDetector = ({ setTags, children }: TagDetectorProps) => {
  return <TagContext.Provider value={setTags}>{children}</TagContext.Provider>;
};
