import React from "react";
import {
  Field,
  FormFieldTable,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  FormikWild3Pokeblock,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import { useFormContext } from "~/hooks/form";
import { Wild3Action } from "~/rngTools";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { lcrng_distance } from "~/utils/lcrng";
import { toOptions } from "~/utils/options";
import { useWatch } from "react-hook-form";
import { z } from "zod";

import { getPossibleValuesForMap } from "./dataUtils";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import {
  AVERAGE_LEAD_CYCLE_SPEED,
  SLOWEST_LEAD_CYCLE_SPEED,
} from "./leadCycleSpeedSelector";
import { usingPaintingReseedingLabel } from "./wild3Labels";
import { FixedData, Wild3MethodDistribution } from "./wild3MethodDistribution";
import {
  formatActionName,
  formatFeebasStateName,
  formatMapName,
  formatMassOutbreakStateName,
  formatRoamerStateName,
  gen3Leads,
  leadsLabels,
  wild3Actions,
  wild3FeebasStates,
  wild3MassOutbreakStates,
  wild3RoamerStates,
} from "./utils";
import { gen3Methods } from "~/types";
import { pokeblockSchema } from "~/types/pokeblock";

const emeraldWildGameData = getWild3EmeraldGameData();

type Props = {
  permitEnablingDebugOptions: boolean;
};

const validationSchema = z.object({
  map: z.string(),
  action: z.enum(wild3Actions),
  advance: z.number().int().min(0).max(0xffffffff),
  tid: z.number().int().min(0).max(0xffff),
  sid: z.number().int().min(0).max(0xffff),
  // Limitation: value in Select must be a primitive, so we use the index instead of Gen3Lead.
  leadIdx: z
    .number()
    .min(0)
    .max(gen3Leads.length - 1),
  leadCycleSpeed: z.number().min(0).max(SLOWEST_LEAD_CYCLE_SPEED),
  usingWhiteFlute: z.boolean(),
  feebasState: z.enum(wild3FeebasStates),
  roamerState: z.enum(wild3RoamerStates),
  massOutbreakState: z.enum(wild3MassOutbreakStates),
  usingPaintingReseeding: z.boolean(),
  initial_seed: z.number().min(0).max(0xffffffff),
  hasPreselectedData: z.boolean(),
  wantedMethod: z.enum(gen3Methods).nullable(),
  wantedPID: z.number().min(0).max(0xffffffff).nullable(),
  idealLeadCycleSpeed: z
    .number()
    .min(0)
    .max(SLOWEST_LEAD_CYCLE_SPEED)
    .nullable(),
  safariPokeblock: pokeblockSchema,
});

type FormState = z.infer<typeof validationSchema>;

const getDefaultInitialValues = (leadCycleSpeed: number): FormState => {
  return {
    map: "MAP_ROUTE101",
    action: "SweetScentLand",
    tid: 0,
    sid: 0,
    advance: 0,
    leadIdx: 0,
    leadCycleSpeed,
    usingWhiteFlute: true,
    feebasState: "NotInMap",
    roamerState: "Inactive",
    massOutbreakState: "Inactive",
    usingPaintingReseeding: false,
    initial_seed: 0,
    hasPreselectedData: false,
    wantedMethod: "Wild1",
    wantedPID: null,
    idealLeadCycleSpeed: null,
    safariPokeblock: null,
  };
};

const formStateToFixedData = (values: FormState): FixedData => {
  return {
    targetSetup: {
      map: values.map,
      action: values.action,
      feebasState: values.feebasState,
      roamerState: values.roamerState,
      massOutbreakState: values.massOutbreakState,
      lead: gen3Leads[values.leadIdx],
      targetPaintingAdvs: {
        before: values.usingPaintingReseeding ? values.initial_seed : 0,
        after: values.advance,
      },
      targetMethod: values.wantedMethod ?? "Wild1",
      leadCycleSpeed: values.leadCycleSpeed,
      requiresWhiteFlute:
        values.action === "RockSmash" && values.usingWhiteFlute,
      safariPokeblock: values.safariPokeblock,
    },
    tid: values.tid,
    sid: values.sid,
    wantedPID: values.wantedPID,
    idealLeadCycleSpeed: values.idealLeadCycleSpeed,
    usingIdealLeadCycleSpeed: false,
    showTarget: false,
  };
};

const getStandaloneFields = (
  mapId: string,
  action: Wild3Action,
  usingPaintingReseeding: boolean,
  equivalentInitialAdvs: number,
): Field[] => {
  const {
    actions,
    feebas_states,
    roamer_states,
    mass_outbreak_states,
    canUsePokeblock,
  } = getPossibleValuesForMap(mapId, action);

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
      label: "Using White Flute?",
      input: <FormikSwitch<FormState> name="usingWhiteFlute" />,
      show: action === "RockSmash",
    },
    {
      label: "Using Pokéblock?",
      input: <FormikWild3Pokeblock<FormState> name="safariPokeblock" />,
      show: canUsePokeblock,
    },
    {
      label: "TID",
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: "SID",
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
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
  );

  fields.push({
    ...usingPaintingReseedingLabel(),
    input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
  });

  fields.push({
    label: "Frame before painting (Painting seed)",
    input: (
      <FormikEmeraldFrameBeforePaintingInput<FormState> name="initial_seed" />
    ),
    show: usingPaintingReseeding,
    indent: 1,
  });

  fields.push({
    label: usingPaintingReseeding ? "Advances after painting" : "Advances",
    input: <FormikNumberInput<FormState> name="advance" numType="decimal" />,
    indent: usingPaintingReseeding ? 1 : 0,
  });

  fields.push({
    label: "",
    key: "Equivalent to Advances",
    show: usingPaintingReseeding,
    input: (
      <>
        Equivalent to Advances = {formatLargeInteger(equivalentInitialAdvs)}{" "}
        without painting reseeding
      </>
    ),
    indent: 1,
  });

  if (feebas_states.length > 1) {
    fields.push({
      label: "Feebas state",
      input: (
        <FormikSelect<FormState, "feebasState">
          name="feebasState"
          options={toOptions(feebas_states, formatFeebasStateName)}
        />
      ),
    });
  }

  if (roamer_states.length > 1) {
    fields.push({
      label: "Roamer state",
      input: (
        <FormikSelect<FormState, "roamerState">
          name="roamerState"
          options={toOptions(roamer_states, formatRoamerStateName)}
        />
      ),
    });
  }

  if (mass_outbreak_states.length > 1) {
    fields.push({
      label: "Mass outbreak state",
      input: (
        <FormikSelect<FormState, "massOutbreakState">
          name="massOutbreakState"
          options={toOptions(mass_outbreak_states, formatMassOutbreakStateName)}
        />
      ),
    });
  }

  return fields;
};

export const Wild3MethodDistributionStandaloneFields = () => {
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
  const initial_seed = useWatch<FormState, "initial_seed">({
    name: "initial_seed",
  });
  const advance = useWatch<FormState, "advance">({
    name: "advance",
  });

  const [equivalentInitialAdvs, setEquivalentInitialAdvs] = React.useState(0);
  React.useEffect(() => {
    const val = lcrng_distance(0, initial_seed);
    setEquivalentInitialAdvs(val + advance);
  }, [initial_seed, advance]);

  const fields: Field[] = getStandaloneFields(
    map,
    action,
    usingPaintingReseeding,
    equivalentInitialAdvs,
  );

  React.useEffect(() => {
    const possVals = getPossibleValuesForMap(map, action);
    if (
      possVals.actions.length > 0 &&
      possVals.actions.includes(action) === false
    ) {
      setFieldValue("action", possVals.actions[0]);
    }
    if (
      possVals.feebas_states.length > 0 &&
      possVals.feebas_states.includes(feebasState) === false
    ) {
      setFieldValue("feebasState", possVals.feebas_states[0]);
    }
    if (
      possVals.mass_outbreak_states.length > 0 &&
      possVals.mass_outbreak_states.includes(massOutbreakState) === false
    ) {
      setFieldValue("massOutbreakState", possVals.mass_outbreak_states[0]);
    }
    if (
      possVals.roamer_states.length > 0 &&
      possVals.roamer_states.includes(roamerState) === false
    ) {
      setFieldValue("roamerState", possVals.roamer_states[0]);
    }
  }, [map, action, feebasState, massOutbreakState, roamerState, setFieldValue]);

  return <FormFieldTable fields={fields} />;
};

export const Wild3MethodDistributionStandalone = ({
  permitEnablingDebugOptions,
}: Props) => {
  const [fixedData, setFixedData] = React.useState<FixedData | null>(null);
  const initialValues = getDefaultInitialValues(AVERAGE_LEAD_CYCLE_SPEED);

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    setFixedData(formStateToFixedData(values));
  };

  return (
    <>
      <RngToolForm<FormState, never>
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_method_distribution_setup"
      >
        <Wild3MethodDistributionStandaloneFields />
      </RngToolForm>

      {fixedData != null && (
        <Wild3MethodDistribution
          fixedData={fixedData}
          permitEnablingDebugOptions={permitEnablingDebugOptions}
        />
      )}
    </>
  );
};
