import React from "react";
import { Tooltip } from "antd";
import { Flex } from "~/components/flex";
import { Icon } from "~/components/icons";
import type { Wild3Action, Wild3SearcherCycleData } from "~/rngTools";
import {
  getWild3AudioInfluenceOptions,
  getWild3LikelihoodAudioInfluenceLabels,
} from "./wild3AudioInfluences";

type Props = {
  mapId: string;
  action: Wild3Action;
  data: readonly Wild3SearcherCycleData[];
  showAudioInfluences: boolean;
  children: React.ReactNode;
};

export const Wild3Map = ({
  mapId,
  action,
  data,
  showAudioInfluences,
  children,
}: Props) => {
  if (!showAudioInfluences || data.length === 0) {
    return <>{children}</>;
  }

  const { weathers } = getWild3AudioInfluenceOptions(mapId, action);
  const title = getWild3LikelihoodAudioInfluenceLabels(
    data,
    weathers.length > 1,
  ).map((label) => <div key={label}>{label}</div>);

  return (
    <Flex align="center" gap={4}>
      {children}
      <Tooltip title={title}>
        <span aria-label="Optimal weather and movement">
          <Icon name="InfoOutline" />
        </span>
      </Tooltip>
    </Flex>
  );
};
