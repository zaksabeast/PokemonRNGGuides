import {
  Alert,
  Button,
  Field,
  Flex,
  FormFieldTable,
  Typography,
} from "~/components";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { useAtom } from "jotai";
import { Tooltip } from "antd";
import {
  targetAdvanceAfterPaintingTitle,
  targetFrameBeforePaintingLabel,
} from "../pokemonRng/labels";
import { EmeraldPaintingReseeding } from "../paintingReseeding/paintingReseeding";
import { useCurrentStep } from "~/components/stepper/state";
import { Pokerus3Setup } from "./pokerus_emerald_select_setup";
import {
  battleVideoInfoAtom,
  selectedSetupAtom,
  convertTotalAdvToAdvRelativeToPaintingReseeding,
} from "./pokerus_emerald_vars";
import { Calibration } from "./pokerus_emerald_calibration";

const BATTLE_VIDEO_BUFFER = 5000; // enough time to trigger the battle and end the battle

const OptimalSetupInfo = ({ setup }: { setup: Pokerus3Setup }) => {
  const [, setSetup] = useAtom(selectedSetupAtom);
  const [, setBattleVideoInfo] = useAtom(battleVideoInfoAtom);
  const fields: Field[] = [];
  const needPickupLead = setup.gen_opts.pickup_pokemon_count === 6;
  const partyLead = needPickupLead
    ? setup.gen_opts.level_up === true
      ? "Linoone with no held items"
      : `Zigzagoon with no held items`
    : `Pokémon with Sweet Scent (ex: Oddish)`;
  const partyLeadSuffix =
    setup.gen_opts.level_up === true ? (
      <Typography.Text strong> about to level up</Typography.Text>
    ) : null;
  const partyLeadDesc = (
    <>
      Lead: {partyLead}
      {partyLeadSuffix}
    </>
  );
  const otherPickupCount =
    setup.gen_opts.pickup_pokemon_count - (needPickupLead ? 1 : 0);

  const partyInfo = (
    <Flex vertical>
      <div>{partyLeadDesc}</div>
      <div>
        Other: x{otherPickupCount} Zigzagoon Level 1-9 with no held items
      </div>
    </Flex>
  );

  const usingPaintingReseeding = setup.target_advs.frame_before_painting !== 0;

  const advs_at_pickup = setup.advs_at_pickup.map((adv: number) => {
    return convertTotalAdvToAdvRelativeToPaintingReseeding(
      setup.target_advs.frame_before_painting,
      adv,
    );
  });

  fields.push(
    {
      label: "Encounter type",
      input: setup.encounter_type,
    },
    {
      label: "Party Pokémon",
      input: partyInfo,
    },
    {
      label: "Has entered hall of fame?",
      input: setup.gen_opts.entered_hall_of_fame === true ? "Yes" : "No",
    },
    {
      label: "Had triggered mass outbreak?",
      show: setup.gen_opts.entered_hall_of_fame,
      input: setup.has_unknown_can_have_new_mass_outbreak
        ? "Unknown"
        : setup.gen_opts.can_have_new_mass_outbreak === false
          ? "Yes"
          : "No",
    },
    {
      label: "Has empty TV slot?",
      show: setup.gen_opts.entered_hall_of_fame,
      input: setup.has_unknown_has_empty_pokenews_slot
        ? "Unknown"
        : setup.gen_opts.has_empty_pokenews_slot === true
          ? "Yes"
          : "No",
    },
    {
      ...targetFrameBeforePaintingLabel(
        setup.target_advs.frame_before_painting,
      ),
    },
    {
      label: usingPaintingReseeding
        ? "Advances after painting resulting in Pokérus"
        : "Advances resulting in Pokérus",
      input: advs_at_pickup.map(formatLargeInteger).join("; "),
    },
    {
      label: usingPaintingReseeding
        ? "Target advance after painting"
        : "Target advance",
      input: (
        <Tooltip
          title={targetAdvanceAfterPaintingTitle({
            before: setup.target_advs.frame_before_painting,
            after: setup.target_advs.adv_after_painting,
          })}
        >
          {formatLargeInteger(setup.target_advs.adv_after_painting)}
        </Tooltip>
      ),
    },
  );
  return (
    <Flex vertical>
      <h3>Setup</h3>
      <FormFieldTable fields={fields} />
      <Button
        trackerId="Pokerus3Emerald_clearAll"
        danger
        maxWidth={150}
        size="small"
        onClick={() => {
          setSetup(null);
          setBattleVideoInfo(null);
        }}
      >
        Clear All
      </Button>
    </Flex>
  );
};

export const Gen3PokerusEmeraldCreateBattleVideo = () => {
  const [step, setStep] = useCurrentStep();
  const [setup, setSetup] = useAtom(selectedSetupAtom);
  const [, setBattleVideoInfo] = useAtom(battleVideoInfoAtom);

  if (setup == null) {
    // TODO: Change to an Alert.
    return "You must select a setup in the previous step first.";
  }

  const targetPaintingAdvs = {
    before: setup.target_advs.frame_before_painting,
    after: setup.target_advs.adv_after_painting,
  };

  return (
    <EmeraldPaintingReseeding
      targetPaintingAdvs={targetPaintingAdvs}
      targetAction="SweetScentLand"
      specifiedBuffer={BATTLE_VIDEO_BUFFER}
      onBattleVideoCreatedOrSkipped={(info) => {
        setBattleVideoInfo(info);
        setStep(step + 1);
      }}
      clearAll={() => {
        setSetup(null);
        setBattleVideoInfo(null);
      }}
    />
  );
};

export const Gen3PokerusEmeraldBattleAndCalibrate = () => {
  const [setup] = useAtom(selectedSetupAtom);
  const [battleVideoInfo] = useAtom(battleVideoInfoAtom);

  if (setup == null) {
    return (
      <Alert
        showIcon
        type="warning"
        title="You must select a setup in the first step."
      />
    );
  }

  const targetPaintingAdvs = {
    before: setup.target_advs.frame_before_painting,
    after: setup.target_advs.adv_after_painting,
  };

  if (
    targetPaintingAdvs.before !== 0 &&
    (battleVideoInfo == null ||
      battleVideoInfo.battleVideoAdvAfterPainting === 0)
  ) {
    // TODO: Change to an Alert
    return "You must complete the previous step to create a Battle Video.";
  }

  const resolvedBattleVideoInfo = battleVideoInfo ?? {
    targetPaintingAdvs,
    battleVideoAdvAfterPainting: 0,
    consoleType: null,
  };

  return (
    <Flex vertical gap={16}>
      <OptimalSetupInfo setup={setup} />
      <Calibration setup={setup} battleVideoInfo={resolvedBattleVideoInfo} />
    </Flex>
  );
};
