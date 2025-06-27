import styled from "@emotion/styled";

type Props = { children: React.ReactNode };

type MediaGridProps = {
  children: React.ReactNode;
  flex?: number;
};

const _MediaGrid = styled.table<{ flex?: number }>(({ flex }) => ({
  flex,
}));

export const MediaGrid = (props: MediaGridProps) => (
  <_MediaGrid cellSpacing={0} cellPadding={0} {...props} />
);

const _Th = styled.th(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.token.colorFillQuaternary,
  borderBottom: `1px solid ${theme.token.colorBorderSecondary}`,
}));

export const MediaGridHeader = ({ children }: Props) => <_Th>{children}</_Th>;

const _Tr = styled.tr(({ theme }) => ({
  borderCollapse: "collapse",
  textAlign: "left",
  ":hover": {
    backgroundColor: theme.token.colorFillQuaternary,
  },
}));

export const MediaGridRow = ({ children }: Props) => <_Tr>{children}</_Tr>;

const _Td = styled.td({
  padding: 16,
});

export const MediaGridCell = ({ children }: Props) => <_Td>{children}</_Td>;
