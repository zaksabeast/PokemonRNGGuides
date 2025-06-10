import { Card as AntdCard } from "antd";
import {
  Flex,
  Typography,
  Grid,
  Card,
  Divider,
  Tag,
  Icon,
  BadgeRibbon,
} from "~/components";
import { getGuide, GuideTag, GuideMeta, getGuidesForSlug } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { sortBy, startCase } from "lodash-es";
import { match } from "ts-pattern";
import styled from "@emotion/styled";

type DisplayAttribute =
  | GuideMeta["displayAttributes"][number]
  | "new"
  | "translated";

const DisplayTag = styled(Tag)<{ tag: DisplayAttribute }>(({ tag }) => {
  const colors = match(tag)
    .with("new", () => ({
      color: "#AF52DE",
      backgroundColor: "rgba(175, 82, 222, 0.1)",
    }))
    .with("translated", () => ({
      color: "#34C759",
      backgroundColor: "rgba(52, 199, 89, 0.1)",
    }))
    .with("web_tool", () => ({
      color: "#7E5BEF",
      backgroundColor: "rgba(126, 91, 239, 0.08)",
    }))
    .with("video_guide", () => ({
      color: "#007AFF",
      backgroundColor: "rgba(0, 122, 255, 0.1)",
    }))
    .exhaustive();

  return {
    ...colors,
    borderRadius: 20,
    border: 0,
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.04)",
  };
});

const { Meta: CardMeta } = AntdCard;

const GuideCard = styled(Card)({
  "& .ant-card-body": {
    padding: 0,
  },
  "& .ant-ribbon-wrapper": {
    height: "100%",
    display: "flex",
  },
});

const CardBackground = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const InnerCardBackground = styled.div({
  position: "absolute",
  top: -12,
  transform: "rotate(-35deg)",
  paddingTop: 12,
});

type PageSection = GuideTag | "tool" | "patch";

const sectionDisplayOrder: PageSection[] = [
  "info",
  "challenge",
  "any",
  "retail",
  "cfw",
  "emu",
  "tool",
  "patch",
];

const isSectionDsiplay = (section: string): section is PageSection => {
  return sectionDisplayOrder.includes(section as PageSection);
};

const getSectionLabel = (section: string) => {
  if (!isSectionDsiplay(section)) {
    return section;
  }

  return match<PageSection>(section)
    .with("any", () => "Any")
    .with("cfw", () => "Custom Firmware")
    .with("challenge", () => "Challenge")
    .with("emu", () => "Emulator")
    .with("info", () => "Info")
    .with("retail", () => "Retail")
    .with("tool", () => "Tools")
    .with("patch", () => "Patches")
    .exhaustive();
};

export const GamePageComponent = () => {
  const route = useActiveRoute();

  const { meta } = getGuide(route);
  const guidesBySection = getGuidesForSlug(meta.slug);

  return (
    <Flex vertical gap={12}>
      <Typography.Title level={2} mb={2}>
        Guides and Articles
      </Typography.Title>
      {sectionDisplayOrder.map((section) => {
        const sectionGuides = guidesBySection[section];
        if (sectionGuides == null) {
          return null;
        }

        const filteredGuides = sectionGuides.filter(
          (guide) => !guide.isRoughDraft && !guide.hideFromNavDrawer,
        );

        if (filteredGuides.length === 0) {
          return null;
        }

        return (
          <Flex key={section} vertical gap={12}>
            <Typography.Title level={4} mb={2}>
              {getSectionLabel(section)}
            </Typography.Title>
            <Grid mobile={1} tablet={2} desktop={3}>
              {sortBy(filteredGuides, (guide) => guide.navDrawerTitle).map(
                (guide) => (
                  <GuideCard
                    id={`guide-${guide.slug}`}
                    key={guide.slug}
                    fullBody
                    href={guide.slug}
                    borderColor="PrimaryBorderHover"
                    border={guide.isNew ? "2px solid" : "1px solid"}
                  >
                    <BadgeRibbon $show={guide.isNew} text="New">
                      <Flex vertical justify="space-between" flex={1} p={24}>
                        <Flex vertical minHeight={50} gap={4} height="100%">
                          <CardBackground>
                            <InnerCardBackground>
                              <Icon
                                name="Pokeball"
                                size={100}
                                color="PrimaryBgHover"
                              />
                            </InnerCardBackground>
                          </CardBackground>
                          {guide.displayAttributes
                            // Seperate filter for TS to infer types from the null check
                            .filter((tag) => tag !== null)
                            .filter((tag) => !isSectionDsiplay(tag))
                            .map((tag) => (
                              <Flex key={tag}>
                                <DisplayTag tag={tag}>
                                  {startCase(tag)}
                                </DisplayTag>
                              </Flex>
                            ))}
                        </Flex>
                        <Flex vertical>
                          <Divider />
                          <CardMeta title={guide.navDrawerTitle} />
                        </Flex>
                      </Flex>
                    </BadgeRibbon>
                  </GuideCard>
                ),
              )}
            </Grid>
          </Flex>
        );
      })}
    </Flex>
  );
};
