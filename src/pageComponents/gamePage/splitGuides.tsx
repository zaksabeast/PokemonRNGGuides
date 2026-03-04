import { Flex, Typography, LinkButton } from "~/components";
import { GamePageGuideCard } from "~/guides";
import { filterVisibleGuide, sortGuides } from "./utils";
import { GuideCardFrame } from "./guideCardFrame";

type SplitGuideCardProps = {
  isTop: boolean;
  isBottom: boolean;
  guide: GamePageGuideCard;
};

const SplitGuideCard = ({ isTop, isBottom, guide }: SplitGuideCardProps) => {
  return (
    <GuideCardFrame
      cardProps={{
        $isTop: isTop,
        $isBottom: isBottom,
      }}
      cardId={`guide-${guide.id}`}
      title={guide.navDrawerTitle}
      isNew={guide.isNew}
      displayAttributes={guide.displayAttributes}
      translations={guide.translations}
      bottomContent={
        <Flex gap={8} wrap>
          <LinkButton
            link={guide.retailLink}
            trackerId={`guide-retail-${guide.id}`}
            type={guide.retailIsNew ? "primary" : undefined}
          >
            Retail
          </LinkButton>
          <LinkButton
            link={guide.cfwEmuLink}
            trackerId={`guide-cfw-emu-${guide.id}`}
            type={guide.cfwEmuIsNew ? "primary" : undefined}
          >
            Emu
          </LinkButton>
        </Flex>
      }
    />
  );
};

type SplitGuideSectionProps = {
  title: string;
  guides: GamePageGuideCard[];
};

export const SplitGuideSection = ({
  title,
  guides,
}: SplitGuideSectionProps) => {
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
          <SplitGuideCard
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
