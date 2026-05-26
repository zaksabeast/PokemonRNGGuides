import React from "react";
import { Image as AntdImage, type ImageProps as AntdImageProps } from "antd";
import { withCss } from "./withCss";
import { ClassNames } from "@emotion/react";

type _ImageProps = AntdImageProps & { pixelated?: boolean };

const _Image = ({ pixelated, ...props }: _ImageProps) => {
  return (
    <ClassNames>
      {({ css }) => (
        <AntdImage
          {...props}
          classNames={{
            image: css({
              objectFit: "contain",
              imageRendering: pixelated ? "pixelated" : "auto",
            }),
            popup: {
              root: css({ imageRendering: pixelated ? "pixelated" : "auto" }),
            },
          }}
        />
      )}
    </ClassNames>
  );
};

export const Image = withCss(_Image);

export type ImageProps = React.ComponentProps<typeof Image>;
