import React from "react";
import { Card } from "./card";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { Color } from "@emotion/react";

type SectionCardProps = {
  title: string;
  borderColor?: Color;
  children: React.ReactNode;
};

// The title is in the body instead of the card header so it can wrap on phones.
export const SectionCard = ({
  title,
  borderColor,
  children,
}: SectionCardProps) => (
  <Card borderColor={borderColor}>
    <Flex vertical gap={16}>
      <Typography.Text strong fontSize={16}>
        {title}
      </Typography.Text>
      {children}
    </Flex>
  </Card>
);
