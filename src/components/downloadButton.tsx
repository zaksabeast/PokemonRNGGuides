import React from "react";
import { Button } from "./button";

type Props = {
  data: Uint8Array;
};

export const DownloadButton = ({ data }: Props) => {
  const url = React.useMemo(() => {
    const blob = new Blob([data], { type: "application/octet-stream" });
    return URL.createObjectURL(blob);
  }, [data]);

  return (
    <Button trackerId="download_merged_ips" download="merged.ips" href={url}>
      Download Merged Ips
    </Button>
  );
};
