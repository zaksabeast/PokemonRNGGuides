export const importance = [1, 2, 3, 4, 5] as const;

export type Importance = (typeof importance)[number];

export type TermInJson = {
  name: string;
  url?: string;
  aliases?: string[];
  importance: number;
  desc: string;
};
