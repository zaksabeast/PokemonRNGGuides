import { Flex } from "~/components";
import { Gen3Timer } from "~/rngToolsUi/timer/gen3";
import { Splitter } from "antd";

export const Gen3TimerTab = () => {
  return (
    <Splitter>
      <Splitter.Panel>
        <Flex vertical width="100%" justify="center" align="center">
          <Flex vertical maxWidth={1200} p={8}>
            <Gen3Timer />
          </Flex>
        </Flex>
      </Splitter.Panel>
    </Splitter>
  );
};
