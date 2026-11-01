import {
  Gen3Method,
  Wild3Action,
  Wild3FeebasState,
  Wild3RoamerState,
  Wild3MassOutbreakState,
  Gen3Lead,
} from "~/rngTools";
import {
  FormSection,
  FormSelectField,
  FormSwitchField,
  PokeblockField,
  SwitchGroup,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { toOptions } from "~/utils/options";
import { useFormContext, useWatch_UNSAFE } from "~/hooks/form";
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
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { getPossibleValuesForMap } from "./dataUtils";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { Pokeblock, pokeblockSchema } from "~/types/pokeblock";
import { PaintingReseedingFields } from "../pokemonRng/targetSetupInput";
import { lcrng_distance } from "~/utils/lcrng";
import { FeebasTilesField } from "./feebasMap";
import {
  normalizeWild3AudioInfluences,
  type Wild3AudioInfluences,
} from "./wild3AudioInfluences";

const emeraldWildGameData = getWild3EmeraldGameData();

// Wild5 is not supported. To support it, we would need to be able to indicate the number of PID rerolls when the vblank occured.
// Wild3 is currently bugged.
const supportedGen3Methods = ["Wild1", "Wild2", "Wild4"] as Gen3Method[];

const Validator = z
  .object({
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
    feebasCycles: z.array(z.number().int().min(0).max(0xffffffff)),
  })
  .refine(
    ({ feebasState, feebasCycles }) =>
      feebasState !== "OnFeebasTile" || feebasCycles.length > 0,
    {
      message: "A feebas fishing spot must be defined.",
      path: ["feebasCycles"],
    },
  );

type Props = {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

export type TargetSetup = Wild3AudioInfluences & {
  map: string;
  action: Wild3Action;
  feebasState: Wild3FeebasState;
  feebasCycles: number;
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
    feebasCycles: [],
  };
};

const convertFormStateValuesToTargetSetup = (
  values: FormState,
): TargetSetup => {
  return {
    map: values.map,
    ...normalizeWild3AudioInfluences(values.map, values.action),
    action: values.action,
    feebasState: values.feebasState,
    feebasCycles: values.feebasCycles[0] ?? 0,
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

type FieldsProps = {
  mapId: string;
  action: Wild3Action;
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
};

const Fields = ({
  mapId,
  action,
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: FieldsProps) => {
  const {
    actions,
    feebas_states,
    roamer_states,
    mass_outbreak_states,
    canUsePokeblock,
  } = getPossibleValuesForMap(mapId, action);

  const mapField = (
    <FormSelectField<FormState>
      name="map"
      label="Map"
      options={toOptions(emeraldWildGameData.maps, formatMapName)}
    />
  );

  if (actions.length === 0) {
    return <FormSection>{mapField}</FormSection>;
  }

  return (
    <FormSection>
      {mapField}
      <FormSelectField<FormState>
        name="action"
        label="Player action"
        options={toOptions(actions, formatActionName)}
      />
      {(action === "RockSmash" || canUsePokeblock) && (
        <SwitchGroup>
          {action === "RockSmash" && (
            <FormSwitchField<FormState>
              name="requiresWhiteFlute"
              label="Using White Flute?"
            />
          )}
          {canUsePokeblock && (
            <PokeblockField<FormState>
              name="safariPokeblock"
              label="Using Pokéblock?"
            />
          )}
        </SwitchGroup>
      )}
      <FormSelectField<FormState>
        name="leadIdx"
        label="Lead"
        // Limitation: value must be a primitive, so we use the index instead of Gen3Lead.
        options={leadsLabels}
      />
      <PaintingReseedingFields
        usingPaintingReseeding={usingPaintingReseeding}
        equivalentInitialAdvs={equivalentInitialAdvs}
      />
      <FormSelectField<FormState>
        name="targetMethod"
        label="Target method"
        options={toOptions(supportedGen3Methods)}
      />
      {feebas_states.length > 1 && (
        <>
          <FormSelectField<FormState>
            name="feebasState"
            label="Feebas state"
            options={toOptions(feebas_states, formatFeebasStateName)}
          />
          <FeebasTilesField<FormState>
            name="feebasCycles"
            label="Feebas fishing spot"
            canOnlySelectOne
          />
        </>
      )}
      {roamer_states.length > 1 && (
        <FormSelectField<FormState>
          name="roamerState"
          label="Roamer state"
          options={toOptions(roamer_states, formatRoamerStateName)}
        />
      )}
      {mass_outbreak_states.length > 1 && (
        <FormSelectField<FormState>
          name="massOutbreakState"
          label="Mass outbreak state"
          options={toOptions(mass_outbreak_states, formatMassOutbreakStateName)}
        />
      )}
    </FormSection>
  );
};

export const Wild3TargetSetupInputFields = ({
  setTargetSetup,
}: {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
}) => {
  const { setFieldValue } = useFormContext<FormState>();
  const map = useWatch_UNSAFE<FormState, "map">({ name: "map" });
  const action = useWatch_UNSAFE<FormState, "action">({ name: "action" });
  const leadIdx = useWatch_UNSAFE<FormState, "leadIdx">({ name: "leadIdx" });
  const targetMethod = useWatch_UNSAFE<FormState, "targetMethod">({
    name: "targetMethod",
  });
  const feebasState = useWatch_UNSAFE<FormState, "feebasState">({
    name: "feebasState",
  });
  const feebasCycles = useWatch_UNSAFE<FormState, "feebasCycles">({
    name: "feebasCycles",
  });
  const massOutbreakState = useWatch_UNSAFE<FormState, "massOutbreakState">({
    name: "massOutbreakState",
  });
  const roamerState = useWatch_UNSAFE<FormState, "roamerState">({
    name: "roamerState",
  });
  const usingPaintingReseeding = useWatch_UNSAFE<
    FormState,
    "usingPaintingReseeding"
  >({
    name: "usingPaintingReseeding",
  });
  const targetFrameBeforePainting = useWatch_UNSAFE<
    FormState,
    "targetFrameBeforePainting"
  >({
    name: "targetFrameBeforePainting",
  });
  const targetAdvance = useWatch_UNSAFE<FormState, "targetAdvance">({
    name: "targetAdvance",
  });

  const equivalentInitialAdvs =
    (lcrng_distance(0, targetFrameBeforePainting) + targetAdvance) % 2 ** 32;

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
    feebasCycles,
  ]);

  return (
    <Fields
      mapId={map}
      action={action}
      usingPaintingReseeding={usingPaintingReseeding}
      equivalentInitialAdvs={equivalentInitialAdvs}
    />
  );
};

export const Wild3TargetSetupInput = ({ setTargetSetup }: Props) => {
  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    const targetSetup = convertFormStateValuesToTargetSetup(values);
    const { content } = await calculateTargetSetupResult(targetSetup, null);
    setTargetSetup(content == null ? null : targetSetup);
  };

  const initialValues = getInitialValues();

  return (
    <ToolForm<FormState, never>
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="wild3_calib_target"
      rowKey="uid"
      submitButtonLabel="Calculate Target"
    >
      <Wild3TargetSetupInputFields setTargetSetup={setTargetSetup} />
    </ToolForm>
  );
};
