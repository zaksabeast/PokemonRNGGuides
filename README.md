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

## Contributing on Windows

To avoid wrongly flagging unmodified files as modified, those git settings must be changed:

`git config core.filemode false`

`git config core.autocrlf input`

## Licensing

- The **website** (`src/`, `guides/`, and top-level files) is licensed under the **MIT License**.
- The **Rust RNG tools** (`rng_tools/`) are licensed under the **GNU General Public License v3 (GPLv3)**.
- Contributors must follow the respective licenses when modifying these sections.

## Special Thanks

- [PokeSprite](https://github.com/msikma/pokesprite/) and [PKHeX](https://github.com/kwsch/PKHeX) for box sprites.
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder), which many of the RNG tools are based on.
- [Eon Timer](https://github.com/DasAmpharos/EonTimer), which was used as the base for the timer in this repo.
