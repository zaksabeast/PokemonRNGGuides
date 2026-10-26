import React from "react";
import { Tooltip } from "antd";
import { Flex } from "~/components/flex";
import { Icon } from "~/components/icons";
import type { Wild3SearcherCycleData } from "~/rngTools";
import {
  formatWild3Likelihood,
  getWild3LikelihoodAudioInfluenceLabels,
} from "./wild3AudioInfluences";

type Props = {
  data: readonly Wild3SearcherCycleData[];
  showAudioInfluences: boolean;
  children?: React.ReactNode;
};

export const Wild3Likelihood = ({
  data,
  showAudioInfluences,
  children,
}: Props) => {
  const content = children ?? formatWild3Likelihood(data);
  if (!showAudioInfluences || data.length === 0) {
    return <>{content}</>;
  }

  const title = getWild3LikelihoodAudioInfluenceLabels(data).map((label) => (
    <div key={label}>{label}</div>
  ));

  return (
    <Flex align="center" gap={4}>
      {content}
      <Tooltip title={title}>
        <span aria-label="Optimal weather and movement">
          <Icon name="InfoOutline" />
        </span>
      </Tooltip>
    </Flex>
  );
};
