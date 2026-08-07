import React from "react";
import { Button, Flex, NumberInput, Select } from "~/components";
import {
  rngTools,
  Patch,
  PokeRadarPatch,
  ShakeType,
  BattleResult,
} from "~/rngTools";
import { toOptions } from "~/utils/options";
import { PokeRadarPatches } from "~/rngToolsUi/gen6/xyPokeRadar/patch";

const BATTLE_RESULT_OPTIONS = toOptions([
  "Catch",
  "Win",
] as const satisfies BattleResult[]);

const SHAKE_TYPE_OPTIONS = toOptions([
  "Slow",
  "Fast",
] as const satisfies ShakeType[]);

const toGridPatchFormat = (patches: Patch[]): PokeRadarPatch[] =>
  patches.map((p) => ({
    x: p.gx,
    y: p.gz,
    state: p.is_shiny ? "Shiny" : p.continue_chain ? "Good" : "Bad",
  }));

type PokeRadar4PatchGridProps = {
  initialSeed?: number;
  initialAdvance?: number;
  initialChainCount?: number;
  initialBattleResult?: BattleResult;
};

export const PokeRadar4PatchGrid: React.FC<PokeRadar4PatchGridProps> = ({
  initialSeed = 0,
  initialAdvance = 0,
  initialChainCount = 0,
  initialBattleResult = "Catch",
}) => {
  const [seed, setSeed] = React.useState<number>(initialSeed);
  const [advance, setAdvance] = React.useState<number>(initialAdvance);
  const [chainCount, setChainCount] = React.useState<number>(initialChainCount);
  const [battleResult, setBattleResult] =
    React.useState<BattleResult>(initialBattleResult);
  const [selectedShake, setSelectedShake] = React.useState<ShakeType>("Slow");
  const [patches, setPatches] = React.useState<Patch[]>([]);

  React.useEffect(() => {
    setSeed(initialSeed);
    setAdvance(initialAdvance);
    setChainCount(initialChainCount);
    setBattleResult(initialBattleResult);
  }, [initialSeed, initialAdvance, initialChainCount, initialBattleResult]);

  const handleCalculate = async () => {
    try {
      const result = await rngTools.pokeradar4_simulate_advance({
        init_seed: seed,
        target_advance: advance,
        chain_count: chainCount,
        battle_result: battleResult,
        selected_shake: selectedShake,
      });
      setPatches(result.patches);
    } catch (err) {
      console.error("[radar4] pokeradar4_simulate_advance failed:", err);
    }
  };

  return (
    <Flex
      vertical
      style={{
        gap: 24,
        padding: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
      }}
    >
      <Flex wrap="wrap" style={{ gap: 16 }}>
        <Flex vertical style={{ gap: 4 }}>
          <span>Initial Seed</span>
          <NumberInput numType="hex" value={seed} onChange={setSeed} />
        </Flex>
        <Flex vertical style={{ gap: 4 }}>
          <span>Advance</span>
          <NumberInput
            numType="decimal"
            value={advance}
            onChange={setAdvance}
          />
        </Flex>
        <Flex vertical style={{ gap: 4 }}>
          <span>Chain Count</span>
          <NumberInput
            numType="decimal"
            value={chainCount}
            onChange={setChainCount}
          />
        </Flex>
        <Flex vertical style={{ gap: 4 }}>
          <span>Battle Result</span>
          <Select<BattleResult>
            value={battleResult}
            onChange={setBattleResult}
            options={BATTLE_RESULT_OPTIONS}
          />
        </Flex>
        <Flex vertical style={{ gap: 4 }}>
          <span>Shake Type</span>
          <Select<ShakeType>
            value={selectedShake}
            onChange={setSelectedShake}
            options={SHAKE_TYPE_OPTIONS}
          />
        </Flex>
      </Flex>
      <Button
        onClick={handleCalculate}
        style={{ alignSelf: "flex-start", width: "auto" }}
      >
        Calculate
      </Button>
      <div style={{ marginTop: 8 }}>
        <PokeRadarPatches patches={toGridPatchFormat(patches)} />
      </div>
    </Flex>
  );
};
