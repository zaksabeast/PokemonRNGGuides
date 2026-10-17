import styled from "@emotion/styled";
import type { Species } from "~/rngTools";
import { pokemonIconStyles } from "~/utils/pokemonIconManifest";

export type PokemonIconProps = {
  species: Species;
  size?: number;
  className?: string;
};

const Sprite = styled.span<{ size: number; species: Species }>(({ size, species }) => ({
  display: "none",
  width: "1em",
  height: "1em",
  fontSize: size,
  flexShrink: 0,
  verticalAlign: "middle",
  backgroundRepeat: "no-repeat",
  ...pokemonIconStyles[species],
}));

export const PokemonIcon = ({
  species,
  size = 32,
  className,
}: PokemonIconProps) => {
  return (
    <Sprite
      aria-hidden="true"
      className={className}
      species={species}
      size={size}
    />
  );
};
