import { Flex } from "~/components";
import { Gen4Timer } from "~/rngToolsUi/timer/gen4";
import { Splitter } from "antd";

export const Gen4TimerTab = () => {
  return (
    <Splitter>
      <Splitter.Panel>
        <Flex vertical width="100%" justify="center" align="center">
          <Flex vertical maxWidth={1200} p={8}>
            <Gen4Timer />
          </Flex>
        </Flex>
      </Splitter.Panel>
    </Splitter>
  );
};
