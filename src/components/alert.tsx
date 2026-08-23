// This is the only file where using the antd Alert is okay
// eslint-disable-next-line no-restricted-imports
import { Alert as AntdAlert, type AlertProps as AntdAlertProps } from "antd";
import { withCss } from "./withCss";
import { Icon, type IconName } from "./icons";
import * as tst from "ts-toolbelt";

type AntdAlertType = Exclude<AntdAlertProps["type"], undefined>;
type AlertType = AntdAlertType | "tip" | "important";
export type AlertProps = tst.O.Overwrite<AntdAlertProps, { type: AlertType }>;

const AlertIcons = {
  success: "CheckCircle",
  tip: "TipOutline",
  important: "MessageOutline",
  warning: "WarningOutline",
  error: "CautionOutline",
  info: "InfoOutline",
} as const satisfies Record<AlertType, IconName>;

const AntdAlertMap = {
  tip: "success",
  important: "info",
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
} as const satisfies Record<AlertType, AntdAlertType>;

const InnerAlert = ({
  showIcon = false,
  type = "info",
  ...props
}: AlertProps) => {
  const icon = showIcon ? <Icon name={AlertIcons[type]} /> : undefined;

  return (
    <AntdAlert
      showIcon={showIcon}
      type={AntdAlertMap[type]}
      icon={icon}
      {...props}
    />
  );
};

export const Alert = withCss(InnerAlert);
