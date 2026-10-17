type DataLayerProps = {
  event: string;
} & Record<string, string>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Window {
  dataLayer:
    | undefined
    | {
        push: (props: DataLayerProps) => void;
      };
  // Safari before 14.1 only has the prefixed constructor
  webkitAudioContext: typeof AudioContext;
}

declare const window: Window;

// Registers <lite-youtube> as a side effect and has no exports
declare module "lite-youtube-embed";

declare module "*.mdx" {
  import * as React from "react";
  export default React.ComponentType<void>;
}
