import React from "react";
import { notification } from "antd";
import { Button } from "~/components";
import { createRefreshHandler } from "./event";

type Props = {
  updateSw: (reloadPage: boolean) => void;
};

export const NeedsUpdateNotification = ({ updateSw }: Props) => {
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    const eventListener = () => {
      api.info({
        placement: "top",
        duration: 0,
        message: "Guide and RNG Tool updates are available!",
        actions: [
          <Button
            trackerId="refresh_for_update"
            color="Primary"
            size="middle"
            onClick={() => updateSw(true)}
          >
            Refresh now
          </Button>,
        ],
      });
    };
    const handler = createRefreshHandler(eventListener);
    return handler.remove;
  }, [api, updateSw]);

  return contextHolder;
};
