import React from "react";
import { match } from "ts-pattern";
import Chatter900 from "~/assets/chatter-900.wav";
import { z } from "zod";
import { ChatterPitch, ChatterState, rngTools } from "~/rngTools";
import { Translations } from "~/translations";
import {
  Flex,
  Button,
  Icon,
  Field,
  FormikNumberInput,
  ResultColumn,
  RngToolForm,
  Input,
  NumberInput,
  MinMaxContainer,
  Typography,
  Alert,
} from "~/components";
import { findSubArrayIndices, IndexRange } from "~/utils/findIndexBy";
import { uniqueId } from "lodash-es";

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
  const audioCtx = React.useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    return new AudioContext();
  }, []);
  const cachedBufferRef = React.useRef<AudioBuffer | null>(null);

  const ensureBuffer = React.useCallback(async () => {
    if (cachedBufferRef.current == null && audioCtx != null) {
      cachedBufferRef.current = await loadAudioBuffer(audioCtx, Chatter900);
    }
    return cachedBufferRef.current;
  }, [audioCtx]);

  const play = React.useCallback(
    async (rate: number) => {
      try {
        const base = await ensureBuffer();

        if (audioCtx == null || base == null) {
          return;
        }

        const pitched = await resampleBuffer(audioCtx, base, rate);

        playBuffer(audioCtx, pitched, 1.0);
      } catch {
        // ignore errors
      }
    },
    [audioCtx, ensureBuffer],
  );

  return { playChatter: play };
};

const ChatterSounds = () => {
  const { playChatter } = useChatterAudio();

  return (
    <Flex vertical>
      <Typography.Title level={5}>Reference sounds:</Typography.Title>
      <Typography.Text mb={6}>
        Record the "Low" sound with the "Chatter" ability to use these.
      </Typography.Text>
      <Flex gap={8}>
        <Button
          flex={1}
          trackerId="chatter_play_low"
          onClick={() => playChatter(1.0)}
          icon={<Icon name="Play" />}
          iconPlacement="end"
        >
          Low
        </Button>
        <Button
          flex={1}
          trackerId="chatter_play_medium"
          onClick={() => playChatter(1.125)}
          icon={<Icon name="Play" />}
          iconPlacement="end"
        >
          Medium
        </Button>
        <Button
          flex={1}
          trackerId="chatter_play_high"
          onClick={() => playChatter(1.25)}
          icon={<Icon name="Play" />}
          iconPlacement="end"
        >
          High
        </Button>
      </Flex>
    </Flex>
  );
};

type Result = ChatterState & {
  id: string;
  status: "Target" | "Heard" | null;
};

const Validator = z.object({
  minAdvance: z.number().int().min(0),
  maxAdvance: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

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
    render: (status) =>
      match(status)
        .with("Target", () => (
          <Icon name="CheckCircle" color="Success" size={30} />
        ))
        .with("Heard", () => <Icon name="Ear" color="Info" size={18} />)
        .with(null, () => null)
        .exhaustive(),
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

const isIndexInRange = (index: number, ranges: IndexRange[]): boolean => {
  return ranges.some(({ start, end }) => index >= start && index <= end);
};

const markResultsWithChatter = (results: Result[], filter: MiniPitch[]) => {
  const indicies = findSubArrayIndices(
    results,
    filter,
    isMiniPitchEqualToChatter,
  );

  const hasMatch = indicies.length > 0;
  const startIndex = hasMatch ? indicies[0].start : null;
  const possibleResults =
    startIndex == null ? results : results.slice(startIndex);

  const markedResults = possibleResults.map((result, index): Result => {
    const adjustedIndex = index + (startIndex ?? 0);
    return {
      ...result,
      status:
        result.status === null && isIndexInRange(adjustedIndex, indicies)
          ? "Heard"
          : result.status,
    };
  });

  return {
    hasMatch,
    markedResults,
  };
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
  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5}>Filters:</Typography.Title>
      <Flex gap={8}>
        <Button
          flex={1}
          trackerId="chatter_filter_low"
          onClick={() => onClickPitch("L")}
        >
          Low
        </Button>
        <Button
          flex={1}
          trackerId="chatter_filter_medium"
          onClick={() => onClickPitch("M")}
        >
          Medium
        </Button>
        <Button
          flex={1}
          trackerId="chatter_filter_high"
          onClick={() => onClickPitch("H")}
        >
          High
        </Button>
      </Flex>
      <Input
        value={pitches.join("")}
        placeholder="LMH"
        onChange={(event) =>
          setPitches(event.target.value.split("").filter(isMiniPitch))
        }
      />
    </Flex>
  );
};

type ChatterFilterBaseProps = {
  seed: number | null;
  targetAdvance: number | null;
  submitTrackerId: string;
};

export const ChatterFilterBase = ({
  seed,
  targetAdvance,
  submitTrackerId,
}: ChatterFilterBaseProps) => {
  const [filter, setFilter] = React.useState<MiniPitch[]>([]);
  const [results, setResults] = React.useState<Result[]>([]);

  React.useEffect(() => {
    setFilter([]);
    setResults([]);
  }, [seed, targetAdvance]);

  const getFields = (t: Translations): Field[] => [
    {
      label: t["Seed"],
      input: (
        <NumberInput
          disabled
          name="seed"
          numType="hex"
          errorMessage={seed == null ? "Find your seed first" : undefined}
          value={seed}
        />
      ),
    },
    {
      label: t["Advances"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="minAdvance" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="maxAdvance" numType="decimal" />
          }
        />
      ),
    },
  ];

  const onSubmit = async (opts: FormState) => {
    if (seed == null || targetAdvance == null) {
      return;
    }

    const chatters = await rngTools.get_chatters({
      initial_advances: opts.minAdvance,
      max_advances: Math.max(opts.maxAdvance - opts.minAdvance, 0),
      seed: seed,
    });
    const chattersWithTarget = chatters.map(
      (chatter): Result => ({
        ...chatter,
        id: uniqueId(),
        status: chatter.advance === targetAdvance ? "Target" : null,
      }),
    );
    setResults(chattersWithTarget);
  };

  const { hasMatch, markedResults } = markResultsWithChatter(results, filter);

  const initialValues: FormState = {
    minAdvance: 0,
    maxAdvance: (targetAdvance ?? 0) + 10,
  };

  return (
    <RngToolForm<FormState, Result>
      additionalButtons={
        <>
          <ChatterSounds />
          <ChatterFilterButtons
            pitches={filter}
            setPitches={setFilter}
            onClickPitch={(pitch) => setFilter((prev) => [...prev, pitch])}
          />
          {filter.length > 0 && !hasMatch && (
            <Alert
              showIcon
              type="error"
              title="No matches found"
              description="A pitch may be incorrect, or the advance range may be too small. Try increasing the advance range."
            />
          )}
        </>
      }
      getColumns={getColumns}
      getFields={getFields}
      results={markedResults}
      initialValues={initialValues}
      values={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="advance"
      disableGenerate={seed == null || targetAdvance == null}
      submitTrackerId={submitTrackerId}
    />
  );
};
