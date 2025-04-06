export type GenericForm = Record<string, unknown>;

export type GuaranteeFormNameType<FormState extends GenericForm, Type> = {
  [K in keyof FormState]: FormState[K] extends Type
    ? K extends string
      ? K
      : never
    : never;
}[keyof FormState];
