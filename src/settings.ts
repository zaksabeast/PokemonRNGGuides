import { z } from "zod";
import dayjs from "dayjs";

const settingsSchema = z.object({
  gitCommit: z.string().default("unknown"),
  isoBuildDate: z
    .string()
    .default("2025-01-01T06:00:00.000Z")
    .transform((date) => dayjs(date)),
  amplitudeApiKey: z.string(),
  isDev: z.boolean().default(false),
  discordUrl: z.string().default("https://www.discord.gg/d8JuAvg"),
  supportUsUrl: z
    .string()
    .default("https://discord.com/servers/pokemonrng-285269328469950464"),
  githubUrl: z
    .string()
    .default("https://github.com/zaksabeast/PokemonRNGGuides"),
});

export const settings = settingsSchema.parse({
  gitCommit: import.meta.env.VITE_GIT_COMMIT,
  isoBuildDate: import.meta.env.VITE_ISO_BUILD_DATE,
  amplitudeApiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
  isDev: import.meta.env.DEV,
});
