
import { RadioGroup } from "../../../components/radio";
import { Button } from "../../../components/button";

export type StatLabel = "HP" | "ATK" | "DEF" | "SPD" | "SPA" | "SPE";

export type NatureStatState = "more" | "less" | "nochange";

export type CaughtStatProps = {
  statLabel:StatLabel;
  min: number;
  max: number;
  value: number | null;
  nature: NatureStatState;
  onValueChanged?: (stat:StatLabel, value: number) => void;
  onNatureChanged?: (stat:StatLabel, nature:NatureStatState) => void;
};

export const CaughtStatInput = ({statLabel,min,max,value,nature,onNatureChanged,onValueChanged}: CaughtStatProps) => {
  onNatureChanged = onNatureChanged || (() => {});
  onValueChanged = onValueChanged || (() => {});

  let value_opts:{label:string,value:number}[] = [];
  for(let val = min; val <= max; val++)
    value_opts.push({label: '' + val, value:val});

  const natureBtn:React.ReactNode = (() => {
    if (statLabel === "HP")
      return <></>
    return <RadioGroup
      optionType="button"
      value={nature}
      onChange={e => {
        onNatureChanged(statLabel, e.target.value);
      }}
      options={[
        {label: "+", value:"more"},
        {label: "=", value:"nochange"},
        {label: "-", value:"less"}
      ]}
    />
  })();
  
  return (
    <tr>
      <td style={{paddingRight:'20px'}}>{statLabel}</td>
      <td style={{paddingRight:'30px'}}>{natureBtn}</td>
      
      <td><RadioGroup
        optionType="button"
        value={value}
        onChange={e => {
          onValueChanged(statLabel, e.target.value);
        }}
        options={value_opts}
      /></td>
    </tr>
  )
};

export type CaughtStatsProps = {
  hp: CaughtStatProps;
  atk: CaughtStatProps;
  def: CaughtStatProps;
  spa: CaughtStatProps;
  spd: CaughtStatProps;
  spe: CaughtStatProps;
  onValueChanged:(stat:StatLabel, val:number) => void;
  onNatureChanged:(stat:StatLabel, nature:NatureStatState) => void;
  clear: () => void;
};

export const CaughtStatInputs = ({hp,atk,def,spa,spd,spe,onNatureChanged,onValueChanged,clear}: CaughtStatsProps) => {
  return (<>
      <table>
        <tbody>
          <CaughtStatInput {...hp}  onValueChanged={onValueChanged} onNatureChanged={onNatureChanged} />
          <CaughtStatInput {...atk} onValueChanged={onValueChanged} onNatureChanged={onNatureChanged} />
          <CaughtStatInput {...def} onValueChanged={onValueChanged} onNatureChanged={onNatureChanged} />
          <CaughtStatInput {...spa} onValueChanged={onValueChanged} onNatureChanged={onNatureChanged} />
          <CaughtStatInput {...spd} onValueChanged={onValueChanged} onNatureChanged={onNatureChanged} />
          <CaughtStatInput {...spe} onValueChanged={onValueChanged} onNatureChanged={onNatureChanged} />              
          <tr><td></td><td>Nature: NO_PROD</td></tr> 
        </tbody>
      </table>
      <Button trackerId="NO_PROD" onClick={clear}>Clear</Button>
    </>
  );
};
