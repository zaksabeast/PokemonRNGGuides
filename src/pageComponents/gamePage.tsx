import { Card as AntdCard } from "antd";
import type { ReactNode, ComponentProps } from "react";
import {
  Flex,
  Typography,
  Grid,
  Card,
  Divider,
  Tag,
  Icon,
  BadgeRibbon,
  Button,
} from "~/components";
import { getGuide, GuideMeta, getGuidesBySectionForSlug } from "~/guides";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { sortBy, startCase } from "lodash-es";
import { match } from "ts-pattern";
import styled from "@emotion/styled";

type DisplayAttribute =
  | GuideMeta["displayAttributes"][number]
  | "new"
  | "external-link";

type PageSection = "info" | "challenge" | "guides" | "tool" | "patch";

const sectionDisplayOrder: PageSection[] = [
  "info",
  "challenge",
  "guides",
  "tool",
  "patch",
];

const DisplayTag = styled(Tag)<{ tag: DisplayAttribute }>(({ tag }) => {
  const colors = match(tag)
    .with("new", () => ({
      color: "#AF52DE",
      backgroundColor: "rgba(175, 82, 222, 0.1)",
    }))
    .with("external-link", () => ({
      color: "#30B0C7",
      backgroundColor: "rgba(48, 176, 199, 0.1)",
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

const GuideCard = styled(Card)(({ theme }) => ({
  "& .ant-card-body": {
    padding: 0,
  },
  "& .ant-ribbon-wrapper": {
    height: "100%",
    display: "flex",
  },
  "&:hover": {
    boxShadow: theme.token.boxShadow,
    transform: "scale(1.03)",
  },
}));

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

const GuideCardTopContent = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex vertical minHeight={50} gap={4} height="100%">
      <CardBackground>
        <InnerCardBackground>
          <Icon name="Pokeball" size={100} color="PrimaryBgHover" />
        </InnerCardBackground>
      </CardBackground>
      {children}
    </Flex>
  );
};

const GuideCardFrame = ({
  cardId,
  title,
  isNew,
  cardProps,
  topContent,
  bottomContent,
}: {
  cardId: string;
  title: string;
  isNew: boolean;
  cardProps?: Partial<ComponentProps<typeof GuideCard>>;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
}) => {
  return (
    <GuideCard
      id={cardId}
      fullBody
      borderColor="PrimaryBorderHover"
      border={isNew ? "2px solid" : "1px solid"}
      {...(cardProps ?? {})}
    >
      <BadgeRibbon $show={isNew} text="New">
        <Flex vertical justify="space-between" flex={1} p={24}>
          <GuideCardTopContent>{topContent}</GuideCardTopContent>
          <Flex vertical gap={bottomContent == null ? 0 : 12}>
            <Divider />
            <CardMeta title={title} />
            {bottomContent}
          </Flex>
        </Flex>
      </BadgeRibbon>
    </GuideCard>
  );
};

const isSectionDisplay = (section: string): section is PageSection => {
  return sectionDisplayOrder.includes(section as PageSection);
};

const getSectionLabel = (section: string) => {
  if (!isSectionDisplay(section)) {
    return section;
  }

  return match<PageSection>(section)
    .with("challenge", () => "Challenge")
    .with("guides", () => "Guides")
    .with("info", () => "Info")
    .with("tool", () => "Tools")
    .with("patch", () => "Patches")
    .exhaustive();
};

export const GamePageComponent = () => {
  const route = useActiveRoute();

  const { meta } = getGuide(route);
  const guidesBySection = getGuidesBySectionForSlug(meta.slug);

  return (
    <Flex vertical gap={12}>
      <Typography.Title level={2} mb={2}>
        Guides and Articles
      </Typography.Title>
      {sectionDisplayOrder.map((section) => {
        if (section === "guides") {
          const filteredGuides = guidesBySection.guides.filter(
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
                  (guide) => {
                    return (
                      <GuideCardFrame
                        key={guide.id}
                        cardId={`guide-${guide.id}`}
                        title={guide.navDrawerTitle}
                        isNew={guide.isNew}
                        bottomContent={
                          <Flex gap={8} wrap>
                            <Button
                              trackerId={`guide-retail-${guide.id}`}
                              href={guide.retailSlug ?? undefined}
                              disabled={guide.retailSlug == null}
                            >
                              Retail
                            </Button>
                            <Button
                              trackerId={`guide-cfw-emu-${guide.id}`}
                              href={guide.cfwEmuSlug ?? undefined}
                              disabled={guide.cfwEmuSlug == null}
                            >
                              CFW/Emu
                            </Button>
                          </Flex>
                        }
                      />
                    );
                  },
                )}
              </Grid>
            </Flex>
          );
        }

        const sectionGuides = guidesBySection[section];
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
                (guide) => {
                  const { url, ...linkProps } = match(guide)
                    .with({ type: "baseGuide" }, (matched) => ({
                      url: matched.slug,
                      slug: matched.slug,
                    }))
                    .exhaustive();
                  return (
                    <GuideCardFrame
                      key={url}
                      cardId={`guide-${url}`}
                      title={guide.navDrawerTitle}
                      isNew={guide.isNew}
                      cardProps={linkProps}
                      topContent={guide.displayAttributes
                        // Seperate filter for TS to infer types from the null check
                        .filter((tag) => tag !== null)
                        .filter((tag) => !isSectionDisplay(tag))
                        .map((tag) => (
                          <Flex key={tag}>
                            <DisplayTag tag={tag}>{startCase(tag)}</DisplayTag>
                          </Flex>
                        ))}
                    />
                  );
                },
              )}
            </Grid>
          </Flex>
        );
      })}
    </Flex>
  );
};
