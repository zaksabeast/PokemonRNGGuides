import React from "react";
import { Flex } from "~/components";
import { Skeleton } from "antd";
import { match } from "ts-pattern";
import { getGuide } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { GuideLayout } from "~/layouts/guide";
import { TitledLayout } from "~/layouts/titled";
import styled from "@emotion/styled";
import { useIsHydrated } from "~/hooks/useHydrate";

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
  const isHydrated = useIsHydrated();

  const { Guide, meta } = getGuide(route);

  // If not hydrated, show the pre-rendered page
  // Once hydrated, suspend while loading the content
  const content = !isHydrated ? (
    <Guide />
  ) : (
    <React.Suspense fallback={loading}>
      <Guide />
    </React.Suspense>
  );

  return match(meta.layout)
    .with("guide", () => <GuideLayout guideMeta={meta}>{content}</GuideLayout>)
    .with("titled", () => (
      <TitledLayout guideMeta={meta}>{content}</TitledLayout>
    ))
    .exhaustive();
};
