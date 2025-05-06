import React from "react";
import { Stepper } from "./stepper";
import { RsTidSidGenerator } from "./rstid";

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

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <React.Fragment>
      <Stepper onChange={onChange} current={current} items={items} />
      {current < items.length - 1 && <RsTidSidGenerator />}
    </React.Fragment>
  );
};
