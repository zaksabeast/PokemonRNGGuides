import React from "react";
import { Button } from "./button";

type Props = {
  data: Uint8Array;
  trackerId: string;
};

export const DownloadButton = ({ data, trackerId }: Props) => {
  const url = React.useMemo(() => {
    const blob = new Blob([data], { type: "application/octet-stream" });
    return URL.createObjectURL(blob);
  }, [data]);

  return (
    <Button trackerId={trackerId} download="merged.ips" href={url}>
      Download Merged Ips
    </Button>
  );
};
