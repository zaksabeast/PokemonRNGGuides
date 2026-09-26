import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  DesktopOnly,
  Flex,
  Link,
  ListRow,
  ListSurface,
  MobileOnly,
  Section,
  Tag,
  Typography,
} from "~/components";
import { trackCardClick } from "~/analytics";
import { getLatestGuideUpdates, type GuideUpdate } from "~/guides";

const UpdateGrid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 16,
  [theme.containerQueries.medium]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
}));

const UpdateCard = styled(Link)(({ theme }) => ({
  ...theme.interactive,
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
    backgroundImage: `linear-gradient(${theme.token.colorStateLayerHover}, ${theme.token.colorStateLayerHover})`,
  },
}));

const UpdateRow = styled(ListRow)({
  minHeight: 64,
  // A tag needs more room from the edge than a trailing icon does
  paddingRight: 16,
});

const StatusTag = ({ status }: { status: GuideUpdate["status"] }) => {
  return status === "New" ? (
    <Tag
      variant="filled"
      flexShrink={0}
      color="Success"
      backgroundColor="SuccessBg"
    >
      {status}
    </Tag>
  ) : (
    <Tag
      variant="filled"
      flexShrink={0}
      color="TextSecondary"
      backgroundColor="FillTertiary"
    >
      {status}
    </Tag>
  );
};

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
        <Typography.SectionHeading level={2}>
          Latest guide updates
        </Typography.SectionHeading>
      </DesktopOnly>
      <MobileOnly>
        <Typography.SectionHeading level={2}>
          Latest updates
        </Typography.SectionHeading>
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
                <StatusTag status={update.status} />
                <Typography.Meta>{formatDate(update.date)}</Typography.Meta>
              </Flex>
              <Flex vertical>
                <Typography.ItemTitle>{update.name}</Typography.ItemTitle>
                <Typography.Meta>{formatGame(update)}</Typography.Meta>
              </Flex>
            </UpdateCard>
          ))}
        </UpdateGrid>
      </DesktopOnly>

      <MobileOnly>
        <ListSurface>
          {updates.map((update) => (
            <UpdateRow
              key={update.slug}
              href={update.slug}
              onClick={trackUpdate(update)}
            >
              <Flex vertical flex={1} minWidth={0}>
                <Typography.ItemTitle>{update.name}</Typography.ItemTitle>
                <Typography.Meta>
                  {formatGame(update)} · {formatDate(update.date)}
                </Typography.Meta>
              </Flex>
              <StatusTag status={update.status} />
            </UpdateRow>
          ))}
        </ListSurface>
      </MobileOnly>
    </Section>
  );
};
