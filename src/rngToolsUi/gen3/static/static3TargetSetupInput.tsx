import {
  Static3Method,
} from "~/rngTools";
import { lcrng_distance } from "~/utils/lcrng";
import {
  Field,
  FormikNumberInput,
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
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import { usingPaintingReseedingLabel } from "./wild3Labels";
import { Pokeblock, pokeblockSchema } from "~/types/pokeblock";
import { formatLargeInteger } from "~/utils/formatLargeInteger";

const emeraldStaticGameData = getStatic3EmeraldGameData();

const Validator = z.object({
  species: z.enum(emeraldStaticGameData.species),
  map: z.string(),
  usingPaintingReseeding: z.boolean(),
  targetFrameBeforePainting: z.number().min(1).max(0xffff),
  targetMethod: z.enum(static3Methods),
  targetAdvance: z.number().int().min(0).max(0xffffffff),
});

type Props = {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

export type TargetSetup = {
  species: Species;
  // encounterContext is required to distinguish Roaming Lati@s and Southern Island Lati@s. They don't have the same level.
  encounterContext: string;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Static3Method;
};

export type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
    species: "Mudkip",
    encounterContext: "",
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
    species: values.species,
    encounterContext: values.encounterContext,
    targetPaintingAdvs: {
      before: values.usingPaintingReseeding
        ? values.targetFrameBeforePainting
        : 0,
      after: values.targetAdvance,
    },
    targetMethod: values.targetMethod,
  };
};

const getFields = ({
  species,
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: {
  mapId: string;
  action: Wild3Action;
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
}): Field[] => {
  const {
    encounterContexts
  } = getPossibleValuesForSpecies(species);

  const fields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="map"
          options={toOptions(emeraldStaticGameData.species)}
        />
      ),
    },
  ];

  fields.push(
    {
      label: "Encounter",
      input: (
        <FormikSelect<FormState, "encounterContext">
          name="encounterContext"
          options={toOptions(encounterContexts, formatEncounterContext)}
        />
      ),
      show:encounterContexts.length > 1,
    },
    {
      label: "Encounter",
      input: formatEncounterContext(encounterContexts[0]), //NO_PROD
      show:encounterContexts.length > 0,
    },
    {
      ...usingPaintingReseedingLabel(),
      input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
    },
    {
      label: "Target frame before painting (Painting seed)",
      input: (
        <FormikEmeraldFrameBeforePaintingInput<FormState> name="targetFrameBeforePainting" />
      ),
      indent: 1,
      show: usingPaintingReseeding,
    },
    {
      label: "Target Method",
      input: (
        <FormikSelect<FormState, "targetMethod">
          name="targetMethod"
          options={toOptions(static3Methods)}
        />
      ),
    },
    {
      label: usingPaintingReseeding
        ? "Target advances after painting"
        : "Target advances",
      input: (
        <FormikNumberInput<FormState> name="targetAdvance" numType="decimal" />
      ),
    },
    {
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
