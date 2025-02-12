type DataLayerProps = {
  event: string;
} & Record<string, string>;

interface Window {
  theme: undefined | import("@emotion/react").Theme;
  dataLayer:
    | undefined
    | {
        push: (props: DataLayerProps) => void;
      };
}

declare const window: Window;
