import { RadioGroup } from "../../../components/radio";
import { Button } from "../../../components/button";

export type StatLabel = "HP" | "ATK" | "DEF" | "SPD" | "SPA" | "SPE";

export type NatureStatState = "more" | "less" | "nochange";
import { Nature } from "~/rngTools";

export type CaughtStatProps = {
  statLabel: StatLabel;
  min: number;
  max: number;
  value: number | null;
  nature: NatureStatState;
  onValueChanged?: (stat: StatLabel, value: number) => void;
  onNatureChanged?: (stat: StatLabel, nature: NatureStatState) => void;
};

export const CaughtStatInput = ({
  statLabel,
  min,
  max,
  value,
  nature,
  onNatureChanged,
  onValueChanged,
}: CaughtStatProps) => {
  onNatureChanged = onNatureChanged || (() => {});
  onValueChanged = onValueChanged || (() => {});

  let value_opts: { label: string; value: number }[] = [];
  for (let val = min; val <= max; val++)
    value_opts.push({ label: "" + val, value: val });

  const natureBtn: React.ReactNode = (() => {
    if (statLabel === "HP") return <></>;
    return (
      <RadioGroup
        optionType="button"
        value={nature}
        onChange={(e) => {
          onNatureChanged(statLabel, e.target.value);
        }}
        options={[
          { label: "+", value: "more" },
          { label: "=", value: "nochange" },
          { label: "-", value: "less" },
        ]}
      />
    );
  })();

  return (
    <tr>
      <td style={{ paddingRight: "20px" }}>{statLabel}</td>
      <td style={{ paddingRight: "30px" }}>{natureBtn}</td>

      <td>
        <RadioGroup
          optionType="button"
          value={value}
          onChange={(e) => {
            onValueChanged(statLabel, e.target.value);
          }}
          options={value_opts}
        />
      </td>
    </tr>
  );
};

export type StatMinMaxValue = {
  min: number;
  max: number;
  value: number | null;
};

export type CaughtStatsProps = {
  natureStatMore: StatLabel | null;
  natureStatLess: StatLabel | null;
  hp: StatMinMaxValue;
  atk: StatMinMaxValue;
  def: StatMinMaxValue;
  spa: StatMinMaxValue;
  spd: StatMinMaxValue;
  spe: StatMinMaxValue;
  onValueChanged: (stat: StatLabel, val: number) => void;
  onNatureChanged: (stat: StatLabel, nature: NatureStatState) => void;
  clear: () => void;
};

export const CaughtStatInputs = ({
  hp,
  atk,
  def,
  spa,
  spd,
  spe,
  natureStatMore,
  natureStatLess,
  onNatureChanged,
  onValueChanged,
  clear,
}: CaughtStatsProps) => {
  const getNatureState = (stat: StatLabel) => {
    if (stat === natureStatMore) return "more";
    if (stat === natureStatLess) return "less";
    return "nochange";
  };
  const getNatureName = (): string => {
    if (natureStatMore === null && natureStatLess === null)
      return "Hardy or Docile or Bashful or Quirky or Serious";

    if (natureStatMore === null) return "???";

    if (natureStatLess === null) return "???";

    if (natureStatMore === "ATK") {
      if (natureStatLess === "ATK") return "Hardy";
      if (natureStatLess === "DEF") return "Lonely";
      if (natureStatLess === "SPA") return "Adamant";
      if (natureStatLess === "SPD") return "Naughty";
      if (natureStatLess === "SPE") return "Brave";
    }
    if (natureStatMore === "DEF") {
      if (natureStatLess === "ATK") return "Bold";
      if (natureStatLess === "DEF") return "Docile";
      if (natureStatLess === "SPA") return "Impish";
      if (natureStatLess === "SPD") return "Lax";
      if (natureStatLess === "SPE") return "Relaxed";
    }
    if (natureStatMore === "SPA") {
      if (natureStatLess === "ATK") return "Modest";
      if (natureStatLess === "DEF") return "Mild";
      if (natureStatLess === "SPA") return "Bashful";
      if (natureStatLess === "SPD") return "Rash";
      if (natureStatLess === "SPE") return "Quiet";
    }
    if (natureStatMore === "SPD") {
      if (natureStatLess === "ATK") return "Calm";
      if (natureStatLess === "DEF") return "Gentle";
      if (natureStatLess === "SPA") return "Careful";
      if (natureStatLess === "SPD") return "Quirky";
      if (natureStatLess === "SPE") return "Sassy";
    }
    if (natureStatMore === "SPE") {
      if (natureStatLess === "ATK") return "Timid";
      if (natureStatLess === "DEF") return "Hasty";
      if (natureStatLess === "SPA") return "Jolly";
      if (natureStatLess === "SPD") return "Naive";
      if (natureStatLess === "SPE") return "Serious";
    }
    return "???";
  };

  const props = { onValueChanged, onNatureChanged };

  return (
    <>
      <table>
        <tbody>
          <CaughtStatInput
            {...props}
            {...hp}
            nature={getNatureState("HP")}
            statLabel="HP"
          />
          <CaughtStatInput
            {...props}
            {...atk}
            nature={getNatureState("ATK")}
            statLabel="ATK"
          />
          <CaughtStatInput
            {...props}
            {...def}
            nature={getNatureState("DEF")}
            statLabel="DEF"
          />
          <CaughtStatInput
            {...props}
            {...spa}
            nature={getNatureState("SPA")}
            statLabel="SPA"
          />
          <CaughtStatInput
            {...props}
            {...spd}
            nature={getNatureState("SPD")}
            statLabel="SPD"
          />
          <CaughtStatInput
            {...props}
            {...spe}
            nature={getNatureState("SPE")}
            statLabel="SPE"
          />
          <tr>
            <td></td>
            <td colSpan={2}>Nature: {getNatureName()}</td>
          </tr>
        </tbody>
      </table>
      <Button trackerId="CaughtStatInputs_clear" onClick={clear}>
        Clear
      </Button>
    </>
  );
};
