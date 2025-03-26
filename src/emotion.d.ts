import { ThemeConfig } from "antd";
import { AliasToken } from "antd/es/theme/internal";
import * as tst from "ts-toolbelt";

declare module "@emotion/react" {
  export type ScreenSize = "mobile" | "tablet" | "desktop";

  export type CustomTheme = {
    token: {
      headerHeight: string;
      footerHeight: string;
      colorFillSecondaryHover: string;
    };
    mediaQueries: {
      up: (size: ScreenSize) => string;
      down: (size: ScreenSize) => string;
    };
  };

  type CompleteTheme = tst.O.Merge<
    tst.O.Required<
      tst.O.Overwrite<
        ThemeConfig,
        { token: tst.O.Merge<AliasToken, CustomTheme["token"]> }
      >,
      "token"
    >,
    { mediaQueries: CustomTheme["mediaQueries"] }
  >;

  export interface Theme extends CompleteTheme {}

  export type Color = tst.S.Replace<
    tst.U.Select<keyof Theme["token"], `color${string}`>,
    "color",
    ""
  >;
}
