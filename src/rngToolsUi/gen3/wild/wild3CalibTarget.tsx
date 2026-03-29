import {
  rngTools,
  Gen3Method,
  Wild3GeneratorOptions,
  Wild3Action,
  Wild3GeneratorResult,
  Wild3EncounterGameData,
} from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  FormikSwitch,
  Link,
} from "~/components";
import { toOptions } from "~/utils/options";
import { useFormContext } from "~/hooks/form";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import React from "react";
import { z } from "zod";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import {
  formatMapName,
  formatActionName,
  wild3Actions,
  wild3FeebasStates,
  formatRoamerStateName,
  wild3RoamerStates,
  wild3MassOutbreakStates,
  formatMassOutbreakStateName,
  formatFeebasStateName,
  leadsLabels,
  gen3Leads,
} from "./utils";
import { useWatch } from "react-hook-form";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { getPossibleValuesForMap } from "./dataUtils";
import { nature_from_pid } from "~/types";
import { formatHex } from "~/utils/formatHex";
import {
  AVERAGE_LEAD_CYCLE_SPEED,
  LeadCycleSpeedLabel,
  LeadCycleSpeedSelector,
} from "./leadCycleSpeedSelector";
import { formatProbability } from "~/utils/formatProbability";

const emeraldWildGameData = getWild3EmeraldGameData();

// Wild5 is not supported. To support it, we would need to be able to indicate the number of PID rerolls when the vblank occured.
// Wild3 is currently bugged.
const supportedGen3Methods = ["Wild1", "Wild2", "Wild4"] as Gen3Method[];

const Validator = z.object({
  map: z.string(),
  feebasState: z.enum(wild3FeebasStates),
  roamerState: z.enum(wild3RoamerStates),
  massOutbreakState: z.enum(wild3MassOutbreakStates),
  action: z.enum(wild3Actions),
  // Limitation: value in Select must be a primitive, so we use the index instead of Gen3Lead.
  leadIdx: z
    .number()
    .min(0)
    .max(gen3Leads.length - 1),
  usingRngManipulatedLead: z.boolean(),
  usingPaintingReseeding: z.boolean(),
  isPaintingSeedConfirmed: z.boolean(),
  targetPaintingSeed: z.number().min(0).max(0xffffffff),

  targetMethod: z.enum(supportedGen3Methods),
  targetAdvance: z.number().int().min(0).max(0xffffffff),

  usingAverageLeadCycleSpeed: z.boolean(),
  leadCycleSpeed: z.number().int().min(0).max(900),
});

type Props = {
  setTargetSetup: (targetSetup: FormState | null) => void;
};

export type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
    map: "MAP_ROUTE101",
    action: "SweetScentLand",
    feebasState: "NotInMap",
    roamerState: "Inactive",
    massOutbreakState: "Inactive",
    leadIdx: 0,
    usingRngManipulatedLead: false,
    usingPaintingReseeding: false,
    isPaintingSeedConfirmed: false,
    targetPaintingSeed: 0,
    targetAdvance: 1000,
    targetMethod: "Wild1",
    usingAverageLeadCycleSpeed: true,
    leadCycleSpeed: AVERAGE_LEAD_CYCLE_SPEED,
  };
};

const getFields = (
  mapId: string,
  action: Wild3Action,
  usingPaintingReseeding: boolean,
  leadIdx: number,
  usingAverageLeadCycleSpeed: boolean,
): Field[] => {
  const { actions, feebas_states, roamer_states, mass_outbreak_states } =
    getPossibleValuesForMap(mapId, action);
  const fields: Field[] = [
    {
      label: "Map",
      input: (
        <FormikSelect<FormState, "map">
          name="map"
          options={toOptions(emeraldWildGameData.maps, formatMapName)}
        />
      ),
    },
  ];

  if (actions.length === 0) {
    return fields;
  }

  fields.push(
    {
      label: "Player action",
      input: (
        <FormikSelect<FormState, "action">
          name="action"
          options={toOptions(actions, formatActionName)}
        />
      ),
    },
    {
      label: "Lead",
      input: (
        <FormikSelect<FormState, "leadIdx">
          name="leadIdx"
          // Limitation: value must be a primitive, so we use the index instead of Gen3Lead.
          options={leadsLabels}
        />
      ),
    },
    {
      label: "Using lead with average cycle speed?",
      input: <FormikSwitch<FormState> name="usingAverageLeadCycleSpeed" />,
      show: gen3Leads[leadIdx] !== "Egg",
    },
    {
      label: <LeadCycleSpeedLabel />,
      key: "LeadCycleSpeedLabel",
      input: <LeadCycleSpeedSelector idealLeadCycleSpeed={null} />,
      show: gen3Leads[leadIdx] !== "Egg" && !usingAverageLeadCycleSpeed,
      indent: 1,
    },
    {
      label: (
        <>
          Using{" "}
          <Link href="/emerald-painting-rng/" newTab>
            Painting Reseeding
          </Link>
          ?
        </>
      ),
      key: "usingPaintingReseeding",
      input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
      show: false, // TODO: Support painting reseeding
    },
    {
      label: "Target painting seed",
      input: (
        <FormikNumberInput<FormState> name="targetPaintingSeed" numType="hex" />
      ),
      indent: 1,
      //show: usingPaintingReseeding,
      show: false, // TODO: Support painting reseeding
    },
    {
      label:
        "Battle video has been created after confirming that target painting seed was hit?",
      input: <FormikSwitch<FormState> name="isPaintingSeedConfirmed" />,
      indent: 1,
      //show: usingPaintingReseeding,
      show: false, // TODO: Support painting reseeding
    },
    {
      label: "Target Method",
      input: (
        <FormikSelect<FormState, "targetMethod">
          name="targetMethod"
          options={toOptions(supportedGen3Methods)}
        />
      ),
    },
    {
      label: usingPaintingReseeding
        ? "Advances after reseeding to hit target"
        : "Target advances",
      input: (
        <FormikNumberInput<FormState> name="targetAdvance" numType="decimal" />
      ),
    },
    {
      label: "Feebas state",
      input: (
        <FormikSelect<FormState, "feebasState">
          name="feebasState"
          options={toOptions(feebas_states, formatFeebasStateName)}
        />
      ),
      show: feebas_states.length > 1,
    },
    {
      label: "Roamer state",
      input: (
        <FormikSelect<FormState, "roamerState">
          name="roamerState"
          options={toOptions(roamer_states, formatRoamerStateName)}
        />
      ),
      show: roamer_states.length > 1,
    },
    {
      label: "Mass outbreak state",
      input: (
        <FormikSelect<FormState, "massOutbreakState">
          name="massOutbreakState"
          options={toOptions(mass_outbreak_states, formatMassOutbreakStateName)}
        />
      ),
      show: mass_outbreak_states.length > 1,
    },
  );
  return fields;
};

export const Wild3CalibTargetFields = () => {
  const { setFieldValue } = useFormContext<FormState>();
  const map = useWatch<FormState, "map">({ name: "map" });
  const action = useWatch<FormState, "action">({ name: "action" });
  const feebasState = useWatch<FormState, "feebasState">({
    name: "feebasState",
  });
  const massOutbreakState = useWatch<FormState, "massOutbreakState">({
    name: "massOutbreakState",
  });
  const roamerState = useWatch<FormState, "roamerState">({
    name: "roamerState",
  });
  const usingPaintingReseeding = useWatch<FormState, "usingPaintingReseeding">({
    name: "usingPaintingReseeding",
  });
  const leadIdx = useWatch<FormState, "leadIdx">({
    name: "leadIdx",
  });
  const usingAverageLeadCycleSpeed = useWatch<
    FormState,
    "usingAverageLeadCycleSpeed"
  >({
    name: "usingAverageLeadCycleSpeed",
  });

  const fields = getFields(
    map,
    action,
    usingPaintingReseeding,
    leadIdx,
    usingAverageLeadCycleSpeed,
  );

  React.useEffect(() => {
    const { actions, feebas_states, mass_outbreak_states, roamer_states } =
      getPossibleValuesForMap(map, action);
    if (actions.length > 0 && actions.includes(action) === false) {
      setFieldValue("action", actions[0]);
    }
    if (
      feebas_states.length > 0 &&
      feebas_states.includes(feebasState) === false
    ) {
      setFieldValue("feebasState", feebas_states[0]);
    }
    if (
      mass_outbreak_states.length > 0 &&
      mass_outbreak_states.includes(massOutbreakState) === false
    ) {
      setFieldValue("massOutbreakState", mass_outbreak_states[0]);
    }
    if (
      roamer_states.length > 0 &&
      roamer_states.includes(roamerState) === false
    ) {
      setFieldValue("roamerState", roamer_states[0]);
    }
  }, [map, action, feebasState, massOutbreakState, roamerState, setFieldValue]);

  return <FormFieldTable fields={fields} />;
};

const getProbabilityInfo = async (
  res: Wild3GeneratorResult,
  lead_cycle_speed: number,
) => {
  if (res.cycle_range == null) {
    return null;
  }

  const info = await rngTools.calculate_cycle_data(
    res.cycle_range,
    lead_cycle_speed,
  );

  const ideal_lead_spd = await rngTools.calculate_ideal_lead_pid_cycle_count(
    res.cycle_range,
  );

  const ideal_info = await rngTools.calculate_cycle_data(
    res.cycle_range,
    ideal_lead_spd,
  );

  const leadDesc =
    lead_cycle_speed === AVERAGE_LEAD_CYCLE_SPEED
      ? "with average lead cycle speed"
      : `with lead cycle speed ${lead_cycle_speed}`;

  const showIdealInfo =
    info.method_probability < 0.99 && lead_cycle_speed != ideal_lead_spd;

  return (
    <>
      <br />
      <div>
        {`${formatProbability(info.method_probability)} likelihood to hit
      method ${res.method} ${leadDesc}.`}
      </div>
      {showIdealInfo && (
        <div>
          Note: Ideal lead cycle speed to hit the target Pokémon is{" "}
          {ideal_lead_spd}. ({formatProbability(ideal_info.method_probability)}{" "}
          likelihood)
        </div>
      )}
    </>
  );
};

const resultToDisplayInfo = async (
  res: Wild3GeneratorResult,
  encounter: Wild3EncounterGameData,
  lead_cycle_speed: number,
) => {
  const { species } = encounter.species_data;

  const nature = nature_from_pid(res.pid);

  const stats = await rngTools.calculate_stats(
    species,
    res.lvl,
    nature,
    res.ivs,
    { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  );

  const gender = await rngTools.get_species_gender_from_pid(species, res.pid);
  const { ivs } = res;

  const probabilityInfo = await getProbabilityInfo(res, lead_cycle_speed);

  return (
    <>
      <div>
        {species}, Lvl {res.lvl}, {gender}, {nature}, HP {stats.hp}, ATK{" "}
        {stats.atk}, DEF {stats.def}, SPA {stats.spa}, SPD {stats.spd}, SPE{" "}
        {stats.spe}
      </div>
      <div>
        PID: {formatHex(res.pid)}, IVS: {ivs.hp}/{ivs.atk}/{ivs.def}/{ivs.spa}/
        {ivs.spd}/{ivs.spe}
      </div>
      {probabilityInfo}
    </>
  );
};

const getLeadCycleSpeed = (values: FormState) => {
  if (gen3Leads[values.leadIdx] === "Egg") {
    return 0;
  }

  return values.usingAverageLeadCycleSpeed
    ? AVERAGE_LEAD_CYCLE_SPEED
    : values.leadCycleSpeed;
};

export const Wild3CalibTarget = ({ setTargetSetup }: Props) => {
  const [targetComputed, setTargetComputed] =
    React.useState<React.ReactNode>(null);

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const targetPaintingSeed = values.usingPaintingReseeding
      ? values.targetPaintingSeed
      : 0;

    const lead_cycle_speed = getLeadCycleSpeed(values);

    const opts: Wild3GeneratorOptions = {
      tid: 0,
      sid: 0,
      map_idx: 0,
      action: values.action,
      methods: [values.targetMethod] as Gen3Method[],
      lead: gen3Leads[values.leadIdx],
      filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
      gen3_filter: gen3PkmFilterFieldsToRustInput(
        getGen3PkmFilterInitialValues(),
        null,
      ),
      consider_cycles: true,
      consider_rng_manipulated_lead_pid: true,
      generate_even_if_impossible: true,
      roamer_state: values.roamerState,
      mass_outbreak_state: values.massOutbreakState,
      feebas_state: values.feebasState,
      lead_cycle_speed,
    };

    const map_data = emeraldWildGameData.maps_data.find(
      (table) => table.map_id === values.map,
    );
    if (map_data == null) {
      setTargetSetup(null);
      return setTargetComputed(null);
    }

    const results = await rngTools.generate_gen3_wild_wasm(
      targetPaintingSeed,
      values.targetAdvance,
      opts,
      map_data,
    );

    if (results.length === 0) {
      setTargetSetup(null);
      return setTargetComputed(null);
    }

    const result = results[0];
    const encounter = await rngTools.get_encounter_for_wild3_map_game_data(
      map_data,
      values.action,
      result.encounter_idx,
    );
    if (encounter == null) {
      setTargetSetup(null);
      return setTargetComputed(null);
    }

    const info = await resultToDisplayInfo(result, encounter, lead_cycle_speed);
    setTargetComputed(info);
    setTargetSetup(values);
  };

  const initialValues = getInitialValues();

  const resultAsField =
    targetComputed == null ? null : (
      <FormFieldTable
        fields={[
          {
            label: "Target Pokémon",
            input: targetComputed,
          },
        ]}
      />
    );

  return (
    <>
      <RngToolForm<FormState, never>
        validationSchema={Validator}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_calib_target"
        rowKey="uid"
        submitButtonLabel="Calculate Target Pokémon"
      >
        <Wild3CalibTargetFields />
      </RngToolForm>
      {resultAsField}
    </>
  );
};
