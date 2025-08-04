import React from "react";
import {
  Button,
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
} from "~/components";
import {
  multiWorkerRngTools,
  SearchStatic4Method1Opts,
  SearchStatic4Method1State,
} from "~/rngTools";
import { z } from "zod";
import {
  getPkmFilterFields,
  getPkmFilterInitialValues,
  pkmFilterSchema,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  flattenIvs,
  FlattenIvs,
  getIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { toOptions } from "~/utils/options";
import { useCurrentStep } from "~/components/stepper/state";
import { match } from "ts-pattern";
import {
  dpptStarters,
  hgssStarters,
  Gen4Starter,
  useStarterState,
  allStarters,
} from "./state";
import { getStatRange } from "~/types/statRange";
import { Gen4GameVersion } from "../gen4types";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { chunkIvs } from "~/utils/chunkIvs";
import { UndefinedToNull } from "~/types";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Translations } from "~/translations";

type Result = FlattenIvs<
  SearchStatic4Method1State & {
    key: string;
    second: number;
    seed: number;
    delay: number;
  }
>;

type SelectButtonProps = {
  target: Result;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [, setState] = useStarterState();
  return (
    <Button
      trackerId="select_gen4_starter"
      onClick={() => {
        setState((prev) => ({ ...prev, target }));
        setCurrentStep((prev) => prev + 1);
      }}
    >
      Select
    </Button>
  );
};

const Validator = z
  .object({
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    year: z.number().int().min(2000).max(2100),
    species: z.enum(allStarters),
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
    platinum_target_advance: z.number().int().min(0),
    force_second: z.number().int().min(0).max(59).nullable(),
  })
  .merge(pkmFilterSchema);

export type FormState = z.infer<typeof Validator>;

const dpptInitialValues: FormState = {
  tid: 0,
  sid: 0,
  year: 2000,
  species: "Turtwig",
  min_delay: 600,
  max_delay: 1000,
  platinum_target_advance: 4,
  force_second: null,
  ...getPkmFilterInitialValues(),
};

const hgssInitialValues: FormState = {
  ...dpptInitialValues,
  species: "Chikorita",
};

const getStarterAdvance = ({
  species,
  game,
  platinum_target_advance,
}: {
  species: Gen4Starter;
  game: Gen4GameVersion;
  platinum_target_advance: number;
}): number => {
  return match({ species, game })
    .with({ game: "Platinum" }, () => platinum_target_advance)
    .with({ game: "Diamond" }, () => 0)
    .with({ game: "Pearl" }, () => 0)
    .with({ species: "Chikorita" }, () => 0)
    .with({ species: "Cyndaquil" }, () => 4)
    .with({ species: "Totodile" }, () => 8)
    .otherwise(() => 0);
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Select"],
    dataIndex: "key",
    render: (_, target) => <SelectButton target={target} />,
  },
  {
    title: t["Shiny"],
    dataIndex: "shiny",
    render: (shiny: boolean) => (shiny ? "Yes" : "No"),
  },
  { title: t["Nature"], dataIndex: "nature" },
  { title: t["Ability"], dataIndex: "ability" },
  { title: t["Gender"], dataIndex: "gender" },
  ...getIvColumns(t),
  {
    title: t["PID"],
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: t["Delay"], dataIndex: "delay" },
  {
    title: t["Second"],
    dataIndex: "second",
  },
  {
    title: t["Seed"],
    dataIndex: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).padStart(8, "0").toUpperCase(),
  },
];

const getFields = (game: Gen4GameVersion, t: Translations): Field[] => {
  const starters = match(game)
    .with("Diamond", "Pearl", "Platinum", () => dpptStarters)
    .with("HeartGold", "SoulSilver", () => hgssStarters)
    .exhaustive();
  return [
    {
      label: t["TID"],
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: t["SID"],
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: t["Year"],
      input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
    },
    {
      label: t["Min Delay"],
      input: (
        <FormikNumberInput<FormState> name="min_delay" numType="decimal" />
      ),
    },
    {
      label: t["Max Delay"],
      input: (
        <FormikNumberInput<FormState> name="max_delay" numType="decimal" />
      ),
    },
    {
      // Only Platinum has a variable advance
      hide: game !== "Platinum",
      label: t["Target Advance"],
      input: (
        <FormikNumberInput<FormState>
          name="platinum_target_advance"
          numType="decimal"
        />
      ),
    },
    {
      label: t["Species"],
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(starters)}
        />
      ),
    },
    ...getPkmFilterFields({}, t),
    {
      label: t["Force Second"],
      input: (
        <FormikNumberInput<FormState> name="force_second" numType="decimal" />
      ),
    },
  ];
};

const mapResult = (res: SearchStatic4Method1State): Result => {
  return {
    ...flattenIvs(res),
    key: `${res.seed_time.seed}-${res.pid}`,
    second: res.seed_time.datetime.second,
    seed: res.seed_time.seed,
    delay: res.seed_time.delay,
  };
};

export const PickStarter4 = () => {
  const t = useActiveRouteTranslations();
  const [state, setState] = useStarterState();
  const {
    run: searchStarterSeeds,
    data: results,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_static4_method1_seeds, {
    map: mapResult,
  });

  const game = state.game;

  const onSubmit = React.useCallback(
    async (opts: FormState) => {
      const minMaxStats = await getStatRange(opts.species, [5, 6]);
      setState((prev) => ({ ...prev, species: opts.species, minMaxStats }));
      const advance = getStarterAdvance({
        game,
        species: opts.species,
        platinum_target_advance: opts.platinum_target_advance,
      });
      const baseOpts: UndefinedToNull<SearchStatic4Method1Opts> = {
        ...opts,
        min_advance: advance,
        max_advance: advance,
        force_second: opts.force_second,
        filter: pkmFilterFieldsToRustInput(opts),
      };
      const chunkedIvs = chunkIvs(opts.filter_min_ivs, opts.filter_max_ivs);
      const searchOpts = chunkedIvs.map(([minIvs, maxIvs]) => ({
        ...baseOpts,
        filter: {
          ...baseOpts.filter,
          min_ivs: minIvs,
          max_ivs: maxIvs,
        },
      }));
      await searchStarterSeeds(searchOpts);
    },
    [game, setState, searchStarterSeeds],
  );

  const { fields, columns } = React.useMemo(
    () => ({
      fields: getFields(game, t),
      columns: getColumns(t),
    }),
    [game, t],
  );
  const initialValues = match(game)
    .with("Diamond", "Pearl", "Platinum", () => dpptInitialValues)
    .with("HeartGold", "SoulSilver", () => hgssInitialValues)
    .exhaustive();

  return (
    <RngToolForm<FormState, Result>
      fields={fields}
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="key"
      submitTrackerId="search_gen4_starters"
      allowCancel
      cancelTrackerId="cancel_gen4_starters"
      submitButtonLabel={t["Generate"]}
      cancelButtonLabel={t["Cancel"]}
      onCancel={cancel}
    />
  );
};
