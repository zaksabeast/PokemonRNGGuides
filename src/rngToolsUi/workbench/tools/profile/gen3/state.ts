import { atomWithPersistence } from "~/state/localStorage";
import { z } from "zod";
import { Gen3GameVersions } from "~/types/games";
import { pokeNavTrainers } from "~/rngToolsUi/gen3/retailEmeraldEgg/state";

export const Gen3ProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Profile name is required"),
  tid: z.number().int().min(0).max(65535),
  sid: z.number().int().min(0).max(65535),
  game: z.enum(Gen3GameVersions),
  pokeNavTrainers: z.array(z.enum(pokeNavTrainers)),
});

export type Gen3Profile = z.infer<typeof Gen3ProfileSchema>;

const defaultProfile: Gen3Profile = {
  id: "",
  name: "",
  tid: 0,
  sid: 0,
  game: "Emerald",
  pokeNavTrainers: [],
};

export const gen3ProfilesAtom = atomWithPersistence(
  "gen3Profiles",
  z.array(Gen3ProfileSchema),
  [],
);

export const findProfileOrDefault = ({
  profiles,
  id,
}: {
  profiles: z.infer<typeof Gen3ProfileSchema>[] | null;
  id: string | null | undefined;
}): z.infer<typeof Gen3ProfileSchema> => {
  return (
    (profiles ?? []).find((profile) => profile.id === id) ?? defaultProfile
  );
};
