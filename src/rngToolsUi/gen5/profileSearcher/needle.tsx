import styled from "@emotion/styled";
import {
  FormRadioField,
  FormSection,
  FormSwitchField,
  FormTextField,
  OutlinedButton,
} from "~/components/form";
import { z } from "zod";
import { initialProfile5Values, Profile5Validator } from "./shared/validator";
import { Profile5Searcher, ValidatorMapper } from "./shared/form";
import { useField } from "~/hooks/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { type Profile5Needle } from "~/rngTools";

const NEEDLES = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"] as const;
type Needle = (typeof NEEDLES)[number];

const NeedleToSymbol = Object.freeze({
  "↑": "Up",
  "↗": "UpRight",
  "→": "Right",
  "↘": "DownRight",
  "↓": "Down",
  "↙": "DownLeft",
  "←": "Left",
  "↖": "UpLeft",
}) satisfies Record<Needle, Profile5Needle>;

const isNeedle = (char: string): char is Needle => {
  return Object.hasOwn(NeedleToSymbol, char);
};

const Validator = z
  .object({
    memory_link: z.boolean(),
    unova_link: z.enum(["unova_link", "save"]),
    needles: z.string().refine(
      (val) => {
        const chars = val.split("");
        return chars.every(isNeedle);
      },
      {
        message: `Needles must be one of the following characters: ${NEEDLES.join(" ")}`,
      },
    ),
  })
  .extend(Profile5Validator.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  ...initialProfile5Values,
  memory_link: false,
  unova_link: "unova_link",
  needles: "",
};

const needleId = (needle: string) => `profile5-searcher-needle-${needle}`;

const NeedleButtons = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 8,
  width: "100%",
  maxWidth: 300,
  marginInline: "auto",
});

// Laid out like a compass, with the center left empty
const needleLayout = [
  "↖",
  "↑",
  "↗",
  "←",
  null,
  "→",
  "↙",
  "↓",
  "↘",
] as const;

const NeedleGrid = () => {
  const [{ value }, , { setValue }] = useField<string>("needles");

  return (
    <NeedleButtons>
      {needleLayout.map((needle, index) =>
        needle == null ? (
          <div key={index} />
        ) : (
          <OutlinedButton
            key={needle}
            trackerId={needleId(needle)}
            onClick={() => setValue(value + needle)}
          >
            {needle}
          </OutlinedButton>
        ),
      )}
    </NeedleButtons>
  );
};

const Fields = () => {
  const t = useActiveRouteTranslations();

  return (
    <FormSection title={t["Calibration"]}>
      <FormSwitchField<FormState> name="memory_link" label={t["Memory Link"]} />
      <FormRadioField<FormState>
        name="unova_link"
        label={t["Unova Link"]}
        cellSize="word"
        options={[
          { label: t["Unova Link"], value: "unova_link" },
          { label: t["Save"], value: "save" },
        ]}
      />
      <NeedleGrid />
      <FormTextField<FormState> name="needles" label={t["Needles"]} />
    </FormSection>
  );
};

const mapValidator: ValidatorMapper<FormState> = (opts) => ({
  Needle: {
    memory_link: opts.memory_link,
    unova_link: opts.unova_link === "unova_link",
    needles: opts.needles
      .split("")
      .filter(isNeedle)
      .map((needle) => NeedleToSymbol[needle]),
  },
});

export const Profile5SearcherNeedle = () => {
  return (
    <Profile5Searcher<FormState>
      initialValues={initialValues}
      validationSchema={Validator}
      cancelTrackerId="profile5-searcher-seed-cancel"
      submitTrackerId="profile5-searcher-seed"
      mapValidator={mapValidator}
    >
      <Fields />
    </Profile5Searcher>
  );
};
