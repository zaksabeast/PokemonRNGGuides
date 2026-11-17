import { readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { format, resolveConfig } from "prettier";

type SampleGroup = {
  playingSong: string;
  weather: string;
  records: number[][];
};

type WeightedScenario = {
  record: number[];
  weight: number;
};

const VBLANK_CYCLE_COUNT = 280_896;
const DURATION_SCALE = 90_000;
const SAMPLES_PER_SCENARIO = 8;

const outputPath = resolve(
  import.meta.dir,
  "../src/rngToolsUi/gen3/wild/data/initial_cycle/feebas_cycle_dataset.ts",
);

const rawLogPaths = Bun.argv.slice(2);
if (rawLogPaths.length !== 3) {
  throw new Error("Provide the Sunny, Rain, and Thunderstorm Feebas logs.");
}

const getWeatherFromRawLogPath = (path: string): string => {
  const name = basename(path);
  const match =
    /^feebas_cycles_samples_(sunny|rain|thunderstorm)\.local\.txt$/.exec(name);
  if (match == null) {
    throw new Error(`Unknown Feebas sample weather: ${path}`);
  }

  return match[1][0].toUpperCase() + match[1].slice(1);
};

if (new Set(rawLogPaths.map(getWeatherFromRawLogPath)).size !== 3) {
  throw new Error("Provide one Feebas log for each weather.");
}

const getSamplesFromRawLog = async (path: string): Promise<string[]> => {
  const weather = getWeatherFromRawLogPath(path);
  const source = await readFile(path, "utf8");
  const runs = new Map<
    number,
    { startCycle: number | null; durations: number[]; completed: boolean }
  >();

  for (const line of source.split(/\r?\n/)) {
    if (!line.startsWith("event,")) {
      continue;
    }

    const parts = line.split(",");
    const runId = Number(parts[1]);
    const run = runs.get(runId) ?? {
      startCycle: null,
      durations: [],
      completed: false,
    };
    if (parts[7] === "CheckFeebas") {
      run.startCycle = Number(parts[10]);
    }

    if (parts[7] === "VBlankIntr_End" && parts[13] === "during_CheckFeebas") {
      run.durations.push(Number(parts[12]));
    }

    if (parts[13] === "after_CheckFeebas") {
      run.completed = true;
    }

    runs.set(runId, run);
  }

  return [...runs.values()].map(({ startCycle, durations, completed }) => {
    if (startCycle == null || !completed) {
      throw new Error(`Incomplete Feebas run in ${path}`);
    }

    return `SurfSong | ${weather} | ${startCycle} | (${durations.join(",")})`;
  });
};

const groups = new Map<string, SampleGroup>();
const source = (await Promise.all(rawLogPaths.map(getSamplesFromRawLog)))
  .flat()
  .join("\n");

for (const line of source.split(/\r?\n/)) {
  if (line === "" || line.startsWith("#") || line.startsWith("playing_song")) {
    continue;
  }

  const parts = line.split("|").map((part) => part.trim());
  if (parts.length !== 4) {
    throw new Error(`Invalid Feebas sample: ${line}`);
  }

  const [playingSong, weather, startCycleText, durationsText] = parts;
  if (!playingSong || !weather || !startCycleText || !durationsText) {
    throw new Error(`Incomplete Feebas sample: ${line}`);
  }

  const startCycle = Number(startCycleText);
  const durationMatch = /^\(([0-9]+(?:,[0-9]+)*)\)$/.exec(durationsText);
  if (!durationMatch) {
    throw new Error(`Invalid vblank durations: ${line}`);
  }

  const durations = durationMatch[1].split(",").map(Number);
  if (
    durations.length < 3 ||
    durations.length > 5 ||
    !Number.isInteger(startCycle) ||
    startCycle < 0 ||
    startCycle >= VBLANK_CYCLE_COUNT ||
    durations.some(
      (value) =>
        !Number.isInteger(value) || value <= 0 || value >= VBLANK_CYCLE_COUNT,
    )
  ) {
    throw new Error(`Invalid Feebas sample values: ${line}`);
  }

  const key = `${playingSong}|${weather}|${durations.length}`;
  const group = groups.get(key) ?? {
    playingSong,
    weather,
    records: [],
  };
  group.records.push([startCycle, ...durations]);
  groups.set(key, group);
}

const distance = (left: number[], right: number[]): number => {
  let squaredDistance = ((left[0] - right[0]) / VBLANK_CYCLE_COUNT) ** 2;
  for (let index = 1; index < left.length; index++) {
    squaredDistance += ((left[index] - right[index]) / DURATION_SCALE) ** 2;
  }

  return squaredDistance;
};

const closestRecordIndex = (
  records: number[][],
  centroid: number[],
): number => {
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  records.forEach((record, index) => {
    const candidateDistance = distance(record, centroid);
    if (candidateDistance < closestDistance) {
      closestIndex = index;
      closestDistance = candidateDistance;
    }
  });

  return closestIndex;
};

const assignRecords = (
  records: number[][],
  medoidIndexes: number[],
): number[][] => {
  const clusters = medoidIndexes.map(() => [] as number[]);
  records.forEach((record, recordIndex) => {
    let bestCluster = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    medoidIndexes.forEach((medoidIndex, clusterIndex) => {
      const candidateDistance = distance(record, records[medoidIndex]);
      if (candidateDistance < bestDistance) {
        bestCluster = clusterIndex;
        bestDistance = candidateDistance;
      }
    });
    clusters[bestCluster].push(recordIndex);
  });

  return clusters;
};

const summarize = (records: number[][]): WeightedScenario[] => {
  const scenarioCount = Math.ceil(records.length / SAMPLES_PER_SCENARIO);
  if (scenarioCount === records.length) {
    return records.map((record) => ({ record, weight: 1 }));
  }

  const centroid = records[0].map(
    (_, valueIndex) =>
      records.reduce((sum, record) => sum + record[valueIndex], 0) /
      records.length,
  );
  const medoidIndexes = [closestRecordIndex(records, centroid)];
  const nearestDistances = records.map((record) =>
    distance(record, records[medoidIndexes[0]]),
  );
  while (medoidIndexes.length < scenarioCount) {
    let farthestIndex = 0;
    for (let index = 1; index < records.length; index++) {
      if (nearestDistances[index] > nearestDistances[farthestIndex]) {
        farthestIndex = index;
      }
    }

    medoidIndexes.push(farthestIndex);
    records.forEach((record, index) => {
      nearestDistances[index] = Math.min(
        nearestDistances[index],
        distance(record, records[farthestIndex]),
      );
    });
  }

  for (let iteration = 0; iteration < 3; iteration++) {
    const clusters = assignRecords(records, medoidIndexes);
    clusters.forEach((memberIndexes, clusterIndex) => {
      if (memberIndexes.length === 0) {
        return;
      }

      const center = records[0].map(
        (_, valueIndex) =>
          memberIndexes.reduce(
            (sum, index) => sum + records[index][valueIndex],
            0,
          ) / memberIndexes.length,
      );
      const members = memberIndexes.map((index) => records[index]);
      medoidIndexes[clusterIndex] =
        memberIndexes[closestRecordIndex(members, center)];
    });
  }

  const clusters = assignRecords(records, medoidIndexes);
  return clusters
    .map((memberIndexes, index) => ({
      record: records[medoidIndexes[index]],
      weight: memberIndexes.length,
    }))
    .filter((scenario) => scenario.weight > 0)
    .sort((left, right) => left.record[0] - right.record[0]);
};

const contexts = new Map<
  string,
  { playingSong: string; weather: string; scenarios: WeightedScenario[] }
>();
for (const group of groups.values()) {
  const key = `${group.playingSong}|${group.weather}`;
  const context = contexts.get(key) ?? {
    playingSong: group.playingSong,
    weather: group.weather,
    scenarios: [],
  };
  context.scenarios.push(...summarize(group.records));
  contexts.set(key, context);
}

const entries = [...contexts.values()]
  .sort((left, right) =>
    `${left.playingSong}|${left.weather}`.localeCompare(
      `${right.playingSong}|${right.weather}`,
    ),
  )
  .map(({ playingSong, weather, scenarios }) => {
    const weightedScenarios = scenarios
      .sort((left, right) => left.record[0] - right.record[0])
      .map(({ record, weight }) => {
        const [cycleAtStartOfCheckFeebas, ...vblankDurations] = record;

        return `      [${cycleAtStartOfCheckFeebas}, [${vblankDurations.join(", ")}], ${weight}],`;
      })
      .join("\n");

    return `  { playingSong: ${JSON.stringify(playingSong)}, weather: ${JSON.stringify(weather)}, scenarios: [\n${weightedScenarios}\n  ] },`;
  });

const output = `import type { Wild3PlayingSong, Wild3Weather } from "~/rngTools";

export type FeebasCycleScenario = readonly [
  cycleAtStartOfCheckFeebas: number,
  vblankDurations: readonly number[],
  sampleWeight: number,
];

export type FeebasCycleDatasetGroup = {
  playingSong: Wild3PlayingSong;
  weather: Wild3Weather;
  scenarios: readonly FeebasCycleScenario[];
};

export const feebasCycleDataset: readonly FeebasCycleDatasetGroup[] = [
${entries.join("\n")}
];
`;

const prettierConfig = await resolveConfig(outputPath);
await writeFile(
  outputPath,
  await format(output, { ...prettierConfig, filepath: outputPath }),
);
