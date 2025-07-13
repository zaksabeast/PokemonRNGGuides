import { Button } from "./button";
import { Icon } from "./icons";
import { message } from "antd";

type Props = {
  text: string;
};

export const CopyToClipboardButton = ({ text }: Props) => {
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
      >
        Copy to Clipboard
      </Button>
    </>
  );
};
