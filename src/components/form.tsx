// This is the only file where using the antd Button is okay
// eslint-disable-next-line no-restricted-imports
import { Form as FormikForm } from "formik";
import styled from "@emotion/styled";

export const Form = styled(FormikForm)({
  overflowX: "scroll",
});
