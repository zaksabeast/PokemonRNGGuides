import { forEach } from "lodash-es";
import { P, match } from "ts-pattern";
import { ivInput, IvString } from "./components/ivInput";
import { input } from "./components/input";
import { radio } from "./components/radio";
import { select } from "./components/select";
import { switchInput } from "./components/switch";

export type FormField =
  | string
  | {
      type: "input";
      value: string;
    }
  | {
      type: "select";
      value: string;
    }
  | {
      type: "ivs";
      value: IvString;
    }
  | {
      type: "switch";
      value: boolean;
    }
  | {
      type: "radio";
      value: string;
    };

export type AssertableForm<FormState> = Record<keyof FormState, FormField>;

const assert = <FormState extends Record<string, unknown>>({
  form,
  parentSelector,
}: {
  form: AssertableForm<FormState>;
  parentSelector?: string;
}) => {
  forEach(form, (field: FormField, name) => {
    match(field)
      .with(P.string, (matched) =>
        input.assert({ parentSelector, name, value: matched }),
      )
      .with({ type: "input" }, (matched) =>
        input.assert({ parentSelector, name, ...matched }),
      )
      .with({ type: "select" }, (matched) =>
        select.assert({ parentSelector, name, ...matched }),
      )
      .with({ type: "ivs" }, (matched) =>
        ivInput.assert({ parentSelector, name, ...matched }),
      )
      .with({ type: "switch" }, (matched) =>
        switchInput.assert({ parentSelector, name, ...matched }),
      )
      .with({ type: "radio" }, (matched) =>
        radio.assert({ parentSelector, name, ...matched }),
      )
      .exhaustive();
  });
};

const set = <FormState extends Record<string, unknown>>({
  form,
  parentSelector,
}: {
  form: AssertableForm<FormState>;
  parentSelector?: string;
}) => {
  forEach(form, (field: FormField, name) => {
    match(field)
      .with(P.string, (matched) =>
        input.set({ parentSelector, name, value: matched }),
      )
      .with({ type: "input" }, (matched) =>
        input.set({ parentSelector, name, ...matched }),
      )
      .with({ type: "select" }, (matched) =>
        select.set({ parentSelector, name, ...matched }),
      )
      .with({ type: "ivs" }, (matched) =>
        ivInput.set({ parentSelector, name, ...matched }),
      )
      .with({ type: "switch" }, (matched) =>
        switchInput.set({ parentSelector, name, ...matched }),
      )
      .with({ type: "radio" }, (matched) =>
        radio.set({ parentSelector, name, ...matched }),
      )
      .exhaustive();
  });
};

export const form = {
  assert,
  set,
};
