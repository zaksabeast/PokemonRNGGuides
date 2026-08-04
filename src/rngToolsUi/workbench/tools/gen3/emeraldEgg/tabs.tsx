import { TabsProps } from "antd";
import { Gen3TimerTab } from "../timer";
import { EmeraldEggHeldGenerator } from "./heldGenerator";
import { EmeraldEggPickupGenerator } from "./pickupGenerator";
import { MatchCallGenerator } from "./matchCallGenerator";
import { EmeraldEggPickupCalibrator } from "./pickupCalibrator";

export const emeraldEggTabs: TabsProps["items"] = [
  {
    key: "held",
    label: "Held Egg",
    children: <EmeraldEggHeldGenerator />,
  },
  {
    key: "matchCall",
    label: "Match Call (No Egg)",
    children: <MatchCallGenerator />,
  },
  {
    key: "pickup",
    label: "Pickup Egg Generator",
    children: <EmeraldEggPickupGenerator />,
  },
  {
    key: "pickupCalibrator",
    label: "Pickup Egg Calibrator",
    children: <EmeraldEggPickupCalibrator />,
  },
  {
    key: "timer",
    label: "Timer",
    children: <Gen3TimerTab />,
  },
];
