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
import { ApplicationLayout } from "~/layouts/application";
import { WideLayout } from "~/layouts/wide";
import { SIDE_MARGIN } from "~/layouts/main";

const MediaSkeleton = styled(Skeleton.Node)({
  width: "100%",
  "&&& .ant-skeleton-node": {
    width: "100%",
    height: 200,
  },
});

const introParagraph = { rows: 3 };
const sectionParagraph = { rows: 4 };
const sectionTitle = { width: "40%" };
const shortSectionTitle = { width: "30%" };

const loading = (
  <Flex vertical gap={32} height="100%">
    <Skeleton active title={false} paragraph={introParagraph} />
    <Skeleton active title={sectionTitle} paragraph={sectionParagraph} />
    <MediaSkeleton active />
    <Skeleton active title={shortSectionTitle} paragraph={introParagraph} />
  </Flex>
);

// Wide pages pad their own content, so the skeleton needs the margins other layouts provide
const WideLoading = styled.div({
  paddingInline: SIDE_MARGIN,
});

export const MarkdownScreen = () => {
  const route = useActiveRoute();
  const isHydrated = useIsHydrated();

  const { Guide, meta } = getGuide(route);

  const fallback =
    meta.layout === "wide" ? <WideLoading>{loading}</WideLoading> : loading;

  // If not hydrated, show the pre-rendered page
  // Once hydrated, suspend while loading the content
  const content = !isHydrated ? (
    <Guide />
  ) : (
    <React.Suspense fallback={fallback}>
      <Guide />
    </React.Suspense>
  );

  return match(meta.layout)
    .with("application", () => (
      <ApplicationLayout trackerName={meta.slug}>{content}</ApplicationLayout>
    ))
    .with("guide", () => <GuideLayout guideMeta={meta}>{content}</GuideLayout>)
    .with("titled", () => (
      <TitledLayout guideMeta={meta}>{content}</TitledLayout>
    ))
    .with("wide", () => <WideLayout>{content}</WideLayout>)
    .exhaustive();
};
