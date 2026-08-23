import {
  Button,
  Field,
  Flex,
  FormFieldTable,
  FormikNumberInput,
  FormikSelect,
  Icon,
  MultiTimer,
  NumberInput,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Select,
  Switch,
} from "~/components";
import { useFormContext, useWatch } from "~/hooks/form";
import { Species } from "~/rngTools";
import {
  Gen3Console,
  gen3ConsoleFpsMap,
  gen3ConsoleOptions,
} from "~/types/console";
import { pickupItems_emerald } from "~/types/pickupItems";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { toOptions } from "~/utils/options";
import React from "react";
import { z } from "zod";
import { BattleVideoInfo } from "../battleVideo/battleVideo";
import {
  getEmeraldStaticCalibData,
  getPossibleStatic3Species,
} from "../static/constants.tsx";
import { generateResults, Pokerus3Column } from "./pokerus_emerald_calc";
import { Pokerus3Setup } from "./pokerus_emerald_select_setup";
import { convertTotalAdvToAdvRelativeToPaintingReseeding } from "./pokerus_emerald_vars.tsx";

// Advs not caused by vblanks between the closing battle video and when the battle loop starts (x2 adv/frame):
// +3 move ptrs, +1 choose_slot, +1 choose_lvl, +1 choose_nature, +50 pid_tries, +2 ivs, +3 move ptrs, +4 ai, +1 held_item
const CALIB_BATTLE_VIDEO_TO_BATTLE_WILD =
  3 + 1 + 1 + 1 + 2 * 25 + 2 + 3 + 4 + 1;

// Advs not caused by vblanks between the closing battle video and when the battle loop starts (x2 adv/frame):
// +3 move ptrs, +4 gen pokemon, +3 move ptrs, +4 ai, +1 held_item
const CALIB_BATTLE_VIDEO_TO_BATTLE_STATIC = 3 + 4 + 3 + 4 + 1;

// Advs not caused by vblanks between the start of battle loop and pressing A to end battle:
// +1 BattleStartClearSetData, +1 TryDoEventsBeforeFirstTurn, +2 OpponentHandleChooseMove (variable), +1 Cmd_accuracycheck, +1 Cmd_critcalc, +1 Cmd_adjustnormaldamage, +1 Cmd_seteffectwithchance
const CALIB_DURING_BATTLE = 8;

// 360 vblanks between sweet scent and battle
const OFFSET_SWEET_SCENT_TO_BATTLE = 360;
const OFFSET_END_BATTLE_TO_PICKUP = 68;

// Advance between generation the pokemon in static encounter and the start of the battle loop.
const ADV_STATIC_GENERATE_MON_TO_BATTLE = 120;

const pickupItemSchema = z.string();
const Validator = z.object({
  leadPickupLvlIndex: z.number().int().min(0).max(9),
  filter_pickup_items_0: pickupItemSchema,
  filter_pickup_items_1: pickupItemSchema,
  filter_pickup_items_2: pickupItemSchema,
  filter_pickup_items_3: pickupItemSchema,
  filter_pickup_items_4: pickupItemSchema,
  filter_pickup_items_5: pickupItemSchema,
  minimum_advances: z.number().int().min(0),
  maximum_advances: z.number().int().min(0),
});
export type CalibrationOptions = z.infer<typeof Validator>;
const initialValues: CalibrationOptions = {
  leadPickupLvlIndex: 0,
  filter_pickup_items_0: "None",
  filter_pickup_items_1: "None",
  filter_pickup_items_2: "None",
  filter_pickup_items_3: "None",
  filter_pickup_items_4: "None",
  filter_pickup_items_5: "None",
  minimum_advances: 0,
  maximum_advances: 2000,
};

const CalibrationInputs = ({
  setup,
  battleVideoInfo,
  setFilterActive,
  filterActive,
  setHumanInputDelay,
  humanInputDelay,
}: {
  setFilterActive: (val: boolean) => void;
  filterActive: boolean;
  setup: Pokerus3Setup;
  battleVideoInfo: BattleVideoInfo;
  setHumanInputDelay: (val: number | null) => void;
  humanInputDelay: number | null;
}) => {
  const { setFieldValue } = useFormContext<CalibrationOptions>();

  const { leadPickupLvlIndex } = useWatch({
    names: { leadPickupLvlIndex: true },
    validationSchema: Validator,
  });

  const isStatic = setup.encounter_type === "Stationary";
  const hasBattleVideo = battleVideoInfo.battleVideoAdvAfterPainting > 0;

  const [consoleType, setConsoleType] = React.useState<Gen3Console>(
    battleVideoInfo.consoleType ?? "GBA",
  );
  const [battleVideoAdvance, setBattleVideoAdvance] = React.useState<
    number | null
  >(battleVideoInfo.battleVideoAdvAfterPainting);
  const [staticSpecies, setStaticSpecies] = React.useState<Species>("Kecleon");

  React.useEffect(() => {
    setConsoleType(battleVideoInfo.consoleType ?? "GBA");
    setBattleVideoAdvance(battleVideoInfo.battleVideoAdvAfterPainting);
  }, [battleVideoInfo]);

  const { adv_after_painting, frame_before_painting } = setup.target_advs;
  React.useEffect(() => {
    setFieldValue("minimum_advances", adv_after_painting - 50);
    setFieldValue("maximum_advances", adv_after_painting + 50);
  }, [adv_after_painting, frame_before_painting, setFieldValue]);

  const advAtLastInput =
    setup.target_advs.adv_after_painting -
    OFFSET_END_BATTLE_TO_PICKUP -
    CALIB_DURING_BATTLE -
    (humanInputDelay ?? 0);

  const offsetFromInputToBattleStart = isStatic
    ? (getEmeraldStaticCalibData(staticSpecies, false)?.offset ?? 0) +
      ADV_STATIC_GENERATE_MON_TO_BATTLE
    : OFFSET_SWEET_SCENT_TO_BATTLE;

  // 10s between closing battle video and triggering sweet scent. 1k adv when rebooting the game
  const waitFrameBeforeSweetScent = hasBattleVideo ? 600 : 1000;
  const calibBattleStart = isStatic
    ? CALIB_BATTLE_VIDEO_TO_BATTLE_STATIC
    : CALIB_BATTLE_VIDEO_TO_BATTLE_WILD;
  const advAtBattleStart =
    (battleVideoAdvance ?? 0) +
    waitFrameBeforeSweetScent +
    offsetFromInputToBattleStart +
    calibBattleStart;

  const advInBattle = advAtLastInput - advAtBattleStart;
  const frameDuringBattle = Math.round(advInBattle / 2);

  // ex: press A to start battle at adv=1000, frame=600. battle starts at adv=1200, frame=700. (offsetFromInputToBattleStart == 100).
  // target adv is 2000.  Waiting 400 frames will bring adv from 1200 to 2000. We will reach target adv at frame=1100.
  // The timer between the 2 inputs is 100 + 400 = 500.
  const frameFromStartBattleLastInputToEndBattleLastInput =
    offsetFromInputToBattleStart + frameDuringBattle;

  const calibration = calibBattleStart + CALIB_DURING_BATTLE;

  const fields: Field[] = [
    {
      label: "Stationary Pokémon",
      input: (
        <Select<Species>
          value={staticSpecies}
          options={toOptions(getPossibleStatic3Species("emerald"))}
          onSelect={setStaticSpecies}
        />
      ),
      show: isStatic,
    },
    {
      label: "Offset to start battle",
      tooltip:
        "Number of frames between interacting with the stationary Pokémon and the start of the battle.",
      input: `~${offsetFromInputToBattleStart} frames`,
      show: isStatic,
    },
    {
      label: "Console",
      input: (
        <Select<Gen3Console>
          name="console"
          value={consoleType}
          options={gen3ConsoleOptions}
          onSelect={setConsoleType}
        />
      ),
    },
    {
      label: "Battle Video advance",
      input: (
        <NumberInput
          numType="decimal"
          onChange={setBattleVideoAdvance}
          value={battleVideoAdvance}
        />
      ),
    },
    {
      label: "Calibration",
      input: `~${calibration} advances`,
      tooltip:
        "Number of RNG advances not caused by frames. (Pokémon generation and battle logic)",
    },
    {
      label: "Offset",
      input: `~${OFFSET_END_BATTLE_TO_PICKUP} advances`,
      tooltip:
        "Number of RNG advances between the last player input and when the Pokérus logic starts.",
    },
    {
      label: "Human input delay (advance)",
      tooltip:
        "Number of RNG advances caused by human reaction time between the timer ending and pressing the input.",
      input: (
        <NumberInput
          numType="decimal"
          onChange={setHumanInputDelay}
          value={humanInputDelay}
        />
      ),
    },
    {
      label: "",
      direction: "column",
      input: (
        <MultiTimer
          milliseconds={[
            5000,
            Math.round(
              (waitFrameBeforeSweetScent / gen3ConsoleFpsMap[consoleType]) *
                1000,
            ),
            Math.round(
              (frameFromStartBattleLastInputToEndBattleLastInput /
                gen3ConsoleFpsMap[consoleType]) *
                1000,
            ),
          ]}
          labels={[
            hasBattleVideo
              ? "Close the Battle Video"
              : "Soft reset START+SELECT+A+B",
            isStatic
              ? "Interact with the Stationnary Pokémon"
              : "Trigger Sweet Scent",
            setup.gen_opts.level_up === true
              ? `Press A on the menu showing new stats after level up`
              : `Dismiss the final EXP message`,
          ]}
          minutesBeforeTarget={3}
          startButtonTrackerId="pokerus_emerald_timer_start"
          stopButtonTrackerId="pokerus_emerald_timer_stop"
        />
      ),
    },
    {
      label: "1st Pickup Pokémon level",
      input: (
        <FormikSelect<CalibrationOptions, "leadPickupLvlIndex">
          name="leadPickupLvlIndex"
          options={Array.from({ length: 10 }, (_, index) => ({
            label: `${index * 10 + 1}-${index * 10 + 10}`,
            value: index,
          }))}
        />
      ),
      show: isStatic,
    },
    {
      label: "Filters?",
      input: <Switch value={filterActive} onChange={setFilterActive} />,
    },
  ];

  if (filterActive) {
    const info = [
      {
        name: "filter_pickup_items_0",
        label: "Pickup item on 1st Pokémon",
      },
      {
        name: "filter_pickup_items_1",
        label: "Pickup item on 2nd Pokémon (Lv. 1-9)",
      },
      {
        name: "filter_pickup_items_2",
        label: "Pickup item on 3rd Pokémon (Lv. 1-9)",
      },
      {
        name: "filter_pickup_items_3",
        label: "Pickup item on 4th Pokémon (Lv. 1-9)",
      },
      {
        name: "filter_pickup_items_4",
        label: "Pickup item on 5th Pokémon (Lv. 1-9)",
      },
      {
        name: "filter_pickup_items_5",
        label: "Pickup item on 6th Pokémon (Lv. 1-9)",
      },
    ] as const;

    for (let slot = 0; slot < setup.gen_opts.pickup_pokemon_count; slot++) {
      const { name, label } = info[slot];
      const levelIndex = isStatic && slot === 0 ? (leadPickupLvlIndex ?? 0) : 0;
      const options = [
        { label: "None", value: "None" },
        ...toOptions(pickupItems_emerald[levelIndex]),
      ];
      fields.push({
        label,
        input: <FormikSelect name={name} options={options} />,
        indent: 1,
      });
    }
  } else {
    fields.push(
      {
        label: "Minimum advances",
        input: (
          <FormikNumberInput<CalibrationOptions>
            name="minimum_advances"
            numType="decimal"
          />
        ),
        indent: 1,
      },
      {
        label: "Maximum advances",
        input: (
          <FormikNumberInput<CalibrationOptions>
            name="maximum_advances"
            numType="decimal"
          />
        ),
        indent: 1,
      },
    );
  }

  return (
    <Flex vertical>
      <h3>Calibration</h3>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};

export const Calibration = ({
  setup,
  battleVideoInfo,
}: {
  setup: Pokerus3Setup;
  battleVideoInfo: BattleVideoInfo;
}) => {
  const [results, setResults] = React.useState<Pokerus3Column[]>([]);
  const [filterActive, setFilterActive] = React.useState(true);

  const [humanInputDelay, setHumanInputDelay] = React.useState<number | null>(
    0,
  );

  const onSubmit: RngToolSubmit<CalibrationOptions> = async (values) => {
    const res = await generateResults(values, setup, filterActive);
    setResults(res);
  };

  const columns: ResultColumn<Pokerus3Column>[] = [
    {
      title: (
        <span>
          Update <br /> Calibration
        </span>
      ),
      key: "Update Calibration",
      dataIndex: "advance_before_pickup",
      show: filterActive,
      render: (_: number, values: Pokerus3Column) => {
        if (values.gives_pokerus) {
          return "Pokérus!";
        }

        return (
          <Button
            type="text"
            color="PrimaryText"
            trackerId="pokerus3UpdateCalib"
            onClick={() => {
              const diff =
                values.advance_before_pickup -
                values.target_advance_before_pickup;
              setHumanInputDelay((humanInputDelay ?? 0) + diff);
              setResults([]);
            }}
          >
            <Icon name="Update" size={20} />
          </Button>
        );
      },
    },
    {
      title: "Advance",
      dataIndex: "advance_before_pickup",
      render: (advance: number, row: Pokerus3Column) => {
        const advRelativeToPainting =
          convertTotalAdvToAdvRelativeToPaintingReseeding(
            row.frame_before_painting,
            advance,
          );

        const difference = advance - row.target_advance_before_pickup;
        return `${formatLargeInteger(advRelativeToPainting)}${difference === 0 ? "" : ` (${difference > 0 ? "+" : ""}${difference})`}`;
      },
    },
    {
      title: "Pokérus",
      dataIndex: "gives_pokerus",
      show: !filterActive,
      render: (gives_pokerus: boolean) => {
        return gives_pokerus ? "Yes" : "No";
      },
    },
    {
      title: "Pickup Items",
      dataIndex: "pickup_items",
      show: !filterActive,
      render: (items: number[], { leadPickupLvlIndex }: Pokerus3Column) => {
        const labels = items
          .map((itemIdx, slot) => {
            if (itemIdx === -1) {
              return null;
            }
            const tableIdx = slot === 0 ? leadPickupLvlIndex : 0;
            return `${slot + 1}: ${pickupItems_emerald[tableIdx][itemIdx]}`;
          })
          .filter((label) => label != null);
        return labels.length > 0 ? labels.join(", ") : "No items";
      },
    },
  ];

  return (
    <RngToolForm<CalibrationOptions, Pokerus3Column>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="advance_before_pickup"
      submitTrackerId="Pokerus3Emerald"
    >
      <CalibrationInputs
        setup={setup}
        battleVideoInfo={battleVideoInfo}
        setFilterActive={setFilterActive}
        filterActive={filterActive}
        humanInputDelay={humanInputDelay}
        setHumanInputDelay={setHumanInputDelay}
      />
    </RngToolForm>
  );
};
