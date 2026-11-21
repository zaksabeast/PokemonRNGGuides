import {
  Gen3Method,
  Wild3Action,
  Wild3FeebasState,
  Wild3RoamerState,
  Wild3MassOutbreakState,
  Gen3Lead,
  Wild3Weather,
} from "~/rngTools";
import {
  FieldFrame,
  FormSection,
  FormSelectField,
  FormSwitchField,
  PokeblockField,
  SwitchGroup,
  ToolForm,
  useFieldIds,
  type ToolFormSubmit,
} from "~/components/form";
import { toOptions } from "~/utils/options";
import { useField, useFormContext, useWatch_UNSAFE } from "~/hooks/form";
import React from "react";
import { z } from "zod";
import styled from "@emotion/styled";

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
import { getDefaultWild3AudioInfluences } from "./wild3AudioInfluences";
import { getAllFeebasCycleDistributions } from "./data/initial_cycle/feebas_cycle_info";
import { formatProbability } from "~/utils/formatProbability";

const emeraldWildGameData = getWild3EmeraldGameData();
const feebasWeathers = [
  "Sunny",
  "Rain",
  "Thunderstorm",
] as const satisfies readonly Wild3Weather[];
const feebasVblankCounts = [0, 1, 2, 3, 4, 5] as const;

const VblankCountRows = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const VblankCountHeader = styled.div(({ theme }) => ({
  display: "none",
  [theme.mediaQueries.up("mobile")]: {
    display: "grid",
    gridTemplateColumns: "minmax(100px, 1fr) repeat(3, minmax(0, 1fr))",
    gap: 8,
    paddingInline: 12,
    color: theme.token.colorTextSecondary,
  },
}));

const VblankCountRow = styled.label<{ $selected: boolean }>(
  ({ theme, $selected }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 8,
    padding: 12,
    border: `1px solid ${theme.token.colorBorder}`,
    borderRadius: theme.shape.medium,
    backgroundColor: $selected ? theme.token.colorPrimaryBg : undefined,
    cursor: "pointer",
    [theme.mediaQueries.up("mobile")]: {
      gridTemplateColumns: "minmax(100px, 1fr) repeat(3, minmax(0, 1fr))",
      alignItems: "center",
    },
    ":hover": {
      backgroundColor: $selected
        ? theme.token.colorPrimaryBg
        : theme.token.colorStateLayerHover,
    },
  }),
);

const VblankCountChoice = styled.span(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  gridColumn: "1 / -1",
  color: theme.token.colorText,
  [theme.mediaQueries.up("mobile")]: {
    gridColumn: "auto",
  },
  input: {
    accentColor: theme.token.colorPrimary,
  },
}));

const VblankWeatherLabel = styled.span(({ theme }) => ({
  display: "block",
  color: theme.token.colorTextSecondary,
  [theme.mediaQueries.up("mobile")]: {
    display: "none",
  },
}));

const VblankProbability = styled.span({
  minWidth: 0,
});

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
    feebasVblankCount: z.number().int().min(0).max(5),
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
  setTargetSetup: (
    targetSetup: TargetSetup | null,
    feebasCycles?: number | null,
  ) => void;
};

export type TargetSetup = {
  map: string;
  action: Wild3Action;
  feebasState: Wild3FeebasState;
  feebasVblankCount: number | null;
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
    feebasVblankCount: 0,
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
    feebasVblankCount:
      values.feebasState === "OnFeebasTile" ? values.feebasVblankCount : null,
    targetMethod: values.targetMethod,
    requiresWhiteFlute:
      values.action === "RockSmash" && values.requiresWhiteFlute,
    safariPokeblock: values.safariPokeblock,
    aceSid: null,
  };
};

const FeebasVblankCountField = ({
  feebasCycle,
}: {
  feebasCycle: number | null;
}) => {
  const ids = useFieldIds();
  const [{ value, onBlur }, { error }, { setValue }] =
    useField<number>("feebasVblankCount");
  const distributions =
    feebasCycle == null
      ? []
      : getAllFeebasCycleDistributions(feebasCycle).filter(
          (distribution) => distribution.action === "OldRod",
        );
  const isSelectedCountAvailable = feebasVblankCounts.some(
    (count) => count === value,
  );
  const rows = feebasVblankCounts.map((count) => ({
    count,
    probabilities: feebasWeathers.map((weather) =>
      formatProbability(
        distributions.find(
          (distribution) =>
            distribution.weather === weather &&
            distribution.feebas_vblank_count === count,
        )?.feebas_vblank_count_probability ?? 0,
      ),
    ),
  }));

  React.useEffect(() => {
    if (!isSelectedCountAvailable) {
      setValue(feebasVblankCounts[0]);
    }
  }, [isSelectedCountAvailable, setValue]);

  return (
    <FieldFrame
      ids={ids}
      labelTarget="group"
      label="VBlank count during Feebas tile check"
      errorMessage={error}
    >
      {feebasCycle == null ? (
        <span>Select a Feebas fishing spot to see the likelihoods.</span>
      ) : (
        <VblankCountRows
          role="radiogroup"
          aria-labelledby={ids.labelId}
          aria-describedby={ids.helperId}
          aria-invalid={error != null}
          onBlur={onBlur}
        >
          <VblankCountHeader>
            <span>VBlanks</span>
            {feebasWeathers.map((weather) => (
              <span key={weather}>{weather}</span>
            ))}
          </VblankCountHeader>
          {rows.map(({ count, probabilities }) => (
            <VblankCountRow key={count} $selected={value === count}>
              <VblankCountChoice>
                <input
                  type="radio"
                  name={ids.inputId}
                  value={count}
                  checked={value === count}
                  aria-label={`${count} VBlanks. ${feebasWeathers.map((weather, index) => `${weather} ${probabilities[index]}`).join(", ")}`}
                  onChange={() => setValue(count)}
                />
                {count}
              </VblankCountChoice>
              {feebasWeathers.map((weather, index) => (
                <VblankProbability key={weather}>
                  <VblankWeatherLabel>{weather}</VblankWeatherLabel>
                  {probabilities[index]}
                </VblankProbability>
              ))}
            </VblankCountRow>
          ))}
        </VblankCountRows>
      )}
    </FieldFrame>
  );
};

type FieldsProps = {
  mapId: string;
  action: Wild3Action;
  feebasState: Wild3FeebasState;
  feebasCycles: number[];
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
};

const Fields = ({
  mapId,
  action,
  feebasState,
  feebasCycles,
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
          {feebasState === "OnFeebasTile" && (
            <FeebasVblankCountField feebasCycle={feebasCycles[0] ?? null} />
          )}
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
  const feebasVblankCount = useWatch_UNSAFE<FormState, "feebasVblankCount">({
    name: "feebasVblankCount",
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
    feebasVblankCount,
  ]);

  return (
    <Fields
      mapId={map}
      action={action}
      feebasState={feebasState}
      feebasCycles={feebasCycles}
      usingPaintingReseeding={usingPaintingReseeding}
      equivalentInitialAdvs={equivalentInitialAdvs}
    />
  );
};

export const Wild3TargetSetupInput = ({ setTargetSetup }: Props) => {
  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    const targetSetup = convertFormStateValuesToTargetSetup(values);
    const feebasCycles =
      values.feebasState === "OnFeebasTile"
        ? (values.feebasCycles[0] ?? null)
        : null;
    const { content } = await calculateTargetSetupResult(
      targetSetup,
      null,
      getDefaultWild3AudioInfluences(targetSetup.map, targetSetup.action),
      feebasCycles,
    );
    setTargetSetup(content == null ? null : targetSetup, feebasCycles);
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
