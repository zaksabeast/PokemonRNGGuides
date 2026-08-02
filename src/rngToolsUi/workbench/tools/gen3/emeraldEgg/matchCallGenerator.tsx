import { uniqueId, sortBy } from "lodash-es";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import { z } from "zod";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import {
  multiWorkerRngTools,
  NoEggMatchCall,
  NoEggMatchCallOpts,
} from "~/rngTools";
import { usePokeNavTranslations } from "~/translations";
import { useHydrate } from "~/hooks/useHydrate";
import {
  gen3ProfilesAtom,
  findProfileOrDefault,
} from "~/rngToolsUi/workbench/tools/profile/gen3/state";
import { pokeNavTrainers } from "~/rngToolsUi/gen3/retailEmeraldEgg/state";
import { useAtom } from "~/state/localStorage";
import { chunkRange } from "~/utils/chunkRange";
import { ResultColumn } from "~/components/resultTable";
import {
  MinMaxContainer,
  FormikSwitch,
  FormikSelect,
  FormikNumberInput,
  NumberInput,
} from "~/components";
import { FormikProfileSelect } from "~/rngToolsUi/workbench/components/formikProfileSelect";
import { toOptions } from "~/utils/options";

const LIMIT = 1000;

const Validator = z.object({
  profile_id: z.string().min(1, "Profile is required"),
  min_advances: z.number().int().min(0),
  max_advances: z.number().int().min(0),
  calibration: z.number().int().min(0),
  has_lightning_rod: z.boolean(),
  has_roamer: z.boolean(),
  filter_match_call: z.enum(pokeNavTrainers).array().nullable(),
  match_call_filter: z.enum(pokeNavTrainers).nullable(),
});

type FormState = z.infer<typeof Validator>;
type Result = NoEggMatchCall & { key: string };

const initialValues: FormState = {
  profile_id: "",
  min_advances: 0,
  max_advances: 10000,
  calibration: 19,
  has_lightning_rod: false,
  has_roamer: false,
  filter_match_call: null,
  match_call_filter: null,
};

const FilterFields = () => {
  const translatedTrainers = usePokeNavTranslations("en");
  const matchCallOptions = sortBy(
    toOptions(
      pokeNavTrainers,
      (trainer) => translatedTrainers.withoutTitle[trainer],
    ),
    (opt) => opt.label,
  );

  const fields: Field[] = [
    {
      label: "Match call",
      children: (
        <FormikSelect<FormState, "match_call_filter">
          name="match_call_filter"
          options={[{ label: "Any", value: null }, ...matchCallOptions]}
        />
      ),
    },
  ];

  return <Descriptions bordered title="Filters" items={fields} column={1} />;
};

const RngInfoFields = () => {
  const fields: Field[] = [
    {
      label: "Profile",
      children: (
        <FormikProfileSelect<FormState>
          name="profile_id"
          profileAtom={gen3ProfilesAtom}
        />
      ),
    },
    {
      label: "Has lightning rod",
      children: <FormikSwitch<FormState> name="has_lightning_rod" />,
    },
    {
      label: "Roamer is active",
      children: <FormikSwitch<FormState> name="has_roamer" />,
    },
    {
      label: "Advances",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="min_advances"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="max_advances"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "Calibration",
      children: (
        <FormikNumberInput<FormState> name="calibration" numType="decimal" />
      ),
    },
    {
      label: "Limit",
      children: <NumberInput disabled numType="decimal" value={LIMIT} />,
    },
  ];
  return <Descriptions bordered title="RNG Info" items={fields} column={1} />;
};

const mapResult = (res: NoEggMatchCall): Result => ({
  ...res,
  key: uniqueId(),
});

export const MatchCallGenerator = () => {
  const [lockedProfiles] = useAtom(gen3ProfilesAtom);
  const { client: profiles } = useHydrate(lockedProfiles);
  const translatedTrainers = usePokeNavTranslations("en");

  const {
    run: generateNoEggMatchCalls,
    data: results,
    loading,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.generate_no_egg_match_calls, {
    limit: LIMIT,
    map: mapResult,
    sortBy: [(res) => res.advance],
  });

  const onSubmit = async (opts: FormState) => {
    const { pokeNavTrainers } = findProfileOrDefault({
      profiles,
      id: opts.profile_id,
    });

    const baseOpts: Omit<
      NoEggMatchCallOpts,
      "initial_advances" | "max_advances"
    > = {
      seed: 0,
      calibration: opts.calibration,
      has_roamer: opts.has_roamer,
      has_lightning_rod: opts.has_lightning_rod,
      match_call_filter: opts.match_call_filter ?? undefined,
      registered_trainers: pokeNavTrainers,
    };

    const chunked = chunkRange([opts.min_advances, opts.max_advances], 1000);
    const searchOpts: NoEggMatchCallOpts[] = chunked.map(
      ([min_advances, max_advances]) => {
        const initial_advances = min_advances + opts.calibration;
        return {
          ...baseOpts,
          initial_advances,
          max_advances: Math.max(0, max_advances - initial_advances),
        };
      },
    );

    await generateNoEggMatchCalls(searchOpts);
  };

  const columns: ResultColumn<Result>[] = [
    {
      title: "Advance",
      dataIndex: "advance",
    },
    {
      title: "Match call",
      dataIndex: "match_call",
      render: (match_call) => translatedTrainers.withoutTitle[match_call],
    },
  ];

  return (
    <ToolLayout<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      loading={loading}
      results={results}
      progressPercent={progressPercent}
      columns={columns}
      onSubmit={onSubmit}
      cancel={cancel}
      slots={{
        filterFields: <FilterFields />,
        rngInfoFields: <RngInfoFields />,
      }}
    />
  );
};
