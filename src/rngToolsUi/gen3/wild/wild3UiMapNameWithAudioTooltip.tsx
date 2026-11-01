import React from "react";
import { Tooltip } from "antd";
import { Flex } from "~/components/flex";
import { Icon } from "~/components/icons";
import type { Wild3Action, Wild3SearcherCycleData } from "~/rngTools";
import {
  getWild3AudioInfluenceOptions,
  getWild3LikelihoodAudioInfluenceLabel,
} from "./wild3AudioInfluences";

type Props = {
  mapId: string;
  action: Wild3Action;
  data: Wild3SearcherCycleData | null;
  showAudioInfluences: boolean;
  children: React.ReactNode;
};

export const Wild3UiMapNameWithAudioTooltip = ({
  mapId,
  action,
  data,
  showAudioInfluences,
  children,
}: Props) => {
  if (!showAudioInfluences || data == null) {
    return <>{children}</>;
  }

  const { weathers } = getWild3AudioInfluenceOptions(mapId, action);
  const title = getWild3LikelihoodAudioInfluenceLabel(
    data,
    weathers.length > 1,
  );

  return (
    <Flex align="center" gap={4}>
      {children}
      <Tooltip title={title}>
        <span aria-label="Optimal weather audio and playing song">
          <Icon name="InfoOutline" />
        </span>
      </Tooltip>
    </Flex>
  );
};
