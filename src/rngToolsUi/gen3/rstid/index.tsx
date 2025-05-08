import React from "react";
import { Stepper } from "./stepper";
import { RsTidSidGenerator } from "./rstid";
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

export const RsTid = () => {
  const [current, setCurrent] = React.useState(0);
  const [targetSet, setTarget] = React.useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  type Result = Gen3TidSidResult & { time: string };

  const onSelectTarget = (advance: number, results: Result) => {
    console.log(advance, results);
    setTarget(true);
    return advance;
  };

  return (
    <Flex vertical>
      <Stepper onChange={onChange} current={current} items={items} />
      <Flex vertical display={current < items.length - 1 ? "flex" : "none"}>
        {targetSet && <NextButton next={next} />}
        <RsTidSidGenerator onSelectTarget={onSelectTarget} />
        {targetSet && <NextButton next={next} />}
      </Flex>
    </Flex>
  );
};
