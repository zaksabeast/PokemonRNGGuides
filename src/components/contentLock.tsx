import React from "react";
import md5 from "md5";
import { Flex } from "./flex";
import { Input } from "./input";
import { Button } from "./button";
import { Typography } from "./typography";

type Props = {
  unlockHash: string;
  children: React.ReactNode;
};

export const ContentLock = ({ children, unlockHash }: Props) => {
  const [isLocked, setIsLocked] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <form>
      <Flex vertical justify="center" align="center" gap={24} width="100%">
        <Typography.Title level={2}>
          This content is locked to supporters!
        </Typography.Title>

        <Input
          placeholder="Enter unlock password"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button
          trackerId="unlock"
          type="primary"
          htmlType="submit"
          onClick={() => {
            // Not secure, but doesn't need to be
            // This is just a deterent
            const hash = md5(inputValue);
            if (hash === unlockHash) {
              setIsLocked(false);
            }
          }}
        >
          Unlock
        </Button>
      </Flex>
    </form>
  );
};
