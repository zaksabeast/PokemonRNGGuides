import React from "react";
import styled from "@emotion/styled";
import { Flex, RadioGroup, Typography } from "~/components";
import { type GuideSetup } from "~/guides";
import { rngGuideVariants } from "~/guideSections";
import { getSetupLabel } from "./utils";

// antd's `block` splits a shrink-to-fit group evenly, which clips the wider label.
// Equal grid columns size to the widest label instead, and stretch on mobile.
const GroupLayout = styled.div(({ theme }) => ({
  "& > .ant-radio-group": {
    display: "inline-grid",
    gridAutoFlow: "column",
    gridAutoColumns: "1fr",
  },
  "& .ant-radio-button-wrapper": {
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  [theme.containerQueries.mobile]: {
    "& > .ant-radio-group": {
      display: "grid",
    },
  },
}));

type Props = {
  value: GuideSetup;
  onChange: (setup: GuideSetup) => void;
};

export const SetupPicker = ({ value, onChange }: Props) => {
  const labelId = React.useId();

  return (
    <Flex vertical gap={8}>
      <Typography.Label id={labelId}>Your setup</Typography.Label>
      <GroupLayout>
        <RadioGroup
          optionType="button"
          aria-labelledby={labelId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          options={rngGuideVariants.map((setup) => ({
            value: setup,
            label: getSetupLabel(setup),
          }))}
        />
      </GroupLayout>
    </Flex>
  );
};
