import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Ivs } from "~/rngTools";
import { z } from "zod";
import { StatFieldsInput } from "./statFieldsInput";
import { GridProps } from "./grid";

const EvSchema = z.number().int().min(0).max(255);

export const EvsSchema: z.Schema<Record<keyof Ivs, number>> = z.object({
  hp: EvSchema,
  atk: EvSchema,
  def: EvSchema,
  spa: EvSchema,
  spd: EvSchema,
  spe: EvSchema,
});

export type Evs = z.infer<typeof EvsSchema>;

type Props<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<FormState, Evs>;
  gridOverrides?: Partial<GridProps>;
  onChange?: (evs: Evs) => void;
};

export const EvInput = <FormState extends GenericForm>({
  name,
  gridOverrides,
  onChange,
}: Props<FormState>) => {
  return (
    <StatFieldsInput<FormState, Evs>
      name={name}
      onChange={onChange}
      gridOverrides={gridOverrides}
    />
  );
};
