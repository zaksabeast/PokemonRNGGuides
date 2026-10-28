import type {
  CalibrationComponent,
  RawCdfKnot,
} from "./initial_cycle_calibration_types";

const fishingSongs = [
  "ABANDONED_SHIP",
  "CAVE_OF_ORIGIN",
  "DEWFORD",
  "EVER_GRANDE",
  "LILYCOVE",
  "MT_CHIMNEY",
  "MT_PYRE",
  "PETALBURG",
  "ROUTE101",
  "ROUTE104",
  "ROUTE110",
  "ROUTE118",
  "ROUTE119",
  "ROUTE120",
  "ROUTE122",
  "RUSTBORO",
  "SAFARI_ZONE",
  "SLATEPORT",
  "SOOTOPOLIS",
  "VICTORY_ROAD",
] as const;

type FakeAudioDataset = {
  name: string;
  multiplier: number;
};

export const fakeAudioDatasets = (): FakeAudioDataset[] => {
  const fishing = fishingSongs.map((song) => ({
    name: `${song}_FISHING_SUNNY_AUDIO`,
    multiplier: 1.25,
  }));
  const weather = [
    { song: "ROUTE119", multiplier: 1 },
    { song: "SURF", multiplier: 1.5 },
  ].flatMap(({ song, multiplier }) => [
    {
      name: `${song}_RAIN_AUDIO`,
      multiplier: multiplier * 1.1,
    },
    {
      name: `${song}_THUNDERSTORM_AUDIO`,
      multiplier: multiplier * 1.2,
    },
  ]);
  const fishingWeather = [
    { name: "ROUTE119_FISHING_RAIN_AUDIO", multiplier: 1.375 },
    {
      name: "ROUTE119_FISHING_THUNDERSTORM_AUDIO",
      multiplier: 1.5,
    },
  ];

  return [
    { name: "CYCLING_SUNNY_AUDIO", multiplier: 1 / 1.5 },
    { name: "CYCLING_FISHING_SUNNY_AUDIO", multiplier: 1.25 / 1.5 },
    { name: "CYCLING_FISHING_RAIN_AUDIO", multiplier: (1.25 / 1.5) * 1.1 },
    { name: "SURF_SUNNY_AUDIO", multiplier: 1.5 },
    { name: "SURF_FISHING_SUNNY_AUDIO", multiplier: 1.35 },
    { name: "ROUTE119_SUNNY_AUDIO", multiplier: 1 },
    { name: "ROUTE120_SUNNY_AUDIO", multiplier: 1 },
    { name: "ROUTE122_SUNNY_AUDIO", multiplier: 1 },
    { name: "ROUTE120_RAIN_AUDIO", multiplier: 1.1 },
    ...fishing,
    ...weather,
    { name: "ROUTE122_RAIN_AUDIO", multiplier: 1.1 },
    ...fishingWeather,
    { name: "ROUTE122_FISHING_RAIN_AUDIO", multiplier: 1.375 },
  ];
};

export const fakeAudioComponents = (
  source: CalibrationComponent,
): Record<string, CalibrationComponent> => {
  return Object.fromEntries(
    fakeAudioDatasets().map((dataset) => [
      dataset.name,
      scaleFakeAudio(source, dataset.multiplier),
    ]),
  );
};

const scaleFakeAudio = (
  source: CalibrationComponent,
  multiplier: number,
): CalibrationComponent => {
  const scale = (cycle: number) => Math.round(cycle * multiplier);
  const cdf: RawCdfKnot[] = [];
  for (const [cycle, probability] of source.cdf) {
    const previous = cdf.at(-1);
    const scaledCycle = scale(cycle);
    const integral =
      previous == null
        ? 0
        : previous[2] +
          ((scaledCycle - previous[0]) * (probability + previous[1])) / 2;
    cdf.push([scaledCycle, probability, integral]);
  }

  return {
    is_fake: true,
    summary: {
      min: scale(source.summary.min),
      mid: scale(source.summary.mid),
      max: scale(source.summary.max),
    },
    cdf,
    provenance: {
      source: "synthetic: scaled ROUTE101_AUDIO; not measured",
    },
  };
};
