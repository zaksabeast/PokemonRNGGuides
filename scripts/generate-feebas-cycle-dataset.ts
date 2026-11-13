import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { format, resolveConfig } from "prettier";

type SampleGroup = {
  playingSong: string;
  weather: string;
  durationCount: number;
  records: number[][];
};

type WeightedScenario = {
  record: number[];
  weight: number;
};

const VBLANK_CYCLE_COUNT = 280_896;
const DURATION_SCALE = 90_000;
const SAMPLES_PER_SCENARIO = 8;

const samplePath = resolve(
  import.meta.dir,
  "../src/rngToolsUi/gen3/wild/data/initial_cycle/feebas_cycles_samples.txt",
);
const outputPath = resolve(
  import.meta.dir,
  "../src/rngToolsUi/gen3/wild/data/initial_cycle/feebas_cycle_dataset.ts",
);

const groups = new Map<string, SampleGroup>();
const source = await readFile(samplePath, "utf8");

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
    durationCount: durations.length,
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

const entries = [...groups.values()]
  .sort((left, right) =>
    `${left.playingSong}|${left.weather}|${left.durationCount}`.localeCompare(
      `${right.playingSong}|${right.weather}|${right.durationCount}`,
    ),
  )
  .map(({ playingSong, weather, durationCount, records }) => {
    const scenarios = summarize(records)
      .map(({ record, weight }) => {
        const [cycleAtStartOfCheckFeebas, ...vblankDurations] = record;

        return `      [${cycleAtStartOfCheckFeebas}, [${vblankDurations.join(", ")}], ${weight}],`;
      })
      .join("\n");

    return `  { playingSong: ${JSON.stringify(playingSong)}, weather: ${JSON.stringify(weather)}, durationCount: ${durationCount}, scenarios: [\n${scenarios}\n  ] },`;
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
  durationCount: 3 | 4 | 5;
  scenarios: readonly FeebasCycleScenario[];
};

export const feebasCycleDataset = [
${entries.join("\n")}
] as const satisfies readonly FeebasCycleDatasetGroup[];
`;

const prettierConfig = await resolveConfig(outputPath);
await writeFile(
  outputPath,
  await format(output, { ...prettierConfig, filepath: outputPath }),
);
