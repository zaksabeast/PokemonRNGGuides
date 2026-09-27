import React from "react";
import { match } from "ts-pattern";
import Chatter900 from "~/assets/chatter-900.wav";
import {
  getSharedAudioContext,
  resumeSharedAudioContext,
} from "~/utils/sharedAudio";
import { ChatterPitch, ChatterState, rngTools } from "~/rngTools";
import { type Translations } from "~/translations";
import { useAtom } from "jotai";
import { gen4StateAtom } from "./state";
import { Icon, type ResultColumn, Alert } from "~/components";
import {
  FormSection,
  OutlinedButton,
  TextField,
  ToolForm,
} from "~/components/form";
import { SequenceButtons } from "./advanceFilter/sequenceButtons";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { findSubArrayIndices } from "~/utils/findIndexBy";
import {
  advanceFilterValidator,
  decorateAdvanceResultsWithTarget,
  getAdvanceFilterInitialValues,
  initialAdvanceFilterPageSettings,
  LooseAdvanceFilterFormState,
  markMatchedAdvanceResults,
  renderAdvanceFilterStatus,
  shouldDisableAdvanceFilterGenerate,
  type AdvanceFilterBaseProps,
  type AdvanceFilterPageSettings,
  type AdvanceFilterResult,
} from "./advanceFilter/utils";
import { AdvanceFilterFields } from "./advanceFilter/fields";

const loadAudioBuffer = async (
  ctx: AudioContext,
  url: string,
): Promise<AudioBuffer> => {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  return await ctx.decodeAudioData(arrayBuffer);
};

const resampleBuffer = async (
  ctx: BaseAudioContext,
  buffer: AudioBuffer,
  rate: number,
): Promise<AudioBuffer> => {
  if (rate <= 0) {
    throw new Error("rate must be > 0");
  }

  const length = Math.max(1, Math.floor(buffer.length / rate));

  const offline = new OfflineAudioContext(
    buffer.numberOfChannels,
    length,
    ctx.sampleRate,
  );

  const src = offline.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.value = rate;

  src.connect(offline.destination);
  src.start();

  return offline.startRendering();
};

const playBuffer = (
  ctx: AudioContext,
  buffer: AudioBuffer,
  volume = 1.0,
): AudioBufferSourceNode => {
  const gain = ctx.createGain();
  gain.gain.value = volume;

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.value = 1.0;

  src.connect(gain);
  gain.connect(ctx.destination);

  src.start();

  // Cap play time in seconds
  src.stop(ctx.currentTime + 0.5);

  return src;
};

const useChatterAudio = () => {
  const cachedBufferRef = React.useRef<AudioBuffer | null>(null);

  const ensureBuffer = React.useCallback(async (ctx: AudioContext) => {
    if (cachedBufferRef.current == null) {
      cachedBufferRef.current = await loadAudioBuffer(ctx, Chatter900);
    }
    return cachedBufferRef.current;
  }, []);

  const play = React.useCallback(
    async (rate: number) => {
      try {
        const ctx = getSharedAudioContext();
        // The context may have just been created, so resume it before the
        // awaits below end the user gesture that allows it
        resumeSharedAudioContext();
        const base = await ensureBuffer(ctx);
        const pitched = await resampleBuffer(ctx, base, rate);
        playBuffer(ctx, pitched, 1.0);
      } catch {
        // ignore errors
      }
    },
    [ensureBuffer],
  );

  return { playChatter: play };
};

const ChatterSounds = () => {
  const t = useActiveRouteTranslations();
  const { playChatter } = useChatterAudio();

  return (
    <FormSection
      title={t["Reference sounds"]}
      description='Record the "Low" sound with the "Chatter" ability to use these.'
    >
      <SequenceButtons>
        <OutlinedButton
          trackerId="chatter_play_low"
          onClick={() => playChatter(1.0)}
          icon={<Icon name="Play" />}
          iconPlacement="end"
        >
          Low
        </OutlinedButton>
        <OutlinedButton
          trackerId="chatter_play_medium"
          onClick={() => playChatter(1.125)}
          icon={<Icon name="Play" />}
          iconPlacement="end"
        >
          Medium
        </OutlinedButton>
        <OutlinedButton
          trackerId="chatter_play_high"
          onClick={() => playChatter(1.25)}
          icon={<Icon name="Play" />}
          iconPlacement="end"
        >
          High
        </OutlinedButton>
      </SequenceButtons>
    </FormSection>
  );
};

type Result = AdvanceFilterResult<ChatterState>;

const ChatterLabel = {
  Low: "Low",
  MediumLow: "Medium-Low",
  Medium: "Medium",
  MediumHigh: "Medium-High",
  High: "High",
} as const satisfies Record<ChatterPitch, string>;

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Target/Heard"],
    dataIndex: "status",
    render: renderAdvanceFilterStatus,
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Pitch"],
    dataIndex: "pitch",
    render: (pitch: ChatterPitch) => t[ChatterLabel[pitch]],
  },
  {
    title: t["Pitch Value"],
    dataIndex: "pitch_value",
  },
];

type SimpleChatterPitch = Exclude<ChatterPitch, "MediumLow" | "MediumHigh">;
type MiniPitch = "L" | "M" | "H";

const isMiniPitch = (char: string): char is MiniPitch =>
  char === "L" || char === "M" || char === "H";

const MINI_PITCH_MAP = {
  // eslint-disable-next-line id-length
  L: "Low",
  // eslint-disable-next-line id-length
  M: "Medium",
  // eslint-disable-next-line id-length
  H: "High",
} as const satisfies Record<MiniPitch, SimpleChatterPitch>;

const isMiniPitchEqualToChatter = (
  { pitch }: Result,
  mini: MiniPitch,
): boolean => {
  const miniPitch = MINI_PITCH_MAP[mini];
  return match({ pitch, miniPitch })
    .with({ pitch: "Low", miniPitch: "Low" }, () => true)
    .with({ pitch: "Medium", miniPitch: "Medium" }, () => true)
    .with({ pitch: "High", miniPitch: "High" }, () => true)
    .with({ pitch: "MediumLow", miniPitch: "Medium" }, () => true)
    .with({ pitch: "MediumHigh", miniPitch: "Medium" }, () => true)
    .with({ pitch: "MediumLow", miniPitch: "Low" }, () => true)
    .with({ pitch: "MediumHigh", miniPitch: "High" }, () => true)
    .otherwise(() => false);
};

const markResultsWithChatter = ({
  results,
  filter,
  pageSize,
}: {
  results: Result[];
  filter: MiniPitch[];
  pageSize: number;
}) => {
  const indicies = findSubArrayIndices(
    results,
    filter,
    isMiniPitchEqualToChatter,
  );

  return markMatchedAdvanceResults({
    results,
    indices: indicies,
    pageSize,
    mark: "Heard",
  });
};

type ChatterFilterButtonsProps = {
  pitches: MiniPitch[];
  setPitches: (pitches: MiniPitch[]) => void;
  onClickPitch: (pitch: MiniPitch) => void;
};

const ChatterFilterButtons = ({
  pitches,
  setPitches,
  onClickPitch,
}: ChatterFilterButtonsProps) => {
  const t = useActiveRouteTranslations();

  return (
    <FormSection title={t["Filters"]}>
      <SequenceButtons>
        <OutlinedButton
          trackerId="chatter_filter_low"
          onClick={() => onClickPitch("L")}
        >
          Low
        </OutlinedButton>
        <OutlinedButton
          trackerId="chatter_filter_medium"
          onClick={() => onClickPitch("M")}
        >
          Medium
        </OutlinedButton>
        <OutlinedButton
          trackerId="chatter_filter_high"
          onClick={() => onClickPitch("H")}
        >
          High
        </OutlinedButton>
      </SequenceButtons>
      <TextField
        label={t["Chatot Pitches"]}
        value={pitches.join("")}
        placeholder="LMH"
        onChange={(value) => setPitches(value.split("").filter(isMiniPitch))}
      />
    </FormSection>
  );
};

export const ChatterFilterBase = ({
  seed,
  targetAdvance,
  submitTrackerId,
  mode,
}: AdvanceFilterBaseProps) => {
  const resolvedSeed = seed ?? null;
  const resolvedTargetAdvance = targetAdvance ?? null;
  const [filter, setFilter] = React.useState<MiniPitch[]>([]);
  const [results, setResults] = React.useState<Result[]>([]);
  const [pageSettings, setPageSettings] =
    React.useState<AdvanceFilterPageSettings>(initialAdvanceFilterPageSettings);

  React.useEffect(() => {
    setFilter([]);
    setResults([]);
  }, [seed, targetAdvance]);

  const onSubmit = async (opts: LooseAdvanceFilterFormState) => {
    if (opts.targetAdvance == null || opts.seed == null) {
      return;
    }

    const chatters = await rngTools.get_chatters({
      initial_advances: opts.minAdvance,
      max_advances: Math.max(opts.maxAdvance - opts.minAdvance, 0),
      seed: opts.seed,
    });
    const chattersWithTarget = decorateAdvanceResultsWithTarget(
      chatters,
      opts.targetAdvance,
    );
    setResults(chattersWithTarget);
  };

  const { hasMatch, markedResults, autoCurrentPage } = markResultsWithChatter({
    results,
    filter,
    pageSize: pageSettings.pageSize,
  });

  React.useEffect(
    () => {
      setPageSettings((prev) => ({
        ...prev,
        currentPage: autoCurrentPage,
      }));
    },
    // Trigger this on any filter change
    [filter, autoCurrentPage],
  );

  const initialValues = getAdvanceFilterInitialValues(
    resolvedSeed,
    resolvedTargetAdvance,
  );

  return (
    <ToolForm<LooseAdvanceFilterFormState, Result>
      filters={
        <>
          <ChatterSounds />
          <ChatterFilterButtons
            pitches={filter}
            setPitches={setFilter}
            onClickPitch={(pitch) => setFilter((prev) => [...prev, pitch])}
          />
          {filter.length > 0 && hasMatch === false && (
            <Alert
              showIcon
              type="error"
              title="No matches found"
              description="A pitch may be incorrect, or the advance range may be too small. Try increasing the advance range."
            />
          )}
        </>
      }
      pagination={{
        current: pageSettings.currentPage,
        pageSize: pageSettings.pageSize,
        onChange: (currentPage, pageSize) => {
          setPageSettings((prev) => ({ ...prev, currentPage, pageSize }));
        },
      }}
      getColumns={getColumns}
      results={markedResults}
      initialValues={initialValues}
      values={initialValues}
      validationSchema={advanceFilterValidator}
      onSubmit={onSubmit}
      rowKey="advance"
      disableGenerate={shouldDisableAdvanceFilterGenerate(
        mode,
        resolvedSeed,
        resolvedTargetAdvance,
      )}
      submitTrackerId={submitTrackerId}
    >
      <AdvanceFilterFields mode={mode} targetAdvance={resolvedTargetAdvance} />
    </ToolForm>
  );
};

export const Gen4ChatterFilter = () => {
  const [{ target }] = useAtom(gen4StateAtom);

  return (
    <ChatterFilterBase
      seed={target.seedTime?.seed ?? null}
      targetAdvance={target.lcrngAdvance}
      mode="embedded"
      submitTrackerId="chatter_filter_generate"
    />
  );
};
