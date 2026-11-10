import React from "react";
import { Button, Flex } from "~/components";
import { NumberField, SelectField } from "~/components/form";
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
import { useAtomValue } from "jotai";
import { selectedShinyPatchAtom } from "./state";

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
  initialSeed: initialSeedProp,
  initialAdvance: initialAdvanceProp,
  initialChainCount: initialChainCountProp,
  initialBattleResult: initialBattleResultProp,
}) => {
  const selectedPatch = useAtomValue(selectedShinyPatchAtom);
  const initialSeed = initialSeedProp ?? selectedPatch?.seed ?? 0;
  const initialAdvance = initialAdvanceProp ?? selectedPatch?.advance ?? 0;
  const initialChainCount =
    initialChainCountProp ?? selectedPatch?.chainCount ?? 0;
  const initialBattleResult =
    initialBattleResultProp ?? selectedPatch?.battleResult ?? "Catch";

  const [seed, setSeed] = React.useState<number | null>(initialSeed);
  const [advance, setAdvance] = React.useState<number | null>(initialAdvance);
  const [chainCount, setChainCount] = React.useState<number | null>(
    initialChainCount,
  );
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

  const isMissingNumber = seed == null || advance == null || chainCount == null;

  const handleCalculate = async () => {
    if (isMissingNumber) {
      return;
    }

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
        <NumberField
          label="Initial Seed"
          numType="hex"
          value={seed}
          onChange={setSeed}
        />
        <NumberField
          label="Advance"
          numType="decimal"
          value={advance}
          onChange={setAdvance}
        />
        <NumberField
          label="Chain Count"
          numType="decimal"
          value={chainCount}
          onChange={setChainCount}
        />
        <SelectField<BattleResult>
          label="Battle Result"
          value={battleResult}
          onChange={setBattleResult}
          options={BATTLE_RESULT_OPTIONS}
        />
        <SelectField<ShakeType>
          label="Shake Type"
          value={selectedShake}
          onChange={setSelectedShake}
          options={SHAKE_TYPE_OPTIONS}
        />
      </Flex>
      <Button
        trackerId="pokeradar4-calculate"
        disabled={isMissingNumber}
        onClick={handleCalculate}
      >
        Calculate
      </Button>
      <Flex mt={8} vertical>
        <PokeRadarPatches patches={toGridPatchFormat(patches)} />
      </Flex>
    </Flex>
  );
};
