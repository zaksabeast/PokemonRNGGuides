import { Button } from "./button";
import { Icon } from "./icons";
import { message } from "antd";

type Props = {
  text: string;
  disabled?: boolean;
};

export const CopyToClipboardButton = ({ text, disabled }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    messageApi.success("Copied to clipboard");
  };

  return (
    <>
      {contextHolder}
      <Button
        trackerId="copy_to_clipboard"
        type="primary"
        icon={<Icon name="Copy" />}
        onClick={handleCopy}
        disabled={disabled}
      >
        Copy to Clipboard
      </Button>
    </>
  );
};
