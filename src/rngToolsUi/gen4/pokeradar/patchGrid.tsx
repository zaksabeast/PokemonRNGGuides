import React from "react";
import { Button, Flex, NumberInput, Select, Typography } from "~/components";
import {
  rngTools,
  Patch,
  PokeRadarPatch,
  BattleResult,
  ShakeType,
} from "~/rngTools";
import { toOptions } from "~/utils/options";
import { PokeRadarPatches } from "~/rngToolsUi/gen6/xyPokeRadar/patch";
import { BATTLE_RESULTS, SHAKE_TYPES } from "./constants";

const BATTLE_RESULT_OPTIONS = toOptions(BATTLE_RESULTS);
const SHAKE_TYPE_OPTIONS = toOptions(SHAKE_TYPES);

const toGridPatchFormat = (patches: Patch[]): PokeRadarPatch[] =>
  patches.map((patch) => ({
    x: patch.gx,
    y: patch.gz,
    state: patch.is_shiny ? "Shiny" : patch.continue_chain ? "Good" : "Bad",
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
    const result = await rngTools.pokeradar4_simulate_advance({
      init_seed: seed,
      target_advance: advance,
      chain_count: chainCount,
      battle_result: battleResult,
      selected_shake: selectedShake,
    });
    setPatches(result.patches);
  };

  return (
    <Flex
      vertical
      gap={24}
      p={16}
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius={8}
    >
      <Flex wrap="wrap" gap={16}>
        <Flex vertical gap={4}>
          <Typography.Text>Initial Seed</Typography.Text>
          <NumberInput
            numType="hex"
            value={seed}
            onChange={(num) => {
              if (num != null) {
                setSeed(num);
              }
            }}
          />
        </Flex>
        <Flex vertical gap={4}>
          <Typography.Text>Advance</Typography.Text>
          <NumberInput
            numType="decimal"
            value={advance}
            onChange={(num) => {
              if (num != null) {
                setAdvance(num);
              }
            }}
          />
        </Flex>
        <Flex vertical gap={4}>
          <Typography.Text>Chain Count</Typography.Text>
          <NumberInput
            numType="decimal"
            value={chainCount}
            onChange={(num) => {
              if (num != null) {
                setChainCount(num);
              }
            }}
          />
        </Flex>
        <Flex vertical gap={4}>
          <Typography.Text>Battle Result</Typography.Text>
          <Select<BattleResult>
            value={battleResult}
            onChange={setBattleResult}
            options={BATTLE_RESULT_OPTIONS}
          />
        </Flex>
        <Flex vertical gap={4}>
          <Typography.Text>Shake Type</Typography.Text>
          <Select<ShakeType>
            value={selectedShake}
            onChange={setSelectedShake}
            options={SHAKE_TYPE_OPTIONS}
          />
        </Flex>
      </Flex>
      <Button trackerId="pokeradar4-calculate" onClick={handleCalculate}>
        Calculate
      </Button>
      <Flex mt={8} vertical>
        <PokeRadarPatches patches={toGridPatchFormat(patches)} />
      </Flex>
    </Flex>
  );
};
