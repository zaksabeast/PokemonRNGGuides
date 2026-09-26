import styled from "@emotion/styled";
import { Icon, Link, Section, Typography } from "~/components";
import { trackCardClick } from "~/analytics";
import { starterSteps } from "./data";

const StarterList = styled.ol(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
  margin: 0,
  padding: 0,
  listStyle: "none",
  [theme.containerQueries.medium]: {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  [theme.containerQueries.mobile]: {
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 0,
    padding: "4px 0",
    border: `1px solid ${theme.token.colorBorderSecondary}`,
    borderRadius: 20,
  },
}));

const StarterRow = styled(Link)(({ theme }) => ({
  ...theme.interactive,
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "18px 16px 18px 20px",
  border: `1px solid ${theme.token.colorBorderSecondary}`,
  borderRadius: 20,
  color: theme.token.colorText,
  ":hover": {
    color: theme.token.colorText,
    backgroundColor: theme.token.colorStateLayerHover,
    borderColor: theme.token.colorBorder,
  },
  [theme.containerQueries.mobile]: {
    gap: 14,
    minHeight: 56,
    padding: "4px 8px 4px 16px",
    border: "none",
    borderRadius: 0,
    ":hover": {
      backgroundColor: theme.token.colorStateLayerHover,
    },
  },
}));

const StepBadge = styled.span(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  flex: "none",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: theme.token.colorPrimaryBg,
  color: theme.token.colorPrimaryActive,
  fontSize: 16,
  fontWeight: 500,
  [theme.containerQueries.mobile]: {
    width: 32,
    height: 32,
    fontSize: 14,
  },
}));

export const Starters = () => {
  return (
    <Section>
      <Typography.SectionHeading level={2}>
        New to RNG? Start here
      </Typography.SectionHeading>
      <StarterList>
        {starterSteps.map((step, index) => {
          const number = index + 1;
          return (
            <li key={step.slug}>
              <StarterRow
                href={step.slug}
                onClick={() => trackCardClick({ id: `home-starter-${number}` })}
              >
                <StepBadge>{number}</StepBadge>
                <Typography.ItemTitle flex={1}>
                  {step.title}
                </Typography.ItemTitle>
                <Icon name="ChevronRight" size={24} color="TextTertiary" />
              </StarterRow>
            </li>
          );
        })}
      </StarterList>
    </Section>
  );
};
