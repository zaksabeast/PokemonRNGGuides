import { FormikSelect } from "../select";

type Game = "ruby" | "sapphire";
type Action = "walk" | "fish";

type FormState = {
  game: Game;
  nullableGame: Game | null;
  level: number;
  actions: Action[];
  nested: { game: Game };
};

const gameOptions = [
  { label: "Ruby", value: "ruby" },
  { label: "Sapphire", value: "sapphire" },
] satisfies { label: string; value: Game }[];

const actionOptions = [
  { label: "Walk", value: "walk" },
  { label: "Fish", value: "fish" },
] satisfies { label: string; value: Action }[];

export const SingleSelectTest = () => (
  <>
    <FormikSelect<FormState, "game"> name="game" options={gameOptions} />
    <FormikSelect<FormState, "nullableGame">
      name="nullableGame"
      options={[{ label: "None", value: null }, ...gameOptions]}
    />
    <FormikSelect<FormState, "nested.game">
      name="nested.game"
      options={gameOptions}
    />
    <FormikSelect<FormState, "level">
      name="level"
      options={[{ label: "5", value: 5 }]}
    />
  </>
);

export const SingleOptionTypeTest = () => (
  <>
    <FormikSelect<FormState, "game">
      name="game"
      // @ts-expect-error options must match the field type
      options={[{ label: "Emerald", value: "emerald" }]}
    />
    <FormikSelect<FormState, "level">
      name="level"
      // @ts-expect-error options must match the field type
      options={gameOptions}
    />
    <FormikSelect<FormState, "game">
      name="game"
      // @ts-expect-error null options need a nullable field
      options={[{ label: "None", value: null }]}
    />
  </>
);

export const MultiSelectTest = () => (
  <>
    <FormikSelect<FormState, "actions">
      name="actions"
      mode="multiple"
      options={actionOptions}
      selectAllNoneButtons
    />
    <FormikSelect<FormState, "actions">
      name="actions"
      mode="multiple"
      // @ts-expect-error options must match the array's item type
      options={[{ label: "Surf", value: "surf" }]}
    />
    <FormikSelect<FormState, "actions">
      name="actions"
      mode="multiple"
      // @ts-expect-error options must match the array's item type
      options={[{ label: "1", value: 1 }]}
    />
  </>
);

export const ModeTest = () => (
  <>
    {/* @ts-expect-error multiple mode needs an array field */}
    <FormikSelect<FormState, "game">
      name="game"
      mode="multiple"
      options={gameOptions}
    />
    {/* @ts-expect-error array fields need multiple mode */}
    <FormikSelect<FormState, "actions">
      name="actions"
      options={actionOptions}
    />
    {/* @ts-expect-error select all/none buttons need multiple mode */}
    <FormikSelect<FormState, "game">
      name="game"
      options={gameOptions}
      selectAllNoneButtons
    />
  </>
);
