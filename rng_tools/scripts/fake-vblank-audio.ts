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

export function fakeAudioCode(): string {
  const datasets = fakeAudioDatasets().map(
    ({ name, numerator, denominator }) => `    (
        "${name}",
        fake_audio_distribution(
            &scaled_audio_knots::<{ ROUTE101_AUDIO.cdf.knots.len() }>(${numerator}, ${denominator}),
            ${numerator}, ${denominator},
        ),
    ),`,
  );

  return `// Synthetic placeholders scale Route 101 audio, not measured captures.
// MUS_ROUTE122 is the song used on Route 123.
const fn scaled_audio_cycle(cycle: usize, numerator: usize, denominator: usize) -> usize {
    (cycle * numerator + denominator / 2) / denominator
}

const fn scaled_audio_knots<const N: usize>(numerator: usize, denominator: usize) -> [CdfKnot; N] {
    let mut knots = [CdfKnot { cycle: 0.0, probability: 0.0, integral: 0.0 }; N];
    let mut index = 0;

    while index < N {
        let source = ROUTE101_AUDIO.cdf.knots[index];
        let cycle = scaled_audio_cycle(source.cycle as usize, numerator, denominator) as f64;
        let integral = if index == 0 {
            0.0
        } else {
            let previous = knots[index - 1];

            previous.integral + (cycle - previous.cycle) * (source.probability + previous.probability) / 2.0
        };
        knots[index] = CdfKnot { cycle, probability: source.probability, integral };
        index += 1;
    }

    knots
}

const fn fake_audio_distribution(knots: &'static [CdfKnot], numerator: usize, denominator: usize) -> ComponentDistribution {
    let source = ROUTE101_AUDIO.summary;

    ComponentDistribution {
        is_fake: true,
        summary: MinMidMax::new(
            scaled_audio_cycle(source.min, numerator, denominator),
            scaled_audio_cycle(source.mid, numerator, denominator),
            scaled_audio_cycle(source.max, numerator, denominator),
        ),
        cdf: PiecewiseCdf { knots },
        provenance: CalibrationProvenance {
            source: "synthetic: scaled ROUTE101_AUDIO; not measured",
            sha256: "",
            attempts: 0,
            distinct_frames: 0,
            frame_start: 0,
            frame_end: 0,
            duplicate_attempts: 0,
            missing_frames: 0,
            song_loop_frames: 0.0,
            incomplete_loop: true,
            max_cdf_error: 0.0,
            safety_margin_cycles: 0,
        },
    }
}

#[cfg_attr(not(test), expect(dead_code, reason = "Synthetic datasets are staged for vblank setup support."))]
pub(super) const FAKE_AUDIO_CALIBRATIONS: &[(&str, ComponentDistribution)] = &[
${datasets.join("\n")}
];
`;
}
