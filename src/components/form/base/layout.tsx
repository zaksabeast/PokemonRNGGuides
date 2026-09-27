import React from "react";
import styled from "@emotion/styled";

export const FormBody = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  minWidth: 0,
});

const Section = styled.section({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,
});

const SectionTitle = styled.h3(({ theme }) => ({
  ...theme.typography.titleSmall,
  margin: 0,
  color: theme.token.colorPrimary,
}));

type FormSectionProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

/** A group of related fields under an optional header */
export const FormSection = ({ title, children }: FormSectionProps) => (
  <Section>
    {title != null && <SectionTitle>{title}</SectionTitle>}
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
