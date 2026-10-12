import { AliasToken } from "antd/es/theme/internal";
import * as tst from "ts-toolbelt";

type Tokens = Record<
  tst.U.Select<keyof AliasToken, `boxShadow${string}` | `color${string}`>,
  string
> & {
  layoutHeaderHeight: string;
  colorInfoTonal: string;
  colorInfoTonalBg: string;
  colorInfoTonalBorder: string;
  colorStateLayerHover: string;
  colorStateLayerPressed: string;
  colorOnPrimary: string;
};

type TypeStyle = {
  fontSize: number;
  /** Unitless, relative to fontSize */
  lineHeight: number;
  fontWeight: 400 | 500;
  letterSpacing: number;
};

declare module "@emotion/react" {
  export type TypeRole =
    | "titleMedium"
    | "titleSmall"
    | "bodyLarge"
    | "bodyMedium"
    | "bodySmall"
    | "labelLarge"
    | "labelMedium";

  export type ScreenSize = "mobile" | "smallTablet" | "tablet" | "desktop";

  export type PageSize = "mobile" | "medium" | "wide";

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme extends CustomTheme {
    token: Tokens;
    typography: Record<TypeRole, TypeStyle>;
    shape: {
      medium: number;
      large: number;
      largeIncreased: number;
      extraLarge: number;
      /** Pills and circles */
      full: number;
    };
    size: {
      field: number;
      button: number;
      listItem: number;
      touchTarget: number;
      /** Smaller sizes used within `mediaQueries.dense` */
      dense: {
        field: number;
        button: number;
        listItem: number;
        touchTarget: number;
      };
    };
    mediaQueries: {
      /** Screens large enough for denser, mouse-sized controls */
      dense: string;
      up: (size: ScreenSize) => string;
      down: (size: ScreenSize) => string;
    };
    /** Makes an element the container that `containerQueries` measure */
    pageContainer: {
      containerType: "inline-size";
      containerName: string;
    };
    /** Queries against `pageContainer`, since the nav drawer takes space on desktop */
    containerQueries: Record<PageSize, string>;
    /** Pointer, state-layer transition, and focus ring for clickable surfaces */
    interactive: {
      cursor: "pointer";
      transition: string;
      ":focus-visible": {
        outline: string;
        outlineOffset: number;
      };
    };
  }

  export type Color = tst.S.Replace<
    tst.U.Select<keyof Theme["token"], `color${string}`>,
    "color",
    ""
  >;
}
