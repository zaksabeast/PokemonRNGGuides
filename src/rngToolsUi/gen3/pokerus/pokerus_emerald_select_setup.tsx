import {
  Alert,
  Field,
  Flex,
  FormFieldTable,
  FormikNumberInput,
  FormikRadio,
  FormikSwitch,
  RadioGroup,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import { useFormContext, useWatch } from "~/hooks/form";
import { Pokerus3ResultInfo, rngTools } from "~/rngTools";
import { GBA_FPS } from "~/utils/consts";
import { formatDuration } from "~/utils/formatDuration";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";
import { toOptions } from "~/utils/options";
import { Tooltip } from "antd";
import { useAtom } from "jotai";
import React from "react";
import { z } from "zod";
import { usingPaintingReseedingLabel } from "../pokemonRng/labels";
import {
  estimateSetupWaitFrames,
  findOptimalSetups,
} from "./pokerus_emerald_calc";
import { selectedSetupAtom, battleVideoInfoAtom } from "./pokerus_emerald_vars";

type EncounterType = "Stationary" | "Wild";
export type YesNoUnknown = "Yes" | "No" | "Unknown";

export type SetupOptions = {
  consider_painting_reseeding: boolean;
  encounter_type: EncounterType;
  max_pickup_pokemon_count: number;
  entered_hall_of_fame: boolean;
  can_have_new_mass_outbreak: YesNoUnknown;
  has_empty_pokenews_slot: YesNoUnknown;
  permit_level_up: boolean;
};

export type Pokerus3Setup = Pokerus3ResultInfo & {
  encounter_type: EncounterType;
  uid: number;
  has_unknown_can_have_new_mass_outbreak: boolean;
  has_unknown_has_empty_pokenews_slot: boolean;
};

/**
 * User enters fields for the searcher, which will find the exact optimal setup.
 * */
const SetupFieldsForSearcher = () => {
  const { setFieldValue } = useFormContext<SetupOptions>();
  const {
    consider_painting_reseeding: considerPainting,
    encounter_type: encounterType,
    entered_hall_of_fame: enteredHallOfFame,
    can_have_new_mass_outbreak: canHaveNewMassOutbreak,
    has_empty_pokenews_slot: hasEmptyPokenewsSlot,
  } = useWatch({
    names: {
      consider_painting_reseeding: true,
      encounter_type: true,
      entered_hall_of_fame: true,
      can_have_new_mass_outbreak: true,
      has_empty_pokenews_slot: true,
    },
    validationSchema: setupValidator,
  });

  const unknownBooleanOptions = toOptions(["Yes", "No", "Unknown"] as const);

  const fields: Field[] = [
    {
      label: "Encounter type",
      input: (
        <RadioGroup<EncounterType>
          optionType="button"
          value={encounterType}
          options={[
            { label: "Stationary", value: "Stationary" },
            { label: "Wild", value: "Wild" },
          ]}
          onChange={(event) => {
            const value = event.target.value;
            setFieldValue("encounter_type", value);
            if (value === "Wild") {
              setFieldValue("max_pickup_pokemon_count", 5);
            }
          }}
        />
      ),
    },
    {
      ...usingPaintingReseedingLabel(),
      input: (
        <FormikSwitch<SetupOptions>
          name="consider_painting_reseeding"
          onChange={(value) => {
            if (value) {
              setFieldValue("entered_hall_of_fame", true);
            }
          }}
        />
      ),
    },
    {
      label: "Max Pickup Pokémon count",
      input: (
        <FormikRadio<SetupOptions>
          name="max_pickup_pokemon_count"
          options={toOptions(encounterType === "Wild" ? [5] : [5, 6])}
        />
      ),
    },
    {
      label: "Has entered hall of fame?",
      input: considerPainting ? (
        "Yes"
      ) : (
        <FormikSwitch<SetupOptions> name="entered_hall_of_fame" />
      ),
    },
    {
      show: enteredHallOfFame === true,
      label: "Can trigger mass outbreak?",
      input: (
        <Flex vertical gap={8}>
          <FormikRadio<SetupOptions>
            name="can_have_new_mass_outbreak"
            options={unknownBooleanOptions}
          />
          {canHaveNewMassOutbreak === "Unknown" && (
            <Alert
              type="info"
              message="Only setups that result in Pokérus with and without being able to trigger mass outbreak will be considered."
            />
          )}
        </Flex>
      ),
      tooltip:
        "You can only trigger a mass outbreak if you haven't triggered one already. Each battle after entering the Hall of Fame has 1/200 chance to trigger a mass outbreak. On dead battery, it's not possible to know if a mass outbreak has already been triggered or not. You have 95% chance to trigger a mass outbreak after 598 battles.",
    },
    {
      show: enteredHallOfFame === true,
      label: "Has empty Pokénews TV slot?",
      input: (
        <Flex vertical gap={8}>
          <FormikRadio<SetupOptions>
            name="has_empty_pokenews_slot"
            options={unknownBooleanOptions}
          />
          {hasEmptyPokenewsSlot === "Unknown" && (
            <Alert
              type="info"
              message="Only setups that result in Pokérus with and without an empty Pokénews TV slot will be considered."
            />
          )}
        </Flex>
      ),
      tooltip:
        "There are 16 Pokénews TV slots. Each battle has 1% chance to fill a TV slot for 4 days on a live battery, and indefinitely on a dead battery. You have 95% chance to have at least 1 empty slot after 1007 or less battles, 5% chance after 2306 battles.",
    },
    {
      label: "Permit level up?",
      input: <FormikSwitch<SetupOptions> name="permit_level_up" />,
    },
  ];

  return <FormFieldTable fields={fields} />;
};

const setupValidator = z.object({
  consider_painting_reseeding: z.boolean(),
  encounter_type: z.enum(["Stationary", "Wild"]),
  max_pickup_pokemon_count: z.number().int().min(5).max(6),
  entered_hall_of_fame: z.boolean(),
  can_have_new_mass_outbreak: z.enum(["Yes", "No", "Unknown"]),
  has_empty_pokenews_slot: z.enum(["Yes", "No", "Unknown"]),
  permit_level_up: z.boolean(),
});

type SpecificSetupOptions = {
  encounter_type: EncounterType;
  pickup_pokemon_count: number;
  entered_hall_of_fame: boolean;
  can_have_new_mass_outbreak: boolean;
  has_empty_pokenews_slot: boolean;
  level_up: boolean;
  frame_before_painting: number;
  adv_after_painting: number;
};

const specificSetupValidator = z.object({
  encounter_type: z.enum(["Stationary", "Wild"]),
  pickup_pokemon_count: z.number().int().min(1).max(6),
  entered_hall_of_fame: z.boolean(),
  can_have_new_mass_outbreak: z.boolean(),
  has_empty_pokenews_slot: z.boolean(),
  level_up: z.boolean(),
  frame_before_painting: z.number().int().min(0),
  adv_after_painting: z.number().int().min(0),
});

/**
 * User manually enters the wanted setup.
 * */
export const EnterSpecificSetup = ({
  setOptimalSetup,
}: {
  setOptimalSetup: (setup: Pokerus3Setup | null) => void;
}) => {
  const [givesPokerus, setGivesPokerus] = React.useState<boolean | null>(null);
  const onInputChange = () => {
    setGivesPokerus(null);
    setOptimalSetup(null);
  };

  const onSubmit: RngToolSubmit<SpecificSetupOptions> = async (values) => {
    const [result] = await rngTools.gen3_pokerus_search_for_calib({
      initial_advance_before_pickup:
        lcrng_distance(0, values.frame_before_painting) +
        values.adv_after_painting,
      max_advances: 1,
      gen_opts: {
        is_emerald_game: true,
        entered_hall_of_fame: values.entered_hall_of_fame,
        can_have_new_mass_outbreak: values.can_have_new_mass_outbreak,
        has_empty_pokenews_slot: values.has_empty_pokenews_slot,
        level_up: values.level_up,
        pickup_pokemon_count: values.pickup_pokemon_count,
      },
      max_result_count: 1,
      filter_pickup_items: undefined,
      filter_gives_pokerus: undefined,
    });

    setGivesPokerus(result?.gives_pokerus ?? false);
    setOptimalSetup({
      encounter_type: values.encounter_type,
      uid: 0,
      has_unknown_can_have_new_mass_outbreak: false,
      has_unknown_has_empty_pokenews_slot: false,
      gen_opts: {
        is_emerald_game: true,
        entered_hall_of_fame: values.entered_hall_of_fame,
        can_have_new_mass_outbreak: values.can_have_new_mass_outbreak,
        has_empty_pokenews_slot: values.has_empty_pokenews_slot,
        level_up: values.level_up,
        pickup_pokemon_count: values.pickup_pokemon_count,
      },
      target_advs: {
        frame_before_painting: values.frame_before_painting,
        adv_after_painting: values.adv_after_painting,
      },
      advs_at_pickup: [
        lcrng_distance(
          0,
          pokerng_with_jump(
            values.frame_before_painting,
            values.adv_after_painting,
          ),
        ),
      ],
      seed_at_pokerus: 0,
      short_range_calibrable_ratio: 0,
      long_range_calibrable_ratio: 0,
      score: { from_pokerus: 0, from_items: 0, from_wait: 0 },
    });
  };

  const fields: Field[] = [
    {
      label: "Encounter type",
      input: (
        <div onChange={onInputChange}>
          <FormikRadio<SpecificSetupOptions>
            name="encounter_type"
            options={toOptions(["Stationary", "Wild"] as const)}
          />
        </div>
      ),
    },
    {
      label: "Pickup Pokémon count",
      input: (
        <FormikNumberInput<SpecificSetupOptions>
          name="pickup_pokemon_count"
          numType="decimal"
          onChange={onInputChange}
        />
      ),
    },
    {
      label: "Has entered hall of fame?",
      input: (
        <FormikSwitch<SpecificSetupOptions>
          name="entered_hall_of_fame"
          onChange={onInputChange}
        />
      ),
    },
    {
      label: "Can trigger a new mass outbreak?",
      input: (
        <FormikSwitch<SpecificSetupOptions>
          name="can_have_new_mass_outbreak"
          onChange={onInputChange}
        />
      ),
    },
    {
      label: "Has empty TV slot?",
      input: (
        <FormikSwitch<SpecificSetupOptions>
          name="has_empty_pokenews_slot"
          onChange={onInputChange}
        />
      ),
    },
    {
      label: "Level up?",
      input: (
        <FormikSwitch<SpecificSetupOptions>
          name="level_up"
          onChange={onInputChange}
        />
      ),
    },
    {
      label: "Frame before painting",
      input: (
        <FormikEmeraldFrameBeforePaintingInput<SpecificSetupOptions>
          name="frame_before_painting"
          onChange={onInputChange}
        />
      ),
    },
    {
      label: "Target advance after painting",
      input: (
        <FormikNumberInput<SpecificSetupOptions>
          name="adv_after_painting"
          numType="decimal"
          onChange={onInputChange}
        />
      ),
    },
  ];

  return (
    <Flex vertical>
      <h3>Enter a Specific Setup</h3>
      <RngToolForm<SpecificSetupOptions, never>
        validationSchema={specificSetupValidator}
        initialValues={{
          encounter_type: "Stationary",
          pickup_pokemon_count: 5,
          entered_hall_of_fame: true,
          can_have_new_mass_outbreak: false,
          has_empty_pokenews_slot: true,
          level_up: false,
          frame_before_painting: 0,
          adv_after_painting: 0,
        }}
        onSubmit={onSubmit}
        submitTrackerId="pokerus_emerald_specific_setup"
        submitButtonLabel="Use setup"
      >
        <FormFieldTable fields={fields} />
      </RngToolForm>
      {givesPokerus === true ? (
        <Alert
          type="success"
          message="This setup gives Pokérus. Continue to the next step."
        />
      ) : givesPokerus === false ? (
        <Alert
          type="warning"
          message="Warning: This setup doesn't give Pokérus."
        />
      ) : null}
    </Flex>
  );
};

type SetupSelectionMode = "search" | "specific";

export const SetupSelection = ({
  setOptimalSetup,
}: {
  setOptimalSetup: (setup: Pokerus3Setup | null) => void;
}) => {
  const [mode, setMode] = React.useState<SetupSelectionMode>("search");

  return (
    <Flex vertical gap={16}>
      <RadioGroup<SetupSelectionMode>
        options={[
          { label: "Search Best Setup", value: "search" },
          { label: "Select Specific Setup", value: "specific" },
        ]}
        value={mode}
        onChange={(event) => setMode(event.target.value)}
        optionType="button"
      />
      {mode === "search" ? (
        <SelectSetupOptions setOptimalSetup={setOptimalSetup} />
      ) : (
        <EnterSpecificSetup setOptimalSetup={setOptimalSetup} />
      )}
    </Flex>
  );
};

export const Gen3PokerusEmeraldFindSetup = () => {
  const [, setSetup] = useAtom(selectedSetupAtom);
  const [, setBattleVideoInfo] = useAtom(battleVideoInfoAtom);

  return (
    <SetupSelection
      setOptimalSetup={(optimalSetup) => {
        setSetup(optimalSetup);
        setBattleVideoInfo(null);
      }}
    />
  );
};

const SelectSetupOptions = ({
  setOptimalSetup,
}: {
  setOptimalSetup: (setup: Pokerus3Setup | null) => void;
}) => {
  const [results, setResults] = React.useState<Pokerus3Setup[]>([]);

  const onSubmit: RngToolSubmit<SetupOptions> = async (values) => {
    const setups = await findOptimalSetups({
      ...values,
      entered_hall_of_fame: values.entered_hall_of_fame,
      can_have_new_mass_outbreak: values.can_have_new_mass_outbreak,
      has_empty_pokenews_slot: values.has_empty_pokenews_slot,
    });
    setResults(setups);
  };

  const columns: ResultColumn<Pokerus3Setup>[] = [
    {
      title: "Advances",
      dataIndex: "target_advs",
      render: (target_advs, { gen_opts }) => {
        const { frame_before_painting: before, adv_after_painting: after } =
          target_advs;
        const text =
          before === 0
            ? formatLargeInteger(after)
            : `${formatLargeInteger(before)} | ${formatLargeInteger(after)}`;
        const waitFrames = estimateSetupWaitFrames(
          before,
          after,
          gen_opts.entered_hall_of_fame,
        );

        return (
          <Tooltip title={`${formatDuration(waitFrames / GBA_FPS)} wait`}>
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: (
        <div>
          # Advances <br /> resulting <br /> in Pokérus
        </div>
      ),
      key: "adv",
      dataIndex: "advs_at_pickup",
      render: (advs_at_pickup) => advs_at_pickup.length,
    },
    {
      title: (
        <div>
          Calibration chance <br />
          Near | Far from Target
        </div>
      ),
      key: "calibration",
      tooltip:
        "Percentage of advances surrounding the target that give a Pickup item which permits calibration. Near from target is within 10 advances. Far from target is within 100.",
      dataIndex: "short_range_calibrable_ratio",
      render: (short_range_calibrable_ratio, { long_range_calibrable_ratio }) =>
        `${formatProbability(short_range_calibrable_ratio)} | ${formatProbability(long_range_calibrable_ratio)}`,
    },
    {
      title: "Level up?",
      dataIndex: "gen_opts",
      render: (gen_opts) => (gen_opts.level_up ? "Yes" : "No"),
    },
    {
      title: "Pickup Pokémon",
      dataIndex: "gen_opts",
      render: (genOpts) => genOpts.pickup_pokemon_count,
    },
    {
      title: "Score",
      dataIndex: "score",
      render: (score) => {
        const total = score.from_pokerus + score.from_items + score.from_wait;

        return (
          <Tooltip
            title={
              <div>
                <div>Pokérus: {formatLargeInteger(score.from_pokerus)}</div>
                <div>Items: {formatLargeInteger(score.from_items)}</div>
                <div>Wait: {formatLargeInteger(score.from_wait)}</div>
              </div>
            }
          >
            <span>{formatLargeInteger(total)}</span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Flex vertical>
      <h3>Select Setup Options</h3>
      <RngToolForm<SetupOptions, Pokerus3Setup>
        validationSchema={setupValidator}
        initialValues={{
          consider_painting_reseeding: false,
          encounter_type: "Stationary",
          max_pickup_pokemon_count: 5,
          entered_hall_of_fame: true,
          can_have_new_mass_outbreak: "No",
          has_empty_pokenews_slot: "Yes",
          permit_level_up: true,
        }}
        onSubmit={onSubmit}
        columns={columns}
        results={results}
        onClickResultRow={(setup) => {
          if (setup != null) {
            setOptimalSetup(setup);
          }
        }}
        submitTrackerId="pokerus_emerald_find_setup"
        submitButtonLabel="Find best setup"
        rowKey="uid"
      >
        <SetupFieldsForSearcher />
      </RngToolForm>
    </Flex>
  );
};
