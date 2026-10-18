import { z } from "zod";
import { type Ivs, type Nature } from "~/rngTools";
import { type PkmFilterFields } from "../pkmFilter";
import { type NullableIvs } from "../ivInput";
import { StatFieldsSchema, defaultMinMaxStats } from "~/types/stat";
import {
  IvFields,
  NatureField,
  NatureFilterField,
  NullableIvFields,
  PkmFilter,
  StatGrid,
  StatRadioFields,
} from "../form";

type FilterForm = PkmFilterFields & {
  parentIvs: NullableIvs;
  nature: Nature;
  level: number;
  partialStats: { hp: number; atk: number };
  namedStats: {
    hp: string;
    atk: string;
    def: string;
    spa: string;
    spd: string;
    spe: string;
  };
};

export const StatGridTest = () => (
  <>
    <StatGrid<FilterForm> name="filter_max_ivs" />
    <StatGrid<FilterForm> name="parentIvs" />
    {/* @ts-expect-error the field needs all six stats */}
    <StatGrid<FilterForm> name="partialStats" />
    {/* @ts-expect-error stats must be numbers */}
    <StatGrid<FilterForm> name="namedStats" />
    {/* @ts-expect-error number fields can't be used */}
    <StatGrid<FilterForm> name="level" />
  </>
);

type StatForm = z.infer<typeof StatFieldsSchema> & { level: number };

type OtherForm = { ivs: Ivs; level: number };

export const IvFieldsTest = () => (
  <>
    <IvFields<FilterForm> name="filter_min_ivs" title="Min IVs" />
    <NullableIvFields<FilterForm> name="parentIvs" title="Parent IVs" />
    {/* @ts-expect-error number fields can't be used */}
    <IvFields<FilterForm> name="level" title="Level" />
  </>
);

export const NatureFieldTest = () => (
  <>
    <NatureField<FilterForm> name="nature" />
    <NatureFilterField<FilterForm> name="filter_nature" />
    {/* @ts-expect-error a single nature field needs NatureField */}
    <NatureFilterField<FilterForm> name="nature" />
    {/* @ts-expect-error a nature list needs NatureFilterField */}
    <NatureField<FilterForm> name="filter_nature" />
  </>
);

export const PkmFilterTest = () => (
  <>
    <PkmFilter<FilterForm>
      generation={8}
      species="Pikachu"
      displayShiny={false}
    />
    {/* @ts-expect-error the form needs the pkm filter fields */}
    <PkmFilter<OtherForm> generation={8} />
  </>
);

export const StatRadioFieldsTest = () => (
  <>
    <StatRadioFields<StatForm> minMaxStats={defaultMinMaxStats} />
    {/* @ts-expect-error the form needs the stat fields */}
    <StatRadioFields<OtherForm> minMaxStats={defaultMinMaxStats} />
  </>
);
