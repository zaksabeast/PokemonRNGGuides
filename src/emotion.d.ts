import { AliasToken } from "antd/es/theme/internal";
import * as tst from "ts-toolbelt";

type Tokens = Record<
  tst.U.Select<keyof AliasToken, `boxShadow${string}` | `color${string}`>,
  string
> & {
  layoutHeaderHeight: string;
  colorGuideTagNew: string;
  colorGuideTagNewBg: string;
  colorGuideTagWebTool: string;
  colorGuideTagWebToolBg: string;
  colorGuideTagVideoGuide: string;
  colorGuideTagVideoGuideBg: string;
  colorGuideTagRoughDraft: string;
  colorGuideTagRoughDraftBg: string;
  colorGuideTagTranslated: string;
  colorGuideTagTranslatedBg: string;
};

declare module "@emotion/react" {
  export type ScreenSize = "mobile" | "smallTablet" | "tablet" | "desktop";

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme extends CustomTheme {
    token: Tokens;
    mediaQueries: {
      up: (size: ScreenSize) => string;
      down: (size: ScreenSize) => string;
    };
  }

  export type Color = tst.S.Replace<
    tst.U.Select<keyof Theme["token"], `color${string}`>,
    "color",
    ""
  >;
}
