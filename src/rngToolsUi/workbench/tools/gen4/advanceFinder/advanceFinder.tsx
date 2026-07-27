import { Splitter } from "antd";
import { Flex } from "~/components";
import { StandaloneGen4AdvanceFilter } from "~/rngToolsUi/gen4/standaloneAdvanceFilter";

export const Gen4AdvanceFinderTab = () => {
  return (
    <Splitter>
      <Splitter.Panel>
        <Flex vertical width="100%" justify="center" align="center">
          <Flex vertical width="100%" p={8}>
            <StandaloneGen4AdvanceFilter />
          </Flex>
        </Flex>
      </Splitter.Panel>
    </Splitter>
  );
};
