import { List as AntdList, ListProps as AntdListProps } from "antd";
import { withCss } from "./withCss";
import styled from "@emotion/styled";

const InnerList = styled.ul({
  margin: 0,
  marginBlock: 0,
  "& > .ant-list-item": {
    display: "block",
    listStyleType: "none",
  },
});

const OuterList = ({ children, ...props }: AntdListProps<unknown>) => {
  return (
    <AntdList {...props}>
      <InnerList>{children}</InnerList>
    </AntdList>
  );
};

export const List = withCss(OuterList);
export const ListItem = withCss(AntdList.Item);
