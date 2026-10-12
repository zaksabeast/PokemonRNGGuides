import React from "react";
import { z } from "zod";
import { range } from "lodash-es";
import { type ResultColumn } from "~/components/resultTable";
import { Typography } from "~/components/typography";
import { PokemonFormPreview } from "./formPreviewPokemon";
import {
  DateField,
  FieldRow,
  FormBody,
  FormNumberField,
  FormMultiSelectField,
  FormRadioField,
  FormSection,
  FormSwitchField,
  MultiSelectField,
  NumberField,
  RadioField,
  SelectField,
  SwitchField,
  SwitchGroup,
  TextField,
  TimeField,
  ToolForm,
} from "~/components/form";
import { nature } from "~/types/nature";
import { type Nature, type RngDate } from "~/rngTools";
import { type RngTime, rngDate, rngTime } from "~/utils/time";
import { toOptions } from "~/utils/options";

const natureOptions = toOptions(nature);

const pokemonTypeOptions = toOptions([
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
]);

const PreviewSchema = z
  .object({
    tid: z.number().int().min(0).max(65535),
    sid: z.number().int().min(0).max(65535),
    maxAdvances: z.number().int().min(0).max(100000),
    gender: z.enum(["Male", "Female"]).nullable(),
    natures: z.array(z.enum(nature)),
    customCalibration: z.boolean(),
    calibration: z.number().int().min(-500).max(500),
  })
  .refine((form) => form.natures.length <= 5, {
    message: "Pick 5 natures or fewer",
    path: ["natures"],
  });

type PreviewFormState = z.infer<typeof PreviewSchema>;

const previewInitialValues: PreviewFormState = {
  tid: 0,
  sid: 0,
  maxAdvances: 10000,
  gender: null,
  natures: [],
  customCalibration: false,
  calibration: 19,
};

type PreviewResult = {
  key: string;
  tid: number;
  sid: number;
  maxAdvances: number;
  gender: string;
  natures: string;
  calibration: number;
};

const previewColumns: ResultColumn<PreviewResult>[] = [
  { title: "TID", dataIndex: "tid" },
  { title: "SID", dataIndex: "sid" },
  { title: "Max advances", dataIndex: "maxAdvances" },
  { title: "Gender", dataIndex: "gender" },
  { title: "Natures", dataIndex: "natures" },
  { title: "Calibration", dataIndex: "calibration" },
];

const SampleToolForm = () => {
  const [results, setResults] = React.useState<PreviewResult[]>([]);

  const onSubmit = async (values: PreviewFormState) => {
    setResults((previous) => [
      {
        key: String(previous.length),
        tid: values.tid,
        sid: values.sid,
        maxAdvances: values.maxAdvances,
        gender: values.gender ?? "Any",
        natures: values.natures.length > 0 ? values.natures.join(", ") : "Any",
        calibration: values.customCalibration ? values.calibration : 19,
      },
      ...previous,
    ]);
  };

  return (
    <ToolForm<PreviewFormState, PreviewResult>
      initialValues={previewInitialValues}
      validationSchema={PreviewSchema}
      onSubmit={onSubmit}
      submitTrackerId="form_preview_generate"
      allowReset
      resetTrackerId="form_preview_reset"
      onReset={() => setResults([])}
      columns={previewColumns}
      results={results}
      rowKey="key"
    >
      <FormSection title="Your game">
        <FieldRow>
          <FormNumberField<PreviewFormState>
            name="tid"
            label="TID"
            numType="decimal"
          />
          <FormNumberField<PreviewFormState>
            name="sid"
            label="SID"
            numType="decimal"
          />
        </FieldRow>
      </FormSection>
      <FormSection title="Search">
        <FormNumberField<PreviewFormState>
          name="maxAdvances"
          label="Max advances"
          numType="decimal"
          helperText="Try 200000 to see validation."
        />
      </FormSection>
      <FormSection title="Filters (try 6+ natures)">
        <FormRadioField<PreviewFormState>
          name="gender"
          label="Gender"
          cellSize="word"
          options={[
            { label: "Any", value: null },
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
        <FormMultiSelectField<PreviewFormState>
          name="natures"
          label="Nature"
          placeholder="Any"
          options={natureOptions}
        />
        <FormSwitchField<PreviewFormState>
          name="customCalibration"
          label="Custom calibration"
          supportingText="Using the default of 19"
        >
          <FormNumberField<PreviewFormState>
            name="calibration"
            label="Calibration"
            numType="decimal"
            helperText="Default is 19."
          />
        </FormSwitchField>
      </FormSection>
    </ToolForm>
  );
};

const compatibilityOptions = [
  { label: "The two seem to get along", value: "high" },
  { label: "The two seem to get along very well", value: "higher" },
  { label: "The two don't seem to like each other", value: "low" },
];

const monthOptions = [
  { label: "Any", value: "Any", muted: true },
  ...toOptions(["January", "February", "March", "April", "May", "June"]),
];

const genderOptions = [
  { label: "Any", value: "Any" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const consoleOptions = [
  { label: "NDS/DSi", value: "NdsDsi" },
  { label: "3DS (Normal Settings)", value: "3dsNormalSettings" },
  { label: "3DS (Alt Settings)", value: "3dsAltSettings" },
];

const atkOptions = toOptions(range(42, 59));

const ChoiceControls = () => {
  const [compatibility, setCompatibility] = React.useState("higher");
  const [month, setMonth] = React.useState("Any");
  const [natures, setNatures] = React.useState<Nature[]>([]);
  const [gender, setGender] = React.useState("Any");
  const [atk, setAtk] = React.useState(50);
  const [gameConsole, setGameConsole] = React.useState("NdsDsi");

  return (
    <>
      <FormSection title="Selects">
        <SelectField
          label="Compatibility"
          value={compatibility}
          options={compatibilityOptions}
          onChange={setCompatibility}
        />
        <SelectField
          label="Month"
          value={month}
          options={monthOptions}
          onChange={setMonth}
          tooltip={{
            title: "Month",
            description: '"Any" is muted because it means no filter.',
          }}
        />
        <MultiSelectField
          label="Nature"
          placeholder="Any"
          value={natures}
          options={natureOptions}
          onChange={setNatures}
        />
      </FormSection>

      <FormSection title="Radio groups">
        <RadioField
          label="Gender"
          cellSize="word"
          value={gender}
          options={genderOptions}
          onChange={setGender}
        />
        <RadioField
          label="Atk"
          cellSize="number"
          value={atk}
          options={atkOptions}
          onChange={setAtk}
        />
        <RadioField
          label="Console"
          cellSize="word"
          value={gameConsole}
          options={consoleOptions}
          onChange={setGameConsole}
        />
      </FormSection>
    </>
  );
};

const SwitchControls = () => {
  const [lightningRod, setLightningRod] = React.useState(true);
  const [roamer, setRoamer] = React.useState(false);
  const [customCalibration, setCustomCalibration] = React.useState(false);
  const [calibration, setCalibration] = React.useState<number | null>(19);
  const [hiddenPower, setHiddenPower] = React.useState(true);
  const [hiddenPowerTypes, setHiddenPowerTypes] = React.useState<string[]>([]);
  const [minPower, setMinPower] = React.useState<number | null>(30);
  const [maxPower, setMaxPower] = React.useState<number | null>(70);

  return (
    <>
      <FormSection title="Switches">
        <SwitchGroup>
          <SwitchField
            label="Has Lightning Rod"
            value={lightningRod}
            onChange={setLightningRod}
          />
          <SwitchField
            label="Roamer is active"
            value={roamer}
            onChange={setRoamer}
          />
        </SwitchGroup>
        <SwitchField label="Disabled" value={false} disabled />
      </FormSection>

      <FormSection title="Field ownership">
        <SwitchField
          label="Custom calibration"
          supportingText="Using the default of 19"
          tooltip={{
            title: "Custom calibration",
            description:
              "Only change this if the default keeps missing your target.",
          }}
          value={customCalibration}
          onChange={setCustomCalibration}
        >
          <NumberField
            label="Calibration"
            numType="decimal"
            value={calibration}
            onChange={setCalibration}
            helperText="Default is 19."
          />
        </SwitchField>
        <SwitchField
          label="Hidden Power"
          value={hiddenPower}
          onChange={setHiddenPower}
        >
          <MultiSelectField
            label="Type"
            placeholder="Any"
            value={hiddenPowerTypes}
            options={pokemonTypeOptions}
            onChange={setHiddenPowerTypes}
          />
          <FieldRow>
            <NumberField
              label="Min power"
              numType="decimal"
              value={minPower}
              onChange={setMinPower}
            />
            <NumberField
              label="Max power"
              numType="decimal"
              value={maxPower}
              onChange={setMaxPower}
            />
          </FieldRow>
        </SwitchField>
      </FormSection>
    </>
  );
};

const DateTimeControls = () => {
  const [date, setDate] = React.useState<RngDate | null>(rngDate());
  const [month, setMonth] = React.useState<RngDate | null>(null);
  const [time, setTime] = React.useState<RngTime | null>(rngTime());
  const [timeWithSeconds, setTimeWithSeconds] = React.useState<RngTime | null>(
    rngTime(),
  );

  return (
    <FormSection title="Dates and times">
      <FieldRow>
        <DateField label="Date" value={date} onChange={setDate} />
        <TimeField label="Time" value={time} onChange={setTime} />
      </FieldRow>
      <FieldRow>
        <DateField
          label="Month"
          picker="month"
          placeholder="Pick a month"
          value={month}
          onChange={setMonth}
        />
        <TimeField
          label="Time with seconds"
          showSecond
          value={timeWithSeconds}
          onChange={setTimeWithSeconds}
          tooltip={{
            title: "Time with seconds",
            description: "Some tools need the exact second.",
          }}
        />
      </FieldRow>
      <FieldRow>
        <DateField
          label="Error state"
          value={date}
          errorMessage="Must be 2000 or later"
        />
        <TimeField label="Disabled" value={time} disabled />
      </FieldRow>
    </FormSection>
  );
};

/** New form components, shown on the experiments page for review */
export const FormPreview = () => {
  const [tid, setTid] = React.useState<number | null>(0);
  const [sid, setSid] = React.useState<number | null>(0);
  const [maxAdvances, setMaxAdvances] = React.useState<number | null>(10000);
  const [seed, setSeed] = React.useState<number | null>(0xdeadbeef);
  const [nickname, setNickname] = React.useState("");
  const [calibration, setCalibration] = React.useState<number | null>(-95);

  return (
    <FormBody>
      <FormSection title="Your game">
        <FieldRow>
          <NumberField
            label="TID"
            numType="decimal"
            value={tid}
            onChange={setTid}
          />
          <NumberField
            label="SID"
            numType="decimal"
            value={sid}
            onChange={setSid}
          />
        </FieldRow>
        <NumberField
          label="Max advances"
          numType="decimal"
          value={maxAdvances}
          onChange={setMaxAdvances}
          helperText="Helper text sits here."
          tooltip={{
            title: "Max advances",
            description:
              "How many advances to search. Higher values take longer to generate.",
          }}
        />
        <NumberField
          label="Seed"
          numType="hex"
          value={seed}
          onChange={setSeed}
          tooltip={{
            title: "Seed",
            description:
              "Opening this tooltip closes the Max advances one, since only one can be open at a time.",
          }}
        />
      </FormSection>

      <ChoiceControls />
      <SwitchControls />
      <DateTimeControls />

      <FormSection title="Other states">
        <TextField
          label="Nickname"
          placeholder="Placeholder text"
          value={nickname}
          onChange={setNickname}
        />
        <NumberField
          label="Calibration (float, negative allowed)"
          numType="float"
          value={calibration}
          onChange={setCalibration}
        />
        <NumberField
          label="Error state"
          numType="decimal"
          value={70000}
          errorMessage="Must be 65535 or less"
        />
        <NumberField label="Disabled" numType="decimal" value={123} disabled />
      </FormSection>

      <Typography.Title level={5}>Sample ToolForm</Typography.Title>
      <SampleToolForm />

      <Typography.Title level={5}>Pokémon fields</Typography.Title>
      <PokemonFormPreview />
    </FormBody>
  );
};
