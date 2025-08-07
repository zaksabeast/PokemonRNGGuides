import { input } from "./input";

const stats = ["hp", "atk", "def", "spa", "spd", "spe"];

export type IvString =
  `${number}/${number}/${number}/${number}/${number}/${number}`;

const splitIvs = (ivs: IvString): string[] => {
  return ivs.split("/");
};

type Props = {
  parentSelector?: string;
  name: string;
  value: IvString;
};

const assert = ({ parentSelector, name, value }: Props) => {
  const ivs = splitIvs(value);
  stats.forEach((stat, index) => {
    input.assert({
      parentSelector,
      name: `${name}_${stat}`,
      value: ivs[index],
    });
  });
};

const set = ({ parentSelector, name, value }: Props) => {
  const ivs = splitIvs(value);
  stats.forEach((stat, index) => {
    input.set({
      parentSelector,
      name: `${name}.${stat}`,
      value: ivs[index],
    });
  });
};

export const ivInput = { assert, set };
