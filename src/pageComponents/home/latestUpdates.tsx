import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Flex, Link } from "~/components";
import { trackCardClick } from "~/analytics";
import { getLatestGuideUpdates, type GuideUpdate } from "~/guides";
import { styledPropGuard } from "~/utils/styled";
import {
  DesktopOnly,
  MobileOnly,
  Section,
  SectionHeading,
  TitleText,
  MetaText,
  homeQueries,
  interactiveStyles,
  stateLayer,
} from "./styles";

const UpdateGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 16,
  [homeQueries.medium]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
});

const UpdateCard = styled(Link)(({ theme }) => ({
  ...interactiveStyles(theme),
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "16px 20px 18px",
  borderRadius: 20,
  backgroundColor: theme.token.colorBgLayout,
  color: theme.token.colorText,
  ":hover": {
    color: theme.token.colorText,
    // Layers the hover tint over the card color, which a flat token can't do in both themes
    backgroundImage: `linear-gradient(${stateLayer(0.05)}, ${stateLayer(0.05)})`,
  },
}));

const UpdateRow = styled(Link)(({ theme }) => ({
  ...interactiveStyles(theme),
  display: "flex",
  alignItems: "center",
  gap: 12,
  minHeight: 64,
  padding: "8px 16px",
  boxSizing: "border-box",
  color: theme.token.colorText,
  ":hover": {
    color: theme.token.colorText,
    backgroundColor: stateLayer(0.08),
  },
}));

const Badge = styled(
  "span",
  styledPropGuard,
)<{ $status: GuideUpdate["status"] }>(({ theme, $status }) => ({
  display: "inline-flex",
  alignItems: "center",
  flex: "none",
  height: 24,
  padding: "0 10px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: "16px",
  letterSpacing: 0.4,
  backgroundColor:
    $status === "New"
      ? theme.token.colorSuccessBg
      : theme.token.colorFillTertiary,
  color:
    $status === "New"
      ? theme.token.colorSuccess
      : theme.token.colorTextSecondary,
}));

const formatDate = (date: string) => dayjs(date).format("D MMM");

const formatGame = (update: GuideUpdate) =>
  update.variant == null ? update.game : `${update.game} · ${update.variant}`;

const trackUpdate = (update: GuideUpdate) => () =>
  trackCardClick({ id: `home-update-${update.slug}` });

export const LatestUpdates = () => {
  const updates = getLatestGuideUpdates();

  if (updates.length === 0) {
    return null;
  }

  return (
    <Section>
      <DesktopOnly>
        <SectionHeading level={2}>Latest guide updates</SectionHeading>
      </DesktopOnly>
      <MobileOnly>
        <SectionHeading level={2}>Latest updates</SectionHeading>
      </MobileOnly>

      <DesktopOnly>
        <UpdateGrid>
          {updates.map((update) => (
            <UpdateCard
              key={update.slug}
              href={update.slug}
              onClick={trackUpdate(update)}
            >
              <Flex align="center" justify="space-between" gap={8}>
                <Badge $status={update.status}>{update.status}</Badge>
                <MetaText>{formatDate(update.date)}</MetaText>
              </Flex>
              <Flex vertical>
                <TitleText>{update.name}</TitleText>
                <MetaText>{formatGame(update)}</MetaText>
              </Flex>
            </UpdateCard>
          ))}
        </UpdateGrid>
      </DesktopOnly>

      <MobileOnly>
        <Flex vertical pv={4} borderRadius={20} backgroundColor="BgLayout">
          {updates.map((update) => (
            <UpdateRow
              key={update.slug}
              href={update.slug}
              onClick={trackUpdate(update)}
            >
              <Flex vertical flex={1} minWidth={0}>
                <TitleText>{update.name}</TitleText>
                <MetaText>
                  {formatGame(update)} · {formatDate(update.date)}
                </MetaText>
              </Flex>
              <Badge $status={update.status}>{update.status}</Badge>
            </UpdateRow>
          ))}
        </Flex>
      </MobileOnly>
    </Section>
  );
};
