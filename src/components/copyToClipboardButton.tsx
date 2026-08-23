import React from "react";
import { Button } from "./button";
import { Icon } from "./icons";
import { message } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

type Props = {
  text: string;
  disabled?: boolean;
  trackerId?: string;
  successMessage?: string;
  children?: React.ReactNode;
  size?: SizeType;
};

export const CopyToClipboardButton = ({
  text,
  disabled,
  trackerId = "copy_to_clipboard",
  successMessage = "Copied to clipboard",
  children = "Copy to Clipboard",
  size,
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
        size={size}
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
