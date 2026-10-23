import type {
  CalibrationComponent,
  RawCdfKnot,
} from "./vblank_calibration_types";

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
  numerator: number;
  denominator: number;
};

export function fakeAudioDatasets(): FakeAudioDataset[] {
  const fishing = fishingSongs.map((song) => ({
    name: `${song}_FISHING_SUNNY_AUDIO`,
    numerator: 5,
    denominator: 4,
  }));
  const weather = [
    { song: "ROUTE119", numerator: 1, denominator: 1 },
    { song: "SURF", numerator: 3, denominator: 2 },
  ].flatMap(({ song, numerator, denominator }) => [
    {
      name: `${song}_RAIN_AUDIO`,
      numerator: numerator * 11,
      denominator: denominator * 10,
    },
    {
      name: `${song}_THUNDERSTORM_AUDIO`,
      numerator: numerator * 6,
      denominator: denominator * 5,
    },
  ]);
  const fishingWeather = [
    { name: "ROUTE119_FISHING_RAIN_AUDIO", numerator: 55, denominator: 40 },
    {
      name: "ROUTE119_FISHING_THUNDERSTORM_AUDIO",
      numerator: 30,
      denominator: 20,
    },
  ];

  return [
    { name: "CYCLING_SUNNY_AUDIO", numerator: 2, denominator: 3 },
    { name: "CYCLING_FISHING_SUNNY_AUDIO", numerator: 5, denominator: 6 },
    { name: "CYCLING_FISHING_RAIN_AUDIO", numerator: 11, denominator: 12 },
    { name: "SURF_SUNNY_AUDIO", numerator: 3, denominator: 2 },
    { name: "SURF_FISHING_SUNNY_AUDIO", numerator: 27, denominator: 20 },
    { name: "ROUTE119_SUNNY_AUDIO", numerator: 1, denominator: 1 },
    { name: "ROUTE120_SUNNY_AUDIO", numerator: 1, denominator: 1 },
    { name: "ROUTE122_SUNNY_AUDIO", numerator: 1, denominator: 1 },
    { name: "ROUTE120_RAIN_AUDIO", numerator: 11, denominator: 10 },
    ...fishing,
    ...weather,
    { name: "ROUTE122_RAIN_AUDIO", numerator: 11, denominator: 10 },
    ...fishingWeather,
    { name: "ROUTE122_FISHING_RAIN_AUDIO", numerator: 55, denominator: 40 },
  ];
}

export function fakeAudioComponents(
  source: CalibrationComponent,
): Record<string, CalibrationComponent> {
  return Object.fromEntries(
    fakeAudioDatasets().map((dataset) => [
      dataset.name,
      scaleFakeAudio(source, dataset.numerator, dataset.denominator),
    ]),
  );
}

function scaleFakeAudio(
  source: CalibrationComponent,
  // TODO: Merge numerator and denominator with a single number. Precision for fake data is not important.
  numerator: number,
  denominator: number,
): CalibrationComponent {
  const scale = (cycle: number) =>
    Math.round((cycle * numerator) / denominator);
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
      safety_margin_cycles: 0,
      attempts: 0,
      incomplete_loop: true,
    },
  };
}
