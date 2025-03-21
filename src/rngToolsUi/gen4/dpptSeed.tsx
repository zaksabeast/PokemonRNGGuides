import React from "react";
import { Tabs, TabsProps } from "antd";
import { DpptSeedCalibrate } from "./dpptSeedCalibrate";
import { DpptSeedSearch } from "./dpptSeedSearch";
import { SeedTime4 } from "~/rngTools";

export const DpptSeed = () => {
  const [selectedSeedTime, setSelectedSeedTime] =
    React.useState<SeedTime4 | null>(null);
  const items: TabsProps["items"] = React.useMemo(
    () => [
      {
        key: "seedSearch",
        label: "Search",
        children: <DpptSeedSearch onClickResultRow={setSelectedSeedTime} />,
      },
      {
        key: "seedCalibrate",
        label: "Calibrate",
        children: <DpptSeedCalibrate selectedSeedTime={selectedSeedTime} />,
      },
    ],
    [selectedSeedTime],
  );
  return <Tabs defaultActiveKey="seedSearch" items={items} />;
};
