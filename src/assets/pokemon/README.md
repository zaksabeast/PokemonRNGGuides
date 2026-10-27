# Pokemon icons

- `source/` contains the original, transparent 64x64 PNGs. Filenames use National
  Pokedex numbers (`p1.png`), with suffixes for alternate artwork (`p201-b.png`).
- `tilesets/` contains generated WebP sheets grouped by generation, with 16
  columns. Each icon occupies a 64x64 cell and is encoded at quality 95/100 with
  lossless transparency, retaining transparent padding.
- `src/utils/pokemonIconManifest.ts` maps supported `Species` values to a sheet
  and cell index, using the explicit IDs in `rng_tools/src/pkm/species.rs`.
  `PokemonIcon` calculates the sprite positions when rendering.

Regenerate from the repository root with:

```sh
bun run scripts/build-pokemon-icons.ts
```

Generation requires ImageMagick's `magick` executable on PATH. Normal application
development and builds use the committed outputs and do not require ImageMagick.
Commit the source images, sheets, and manifest together when updating artwork.

The supplied artwork covers National Pokedex numbers 1 through 802. Additional
Unown artwork is packed into the second sheet, but the current `Species` type only
exposes `Unown`, which uses the base image. Alternate forms use the base species
artwork while `PokemonName` retains their full formatted form name. Species beyond
the supplied artwork have no icon; their formatted names are still displayed.

Use `<PokemonName species="Bulbasaur" />` for an icon with a name, or
`<PokemonIcon species="Bulbasaur" />` for a decorative icon. The default icon size
is 32 pixels; use `iconSize` on `PokemonName` or `size` on `PokemonIcon` to change it.
