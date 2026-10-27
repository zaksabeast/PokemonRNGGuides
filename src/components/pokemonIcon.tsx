import styled from "@emotion/styled";
import type { Species } from "~/rngTools";
import {
  pokemonIconCells,
  pokemonIconColumns,
  type PokemonIconCell,
} from "~/utils/pokemonIconManifest";
import { styledPropGuard } from "~/utils/styled";

export type PokemonIconProps = {
  species: Species;
  size?: number;
  className?: string;
};

const Sprite = styled(
  "span",
  styledPropGuard,
)<{
  $size: number;
  $cell: PokemonIconCell;
}>(({ $size, $cell: [sheet, index] }) => ({
  display: "inline-block",
  width: "1em",
  height: "1em",
  fontSize: $size,
  flexShrink: 0,
  verticalAlign: "middle",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${sheet.url})`,
  backgroundSize: `${pokemonIconColumns}em ${sheet.rows}em`,
  backgroundPosition: `${-(index % pokemonIconColumns)}em ${-Math.floor(index / pokemonIconColumns)}em`,
}));

export const PokemonIcon = ({
  species,
  size = 32,
  className,
}: PokemonIconProps) => {
  const cell = pokemonIconCells[species];
  if (cell == null) {
    return null;
  }

  return (
    <Sprite
      aria-hidden="true"
      className={className}
      $cell={cell}
      $size={size}
    />
  );
};
