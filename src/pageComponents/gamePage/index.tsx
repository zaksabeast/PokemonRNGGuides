import { Flex } from "~/components";
import { getGuide, getGuidesBySectionForSlug, GuidesBySection } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import {
  sectionDisplayOrder,
  getSectionLabel,
  type PageSection,
} from "./utils";
import { isRngGuideSection } from "~/guideSections";
import { SplitGuideSection } from "./splitGuides";
import { DirectGuideSection } from "./directGuides";

type GamePageSectionProps = {
  section: PageSection;
  guidesBySection: GuidesBySection;
};

const GamePageSection = ({
  section,
  guidesBySection,
}: GamePageSectionProps) => {
  if (isRngGuideSection(section)) {
    return (
      <SplitGuideSection
        title={getSectionLabel(section)}
        guides={guidesBySection[section]}
      />
    );
  }

  return (
    <DirectGuideSection
      title={getSectionLabel(section)}
      guides={guidesBySection[section]}
    />
  );
};

export const GamePageComponent = () => {
  const route = useActiveRoute();

  const { meta } = getGuide(route);
  const guidesBySection = getGuidesBySectionForSlug(meta.slug);

  return (
    <Flex vertical gap={12}>
      {sectionDisplayOrder.map((section) => (
        <GamePageSection
          key={section}
          section={section}
          guidesBySection={guidesBySection}
        />
      ))}
    </Flex>
  );
};
