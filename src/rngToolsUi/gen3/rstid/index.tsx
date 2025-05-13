import React from "react";
import { Steps, StepsProps } from "antd";
import { RsTidSidGenerator, RsTidTarget } from "./rstid";
import { RsTidSearcher } from "./searcher";
import { RsTidTimer } from "./timer";
import { Button, Flex } from "~/components";

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

type NextButtonProps = {
  next: () => void;
};

const NextButton = ({ next }: NextButtonProps) => (
  <Flex justify="end">
    <Button trackerId="test" type="primary" size="middle" onClick={next}>
      Next
    </Button>
  </Flex>
);

const initialResult = {
  advance: 0,
  sid: 0,
  tid: 0,
  time: "0:0:0",
  tsv: 0,
  offset: 0,
};

export const RsTid = () => {
  const [current, setCurrent] = React.useState(0);
  const [targetSet, isTargetSet] = React.useState(false);
  const [target, setTarget] = React.useState<RsTidTarget>(initialResult);
  const [offset, setOffset] = React.useState<number>(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const onSelectTarget = (results: RsTidTarget) => {
    isTargetSet(true);
    setTarget(results);
  };

  return (
    <Flex gap={32} vertical>
      <Stepper onChange={setCurrent} current={current} items={items} />
      <Flex vertical display={current === 0 ? "flex" : "none"}>
        {targetSet && <NextButton next={next} />}
        <RsTidSidGenerator onSelectTarget={onSelectTarget} />
        {targetSet && <NextButton next={next} />}
      </Flex>
      <Flex gap={8} vertical display={current === 1 ? "flex" : "none"}>
        <RsTidTimer targetAdvance={target.advance} offset={offset} />
        <RsTidSearcher targetAdvance={target.advance} setOffset={setOffset} />
      </Flex>
    </Flex>
  );
};
