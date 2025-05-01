import React from "react";
import { z } from "zod";
import { range } from "lodash-es";
import {
  RngToolForm,
  Field,
  Flex,
  ResultColumn,
  Icon,
  FormFieldTable,
} from "~/components";
import { FormikRadio, RadioGroup } from "~/components/radio";
import { FormikSelect } from "~/components/select";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { nature, NatureStat } from "../../../types/nature";
import { FormikProps } from "formik";
import {
  getStatRangeForStarter,
  CaughtMonResult,
  generateCaughtMonResults,
  getTargetPokemonDesc,
} from "./calc";
import { Button } from "../../../components/button";
import type { Game } from "./index";
import { toOptions } from "~/utils/options";

const natureOptions = toOptions(nature.toSorted());

const toStatOptions = ({ min, max }: { min: number; max: number }) => {
  return toOptions(range(min, max));
};

const StatSchema = z.number().min(0).max(999);

const StatRangeSchema = z.object({
  min: StatSchema,
  max: StatSchema,
});

const Validator = z.object({
  pokemonSpecies: z.enum(["Mudkip", "Torchic", "Treecko"]),
  hpStat: StatSchema,
  atkStat: StatSchema,
  defStat: StatSchema,
  spaStat: StatSchema,
  spdStat: StatSchema,
  speStat: StatSchema,
  nature: z.enum(nature),
  gender: z.enum(["Male", "Female"]),
  minMaxStats: z.object({
    hp: StatRangeSchema,
    atk: StatRangeSchema,
    def: StatRangeSchema,
    spa: StatRangeSchema,
    spd: StatRangeSchema,
    spe: StatRangeSchema,
  }),
});

export type FormState = z.infer<typeof Validator>;

const StatInput = ({
  stat,
  options,
}: {
  stat: NatureStat;
  options: { min: number; max: number };
}) => {
  return (
    <Flex gap={8}>
      <FormikRadio<FormState, `${typeof stat}Stat`>
        name={`${stat}Stat`}
        options={toStatOptions(options)}
      />
    </Flex>
  );
};

const initialValues: FormState = {
  pokemonSpecies: "Mudkip",
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  nature: "Adamant",
  gender: "Male",
  minMaxStats: {
    hp: { min: 20, max: 21 },
    atk: { min: 10, max: 14 },
    def: { min: 9, max: 12 },
    spa: { min: 9, max: 12 },
    spd: { min: 9, max: 12 },
    spe: { min: 8, max: 11 },
  },
};

type Props = {
  game: Game;
  targetAdvance: number;
  setLatestHitAdv: (hitAdv: number) => void;
};

export const CaughtMon = ({ game, targetAdvance, setLatestHitAdv }: Props) => {
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);
  const [targetPokemonDesc, setTargetPokemonDesc] = React.useState<string>("");

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      setResults(await generateCaughtMonResults(game, targetAdvance, opts));
    },
    [game, targetAdvance, setResults],
  );

  const columns = React.useMemo((): ResultColumn<CaughtMonResult>[] => {
    const columns: ResultColumn<CaughtMonResult>[] = [
      { title: "Target", dataIndex: "targetAdvance" },
      {
        title: "Advance",
        dataIndex: "advance",
        render: (val, values) => {
          const diffWithTarget = val - values.targetAdvance;
          if (diffWithTarget === 0) return `${val}`;
          if (diffWithTarget > 0) return `${val} (+${diffWithTarget})`;
          return `${val} (${diffWithTarget})`;
        },
      },
      {
        title: "",
        dataIndex: "advance",
        render(advance, values) {
          if (values.advance === values.targetAdvance)
            return "Shiny if correct SID";

          return (
            <Button
              type="text"
              color="PrimaryText"
              trackerId="shinyStarter_adv"
              onClick={() => {
                setLatestHitAdv(advance);
                setResults([]);
              }}
            >
              <Icon name="Update" size={20} /> Update Calibration
            </Button>
          );
        },
      },
    ];
    return columns;
  }, [setLatestHitAdv, setResults]);

  const getFields = (formik: FormikProps<FormState>): Field[] => {
    const { minMaxStats, pokemonSpecies } = formik.values;

    React.useEffect(() => {
      getTargetPokemonDesc(game, targetAdvance, pokemonSpecies).then(
        setTargetPokemonDesc,
      );
    }, [targetAdvance, pokemonSpecies]);

    return [
      {
        label: "Starter",
        input: (
          <RadioGroup
            optionType="button"
            value={pokemonSpecies}
            onChange={async ({ target }) => {
              const desc = await getTargetPokemonDesc(
                game,
                targetAdvance,
                target.value,
              );
              const minMaxStats = await getStatRangeForStarter(target.value);
              formik.setValues({
                ...formik.values,
                pokemonSpecies: target.value,
                minMaxStats,
              });
              setTargetPokemonDesc(desc);
            }}
            options={toOptions(["Mudkip", "Torchic", "Treecko"])}
          />
        ),
      },
      {
        label: "Gender",
        input: (
          <FormikRadio<FormState, "gender">
            name="gender"
            options={toOptions(["Male", "Female"] as const)}
          />
        ),
      },
      {
        label: "Nature",
        input: (
          <FormikSelect<FormState, "nature">
            name="nature"
            options={natureOptions}
          />
        ),
      },
      {
        label: "HP",
        input: (
          <FormikRadio<FormState, "hpStat">
            name="hpStat"
            options={toStatOptions(minMaxStats.hp)}
          />
        ),
      },
      {
        label: "ATK",
        input: <StatInput stat="atk" options={minMaxStats.atk} />,
      },
      {
        label: "DEF",
        input: <StatInput stat="def" options={minMaxStats.def} />,
      },
      {
        label: "SPA",
        input: <StatInput stat="spa" options={minMaxStats.spa} />,
      },
      {
        label: "SPD",
        input: <StatInput stat="spd" options={minMaxStats.spd} />,
      },
      {
        label: "SPE",
        input: <StatInput stat="spe" options={minMaxStats.spe} />,
      },
    ];
  };

  return (
    <Flex vertical>
      <FormFieldTable
        fields={[{ label: "Target Pokémon", input: targetPokemonDesc }]}
      />
      <Typography.Title level={5} p={0} m={0}>
        Caught Pokémon
      </Typography.Title>
      <RngToolForm<FormState, CaughtMonResult>
        getFields={getFields}
        columns={columns}
        results={results}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        submitTrackerId="generate_gen3_caught_starter"
        submitButtonLabel={"Find advances matching caught starter Pokémon"}
        rowKey="advance"
      />
    </Flex>
  );
};
