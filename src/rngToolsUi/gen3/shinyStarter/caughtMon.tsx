import React from "react";
import { z } from "zod";
import { range } from "lodash-es";
import { RngToolForm, Field, Flex, ResultColumn, Icon } from "~/components";
import { FormikRadio } from "~/components/radio";
import { FormikSelect } from "~/components/select";
import { RngToolSubmit } from "~/components/rngToolForm";
import { Typography } from "~/components/typography";
import { nature, NatureStat } from "../../../types/nature";
import { CaughtMonResult, generateCaughtMonResults } from "./calc";
import { Button } from "../../../components/button";
import type { Game, TargetStarter } from "./index";
import { toOptions } from "~/utils/options";

const natureOptions = toOptions(nature.toSorted());

const toStatOptions = ({ min, max }: { min: number; max: number }) => {
  return toOptions(range(min, max + 1));
};

const StatSchema = z.number().min(0).max(999);

const Validator = z.object({
  hpStat: StatSchema,
  atkStat: StatSchema,
  defStat: StatSchema,
  spaStat: StatSchema,
  spdStat: StatSchema,
  speStat: StatSchema,
  nature: z.enum(nature),
  gender: z.enum(["Male", "Female"]),
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
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  nature: "Adamant",
  gender: "Male",
};

type Props = {
  game: Game;
  targetAdvance: number;
  targetStarter: TargetStarter;
  setLatestHitAdv: (hitAdv: number) => void;
};

export const CaughtMon = ({
  game,
  targetAdvance,
  targetStarter,
  setLatestHitAdv,
}: Props) => {
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts) => {
      setResults(
        await generateCaughtMonResults(
          game,
          targetAdvance,
          targetStarter,
          opts,
        ),
      );
    },
    [game, targetAdvance, targetStarter, setResults],
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

  const getFields = (): Field[] => {
    const minMaxStats = targetStarter.minMaxStats;
    return [
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
    <Flex vertical gap={8}>
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
