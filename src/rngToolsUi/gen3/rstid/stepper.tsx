import { Steps, StepsProps } from "antd";

export const Stepper = (props: StepsProps) => {
  return <Steps type="navigation" size="small" {...props} />;
};
