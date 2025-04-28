import React from "react";
import { z } from "zod";
import {
  RngToolForm,
  Field,
  Flex,
  ResultColumn,
  Icon,
  FormFieldTable,
} from "~/components";
import { FormikRadio, RadioGroup } from "~/components/radio";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { nature, NatureStat } from "../../../types/nature";
import { Select } from "~/components";
import { FormikProps } from "formik";
import {
  getStatRangeForStarter,
  CaughtMonResult,
  generateCaughtMonResults,
  getTargetPokemonDesc,
} from "./calc";
import { Button } from "../../../components/button";
import type { Game } from "./index";

const sortedNatures = nature.slice(0).sort();

const toOptions = <T,>(options: T[]) => {
  return options.map((option) => ({
    value: option,
    label: String(option),
  }));
};

const toStatOptions = ({ min, max }: { min: number; max: number }) => {
  const opts: { label: string; value: number }[] = [];
  for (let i = min; i <= max; i++) opts.push({ value: i, label: String(i) });
  return opts;
};

const Validator = z.object({
  pokemonSpecies: z.enum(["Mudkip", "Torchic", "Treecko"]),
  hpStat: z.number().min(0).max(999),
  atkStat: z.number().min(0).max(999),
  defStat: z.number().min(0).max(999),
  spaStat: z.number().min(0).max(999),
  spdStat: z.number().min(0).max(999),
  speStat: z.number().min(0).max(999),
  nature: z.enum(nature).nullable(),
  gender: z.enum(["Male", "Female"]).nullable(),
  minMaxStats: z.object({
    hp: z.object({
      min: z.number().min(0).max(999),
      max: z.number().min(0).max(999),
    }),
    atk: z.object({
      min: z.number().min(0).max(999),
      max: z.number().min(0).max(999),
    }),
    def: z.object({
      min: z.number().min(0).max(999),
      max: z.number().min(0).max(999),
    }),
    spa: z.object({
      min: z.number().min(0).max(999),
      max: z.number().min(0).max(999),
    }),
    spd: z.object({
      min: z.number().min(0).max(999),
      max: z.number().min(0).max(999),
    }),
    spe: z.object({
      min: z.number().min(0).max(999),
      max: z.number().min(0).max(999),
    }),
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
  nature: null,
  gender: null,
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
    [targetAdvance, setResults],
  );

  const getColumns = (): ResultColumn<CaughtMonResult>[] => {
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
  };

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
            options={toOptions(["Male", "Female"] as const) as any}
          />
        ),
      },
      {
        label: "Nature",
        input: (
          <Select
            style={{ minWidth: "120px" }}
            value={formik.values.nature}
            onChange={(e) => {
              if (!e) return;
              formik.setFieldValue("nature", e);
            }}
            options={sortedNatures.map((nature) => ({
              label: nature,
              value: nature,
            }))}
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
    <>
      <FormFieldTable
        fields={[{ label: "Target Pokémon", input: targetPokemonDesc }]}
      />
      <Typography.Title level={5} p={0} m={0}>
        Caught Pokémon
      </Typography.Title>
      <RngToolForm<FormState, CaughtMonResult>
        getFields={getFields}
        columns={getColumns()}
        results={results}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        submitTrackerId="generate_gen3_caught_starter"
        submitButtonLabel={"Find advances matching caught starter Pokémon"}
        rowKey="advance"
      />
    </>
  );
};
