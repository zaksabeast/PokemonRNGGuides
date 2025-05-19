import React from "react";
import { Flex } from "~/components";
import { Skeleton } from "antd";
import { match } from "ts-pattern";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { GuideLayout } from "~/layouts/guide";
import { TitledLayout } from "~/layouts/titled";
import styled from "@emotion/styled";

const StyledSkeletonTitle = styled(Skeleton)({
  marginTop: 24,
  marginBottom: 2,
  "&& .ant-skeleton-paragraph li": {
    height: 30,
  },
});

const StyledSkeletonParagraph = styled(Skeleton)({
  marginBottom: 16,
  "&& .ant-skeleton-paragraph li": {
    height: 20,
  },
});

const skeletonTitleStyles = { rows: 1 };
const skeletonParagraphStyles = { rows: 4 };

const loading = (
  <Flex vertical height="100%">
    <StyledSkeletonTitle paragraph={skeletonTitleStyles} title={false} />
    <StyledSkeletonParagraph
      paragraph={skeletonParagraphStyles}
      title={false}
    />

    <StyledSkeletonTitle paragraph={skeletonTitleStyles} title={false} />
    <StyledSkeletonParagraph
      paragraph={skeletonParagraphStyles}
      title={false}
    />
  </Flex>
);

export const MarkdownScreen = () => {
  const route = useActiveRoute();
  const { Guide, meta } = getGuide(route);
  return match(meta.layout)
    .with("guide", () => (
      <GuideLayout guideMeta={meta}>
        <React.Suspense fallback={loading}>
          <Guide />
        </React.Suspense>
      </GuideLayout>
    ))
    .with("titled", () => (
      <TitledLayout guideMeta={meta}>
        <React.Suspense fallback={loading}>
          <Guide />
        </React.Suspense>
      </TitledLayout>
    ))
    .exhaustive();
};
