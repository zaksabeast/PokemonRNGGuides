import { Flex } from "./flex";
import { Typography } from "./typography";

type MinMaxContainerProps = {
  min: React.ReactNode;
  max: React.ReactNode;
  delimeter?: React.ReactNode;
};

export const MinMaxContainer = ({
  min,
  max,
  delimeter = "–",
}: MinMaxContainerProps) => {
  return (
    <Flex>
      <Flex gap={8} flex={1}>
        {min}
        <Flex vertical justify="center">
          <Typography.Text strong>{delimeter}</Typography.Text>
        </Flex>
        {max}
      </Flex>
    </Flex>
  );
};
