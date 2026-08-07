import { atomWithPersistence } from "~/state/localStorage";
import { z } from "zod";
import { Gen4GameVersions } from "~/types/games";

export const Gen4ProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Profile name is required"),
  tid: z.number().int().min(0).max(65535),
  sid: z.number().int().min(0).max(65535),
  game: z.enum(Gen4GameVersions),
  nationalDex: z.boolean(),
});

export type Gen4Profile = z.infer<typeof Gen4ProfileSchema>;

const defaultProfile: Gen4Profile = {
  id: "",
  name: "",
  tid: 0,
  sid: 0,
  game: "Diamond",
  nationalDex: false,
};

export const gen4ProfilesAtom = atomWithPersistence(
  "gen4Profiles",
  z.array(Gen4ProfileSchema),
  [],
);

export const findProfileOrDefault = ({
  profiles,
  id,
}: {
  profiles: z.infer<typeof Gen4ProfileSchema>[] | null;
  id: string | null | undefined;
}): z.infer<typeof Gen4ProfileSchema> => {
  return (
    (profiles ?? []).find((profile) => profile.id === id) ?? defaultProfile
  );
};
