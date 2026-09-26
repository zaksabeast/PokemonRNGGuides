import styled from "@emotion/styled";
import { Icon, Link } from "~/components";
import { trackCardClick } from "~/analytics";
import { starterSteps } from "./data";
import {
  Section,
  SectionHeading,
  TitleText,
  homeQueries,
  interactiveStyles,
  stateLayer,
} from "./styles";

const StarterList = styled.ol(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
  margin: 0,
  padding: 0,
  listStyle: "none",
  [homeQueries.medium]: {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  [homeQueries.mobile]: {
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 0,
    padding: "4px 0",
    border: `1px solid ${theme.token.colorBorderSecondary}`,
    borderRadius: 20,
  },
}));

const StarterRow = styled(Link)(({ theme }) => ({
  ...interactiveStyles(theme),
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "18px 16px 18px 20px",
  border: `1px solid ${theme.token.colorBorderSecondary}`,
  borderRadius: 20,
  color: theme.token.colorText,
  ":hover": {
    color: theme.token.colorText,
    backgroundColor: stateLayer(0.05),
    borderColor: theme.token.colorBorder,
  },
  [homeQueries.mobile]: {
    gap: 14,
    minHeight: 56,
    padding: "4px 8px 4px 16px",
    border: "none",
    borderRadius: 0,
    ":hover": {
      backgroundColor: stateLayer(0.08),
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
  [homeQueries.mobile]: {
    width: 32,
    height: 32,
    fontSize: 14,
  },
}));

export const Starters = () => {
  return (
    <Section>
      <SectionHeading level={2}>New to RNG? Start here</SectionHeading>
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
                <TitleText flex={1}>{step.title}</TitleText>
                <Icon name="ChevronRight" size={24} color="TextTertiary" />
              </StarterRow>
            </li>
          );
        })}
      </StarterList>
    </Section>
  );
};
