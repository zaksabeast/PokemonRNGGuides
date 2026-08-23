import * as tst from "ts-toolbelt";
import { Flex, Typography, Icon } from "~/components";
import { InternalOrExternalGuideMeta, guideTranslationKeys } from "~/guides";
import { filterVisibleGuide, sortGuides } from "./utils";
import { match } from "ts-pattern";
import { GuideCardFrame } from "./guideCardFrame";

type VisibleNonRngGuide = tst.U.Exclude<
  InternalOrExternalGuideMeta,
  { hideFromNavDrawer: true }
>;

type DirectGuideCardProps = {
  isTop: boolean;
  isBottom: boolean;
  guide: VisibleNonRngGuide;
};

const DirectGuideCard = ({ isTop, isBottom, guide }: DirectGuideCardProps) => {
  const linkProps = match(guide)
    .with({ type: "baseGuide" }, (matched) => ({
      slug: matched.slug,
    }))
    .with({ type: "externalLink" }, (matched) => ({
      externalHref: matched.url,
      newTab: true,
    }))
    .exhaustive();

  return (
    <GuideCardFrame
      cardId={`guide-${guide.id}`}
      title={
        <>
          {guide.navDrawerTitle}
          {guide.type === "externalLink" && <Icon name="OpenInNew" ml={8} />}
        </>
      }
      isNew={guide.isNew}
      cardProps={{
        ...linkProps,
        $isTop: isTop,
        $isBottom: isBottom,
      }}
      displayAttributes={guide.displayAttributes}
      translations={guideTranslationKeys(guide)}
      difficulty={guide.difficulty}
    />
  );
};

type DirectGuideSectionProps = {
  title: string;
  guides: InternalOrExternalGuideMeta[];
};

export const DirectGuideSection = ({
  title,
  guides,
}: DirectGuideSectionProps) => {
  const filteredGuides = guides.filter(filterVisibleGuide);

  if (filteredGuides.length === 0) {
    return null;
  }

  return (
    <Flex vertical gap={12}>
      <Typography.Title level={2} mb={2}>
        {title}
      </Typography.Title>
      <Flex vertical>
        {sortGuides(filteredGuides).map((guide, index) => (
          <DirectGuideCard
            key={guide.id}
            isTop={index === 0}
            isBottom={index === filteredGuides.length - 1}
            guide={guide}
          />
        ))}
      </Flex>
    </Flex>
  );
};
