import { Steps } from "antd";

export const Stepper = ({ onChange, current, items }) => {
  return (
    <Steps
      type="navigation"
      size="small"
      current={current}
      onChange={onChange}
      className="site-navigation-steps"
      items={items}
    />
  );
};
