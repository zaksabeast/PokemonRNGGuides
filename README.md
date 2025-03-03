# PokemonRNG.com

## Contributing guides

Please contribute all guides to the `guides` directory.

## Contribute to the website

Install these tools:

- [bun](https://bun.sh/)
- [rust](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

Run `bun i` to install the dependencies and `bun run dev` to have a development server start.

If you add a guide or change guide metadata, run `bun run build:guides`.

If you make rust changes, run `bun run build:rng_tools`.

To build a production version of the site, use `bun run build`.

## Special Thanks

Thanks to [PokeSprite](https://github.com/msikma/pokesprite/) and [PKHeX](https://github.com/kwsch/PKHeX) for the box sprites!
