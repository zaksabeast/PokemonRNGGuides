import styled from "@emotion/styled";
import type { Species } from "~/rngTools";
import {
  pokemonIconManifest,
  pokemonIconSheets,
} from "~/utils/pokemonIconManifest";

export type PokemonIconProps = {
  species: Species;
  size?: number;
  className?: string;
};

const Sprite = styled.span({
  display: "inline-block",
  flexShrink: 0,
  verticalAlign: "middle",
  backgroundRepeat: "no-repeat",
});

export const PokemonIcon = ({
  species,
  size = 32,
  className,
}: PokemonIconProps) => {
  const location = pokemonIconManifest[species];
  if (location == null) {
    return null;
  }
  const sheet = pokemonIconSheets[location.sheet];
  const scale = size / 64;
  return (
    <Sprite
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sheet.src})`,
        backgroundPosition: `${-location.x * scale}px ${-location.y * scale}px`,
        backgroundSize: `${sheet.width * scale}px ${sheet.height * scale}px`,
      }}
    />
  );
};
