import React from "react";
import { Flex } from "./flex";
import { Alert } from "~/components";
import { FileUpload } from "./fileUpload";
import { DownloadButton } from "./downloadButton";

const isValidIps = (ips: Uint8Array): boolean => {
  const header = new TextDecoder().decode(ips.slice(0, 5));
  const footer = new TextDecoder().decode(ips.slice(-3));
  return header === "PATCH" && footer === "EOF";
};

type Result =
  | {
      valid: boolean;
      ips: Uint8Array;
    }
  | {
      valid: false;
    };

const mergeIps = (ips: Uint8Array[]): Result => {
  const allValid = ips.every(isValidIps);

  if (!allValid) {
    return { valid: false };
  }

  const header = new TextEncoder().encode("PATCH");
  const patches = ips.map((patch) => patch.slice(5, -3));
  const footer = new TextEncoder().encode("EOF");

  const merged = [header, ...patches, footer].reduce(
    (acc, patch) => new Uint8Array([...acc, ...patch]),
    new Uint8Array(),
  );
  return { valid: true, ips: merged };
};

export const IpsMerger = () => {
  const [mergedIps, setMergedIps] = React.useState<Uint8Array | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  return (
    <Flex vertical gap={16}>
      <FileUpload
        id="ips-merger"
        accept=".ips"
        onUpload={(files) => {
          if (files.length === 0) {
            return;
          }
          const result = mergeIps(files);
          if (result.valid) {
            setMergedIps(result.ips);
            setError(null);
          } else {
            setError("Invalid IPS files");
          }
        }}
      />
      {error != null && <Alert type="error" message={error} />}
      {mergedIps != null && (
        <DownloadButton data={mergedIps} trackerId="download_merged_ips" />
      )}
    </Flex>
  );
};
