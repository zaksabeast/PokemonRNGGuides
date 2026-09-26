import React from "react";
import styled from "@emotion/styled";
import { Button, Icon } from "~/components";
import { track } from "~/analytics";
import {
  getGuide,
  getGuidesBySectionForSlug,
  getOtherGuideSetup,
  type GuideSetup,
  type GuidesBySection,
} from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { isRngGuideSection, rngGuideSections } from "~/guideSections";
import { sumBy } from "lodash-es";
import { sectionDisplayOrder, getSectionLabel, getSetupLabel } from "./utils";
import { SetupPicker } from "./setupPicker";
import { GuideSection } from "./guideList";

const PageContent = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 32,
  color: theme.token.colorText,
  [theme.containerQueries.mobile]: {
    gap: 24,
  },
}));

const SetupControls = styled.div(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  gap: 16,
  [theme.containerQueries.mobile]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 12,
  },
}));

const getRngGuides = (guidesBySection: GuidesBySection, setup: GuideSetup) => {
  return rngGuideSections.flatMap((section) => guidesBySection[section][setup]);
};

const getOtherSetupOnlyLabel = (count: number, otherSetup: GuideSetup) => {
  const guides = count === 1 ? "guide is" : "guides are";
  return `${count} ${guides} ${getSetupLabel(otherSetup).toLowerCase()}-only`;
};

type GameGuidesProps = {
  guidesBySection: GuidesBySection;
};

const GameGuides = ({ guidesBySection }: GameGuidesProps) => {
  const counts: Record<GuideSetup, number> = {
    retail: getRngGuides(guidesBySection, "retail").length,
    "cfw-emu": getRngGuides(guidesBySection, "cfw-emu").length,
  };
  const [setup, setSetup] = React.useState<GuideSetup>(
    counts.retail > 0 ? "retail" : "cfw-emu",
  );

  const otherSetup = getOtherGuideSetup(setup);
  const otherSetupOnlyCount = sumBy(
    getRngGuides(guidesBySection, otherSetup),
    (guide) => (guide.otherSetupLink == null ? 1 : 0),
  );

  const pickSetup = (nextSetup: GuideSetup) => {
    track("Button clicked", { id: `game-page-setup-${nextSetup}` });
    setSetup(nextSetup);
  };

  return (
    <>
      {counts.retail + counts["cfw-emu"] > 0 && (
        <SetupControls>
          <SetupPicker value={setup} onChange={pickSetup} />
          {otherSetupOnlyCount > 0 && (
            <Button
              trackerId={`game-page-${otherSetup}-only`}
              type="link"
              icon={<Icon name="ArrowForward" size={18} />}
              iconPlacement="end"
              onClick={() => setSetup(otherSetup)}
            >
              {getOtherSetupOnlyLabel(otherSetupOnlyCount, otherSetup)}
            </Button>
          )}
        </SetupControls>
      )}

      {sectionDisplayOrder.map((section) => (
        <GuideSection
          key={section}
          title={getSectionLabel(section)}
          guides={
            isRngGuideSection(section)
              ? guidesBySection[section][setup]
              : guidesBySection[section]
          }
          setup={setup}
          isSetupSpecific={isRngGuideSection(section)}
        />
      ))}
    </>
  );
};

export const GamePageComponent = () => {
  const route = useActiveRoute();
  const { meta } = getGuide(route);

  return (
    <PageContent>
      {/* Every game page shares this component, so the key resets the setup between games */}
      <GameGuides
        key={meta.slug}
        guidesBySection={getGuidesBySectionForSlug(meta.slug)}
      />
    </PageContent>
  );
};
