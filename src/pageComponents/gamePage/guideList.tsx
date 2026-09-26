import styled from "@emotion/styled";
import {
  Flex,
  Icon,
  ListRow,
  ListSurface,
  Section,
  Typography,
} from "~/components";
import { trackCardClick } from "~/analytics";
import { styledPropGuard } from "~/utils/styled";
import { type GameGuideRow, type GuideSetup } from "~/guides";
import { GuideChips } from "./guideChips";
import { getGuideMetaLine, sortGuides } from "./utils";

const GuideList = styled(ListSurface)(({ theme }) => ({
  "--list-inset": "24px",
  [theme.containerQueries.mobile]: {
    "--list-inset": "16px",
    padding: "8px 0",
  },
}));

const GuideRowLayout = styled(
  ListRow,
  styledPropGuard,
)<{ $isNew: boolean }>(({ theme, $isNew }) => ({
  ...($isNew && {
    // ::before is taken by the list divider
    "::after": {
      content: '""',
      position: "absolute",
      top: 8,
      bottom: 8,
      left: 0,
      width: 4,
      borderRadius: "0 4px 4px 0",
      backgroundColor: theme.token.colorSuccess,
    },
  }),
  flexWrap: "wrap",
  gap: "8px 16px",
  paddingTop: 12,
  paddingBottom: 12,
  // On mobile, move chips under the title with the trailing icon centered on the right
  [theme.containerQueries.mobile]: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gridTemplateAreas: '"text icon" "chips icon"',
    gap: "0 12px",
  },
}));

const RowText = styled(Flex)(({ theme }) => ({
  "&&": {
    flexDirection: "column",
    flex: "1 1 260px",
    minWidth: 0,
    gap: 2,
    [theme.containerQueries.mobile]: {
      gridArea: "text",
    },
  },
}));

const RowChips = styled(GuideChips)(({ theme }) => ({
  flex: "none",
  [theme.containerQueries.mobile]: {
    gridArea: "chips",
    marginTop: 8,
  },
}));

const TrailingIcon = styled.span(({ theme }) => ({
  display: "flex",
  marginLeft: 4,
  color: theme.token.colorTextSecondary,
  [theme.containerQueries.mobile]: {
    gridArea: "icon",
    marginLeft: 0,
  },
}));

type GuideRowProps = {
  guide: GameGuideRow;
  setup: GuideSetup;
  trackerId: string;
};

const GuideRow = ({ guide, setup, trackerId }: GuideRowProps) => {
  return (
    <GuideRowLayout
      $isNew={guide.isNew}
      href={
        guide.link.type === "externalLink"
          ? { external: guide.link.externalLink }
          : guide.link.slug
      }
      onClick={() => trackCardClick({ id: trackerId })}
    >
      <RowText>
        <Typography.ItemTitle>{guide.title}</Typography.ItemTitle>
        <Typography.Meta>{getGuideMetaLine(guide)}</Typography.Meta>
      </RowText>
      <RowChips guide={guide} setup={setup} />
      <TrailingIcon>
        {guide.link.type === "externalLink" ? (
          <Icon name="OpenInNew" size={20} />
        ) : (
          <Icon name="ChevronRight" size={24} />
        )}
      </TrailingIcon>
    </GuideRowLayout>
  );
};

type GuideSectionProps = {
  title: string;
  guides: GameGuideRow[];
  setup: GuideSetup;
  /** Only RNG guides differ by setup */
  isSetupSpecific: boolean;
};

export const GuideSection = ({
  title,
  guides,
  setup,
  isSetupSpecific,
}: GuideSectionProps) => {
  if (guides.length === 0) {
    return null;
  }

  return (
    <Section>
      <Typography.SectionHeading level={2}>{title}</Typography.SectionHeading>
      <GuideList $dividers>
        {sortGuides(guides).map((guide) => (
          <GuideRow
            key={guide.id}
            guide={guide}
            setup={setup}
            trackerId={
              isSetupSpecific
                ? `guide-${setup}-${guide.id}`
                : `guide-${guide.id}`
            }
          />
        ))}
      </GuideList>
    </Section>
  );
};
