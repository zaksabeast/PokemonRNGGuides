type DataLayerProps = {
  event: string;
} & Record<string, string>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Window {
  theme: undefined | Record<string, import("@emotion/react").CustomTheme>;
  dataLayer:
    | undefined
    | {
        push: (props: DataLayerProps) => void;
      };
}

declare const window: Window;
