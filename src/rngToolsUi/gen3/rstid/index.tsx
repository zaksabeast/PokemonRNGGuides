import React from "react";
import { Stepper } from "./stepper";
import { RsTidSidGenerator } from "./rstid";
import { RsTidSearcher } from "./searcher";
import { RsTidTimer } from "./timer";
import { Button, Flex } from "~/components";
import { StepsProps } from "antd";
import { Gen3TidSidResult } from "~/rngTools";

const items: StepsProps["items"] = [
  {
    title: "Find Target TID",
    //   subTitle: "00:00:05",
    status: "process",
    //   description: "Generate TID and possible SIDs.",
  },
  {
    title: "RNG TID",
    //   subTitle: "00:01:02",
    status: "process",
    //   description: "RNG for a shiny starter.",
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
type TargetResult = Gen3TidSidResult & { offset: number; time: string };

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
  const [target, setTarget] = React.useState<TargetResult>(initialResult);
  const [offset, setOffset] = React.useState<number>(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const onSelectTarget = (results: TargetResult) => {
    isTargetSet(true);
    setTarget(results);
  };

  return (
    <Flex gap={32} vertical>
      <Stepper onChange={onChange} current={current} items={items} />
      <Flex vertical display={current < items.length - 1 ? "flex" : "none"}>
        {targetSet && <NextButton next={next} />}
        <RsTidSidGenerator onSelectTarget={onSelectTarget} />
        {targetSet && <NextButton next={next} />}
      </Flex>
      <Flex gap={8} vertical display={current === 1 ? "flex" : "none"}>
        <RsTidTimer target={target} offset={offset} />
        <RsTidSearcher target={target} setOffset={setOffset} />
      </Flex>
    </Flex>
  );
};
