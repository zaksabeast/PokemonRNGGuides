// This is the only file where using the antd Alert is okay
// eslint-disable-next-line no-restricted-imports
import { Alert as AntdAlert } from "antd";
import { withCss } from "./withCss";

export const Alert = withCss(AntdAlert);
