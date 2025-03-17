import React from "react";

type Props = {
  src: string;
};

export const Audio = React.forwardRef<HTMLAudioElement, Props>(
  ({ src }, ref) => {
    return (
      <audio ref={ref}>
        <source src={src} type="audio/mpeg" />
      </audio>
    );
  },
);
