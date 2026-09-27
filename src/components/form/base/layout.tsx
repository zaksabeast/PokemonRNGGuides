import React from "react";
import styled from "@emotion/styled";
import { Card } from "~/components/card";

export const FormBody = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  minWidth: 0,
});

type FormCardProps = {
  children: React.ReactNode;
};

/** Card wrapper for fields that live outside a ToolForm, so they match tool forms */
export const FormCard = ({ children }: FormCardProps) => (
  <Card>
    <FormBody>{children}</FormBody>
  </Card>
);

const Section = styled.section({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,
});

/** Stacks a heading's title and description */
export const HeadingGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

/** Supporting text under a heading's title */
export const HeadingDescription = styled.div(({ theme }) => ({
  ...theme.typography.bodySmall,
  color: theme.token.colorTextTertiary,
}));

const SectionTitle = styled.h3(({ theme }) => ({
  ...theme.typography.titleSmall,
  margin: 0,
  color: theme.token.colorPrimary,
}));

type FormSectionProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
};

/** A group of related fields under an optional header */
export const FormSection = ({
  title,
  description,
  children,
}: FormSectionProps) => (
  <Section>
    {(title != null || description != null) && (
      <HeadingGroup>
        {title != null && <SectionTitle>{title}</SectionTitle>}
        {description != null && (
          <HeadingDescription>{description}</HeadingDescription>
        )}
      </HeadingGroup>
    )}
    {children}
  </Section>
);

/** Two short, related fields side by side, like TID and SID */
export const FieldRow = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
  alignItems: "start",
});
