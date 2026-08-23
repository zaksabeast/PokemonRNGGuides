import React from "react";
import { Flex } from "~/components";
import { PokeRadar4ShinySearcher } from "./index";
import { PokeRadar4PatchGrid } from "./patchGrid";

export const PokeRadar4 = () => {
  const [selectedSeed, setSelectedSeed] = React.useState<number | undefined>(
    undefined,
  );
  const gridRef = React.useRef<HTMLDivElement>(null);

  const handleSelectResult = (selection: { seed: number }) => {
    setSelectedSeed(selection.seed);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Flex vertical gap={24}>
      <PokeRadar4ShinySearcher onSelectResult={handleSelectResult} />

      <div ref={gridRef}>
        <PokeRadar4PatchGrid initialSeed={selectedSeed} />
      </div>
    </Flex>
  );
};
