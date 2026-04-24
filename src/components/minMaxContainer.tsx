import { Flex } from "./flex";
import { Typography } from "./typography";
import styled from "@emotion/styled";

const Hyphen = styled(Typography.Text)({
  paddingTop: "var(--ant-input-padding-block-lg)",
  lineHeight: "var(--ant-line-height-lg)",
  fontSize: "var(--ant-input-input-font-size-lg)",
});

type MinMaxContainerProps = {
  min: React.ReactNode;
  max: React.ReactNode;
};

export const MinMaxContainer = ({ min, max }: MinMaxContainerProps) => {
  return (
    <Flex>
      <Flex gap={8} flex={1}>
        {min}
        <Hyphen>{" – "}</Hyphen>
        {max}
      </Flex>
    </Flex>
  );
};
