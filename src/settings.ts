import { z } from "zod";
import dayjs from "dayjs";

const CommaSeparatedString = z
  .string()
  .transform((val) =>
    val
      .split(",")
      .map((str) => str.trim())
      .filter((str) => str.length > 0),
  )
  .default("");

const settingsSchema = z
  .object({
    gitCommit: z.string().default("unknown"),
    isoBuildDate: z
      .string()
      .default("2025-01-01T06:00:00.000Z")
      .transform((date) => dayjs(date)),
    amplitudeApiKey: z.string(),
    isDev: z.boolean().default(false),
    discordUrl: z.string().default("https://www.discord.gg/d8JuAvg"),
    supportUsDiscordUrl: z
      .string()
      .default("https://discord.com/servers/pokemonrng-285269328469950464"),
    supportUsPatreonUrl: z.string().default("http://patreon.com/pokemonrng"),
    githubUrl: z
      .string()
      .default("https://github.com/zaksabeast/PokemonRNGGuides"),
    discordHallOfFameSupporters: CommaSeparatedString,
    patreonHallOfFameSupporters: CommaSeparatedString,
  })
  .transform(
    ({
      discordHallOfFameSupporters,
      patreonHallOfFameSupporters,
      ...data
    }) => ({
      ...data,
      hallOfFameSupporters: [
        ...discordHallOfFameSupporters.map((name) => ({
          type: "discord" as const,
          name,
        })),
        ...patreonHallOfFameSupporters.map((name) => ({
          type: "patreon" as const,
          name,
        })),
      ],
    }),
  );

export const settings = settingsSchema.parse({
  gitCommit: import.meta.env.VITE_GIT_COMMIT,
  isoBuildDate: import.meta.env.VITE_ISO_BUILD_DATE,
  amplitudeApiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
  isDev: import.meta.env.DEV,
  discordHallOfFameSupporters: import.meta.env
    .VITE_DISCORD_HALL_OF_FAME_SUPPORTERS,
  patreonHallOfFameSupporters: import.meta.env
    .VITE_PATREON_HALL_OF_FAME_SUPPORTERS,
});
