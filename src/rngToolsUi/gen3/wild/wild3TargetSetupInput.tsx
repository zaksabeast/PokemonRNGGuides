import {
  Gen3Method,
  Wild3Action,
  Wild3FeebasState,
  Wild3RoamerState,
  Wild3MassOutbreakState,
  Gen3Lead,
} from "~/rngTools";
import {
  Field,
  FormikSelect,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  FormikSwitch,
  FormikWild3Pokeblock,
} from "~/components";
import { toOptions } from "~/utils/options";
import { useFormContext } from "~/hooks/form";
import React from "react";
import { z } from "zod";

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
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { Pokeblock, pokeblockSchema } from "~/types/pokeblock";
import { getPaintingReseedingFields } from "../pokemonRng/targetSetupInput";
import { lcrng_distance } from "~/utils/lcrng";

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
  targetFrameBeforePainting: z.number().min(1).max(0xffff),
  targetMethod: z.enum(supportedGen3Methods),
  targetAdvance: z.number().int().min(0).max(0xffffffff),
  requiresWhiteFlute: z.boolean(),
  safariPokeblock: pokeblockSchema,
});

type Props = {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

export type TargetSetup = {
  map: string;
  action: Wild3Action;
  feebasState: Wild3FeebasState;
  roamerState: Wild3RoamerState;
  massOutbreakState: Wild3MassOutbreakState;
  lead: Gen3Lead;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Gen3Method;
  requiresWhiteFlute: boolean;
  safariPokeblock: Pokeblock | null;
  aceSid: number | null;
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
    targetFrameBeforePainting: 1,
    targetAdvance: 1000,
    targetMethod: "Wild1",
    requiresWhiteFlute: false,
    safariPokeblock: null,
  };
};

const convertFormStateValuesToTargetSetup = (
  values: FormState,
): TargetSetup => {
  return {
    map: values.map,
    action: values.action,
    feebasState: values.feebasState,
    roamerState: values.roamerState,
    massOutbreakState: values.massOutbreakState,
    lead: gen3Leads[values.leadIdx],
    targetPaintingAdvs: {
      before: values.usingPaintingReseeding
        ? values.targetFrameBeforePainting
        : 0,
      after: values.targetAdvance,
    },
    targetMethod: values.targetMethod,
    requiresWhiteFlute:
      values.action === "RockSmash" && values.requiresWhiteFlute,
    safariPokeblock: values.safariPokeblock,
    aceSid: null,
  };
};

const getFields = ({
  mapId,
  action,
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: {
  mapId: string;
  action: Wild3Action;
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
}): Field[] => {
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
      input: <FormikSwitch<FormState> name="requiresWhiteFlute" />,
      show: action === "RockSmash",
    },
    {
      label: "Using Pokéblock?",
      input: <FormikWild3Pokeblock<FormState> name="safariPokeblock" />,
      show: canUsePokeblock,
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
    ...getPaintingReseedingFields({
      usingPaintingReseeding,
      equivalentInitialAdvs,
    }),
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

export const Wild3TargetSetupInputFields = ({
  setTargetSetup,
}: {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
}) => {
  const { setFieldValue } = useFormContext<FormState>();
  const map = useWatch<FormState, "map">({ name: "map" });
  const action = useWatch<FormState, "action">({ name: "action" });
  const leadIdx = useWatch<FormState, "leadIdx">({ name: "leadIdx" });
  const targetMethod = useWatch<FormState, "targetMethod">({
    name: "targetMethod",
  });
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
  const targetFrameBeforePainting = useWatch<
    FormState,
    "targetFrameBeforePainting"
  >({
    name: "targetFrameBeforePainting",
  });
  const targetAdvance = useWatch<FormState, "targetAdvance">({
    name: "targetAdvance",
  });

  const equivalentInitialAdvs =
    lcrng_distance(0, targetFrameBeforePainting) + targetAdvance;

  const fields = getFields({
    mapId: map,
    action,
    usingPaintingReseeding,
    equivalentInitialAdvs,
  });

  React.useEffect(() => {
    setTargetSetup(null);
  }, [
    map,
    action,
    feebasState,
    massOutbreakState,
    roamerState,
    setFieldValue,
    setTargetSetup,
    leadIdx,
    targetMethod,
    targetAdvance,
    targetFrameBeforePainting,
    usingPaintingReseeding,
  ]);

  return <FormFieldTable fields={fields} />;
};

export const Wild3TargetSetupInput = ({ setTargetSetup }: Props) => {
  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const targetSetup = convertFormStateValuesToTargetSetup(values);
    const { content } = await calculateTargetSetupResult(targetSetup, null);
    setTargetSetup(content == null ? null : targetSetup);
  };

  const initialValues = getInitialValues();

  return (
    <RngToolForm<FormState, never>
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="wild3_calib_target"
      rowKey="uid"
      submitButtonLabel="Calculate Target"
    >
      <Wild3TargetSetupInputFields setTargetSetup={setTargetSetup} />
    </RngToolForm>
  );
};
