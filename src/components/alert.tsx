// This is the only file where using the antd Alert is okay
// eslint-disable-next-line no-restricted-imports
import { Alert as AntdAlert, type AlertProps as AntdAlertProps } from "antd";
import { withCss } from "./withCss";
import { Icon, type IconName } from "./icons";
import * as tst from "ts-toolbelt";

type AlertType = Exclude<AntdAlertProps["type"], undefined> | "tip";
export type AlertProps = tst.O.Overwrite<AntdAlertProps, { type: AlertType }>;

const AlertIcons = {
  success: "CheckCircle",
  tip: "TipOutline",
  warning: "WarningOutline",
  error: "CautionOutline",
  info: "InfoOutline",
} as const satisfies Record<AlertType, IconName>;

const InnerAlert = ({
  showIcon = false,
  type = "info",
  ...props
}: AlertProps) => {
  const icon = showIcon ? <Icon name={AlertIcons[type]} /> : undefined;
  const antdType = type === "tip" ? "success" : type;

  return (
    <AntdAlert showIcon={showIcon} type={antdType} icon={icon} {...props} />
  );
};

export const Alert = withCss(InnerAlert);
