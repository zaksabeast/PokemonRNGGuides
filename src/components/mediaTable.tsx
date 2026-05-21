import styled from "@emotion/styled";

type Props = { children: React.ReactNode };

type MediaTableProps = {
  children: React.ReactNode;
  flex?: number;
  tableLayout?: "fixed" | "auto";
  width?: string | number;
};

const _MediaTable = styled.table<Omit<MediaTableProps, "children">>(
  ({ width, tableLayout, flex }) => ({
    width,
    tableLayout,
    flex,
  }),
);

export const MediaTable = (props: MediaTableProps) => (
  <_MediaTable cellSpacing={0} cellPadding={0} {...props} />
);

export const MediaTableBody = (props: Props) => {
  return <tbody {...props} />;
};

const _Th = styled.th(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.token.colorFillQuaternary,
  borderBottom: `1px solid ${theme.token.colorBorderSecondary}`,
}));

export const MediaTableHeader = ({ children }: Props) => <_Th>{children}</_Th>;

const _Tr = styled.tr(({ theme }) => ({
  borderCollapse: "collapse",
  textAlign: "left",
  ":hover": {
    backgroundColor: theme.token.colorFillQuaternary,
  },
}));

export const MediaTableRow = ({ children }: Props) => <_Tr>{children}</_Tr>;

const _Td = styled.td({
  padding: 16,
});

export const MediaTableCell = ({ children }: Props) => <_Td>{children}</_Td>;
