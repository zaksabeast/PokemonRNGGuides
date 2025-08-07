import {
  Flex,
  Field,
  RngToolForm,
  FormikSwitch,
  ResultColumn,
  RngToolSubmit,
  MultiTimer,
  FormikSelect,
  Button,
  Icon,
  FormFieldTable,
  FormikNumberInput,
} from "~/components";
import { rngTools, Pokerus3GeneratorResult } from "~/rngTools";
import { FormikRadio } from "~/components/radio";
import React from "react";
import { z } from "zod";
import { toOptions } from "~/utils/options";
import { range } from "lodash-es";
import { useFormContext } from "~/hooks/form";
import { match, P } from "ts-pattern";
import { pickupIdToName, pickupItems } from "~/types/pickupItems";
import { useWatch } from "react-hook-form";

const HAS_EMPTY_TV_NEWS_SLOT = true; // The tool assumes the player always has a empty TV News slot.
const LEVEL_UP = false; // The tool assumes the player's Pokémon won't level-up after the battle.
const POKERUS_TARGETS = [26923, 101199, 101236];
const FPS = 59.7275;
const MS_PER_FRAME = 1000 / FPS;

type Column = Pokerus3GeneratorResult & {
  target_advance_before_pickup: number;
};

const pickupItemSchema = z.enum(pickupItems);

const Validator = z.object({
  entered_hall_of_fame: z.boolean(),
  had_mass_outbreak: z.boolean(),
  pickup_pokemon_count: z.number().int().min(0).max(5),
  filter_active: z.boolean(),
  filter_pickup_items_0: pickupItemSchema,
  filter_pickup_items_1: pickupItemSchema,
  filter_pickup_items_2: pickupItemSchema,
  filter_pickup_items_3: pickupItemSchema,
  filter_pickup_items_4: pickupItemSchema,
  initial_advance_before_pickup: z.number().int().min(0),
  calibration: z.number().int(),
  targetAdv: z.number().int(),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  entered_hall_of_fame: false,
  had_mass_outbreak: false,
  pickup_pokemon_count: 5,
  filter_active: true,
  filter_pickup_items_0: "None",
  filter_pickup_items_1: "None",
  filter_pickup_items_2: "None",
  filter_pickup_items_3: "None",
  filter_pickup_items_4: "None",
  initial_advance_before_pickup: 26800,
  calibration: 0,
  targetAdv: 26838,
};

const getTargetAdvanceBeforePickup = async (values: {
  entered_hall_of_fame: boolean;
  had_mass_outbreak: boolean;
  pickup_pokemon_count: number;
}) => {
  const target_advances_before_pickup =
    await rngTools.get_target_advances_before_pickup(
      values.entered_hall_of_fame,
      values.had_mass_outbreak,
      HAS_EMPTY_TV_NEWS_SLOT,
      LEVEL_UP,
      values.pickup_pokemon_count,
    );
  return target_advances_before_pickup.length > 0
    ? target_advances_before_pickup[0]
    : 0;
};

const generateResults = async (values: FormState): Promise<Column[]> => {
  const target_advance_before_pickup =
    await getTargetAdvanceBeforePickup(values);

  const opts = {
    initial_advance_before_pickup: values.filter_active
      ? 0
      : values.initial_advance_before_pickup,
    max_advances: 110_000,
    entered_hall_of_fame: values.entered_hall_of_fame,
    can_have_new_mass_outbreak: !values.had_mass_outbreak,
    has_empty_pokenews_slot: HAS_EMPTY_TV_NEWS_SLOT,
    pickup_pokemon_count: values.pickup_pokemon_count,
    level_up: LEVEL_UP,
    filter_pickup_items: values.filter_active
      ? [
          values.filter_pickup_items_0,
          values.filter_pickup_items_1,
          values.filter_pickup_items_2,
          values.filter_pickup_items_3,
          values.filter_pickup_items_4,
        ].slice(0, values.pickup_pokemon_count)
      : null,
    filter_gives_pokerus: null,
  };

  const results = await rngTools.gen3_pokerus_generator_states(opts);

  const cols: Column[] = results.map((res) => ({
    ...res,
    target_advance_before_pickup,
  }));

  if (!values.filter_active) {
    return cols;
  }

  // Put in first the columns with smallest difference between target and hit advance
  cols.sort((r1, r2) => {
    const diff1 = Math.abs(
      r1.advance_before_pickup - r1.target_advance_before_pickup,
    );
    const diff2 = Math.abs(
      r2.advance_before_pickup - r2.target_advance_before_pickup,
    );
    if (diff1 !== diff2) {
      return diff1 - diff2;
    }
    return r1.advance_before_pickup - r2.advance_before_pickup;
  });

  return cols.slice(0, 1000);
};

export const UpdateCalibrationBtn = ({
  colValues,
  onClick,
}: {
  colValues: Column;
  onClick: () => void;
}) => {
  const { setFieldValue } = useFormContext<FormState>();
  const calibration = useWatch<FormState, "calibration">({
    name: "calibration",
  });
  return (
    <Button
      type="text"
      color="PrimaryText"
      trackerId="pokerus_advance"
      onClick={() => {
        const diffAdvWithTarget =
          colValues.advance_before_pickup -
          colValues.target_advance_before_pickup;
        const diffMsWithTarget = (diffAdvWithTarget / 2) * MS_PER_FRAME; // divide by 2 because 2 advances per frame during battle
        setFieldValue(
          "calibration",
          calibration - Math.round(diffMsWithTarget),
        );
        onClick();
      }}
    >
      <Icon name="Update" size={20} /> Update Calibration
    </Button>
  );
};

export const Fields = () => {
  const { setFieldValue } = useFormContext<FormState>();
  const enteredHallOfFame = useWatch<FormState, "entered_hall_of_fame">({
    name: "entered_hall_of_fame",
  });
  const hadMassOutbreak = useWatch<FormState, "had_mass_outbreak">({
    name: "had_mass_outbreak",
  });
  const pickupPokemonCount = useWatch<FormState, "pickup_pokemon_count">({
    name: "pickup_pokemon_count",
  });
  const targetAdv = useWatch<FormState, "targetAdv">({
    name: "targetAdv",
  });
  const calibration = useWatch<FormState, "calibration">({
    name: "calibration",
  });
  const filterActive = useWatch<FormState, "filter_active">({
    name: "filter_active",
  });

  const timerMilliseconds = React.useMemo(() => {
    const FRAME_START_TO_SWEET_SCENT = 800;
    const FRAME_SWEET_SCENT_TO_BATTLE_END =
      targetAdv / 2 + 506 - FRAME_START_TO_SWEET_SCENT;
    return [
      5000,
      Math.round(MS_PER_FRAME * FRAME_START_TO_SWEET_SCENT),
      Math.round(MS_PER_FRAME * FRAME_SWEET_SCENT_TO_BATTLE_END) + calibration,
    ];
  }, [targetAdv, calibration]);

  React.useEffect(() => {
    getTargetAdvanceBeforePickup({
      entered_hall_of_fame: enteredHallOfFame,
      had_mass_outbreak: hadMassOutbreak,
      pickup_pokemon_count: pickupPokemonCount,
    }).then((adv) => {
      setFieldValue("targetAdv", adv);
    });
  }, [setFieldValue, enteredHallOfFame, hadMassOutbreak, pickupPokemonCount]);

  const fields = React.useMemo((): Field[] => {
    const fields: Field[] = [
      {
        label: "Entered Hall of Fame",
        input: <FormikSwitch<FormState> name="entered_hall_of_fame" />,
      },
    ];

    if (enteredHallOfFame) {
      fields.push({
        label: "Had Mass Outbreak",
        input: <FormikSwitch<FormState> name="had_mass_outbreak" />,
      });
    }

    fields.push(
      {
        label: "Number of Pickup Pokémon",
        input: (
          <FormikRadio<FormState>
            name="pickup_pokemon_count"
            options={toOptions(range(0, 5 + 1)).toReversed()}
          />
        ),
      },
      {
        label: "Target Advance",
        input:
          targetAdv > POKERUS_TARGETS[0]
            ? `${targetAdv} ${"(Not recommended)"}`
            : `${targetAdv}`,
      },
      {
        label: "",
        direction: "column",
        input: (
          <MultiTimer
            milliseconds={timerMilliseconds}
            minutesBeforeTarget={3}
            startButtonTrackerId="pokerus_timer_start"
            stopButtonTrackerId="pokerus_timer_stop"
          />
        ),
      },
      {
        label: "Calibration (ms)",
        input: (
          <FormikNumberInput<FormState> name="calibration" numType="decimal" />
        ),
      },
      {
        label: "Filter?",
        input: <FormikSwitch<FormState> name="filter_active" />,
      },
    );

    if (!filterActive) {
      fields.push({
        label: "Initial Advance",
        input: (
          <FormikNumberInput<FormState>
            name="initial_advance_before_pickup"
            numType="decimal"
          />
        ),
      });
    }

    if (filterActive) {
      const itemOptions = pickupItems.map((id) => ({
        label: pickupIdToName(id),
        value: id,
      }));

      const info = [
        [
          "Filter: Pickup item obtained on 1st Pokémon",
          "filter_pickup_items_0",
        ],
        [
          "Filter: Pickup item obtained on 2nd Pokémon",
          "filter_pickup_items_1",
        ],
        [
          "Filter: Pickup item obtained on 3rd Pokémon",
          "filter_pickup_items_2",
        ],
        [
          "Filter: Pickup item obtained on 4th Pokémon",
          "filter_pickup_items_3",
        ],
        [
          "Filter: Pickup item obtained on 5th Pokémon",
          "filter_pickup_items_4",
        ],
      ] as const;

      const count = Math.min(info.length, pickupPokemonCount);
      for (let i = 0; i < count; i++) {
        const [label, name] = info[i];
        fields.push({
          label,
          input: (
            <FormikSelect<FormState, typeof name>
              name={name}
              options={itemOptions}
            />
          ),
        });
      }
    }
    return fields;
  }, [
    enteredHallOfFame,
    filterActive,
    pickupPokemonCount,
    timerMilliseconds,
    targetAdv,
  ]);

  return <FormFieldTable fields={fields} />;
};

const formatAdvDiff = (hit: number, target: number) => {
  const diff = hit - target;
  return match(diff)
    .with(0, () => `${hit}`)
    .with(
      P.when((num) => num > 0),
      () => `${hit} (+${diff})`,
    )
    .otherwise(() => `${hit} (${diff})`);
};

export const Gen3Pokerus = () => {
  const [results, setResults] = React.useState<Column[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      setResults(await generateResults(values));
    },
    [setResults],
  );

  const onClickUpdateCalibrationBtn = React.useCallback(
    () => setResults([]),
    [setResults],
  );

  const columns = React.useMemo(
    (): ResultColumn<Column>[] => [
      {
        title: "Target (Pickup | Pokérus)",
        dataIndex: "target_advance_before_pickup",
        render: (target_advance_before_pickup) => {
          const target =
            target_advance_before_pickup > POKERUS_TARGETS[0]
              ? POKERUS_TARGETS[1]
              : POKERUS_TARGETS[0];
          return `${target_advance_before_pickup} | ${target}`;
        },
      },
      {
        title: "Hit (Pickup | Pokérus)",
        dataIndex: "advance_before_pickup",
        render: (advance_before_pickup, values) => {
          if (advance_before_pickup === values.target_advance_before_pickup) {
            return "Pokérus";
          }

          const pickupAdv = formatAdvDiff(
            advance_before_pickup,
            values.target_advance_before_pickup,
          );

          const pokerusTarget =
            values.target_advance_before_pickup > POKERUS_TARGETS[0]
              ? POKERUS_TARGETS[1]
              : POKERUS_TARGETS[0];

          const pokerusAdv = formatAdvDiff(
            values.advance_before_pokerus,
            pokerusTarget,
          );

          return `${pickupAdv} | ${pokerusAdv}`;
        },
      },
      {
        title: "",
        dataIndex: "advance_before_pokerus",
        render: (_val, values) => {
          return (
            <UpdateCalibrationBtn
              colValues={values}
              onClick={onClickUpdateCalibrationBtn}
            />
          );
        },
      },

      {
        title: "Pickup Items",
        dataIndex: "pickup_items",
        render: (val) => {
          const items = val
            .map((itemId, pokemonSlot) => {
              if (itemId === "None") {
                return null;
              }
              return `${pokemonSlot + 1}: ${pickupIdToName(itemId)}`;
            })
            .filter((txt) => txt != null);
          return items.length === 0 ? "No items" : items.join(", ");
        },
      },
    ],
    [onClickUpdateCalibrationBtn],
  );

  return (
    <Flex vertical>
      <RngToolForm<FormState, Column>
        columns={columns}
        results={results}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        rowKey="advance_before_pickup"
        submitTrackerId="Pokerus3"
      >
        <Fields />
      </RngToolForm>
    </Flex>
  );
};
