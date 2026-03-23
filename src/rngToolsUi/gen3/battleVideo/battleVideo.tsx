import { Tooltip } from "antd";
import React from "react";
import z from "zod";
import {
  Typography,
  RngToolForm,
  MultiTimer,
  RngToolSubmit,
  ResultColumn,
  FormikSwitch,
  FormikNumberInput,
  FormFieldTable,
  Icon,
} from "~/components";
import { GBA_FPS } from "~/utils/consts";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { FormikConsoleFps } from "~/components/consoleFps";
import InstructionsNoBattle from "./instructions_no_battle.mdx";
import InstructionsWithBattle from "./instructions_with_battle.mdx";
import InstructionsUpdatingExisting from "./instructions_updating_existing.mdx";
import { FormikEmeraldTargetAdvance } from "~/components/emeraldTargetAdvance";
import { useWatch } from "react-hook-form";
import { match } from "ts-pattern";

type Mode = "noBattle" | "withBattle" | "updatingExisting";

// No waiting in battle
const ADV_MISC_NO_BATTLE = 100; // Advances before last input not caused by frames when not waiting in battle
const MIN_ADV_FOR_BATTLE_VIDEO = 3300; // It takes 3300 adv to boot the game and make a battle video as fast as possible.
const SAFETY_BUFFER_NO_BATTLE = 500; // Additional buffer for satefy

// With waiting in battle
const THRESHOLD_ADV_FOR_BATTLE = 15_000; // Waiting in battle is only considered if the waiting is greater than ~30 minutes.
const MIN_ADV_FOR_BATTLE = 6800; // It takes 6800 adv to start a wild battle, end it immediately, and make a battle video.
const SWEET_SCENT_TARGET = 1500; // It takes about 1500 advances to boot the game and start a battle.
const POST_BATTLE_BUFFER = 1800; // Buffer to add flexbility to the timing of the battle start
const ADV_MISC_BATTLE = 300; // Advances before last input not caused by frames when waiting in battle
const SAFETY_BUFFER_BATTLE = 1000; // Additional buffer for satefy
const ADV_SWEET_SCENT_INPUT_TO_X2_SPEED_UP = 400; // After pressing A on Sweet Scent, it takes 400 advances until RNG advances by 2 every frame.
const ADV_RUN_INPUT_TO_X1_SPEED_UP = 225; // After pressing A to run from battle, it takes 225 advances until RNG advances stops advancing by 2 every frame.

// When updating existing battle video
const ADV_MISC_UPDATE_EXISTING = 70; // Advances before last input not caused by frames when updating existing
const SAFETY_BUFFER_UPDATE_EXISTING = 500; // Additional buffer for satefy
const MIN_ADV_FOR_UPDATING_EXISTING = 2500; // It takes 2500 adv to boot the game and make a battle video as fast as possible.

// All
const POST_BV_SWEET_SCENT_BUFFER = 600; // It takes about 600 advances to close the battle video and trigger Sweet Scent.
const POST_BV_FISHING_BUFFER = 1500; // It takes about 800 advances to close the battle video and trigger fishing 1st try. 1500 is for 3 tries
const OFFSET_DIALOGUE_TO_BV = 280; // Advances between last player input and battle video creation.

/*
Raw data:
  no battery + battle video as fast as possible:
    Advance=3130
      3003 from frames
      127 from misc

  no battery + battle + battle video as fast as possible:
    Advance=6594
      5668 from frames
      592 from battle
      334 from misc

  update existing
    advance=+2477
      2403 from frames
      74 from misc

  Pressing A to end dialogue and start battle at adv=3600, frame=3576
    Battle video is created at adv=3890, frame=3856
    => conclusion: A press must be ~280 frame early
*/

type BreakdownInfo = {
  name: string;
  adv: number;
  advSources: { name: string; adv: number }[];
};

const Validator = z.object({
  targetAdvance: z.number().min(0).max(0xffff_ffff),
  isUpdatingExisting: z.boolean(),
  waitTimeExistingBattleVideo: z.number().min(0).max(0xffff_ffff),
  consoleFps: z.number(),
  forFishing: z.boolean(),
  considerWaitingInBattle: z.boolean(),
  displayAdvancedBreakdown: z.boolean(),
  useRecommendedBuffer: z.boolean(),
  specifiedBuffer: z.number().min(0).max(99999),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  targetAdvance: 50_000,
  isUpdatingExisting: false,
  waitTimeExistingBattleVideo: 0,
  consoleFps: GBA_FPS,
  forFishing: false,
  considerWaitingInBattle: true,
  displayAdvancedBreakdown: false,
  useRecommendedBuffer: true,
  specifiedBuffer: POST_BV_SWEET_SCENT_BUFFER + SAFETY_BUFFER_NO_BATTLE,
};
/*
{
  useRecommendedBuffer,
  setUseRecommendedBuffer,
  setDisplayAdvancedBreakdown,
  isUpdatingExisting,
  setIsUpdatingExisting,
}: {
  useRecommendedBuffer: boolean;
  setUseRecommendedBuffer: (val: boolean) => void;
  setDisplayAdvancedBreakdown: (val: boolean) => void;
  isUpdatingExisting: boolean;
  setIsUpdatingExisting: (val: boolean) => void;
}
  */

const MyFields = ({
  setDisplayAdvancedBreakdown,
}: {
  setDisplayAdvancedBreakdown: (val: boolean) => void;
}) => {
  const useRecommendedBuffer = useWatch<FormState, "useRecommendedBuffer">({
    name: "useRecommendedBuffer",
  });
  const isUpdatingExisting = useWatch<FormState, "isUpdatingExisting">({
    name: "isUpdatingExisting",
  });

  const fields = React.useMemo(() => {
    return [
      {
        label: "Is updating existing Battle Video?",
        input: <FormikSwitch<FormState> name="isUpdatingExisting" />,
      },
      {
        label: "Target",
        input: <FormikEmeraldTargetAdvance<FormState> name="targetAdvance" />,
        show: !isUpdatingExisting,
      },
      {
        label: (
          <>
            Wait time (in ms) to hit target using the existing Battle Video
            <Tooltip title="When doing RNG manipulation attempts, how long to wait before performing the action.">
              <Icon name="InformationCircle" size={16} />
            </Tooltip>
          </>
        ),
        key: "waitTime",
        input: (
          <FormikNumberInput<FormState>
            name="waitTimeExistingBattleVideo"
            numType="decimal"
          />
        ),
        indent: 1,
        show: isUpdatingExisting,
      },
      {
        label: "Console",
        input: <FormikConsoleFps<FormState> name="consoleFps" generation={3} />,
      },
      {
        label: "Use recommended buffer to perform action?",
        input: <FormikSwitch<FormState> name="useRecommendedBuffer" />,
      },
      {
        label: "Leave sufficient buffer for fishing?",
        input: <FormikSwitch<FormState> name="forFishing" />,
        indent: 1,
        show: useRecommendedBuffer,
      },
      {
        label: "Buffer (advance)",
        input: (
          <FormikNumberInput<FormState>
            name="specifiedBuffer"
            numType="decimal"
          />
        ),
        indent: 1,
        show: !useRecommendedBuffer,
      },
      {
        label: "Consider waiting in battle?",
        input: <FormikSwitch<FormState> name="considerWaitingInBattle" />,
        show: !isUpdatingExisting,
      },
      {
        label: "Display advanced breakdown?",
        input: (
          <FormikSwitch<FormState>
            name="displayAdvancedBreakdown"
            onChange={setDisplayAdvancedBreakdown}
          />
        ),
      },
    ];
  }, [isUpdatingExisting, setDisplayAdvancedBreakdown, useRecommendedBuffer]);

  return <FormFieldTable fields={fields} />;
};

const columns: ResultColumn<BreakdownInfo>[] = [
  {
    title: "Moment",
    dataIndex: "name",
  },
  {
    title: "Advance at moment",
    dataIndex: "adv",
    render(val, values) {
      const plus = values.advSources.reduce((prev, cur) => prev + cur.adv, 0);
      const plusText = values.advSources.map((src) => (
        <div key={src.name}>
          +{formatLargeInteger(src.adv)} for {src.name}
        </div>
      ));
      return (
        <>
          {formatLargeInteger(val)}{" "}
          {plus !== 0 && (
            <Tooltip title={plusText}>(+{formatLargeInteger(plus)})</Tooltip>
          )}
        </>
      );
    },
  },
];

const calculateWithoutBattle = (opts: FormState) => {
  const actionBufferPostVideo = opts.forFishing
    ? POST_BV_FISHING_BUFFER
    : POST_BV_SWEET_SCENT_BUFFER;

  const safetyBufferNoAction = opts.isUpdatingExisting
    ? SAFETY_BUFFER_UPDATE_EXISTING
    : SAFETY_BUFFER_NO_BATTLE;
  const safetyBufferAdv = opts.useRecommendedBuffer
    ? actionBufferPostVideo + safetyBufferNoAction
    : opts.specifiedBuffer;

  const targetAdvance = opts.isUpdatingExisting
    ? Math.floor((opts.waitTimeExistingBattleVideo / 1000) * opts.consoleFps)
    : opts.targetAdvance;
  const targetAdvAtVideo = targetAdvance - safetyBufferAdv;

  if (
    targetAdvAtVideo <
    (opts.isUpdatingExisting
      ? MIN_ADV_FOR_UPDATING_EXISTING
      : MIN_ADV_FOR_BATTLE_VIDEO)
  ) {
    return {
      submitError: opts.isUpdatingExisting
        ? "Battle video can't be updated because the wait time is too small."
        : "Battle video can't be used because the target advance is too small.",
      milliseconds: [],
      timerLabels: [],
      breakdown: [],
      battleVideoInfo: null,
    };
  }

  const targetAdvAtInput = targetAdvAtVideo - OFFSET_DIALOGUE_TO_BV;

  // To reach targetAdvAtInput, there are 2 types of advances: frame and misc.
  // misc is always ADV_MISC_NO_BATTLE. the rest comes from frame.

  const advMisc = opts.isUpdatingExisting
    ? ADV_MISC_UPDATE_EXISTING
    : ADV_MISC_NO_BATTLE;
  const advFromFrame = targetAdvAtInput - advMisc;

  return {
    submitError: "",
    milliseconds: [5000, (advFromFrame / opts.consoleFps) * 1000],
    timerLabels: [
      "Soft reset START+SELECT+A+B",
      "End Battle Tower trainer opening phrase",
    ],
    breakdown: [
      { name: "Game started", adv: 0, advSources: [] },
      {
        name: "Last player input to create Battle Video",
        adv: targetAdvAtInput,
        advSources: [
          { name: "Frames (VBlank)", adv: advFromFrame },
          { name: "Other RNG advances", adv: advMisc },
        ],
      },
      {
        name: "Battle Video created",
        adv: targetAdvAtVideo,
        advSources: [
          { name: "Frames (VBlank) & Other", adv: OFFSET_DIALOGUE_TO_BV },
        ],
      },
      {
        name: "Target",
        adv: targetAdvance,
        advSources: opts.useRecommendedBuffer
          ? [
              { name: "Performing action", adv: actionBufferPostVideo },
              { name: "Safety buffer", adv: safetyBufferNoAction },
            ]
          : [{ name: "Specified buffer", adv: safetyBufferAdv }],
      },
    ],
    battleVideoInfo: {
      battleVideoAdv: targetAdvAtVideo,
      safetyBufferAdv,
      targetAdv: targetAdvance,
      mode: (opts.isUpdatingExisting ? "updatingExisting" : "noBattle") as Mode,
    },
  };
};

const calculateWithBattle = (opts: FormState) => {
  const actionBufferPostVideo = opts.forFishing
    ? POST_BV_FISHING_BUFFER
    : POST_BV_SWEET_SCENT_BUFFER;

  const safetyBufferAdv = opts.useRecommendedBuffer
    ? actionBufferPostVideo + SAFETY_BUFFER_BATTLE
    : opts.specifiedBuffer;
  const targetAdvAtVideo = opts.targetAdvance - safetyBufferAdv;
  const targetAdvAtInput = targetAdvAtVideo - OFFSET_DIALOGUE_TO_BV;

  // To reach targetAdvAtInput, there are 3 types of advances: "frame outside battle", "advance in battle" and misc.
  // misc is always ADV_MISC_BATTLE.
  // "frame outside battle" is at the minimum MIN_ADV_FOR_BATTLE. As small as possible for best speed up.
  //     However, making it too small means that the player must start and end the battle exactly at the right time, which is not feasible.
  //     We add POST_BATTLE_BUFFER for flexibility. (instead of waiting 15 sec in battle, we wait 30 sec at battle frontier)
  //     "frame outside battle" is split in tow parts: before battle (POST_BOOT_SWEET_SCENT_BUFFER) and after battle (the rest)
  // the rest of advances comes from "advance in battle".

  const advFromFrameOutsideBattle = MIN_ADV_FOR_BATTLE + POST_BATTLE_BUFFER;
  const advFromBattle =
    targetAdvAtInput - ADV_MISC_BATTLE - advFromFrameOutsideBattle;
  const frameInBattleAtX2Rate = Math.floor(advFromBattle / 2);
  // x2 speedup doesn't immediately starts after pressing A for sweet scent. and it doesn't immediately end on running away.
  const speedupLatency =
    ADV_SWEET_SCENT_INPUT_TO_X2_SPEED_UP - ADV_RUN_INPUT_TO_X1_SPEED_UP;
  const frameInBattle = frameInBattleAtX2Rate + speedupLatency;

  const frameFromFrameOutsideBattleBefore = SWEET_SCENT_TARGET;
  const advFromFrameOutsideBattleAfter =
    advFromFrameOutsideBattle - SWEET_SCENT_TARGET;

  const frameFromFrameOutsideBattleAfter =
    advFromFrameOutsideBattleAfter - speedupLatency;

  return {
    submitError: "",
    milliseconds: [
      5000,
      (frameFromFrameOutsideBattleBefore / opts.consoleFps) * 1000, // boot -> trigger sweet scent
      (frameInBattle / opts.consoleFps) * 1000, // battle start -> battle end
      (frameFromFrameOutsideBattleAfter / opts.consoleFps) * 1000,
    ],
    timerLabels: [
      "Soft reset START+SELECT+A+B",
      "Trigger Sweet Scent",
      `End "Got away safely" message`,
      "End Battle Tower trainer opening phrase",
    ],
    breakdown: [
      { name: "Game started", adv: 0, advSources: [] },
      {
        name: "Player input to trigger Sweet Scent",
        adv: SWEET_SCENT_TARGET,
        advSources: [
          { name: "Frames (VBlank) & Others", adv: SWEET_SCENT_TARGET },
        ],
      },
      {
        name: "Battle started",
        adv: SWEET_SCENT_TARGET + ADV_SWEET_SCENT_INPUT_TO_X2_SPEED_UP,
        advSources: [
          {
            name: "Frames (VBlank) & Others",
            adv: ADV_SWEET_SCENT_INPUT_TO_X2_SPEED_UP,
          },
        ],
      },
      {
        name: "Player input to run from battle",
        adv:
          SWEET_SCENT_TARGET +
          ADV_SWEET_SCENT_INPUT_TO_X2_SPEED_UP +
          advFromBattle -
          ADV_RUN_INPUT_TO_X1_SPEED_UP,
        advSources: [
          {
            name: "Frames (VBlank) & Battle",
            adv: advFromBattle - ADV_RUN_INPUT_TO_X1_SPEED_UP,
          },
        ],
      },
      {
        name: "Battle ended",
        adv:
          SWEET_SCENT_TARGET +
          ADV_SWEET_SCENT_INPUT_TO_X2_SPEED_UP +
          advFromBattle,
        advSources: [
          {
            name: "Frames (VBlank) & Others",
            adv: ADV_RUN_INPUT_TO_X1_SPEED_UP,
          },
        ],
      },

      {
        name: "Last player input to create Battle Video",
        adv: targetAdvAtInput,
        advSources: [
          {
            name: "Frames (VBlank)",
            adv:
              targetAdvAtInput -
              (SWEET_SCENT_TARGET +
                ADV_SWEET_SCENT_INPUT_TO_X2_SPEED_UP +
                advFromBattle),
          },
          { name: "Other RNG advances", adv: ADV_MISC_BATTLE },
        ],
      },
      {
        name: "Battle Video created",
        adv: targetAdvAtVideo,
        advSources: [
          { name: "Frames (VBlank) & Other", adv: OFFSET_DIALOGUE_TO_BV },
        ],
      },
      {
        name: "Target",
        adv: opts.targetAdvance,
        advSources: opts.useRecommendedBuffer
          ? [
              { name: "Time for action", adv: actionBufferPostVideo },
              { name: "Safety buffer", adv: POST_BATTLE_BUFFER },
            ]
          : [{ name: "Specified buffer", adv: safetyBufferAdv }],
      },
    ],
    battleVideoInfo: {
      battleVideoAdv: targetAdvAtVideo,
      safetyBufferAdv,
      targetAdv: opts.targetAdvance,
      mode: "withBattle" as Mode,
    },
  };
};

const calculate = (opts: FormState) => {
  if (
    opts.isUpdatingExisting ||
    !opts.considerWaitingInBattle ||
    opts.targetAdvance < THRESHOLD_ADV_FOR_BATTLE
  ) {
    return calculateWithoutBattle(opts);
  }

  return calculateWithBattle(opts);
};

export const BattleVideo = () => {
  const [milliseconds, setMilliseconds] = React.useState<number[]>([]);
  const [timerLabels, setTimerLabels] = React.useState<string[]>([]);
  const [submitError, setSubmitError] = React.useState("");
  const [breakdown, setBreakdown] = React.useState<BreakdownInfo[]>([]);

  const [displayAdvancedBreakdown, setDisplayAdvancedBreakdown] =
    React.useState(false);

  const [battleVideoInfo, setBattleVideoInfo] = React.useState<{
    battleVideoAdv: number;
    safetyBufferAdv: number;
    targetAdv: number;
    mode: Mode;
  } | null>(null);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(async (opts) => {
    const {
      submitError,
      milliseconds,
      timerLabels,
      breakdown,
      battleVideoInfo,
    } = await calculate(opts);
    setSubmitError(submitError);
    setMilliseconds(milliseconds);
    setTimerLabels(timerLabels);
    setBreakdown(breakdown);
    setBattleVideoInfo(battleVideoInfo);
  }, []);

  const displayedProps = React.useMemo(() => {
    return displayAdvancedBreakdown ? { results: breakdown, columns } : {};
  }, [breakdown, displayAdvancedBreakdown]);

  return (
    <>
      <RngToolForm<FormState, BreakdownInfo>
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        submitTrackerId="battle_video_calc_timer"
        {...displayedProps}
      >
        <MyFields setDisplayAdvancedBreakdown={setDisplayAdvancedBreakdown} />
      </RngToolForm>

      {submitError !== "" && (
        <Typography.Text type="danger">{submitError}</Typography.Text>
      )}

      {battleVideoInfo != null && (
        <>
          {match(battleVideoInfo.mode)
            .with("withBattle", () => <InstructionsWithBattle />)
            .with("updatingExisting", () => <InstructionsUpdatingExisting />)
            .with("noBattle", () => <InstructionsNoBattle />)
            .exhaustive()}

          <div>
            Battle Video will be created at advance ~
            {formatLargeInteger(battleVideoInfo.battleVideoAdv)}. (Safety
            buffer: {formatLargeInteger(battleVideoInfo.safetyBufferAdv)}{" "}
            advances.)
          </div>
          {battleVideoInfo.mode !== "updatingExisting" && (
            <div>
              Target advance: {formatLargeInteger(battleVideoInfo.targetAdv)}.
            </div>
          )}
        </>
      )}

      {milliseconds.length > 0 && (
        <MultiTimer
          milliseconds={milliseconds}
          labels={timerLabels}
          startButtonTrackerId="battle_video_timer_start"
          stopButtonTrackerId="battle_video_timer_start"
        />
      )}
    </>
  );
};
