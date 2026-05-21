import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";

type ExtraGridItemProps = {
  mobile?: tst.L.KeySet<1, 12>;
  smallTablet?: tst.L.KeySet<1, 12>;
  tablet?: tst.L.KeySet<1, 12>;
  desktop?: tst.L.KeySet<1, 12>;
  gap?: number | string;
};

export const Grid = styled.div<ExtraGridItemProps>(
  ({ theme, mobile, smallTablet, tablet, desktop, gap = 16 }) => {
    const mobileColumns = mobile ?? 1;
    const smallTabletColumns = smallTablet ?? mobileColumns;
    const tabletColumns = tablet ?? smallTabletColumns;
    const desktopColumns = desktop ?? tabletColumns;

    return {
      display: "grid",
      width: "100%",
      gap,
      gridTemplateColumns: `repeat(${mobileColumns}, 1fr)`,
      [theme.mediaQueries.up("smallTablet")]: {
        gridTemplateColumns: `repeat(${smallTabletColumns}, 1fr)`,
      },
      [theme.mediaQueries.up("tablet")]: {
        gridTemplateColumns: `repeat(${tabletColumns}, 1fr)`,
      },
      [theme.mediaQueries.up("desktop")]: {
        gridTemplateColumns: `repeat(${desktopColumns}, 1fr)`,
      },
    };
  },
);
