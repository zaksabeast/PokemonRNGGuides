import styled from "@emotion/styled";
import { Flex } from "~/components";

const Width = styled(Flex)(({ theme }) => ({
  width: "100%",
  [theme.mediaQueries.up("tablet")]: {
    width: "85%",
  },
}));

type BoardSizeContainerProps = {
  children: React.ReactNode;
};

export const BoardSizeContainer = ({ children }: BoardSizeContainerProps) => {
  return (
    <Flex flex={1} vertical justify="center" align="center">
      <Width>{children}</Width>
    </Flex>
  );
};
