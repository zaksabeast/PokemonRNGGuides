import React from "react";
import { Flex, Icon } from "~/components";
import { PokeRadarPatch } from "~/rngTools";
import { keyBy } from "lodash-es";
import { match } from "ts-pattern";
import styled from "@emotion/styled";

const PokeRadarPatchBlock = styled(Flex)({
  backgroundColor: "#ebf5e4",
});

type PokeRadarPatchesProps = {
  patches: PokeRadarPatch[];
};

// eslint-disable-next-line id-length
const centerPatch: PokeRadarPatch = { x: 4, y: 4, state: "Empty" };

export const PokeRadarPatches = ({ patches }: PokeRadarPatchesProps) => {
  const patchesByCoords: Record<string, PokeRadarPatch> = React.useMemo(
    () => ({
      ...keyBy(patches, (patch) => `${patch.x}_${patch.y}`),
      "4_4": centerPatch,
    }),
    [patches],
  );
  const gridDimension = new Array(9).fill(null);
  return (
    <Flex vertical>
      {gridDimension.map((_, posY) => (
        <Flex key={posY}>
          {gridDimension.map((_, posX) => (
            <PokeRadarPatchBlock
              vertical
              aspectRatio="1 / 1"
              overflowX="hidden"
              flex={1}
              key={posX}
              border="1px solid"
              borderColor="Border"
              align="center"
              justify="center"
            >
              {match(patchesByCoords[`${posX}_${posY}`])
                // eslint-disable-next-line id-length
                .with({ x: 4, y: 4 }, () => (
                  <Icon size="80%" name="PersonSimpleWalkBold" />
                ))
                .with({ state: "Shiny" }, () => (
                  <Icon size="80%" name="Sparkles" color="Warning" />
                ))
                .with({ state: "Good" }, () => (
                  <Icon size="80%" name="Check" color="Success" />
                ))
                .with({ state: "Bad" }, () => (
                  <Icon size="80%" name="Close" color="Error" />
                ))
                .with({ state: "Empty" }, () => (
                  <Icon size="80%" name="Close" color="Error" />
                ))
                .otherwise(() => " ")}
            </PokeRadarPatchBlock>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
