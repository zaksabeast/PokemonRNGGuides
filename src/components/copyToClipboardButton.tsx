import React from "react";
import { Button } from "./button";
import { Icon } from "./icons";
import { message } from "antd";

type Props = {
  text: string;
  disabled?: boolean;
  trackerId?: string;
  successMessage?: string;
  children?: React.ReactNode;
};

export const CopyToClipboardButton = ({
  text,
  disabled,
  trackerId = "copy_to_clipboard",
  successMessage = "Copied to clipboard",
  children = "Copy to Clipboard",
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    messageApi.success(successMessage);
  };

  return (
    <>
      {contextHolder}
      <Button
        trackerId={trackerId}
        type="primary"
        icon={<Icon name="Copy" />}
        onClick={handleCopy}
        disabled={disabled}
      >
        {children}
      </Button>
    </>
  );
};
