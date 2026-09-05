import React from "react";
import { Flex, Typography } from "~/components";
import { PokeRadar4ShinySearcher, SelectedShinyPatch } from "./index";
import { PokeRadar4PatchGrid } from "./patchGrid";
import { PokeRadar4ChainStarter } from "./chainStarter";

const CHAIN_STARTER_ADVANCE_BUFFER = 100;

export const PokeRadar4 = () => {
  const [selection, setSelection] = React.useState<
    SelectedShinyPatch | undefined
  >(undefined);

  const chainStarterRef = React.useRef<HTMLDivElement>(null);

  const handleSelectResult = (result: SelectedShinyPatch) => {
    setSelection(result);
    chainStarterRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const chainStarterMaxAdvance =
    selection != null
      ? Math.max(0, selection.spreadAdvance - CHAIN_STARTER_ADVANCE_BUFFER)
      : 0;

  return (
    <Flex vertical gap={24}>
      <Flex vertical gap={16}>
        <Typography.Title level={3}>Searcher</Typography.Title>
        <PokeRadar4ShinySearcher onSelectResult={handleSelectResult} />
      </Flex>

      <Flex vertical gap={16} ref={chainStarterRef}>
        <Typography.Title level={3}>Chain Starter</Typography.Title>
        <PokeRadar4ChainStarter
          seed={selection?.seed}
          tid={selection?.tid}
          sid={selection?.sid}
          lead={selection?.lead}
          species={selection?.species}
          level={selection?.level}
          encounterSlot={selection?.encounterSlot}
          initialMinAdvance={0}
          initialMaxAdvance={chainStarterMaxAdvance}
        />
      </Flex>

      <Flex vertical gap={16}>
        <Typography.Title level={3}>Patch Grid Simulator</Typography.Title>
        <PokeRadar4PatchGrid
          initialSeed={selection?.seed}
          initialChainCount={selection?.chainCount}
          initialBattleResult={selection?.battleResult}
        />
      </Flex>
    </Flex>
  );
};
