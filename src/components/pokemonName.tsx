import styled from "@emotion/styled";
import type { Species } from "~/rngTools";
import { formatSpeciesLabel } from "~/types/species";
import { PokemonIcon } from "./pokemonIcon";
import { withCss } from "./withCss";

export type PokemonNameProps = {
  species: Species;
  iconSize?: number;
  className?: string;
};

const Container = styled.span({
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "middle",
  gap: 4,
  maxWidth: "100%",
});

const BasePokemonName = ({ species, iconSize, className }: PokemonNameProps) => (
  <Container className={className}>
    <PokemonIcon species={species} size={iconSize} />
    <span>{formatSpeciesLabel(species)}</span>
  </Container>
);

export const PokemonName = withCss(BasePokemonName);
