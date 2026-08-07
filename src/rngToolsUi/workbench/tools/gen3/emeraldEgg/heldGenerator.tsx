import { uniqueId, sortBy } from "lodash-es";
import {
  FormikSwitch,
  FormikSelect,
  FormikNumberInput,
  NumberInput,
  MinMaxContainer,
  ResultColumn,
} from "~/components";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import { z } from "zod";
import {
  pkmFilterSchema,
  getPkmFilterIvFields,
  getPkmFilterInitialValues,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { useAtom } from "jotai";
import { useWatch } from "~/hooks/form";
import { getGen3SpeciesOptions, species } from "~/types/species";
import {
  compatability,
  getCompatabilityOptions,
} from "~/rngToolsUi/gen3/retailEmeraldEgg/constants";
import { Gen3HeldEgg, multiWorkerRngTools, Egg3HeldOptions } from "~/rngTools";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { chunkRange } from "~/utils/chunkRange";
import { useHydrate } from "~/hooks/useHydrate";
import {
  findProfileOrDefault,
  gen3ProfilesAtom,
} from "~/rngToolsUi/workbench/tools/profile/gen3/state";
import { FormikProfileSelect } from "~/rngToolsUi/workbench/components/formikProfileSelect";
import { usePokeNavTranslations } from "~/translations";
import { pokeNavTrainers } from "~/rngToolsUi/gen3/retailEmeraldEgg/state";
import { toOptions } from "~/utils/options";

const CHUNK = 200;
const LIMIT = CHUNK * 5;

const Validator = z
  .object({
    profile_id: z.string().min(1, "Profile is required"),
    min_advances: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    min_redraws: z.number().int().min(0),
    max_redraws: z.number().int().min(0),
    calibration: z.number().int().min(0),
    offset: z.number().int().min(0),
    has_roamer: z.boolean(),
    has_lightning_rod: z.boolean(),
    compatability: z.enum(compatability),
    egg_species: z.enum(species),
    filter_match_call: z.enum(pokeNavTrainers).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;
type Result = Gen3HeldEgg & { id: string };

const initialValues: FormState = {
  profile_id: "",
  min_advances: 0,
  max_advances: 10000,
  min_redraws: 0,
  max_redraws: 20,
  calibration: 19,
  offset: 0,
  has_roamer: false,
  has_lightning_rod: false,
  compatability: "GetAlong",
  egg_species: "Bulbasaur",
  filter_level: 5,
  filter_match_call: null,
  ...getPkmFilterInitialValues(),
};

const FilterFields = () => {
  const translatedTrainers = usePokeNavTranslations("en");
  const { egg_species } = useWatch({
    validationSchema: Validator,
    names: { egg_species: true },
  });
  const filterFields = getPkmFilterIvFields({
    displayIvs: false,
    displayHiddenPower: false,
    species: egg_species ?? undefined,
  });

  const matchCallOptions = sortBy(
    toOptions(
      pokeNavTrainers,
      (trainer) => translatedTrainers.withoutTitle[trainer],
    ),
    (opt) => opt.label,
  );

  const fields: Field[] = [
    ...filterFields,
    {
      label: "Match call",
      children: (
        <FormikSelect<FormState, "filter_match_call">
          name="filter_match_call"
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
      label: "Egg species",
      children: (
        <FormikSelect<FormState, "egg_species">
          name="egg_species"
          options={getGen3SpeciesOptions().byName}
        />
      ),
    },
    {
      label: "Compatability",
      children: (
        <FormikSelect<FormState, "compatability">
          name="compatability"
          options={getCompatabilityOptions(null)}
        />
      ),
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
      label: "Redraws",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="min_redraws"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="max_redraws"
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
      label: "Offset",
      children: (
        <FormikNumberInput<FormState> name="offset" numType="decimal" />
      ),
    },
    {
      label: "Limit",
      children: <NumberInput disabled numType="decimal" value={LIMIT} />,
    },
  ];
  return <Descriptions bordered title="RNG Info" items={fields} column={1} />;
};

const mapResult = (res: Gen3HeldEgg): Result => {
  return {
    ...res,
    id: uniqueId(),
  };
};

export const EmeraldEggHeldGenerator = () => {
  const [lockedProfiles] = useAtom(gen3ProfilesAtom);
  const { client: profiles } = useHydrate(lockedProfiles);
  const translatedTrainers = usePokeNavTranslations("en");

  const {
    run: generateEmeraldEgg,
    data: results,
    loading,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.emerald_egg_held_states, {
    limit: LIMIT,
    map: mapResult,
    sortBy: [(res) => res.advance, (res) => res.redraws],
  });

  const onSubmit = async (opts: FormState) => {
    const { tid, sid, pokeNavTrainers } = findProfileOrDefault({
      profiles,
      id: opts.profile_id,
    });

    const baseOpts: Omit<Egg3HeldOptions, "initial_advances" | "max_advances"> =
      {
        // Defaults
        lua_adjustment: false,
        filter_impossible_to_hit: false,

        // User provided
        has_roamer: opts.has_roamer,
        has_lightning_rod: opts.has_lightning_rod,
        calibration: opts.calibration,
        compatability: opts.compatability,
        egg_species: opts.egg_species,
        delay: opts.offset,
        min_redraw: opts.min_redraws,
        max_redraw: opts.max_redraws,
        filters: {
          gender: opts.filter_gender ?? undefined,
          nature: opts.filter_nature,
          shiny: opts.filter_shiny,
          match_call: opts.filter_match_call ?? undefined,
        },

        // Profile
        tid,
        sid,
        registered_trainers: pokeNavTrainers,
      };
    const chunked = chunkRange([opts.min_advances, opts.max_advances], CHUNK);
    const searchOpts = chunked.map(([min_advances, max_advances]) => {
      const initial_advances = min_advances + opts.calibration;
      return {
        ...baseOpts,
        initial_advances,
        max_advances: Math.max(0, max_advances - initial_advances),
      };
    });

    await generateEmeraldEgg(searchOpts);
  };

  const columns: ResultColumn<Result>[] = [
    {
      title: "Advance",
      dataIndex: "advance",
    },
    {
      title: "Redraws",
      dataIndex: "redraws",
    },
    {
      title: "Shiny",
      dataIndex: "shiny",
      render: (shiny) => (shiny ? "Yes" : "No"),
    },
    {
      title: "Match call",
      dataIndex: "match_call",
      render: (match_call) => translatedTrainers.withoutTitle[match_call],
    },
    {
      title: "PID",
      dataIndex: "pid",
      monospace: true,
      render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
    },
    { title: "Gender", dataIndex: "gender" },
    { title: "Nature", dataIndex: "nature" },
    {
      title: "Ability",
      dataIndex: "ability",
      render: (ability) => (ability === 1 ? "First" : "Second"),
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
