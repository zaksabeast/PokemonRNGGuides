import React from "react";
import { Steps, StepsProps } from "antd";
import { RsTidSidGenerator } from "./rstid";
import { RsTidSearcher } from "./searcher";
import { RsTidTimer } from "./timer";
import { Flex } from "~/components";

const Stepper = (props: StepsProps) => {
  return <Steps type="navigation" size="small" {...props} />;
};

const items: StepsProps["items"] = [
  {
    title: "Find Target TID",
    status: "process",
  },
  {
    title: "RNG TID",
    status: "process",
  },
];

export const RsTid = () => {
  const [current, setCurrent] = React.useState(0);

  return (
    <Flex gap={32} vertical>
      <Stepper onChange={setCurrent} current={current} items={items} />
      <Flex vertical display={current === 0 ? "flex" : "none"}>
        <RsTidSidGenerator />
      </Flex>
      <Flex gap={8} vertical display={current === 1 ? "flex" : "none"}>
        <RsTidTimer />
        <RsTidSearcher />
      </Flex>
    </Flex>
  );
};
