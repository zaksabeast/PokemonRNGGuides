import { Species } from "~/rngTools";
import { PokemonIcon } from "~/components/pokemonIcon";

const speciesIconSize = 24;

export const SpeciesOptionIcon = ({ species }: { species: Species }) => (
  <PokemonIcon species={species} size={speciesIconSize} />
);
