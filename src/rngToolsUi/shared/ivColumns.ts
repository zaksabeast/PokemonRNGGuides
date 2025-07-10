import * as tst from "ts-toolbelt";
import { ResultColumn } from "~/components";
import { InheritedIv, InheritedIvs, Ivs } from "~/rngTools";
import { match, P } from "ts-pattern";
import { NullableIvs } from "~/components/ivInput";
import { LanguageKey } from "~/guides";
import { createTranslator, Translations } from "~/utils/siteLanguage";

const englishTranslations = {
  HP: "HP",
  Atk: "Atk",
  Def: "Def",
  SpA: "SpA",
  SpD: "SpD",
  Spe: "Spe",
} as const;

const translations = {
  en: englishTranslations,
  es: englishTranslations,
  zh: englishTranslations,
  fr: englishTranslations,
  it: {
    HP: "PS",
    Atk: "Att",
    Def: "Dif",
    SpA: "Att Sp",
    SpD: "Dif Sp",
    Spe: "Vel",
  },
} as const satisfies Translations<typeof englishTranslations>;

const t = createTranslator(translations);

export type FlattenIvs<T extends { ivs: Record<keyof Ivs, unknown> }> =
  tst.O.Merge<tst.O.Omit<T, "ivs">, T["ivs"]>;

export const ivColumns = [
  { title: "HP", dataIndex: "hp" },
  { title: "Atk", dataIndex: "atk" },
  { title: "Def", dataIndex: "def" },
  { title: "SpA", dataIndex: "spa" },
  { title: "SpD", dataIndex: "spd" },
  { title: "Spe", dataIndex: "spe" },
] as const satisfies ResultColumn<Ivs>[];

export const getIvColumns = (language: LanguageKey = "en") => {
  return ivColumns.map((column) => ({
    ...column,
    title: t(column.title, language),
  }));
};

const renderNullableIv = (iv: number | null) => {
  return iv?.toString() ?? "?";
};

export const nullableIvColumns = [
  { title: "HP", dataIndex: "hp", render: renderNullableIv },
  { title: "Atk", dataIndex: "atk", render: renderNullableIv },
  { title: "Def", dataIndex: "def", render: renderNullableIv },
  { title: "SpA", dataIndex: "spa", render: renderNullableIv },
  { title: "SpD", dataIndex: "spd", render: renderNullableIv },
  { title: "Spe", dataIndex: "spe", render: renderNullableIv },
] as const satisfies ResultColumn<NullableIvs>[];

const renderInheritedIv = (iv: InheritedIv) => {
  return match(iv)
    .with({ Random: P.number }, (matched) => matched.Random)
    .with({ Parent1: P.number }, (matched) => matched.Parent1)
    .with({ Parent2: P.number }, (matched) => matched.Parent2)
    .with({ Parent1: undefined }, () => "P1")
    .with({ Parent2: undefined }, () => "P2")
    .exhaustive();
};

export const inheritedIvColumns = [
  { title: "HP", dataIndex: "hp", render: renderInheritedIv },
  { title: "Atk", dataIndex: "atk", render: renderInheritedIv },
  { title: "Def", dataIndex: "def", render: renderInheritedIv },
  { title: "SpA", dataIndex: "spa", render: renderInheritedIv },
  { title: "SpD", dataIndex: "spd", render: renderInheritedIv },
  { title: "Spe", dataIndex: "spe", render: renderInheritedIv },
] as const satisfies ResultColumn<InheritedIvs>[];

export const flattenIvs = <T extends { ivs: Record<keyof Ivs, unknown> }>({
  ivs,
  ...obj
}: T) => {
  // tst.O.Omit has more accurate types than TS's Omit, so they aren't equal,
  // but this should be a safe cast.
  return { ...obj, ...ivs } as FlattenIvs<T>;
};
