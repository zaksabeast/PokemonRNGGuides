import { GenderRatio, Nature } from "~/rngTools";

export const CuteCharmGenders = ["Male", "Female"] as const;
type CuteCharmGender = (typeof CuteCharmGenders)[number];

export const maxShinyOddsCuteCharmTsvs = [0, 1, 2];

const cuteCharmTsvs: {
  targetGender: CuteCharmGender;
  ratio?: GenderRatio;
  natures: Nature[];
  tsv: number;
}[] = [
  {
    targetGender: "Female",
    natures: [
      "Hardy",
      "Lonely",
      "Brave",
      "Adamant",
      "Naughty",
      "Bold",
      "Docile",
      "Relaxed",
    ],
    tsv: 0,
  },
  {
    targetGender: "Female",
    natures: [
      "Impish",
      "Lax",
      "Timid",
      "Hasty",
      "Serious",
      "Jolly",
      "Naive",
      "Modest",
    ],
    tsv: 1,
  },
  {
    targetGender: "Female",
    natures: [
      "Mild",
      "Quiet",
      "Bashful",
      "Rash",
      "Calm",
      "Gentle",
      "Sassy",
      "Careful",
    ],
    tsv: 2,
  },
  {
    targetGender: "Female",
    natures: ["Quirky"],
    tsv: 3,
  },
  {
    targetGender: "Male",
    ratio: "OneToSeven",
    natures: ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold"],
    tsv: 6,
  },
  {
    targetGender: "Male",
    ratio: "OneToSeven",
    natures: [
      "Docile",
      "Relaxed",
      "Impish",
      "Lax",
      "Timid",
      "Hasty",
      "Serious",
      "Jolly",
    ],
    tsv: 7,
  },
  {
    targetGender: "Male",
    ratio: "OneToSeven",
    natures: [
      "Naive",
      "Modest",
      "Mild",
      "Quiet",
      "Bashful",
      "Rash",
      "Calm",
      "Gentle",
    ],
    tsv: 8,
  },
  {
    targetGender: "Male",
    ratio: "OneToSeven",
    natures: ["Sassy", "Careful", "Quirky"],
    tsv: 9,
  },
  {
    targetGender: "Male",
    ratio: "OneToThree",
    natures: ["Hardy", "Lonely", "Brave", "Adamant", "Naughty"],
    tsv: 9,
  },
  {
    targetGender: "Male",
    ratio: "OneToThree",
    natures: [
      "Bold",
      "Docile",
      "Relaxed",
      "Impish",
      "Lax",
      "Timid",
      "Hasty",
      "Serious",
    ],
    tsv: 10,
  },
  {
    targetGender: "Male",
    ratio: "OneToThree",
    natures: [
      "Jolly",
      "Naive",
      "Modest",
      "Mild",
      "Quiet",
      "Bashful",
      "Rash",
      "Calm",
    ],
    tsv: 11,
  },
  {
    targetGender: "Male",
    ratio: "OneToThree",
    natures: ["Gentle", "Sassy", "Careful", "Quirky"],
    tsv: 12,
  },
  {
    targetGender: "Male",
    ratio: "OneToOne",
    natures: ["Hardy", "Lonely"],
    tsv: 18,
  },
  {
    targetGender: "Male",
    ratio: "OneToOne",
    natures: [
      "Brave",
      "Adamant",
      "Naughty",
      "Bold",
      "Docile",
      "Relaxed",
      "Impish",
      "Lax",
    ],
    tsv: 19,
  },
  {
    targetGender: "Male",
    ratio: "OneToOne",
    natures: [
      "Timid",
      "Hasty",
      "Serious",
      "Jolly",
      "Naive",
      "Modest",
      "Mild",
      "Quiet",
    ],
    tsv: 20,
  },
  {
    targetGender: "Male",
    ratio: "OneToOne",
    natures: [
      "Bashful",
      "Rash",
      "Calm",
      "Gentle",
      "Sassy",
      "Careful",
      "Quirky",
    ],
    tsv: 21,
  },
  {
    targetGender: "Male",
    ratio: "ThreeToOne",
    natures: [
      "Hardy",
      "Lonely",
      "Brave",
      "Adamant",
      "Naughty",
      "Bold",
      "Docile",
      "Relaxed",
    ],
    tsv: 25,
  },
  {
    targetGender: "Male",
    ratio: "ThreeToOne",
    natures: [
      "Impish",
      "Lax",
      "Timid",
      "Hasty",
      "Serious",
      "Jolly",
      "Naive",
      "Modest",
    ],
    tsv: 26,
  },
  {
    targetGender: "Male",
    ratio: "ThreeToOne",
    natures: [
      "Mild",
      "Quiet",
      "Bashful",
      "Rash",
      "Calm",
      "Gentle",
      "Sassy",
      "Careful",
    ],
    tsv: 27,
  },
  { targetGender: "Male", ratio: "ThreeToOne", natures: ["Quirky"], tsv: 28 },
] as const;

export const getCuteCharmTsvs = ({
  targetGender,
  ratio,
  nature,
}: {
  targetGender: CuteCharmGender;
  ratio: GenderRatio | null;
  nature: Nature | null;
}) => {
  return cuteCharmTsvs
    .filter((cuteCharmTsv) => {
      return (
        cuteCharmTsv.targetGender === targetGender &&
        (cuteCharmTsv.ratio == null ||
          cuteCharmTsv.ratio == null ||
          cuteCharmTsv.ratio === ratio) &&
        (nature != null ? cuteCharmTsv.natures.includes(nature) : true)
      );
    })
    .map(({ tsv }) => tsv);
};

export const getCuteCharmTsvProps = (
  tsv: number,
): {
  targetGender: CuteCharmGender;
  natures: Nature[];
  genderRatios: GenderRatio[];
} => {
  const tsvProps = cuteCharmTsvs.filter(
    (cuteCharmTsv) => cuteCharmTsv.tsv === tsv,
  );

  if (tsvProps.length === 0) {
    // This shouldn't happen, but we'll return something anyways
    // Better for a user to have a visible bug they can report than an invisible runtime error
    return {
      targetGender: "Female",
      natures: [],
      genderRatios: [],
    };
  }

  return {
    // Target gender will always be the same for a given tsv
    targetGender: tsvProps[0].targetGender,
    natures: tsvProps.flatMap(({ natures }) => natures),
    genderRatios: tsvProps
      .map(({ ratio }) => ratio)
      .filter((ratio) => ratio != null),
  };
};
