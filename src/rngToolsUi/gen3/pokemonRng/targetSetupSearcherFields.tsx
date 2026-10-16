import type { ShinyFilter } from "~/rngTools";
import { Alert } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSwitchField,
  FormSummary,
  FrameBeforePaintingField,
} from "~/components/form";
import { match } from "ts-pattern";
import {
  minAdvsAfterPaintingLabel,
  minFramesBeforePaintingLabel,
  usingPaintingReseedingLabel,
} from "./labels";
import { FormState as WildFormState } from "../wild/wild3TargetSetupSearcher";
import { FormState as StaticFormState } from "../static/static3TargetSetupSearcher";
import { Static3Game } from "../static/constants.tsx";

type FormState = WildFormState | StaticFormState;

type PaintingSetupFilterFieldsProps = {
  game: Static3Game;
  usingPaintingReseeding: boolean;
  letSearcherFindPaintingSeed: boolean;
  usingDeadBattery: boolean;
  requireAceForPaintingReseeding: boolean;
  recommendedMinAdvances: number | null;
  initial_advances: number;
};

export const PaintingSetupFilterFields = ({
  game,
  usingPaintingReseeding,
  letSearcherFindPaintingSeed,
  usingDeadBattery,
  requireAceForPaintingReseeding,
  recommendedMinAdvances,
  initial_advances,
}: PaintingSetupFilterFieldsProps) => {
  const showInitialSeed = match(game)
    .with("emerald", () => false)
    .with("rs", () => !usingPaintingReseeding && !usingDeadBattery)
    .with("frlg", () => true)
    .exhaustive();

  return (
    <>
      {game === "emerald" && (
        <FormSwitchField<FormState>
          name="usingPaintingReseeding"
          {...usingPaintingReseedingLabel()}
        >
          {requireAceForPaintingReseeding && (
            <Alert
              showIcon
              type="warning"
              title="To use Painting Reseeding for this Pokémon, you must beat the game to access the Battle Frontier, then use Arbitrary code execution (ACE) to respawn this encounter."
            />
          )}
          <FormSwitchField<FormState>
            name="letSearcherFindPaintingSeed"
            label="Let searcher find painting seed?"
          />
          {!letSearcherFindPaintingSeed && (
            <>
              <FrameBeforePaintingField<FormState>
                name="initial_seed"
                label="Frame before painting (Painting seed)"
              />
              <FormNumberField<FormState>
                name="max_advances"
                label="Max advances after painting"
                numType="decimal"
              />
            </>
          )}
          <FormSwitchField<FormState>
            name="showAdvancedPaintingSettings"
            label="Show advanced painting settings?"
          >
            {letSearcherFindPaintingSeed && (
              <FormNumberField<FormState>
                name="min_frame_before_painting"
                numType="decimal"
                {...minFramesBeforePaintingLabel()}
              />
            )}
            <FormNumberField<FormState>
              name="min_adv_after_painting"
              numType="decimal"
              {...minAdvsAfterPaintingLabel()}
            />
          </FormSwitchField>
        </FormSwitchField>
      )}
      {game === "rs" && !usingPaintingReseeding && (
        <FormSwitchField<FormState>
          name="usingDeadBattery"
          label="Dead Battery?"
        />
      )}
      {showInitialSeed && (
        <FormNumberField<FormState>
          name="initial_seed"
          label="Initial seed"
          numType="hex"
        />
      )}
      {!usingPaintingReseeding && (
        <FormNumberField<FormState>
          name="initial_advances"
          label="Min advances"
          tooltip={{
            title: "Min advances",
            description:
              "To ensure there is enough time between booting the game and triggering the encounter.",
          }}
          numType="decimal"
        />
      )}
      {!usingPaintingReseeding &&
        recommendedMinAdvances != null &&
        initial_advances < recommendedMinAdvances && (
          <Alert
            showIcon
            type="warning"
            title={`At least ${recommendedMinAdvances} advances is recommended to have enough time to trigger this encounter.`}
          />
        )}
      <FormNumberField<FormState>
        name="max_result_count"
        label="Max result count"
        numType="decimal"
      />
    </>
  );
};

const tidSidNotApplicableTooltip = (title: string) => ({
  title,
  description:
    "The only impact of TID/SID is shininess and the target Pokemon is not shiny.",
});

type TidSidSetupFilterFieldsProps = {
  game: Static3Game;
  filter_shiny: ShinyFilter;
  usingAceForSid: boolean;
};

export const TidSidSetupFilterFields = ({
  game,
  filter_shiny,
  usingAceForSid,
}: TidSidSetupFilterFieldsProps) => {
  if (filter_shiny === "Any") {
    return (
      <FormSummary
        rows={[
          {
            label: "TID",
            value: "N/A",
            tooltip: tidSidNotApplicableTooltip("TID"),
          },
          {
            label: "SID",
            value: "N/A",
            tooltip: tidSidNotApplicableTooltip("SID"),
            show: !usingAceForSid,
          },
        ]}
      />
    );
  }

  const tidField = (
    <FormNumberField<FormState> name="tid" label="TID" numType="decimal" />
  );

  return (
    <>
      {game === "emerald" && (
        <FormSwitchField<FormState>
          name="usingAceForSid"
          label="Using ACE to change SID?"
          tooltip={{
            title: "Using ACE to change SID?",
            description:
              "Whether to use Arbitrary Code Execution glitch to change your SID so the target Pokémon is shiny.",
          }}
        />
      )}
      {usingAceForSid ? (
        tidField
      ) : (
        <FieldRow>
          {tidField}
          <FormNumberField<FormState>
            name="sid"
            label="SID"
            numType="decimal"
          />
        </FieldRow>
      )}
    </>
  );
};
