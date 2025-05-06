import React from "react";
import { Stepper } from "./stepper";
import { RsTidSidGenerator } from "./rstid";
import { Button, Flex } from "~/components";

const items = [
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

  const handleTarget = (advance, value) => {
    console.log(advance, value);
    setTarget(true);
    return advance;
  };

  const NextButton = () => (
    <Flex justify="end">
      <Button
        trackerId="test"
        type="primary"
        size="middle"
        onClick={() => next()}
      >
        Next
      </Button>
    </Flex>
  );

  return (
    <React.Fragment>
      <Stepper onChange={onChange} current={current} items={items} />

      {current < items.length - 1 && (
        <React.Fragment>
          {targetSet && <NextButton />}
          <RsTidSidGenerator handleTarget={handleTarget} />
          {targetSet && <NextButton />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
