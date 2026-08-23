import {
  Field,
  FormikRadio,
  FormikSwitch,
  Flex,
  Button,
  Grid,
  FormikTextArea,
} from "~/components";
import { z } from "zod";
import { initialProfile5Values, Profile5Validator } from "./shared/validator";
import { profile5Fields } from "./shared/fields";
import { Profile5Searcher, ValidatorMapper } from "./shared/form";
import { useField } from "~/hooks/form";
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

type NeedlButtonProps = {
  needle: string;
  onClick: () => void;
};

const NeedlButton = ({ needle, onClick }: NeedlButtonProps) => {
  return (
    <Button trackerId={needleId(needle)} onClick={onClick}>
      {needle}
    </Button>
  );
};

const NeedleGrid = () => {
  const [{ value }, , { setValue }] = useField<string>("needles");

  const getOnClick = (needle: string) => {
    return () => setValue(value + needle);
  };

  return (
    <Flex justify="center">
      <Flex maxWidth={300}>
        <Grid mobile={3} tablet={3} desktop={3}>
          <NeedlButton needle="↖" onClick={getOnClick("↖")} />
          <NeedlButton needle="↑" onClick={getOnClick("↑")} />
          <NeedlButton needle="↗" onClick={getOnClick("↗")} />
          <NeedlButton needle="←" onClick={getOnClick("←")} />
          <div />
          <NeedlButton needle="→" onClick={getOnClick("→")} />
          <NeedlButton needle="↙" onClick={getOnClick("↙")} />
          <NeedlButton needle="↓" onClick={getOnClick("↓")} />
          <NeedlButton needle="↘" onClick={getOnClick("↘")} />
        </Grid>
      </Flex>
    </Flex>
  );
};

const NeedleInput = () => {
  return (
    <Flex gap={8} mv={16}>
      <NeedleGrid />
      <FormikTextArea<FormState> name="needles" />
    </Flex>
  );
};

const fields: Field[] = [
  ...profile5Fields,
  {
    label: "Memory Link",
    input: <FormikSwitch<FormState> name="memory_link" />,
  },
  {
    label: "Unova Link",
    input: (
      <FormikRadio<FormState>
        name="unova_link"
        options={[
          { label: "Unova Link", value: "unova_link" },
          { label: "Save", value: "save" },
        ]}
      />
    ),
  },
  {
    label: "Needles",
    direction: "column",
    input: <NeedleInput />,
  },
];

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
      fields={fields}
      initialValues={initialValues}
      validationSchema={Validator}
      cancelTrackerId="profile5-searcher-seed-cancel"
      submitTrackerId="profile5-searcher-seed"
      mapValidator={mapValidator}
    />
  );
};
