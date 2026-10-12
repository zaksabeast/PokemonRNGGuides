import styled from "@emotion/styled";

/** Buttons that append to an advance sequence, one row wide and stacked on phones */
export const SequenceButtons = styled.div(({ theme }) => ({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "minmax(0, 1fr)",
  gap: 8,
  [theme.mediaQueries.down("mobile")]: {
    gridAutoFlow: "row",
  },
}));
