import { Gender } from "~/rngTools";

//NO_PROD rename
export const gender = [
  "Male",
  "Female",
  "Genderless",
] as const satisfies Gender[];
