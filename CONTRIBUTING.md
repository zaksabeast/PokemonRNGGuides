If you're interested in contributing, reach out on Discord in our [#discussion channel](https://discord.com/channels/285269328469950464/888240330628005898) to coordinate with us.

<details>
  <summary><b>Read this if you're interested in adding, translating, or editing guides</b></summary>

## Guide writing and updating

Follow our [Style Guide](./Style%20Guide.mdx) when writing the guide.

ChatGPT can help with wording, grammar, and formatting. Feel free to use this prompt when writing guides:

```
You’re helping to clean up and simplify guides for Pokémon RNG. The goal is to make them **clear, easy to follow, and concise**, without removing or adding any information. Here's the format to follow:

**Guide Format Template:**

_INSERT THE CURRENT STYLE GUIDE HERE_

**Important Things to Keep in Mind:**
- **NO nested bullets**. If there’s any nested list, flatten it, but keep the original content. Everything should be a simple list with no indentation.
- **Keep the structure** exactly as shown in the template, including the bullet points, titles, and descriptions.
- **Don’t add extra info or change anything** in the guide that isn’t already there.
- **Don’t mess with images, links, or any formatting**. Leave them as-is.
- Keep everything **casual and simple**, making it easier for people who are not native English speakers to understand.
- Any "Note:" should be in a code block

**Context to Remember:**
- Pokémon RNG is about exploiting the RNG to get perfect shiny Pokémon.
- Citra, Lime3DS, and Azahar are 3DS emulators for computers and Android.
- PCalc is an older software that shows RNG info for the 3DS.
- PokeReader is a new, updated software for the 3DS that shows RNG info and hidden Pokémon data. It replaces PCalc and can also run on 3DS emulators.
- RNG Reporter is an old calculator for predicting RNG in GBA, NDS, and GameCube games.
- PokeFinder is a new calculator for predicting RNG in GBA, NDS, GameCube, and Switch games.
- 3DSRNGTool is a computer calculator for predicting RNG in 3DS games.
- A "Frame" is one advancement of the RNG.  Prefer the term "Advance" over "Frame".
- "Final screen" is where you push the \`A\` button to generate a Pokémon.
- "Initial seed" is the seed of the RNG.
- A "PID" is a Personality ID that affects Pokémon properties, like shininess.
- "PSV" is a Pokémon Shiny Value, derived from the PID. It's called "ESV" (Egg Shiny Value) for eggs.
- "TID" is a trainer ID, and "SID" is a secret ID. Together they create the TSV (Trainer Shiny Value).
- A Pokémon is shiny when the TSV and PSV match.
- "IVs" are Individual Values that affect Pokémon strength.
- Some RNGs involve "Chains", where you catch multiple Pokémon in a row.
- NPCs can advance RNG and create noise that needs to be handled.

**Your job**: Take the guide text, simplify the wording, fix any structure, and **follow this format exactly**. Don’t change anything except to make it simpler and more concise. Don't add extra info or remove anything—just make it easier to follow!
```

</details>

<details>
  <summary><b>Read this if you're interested in helping code</b></summary>

## Setting up

First, install these tools:

- [bun](https://bun.sh/)
- [rust](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- (Windows only) [Required linker](https://stackoverflow.com/a/55603112)

Next, install dependencies:

```
# Get version pinned rust tools - run these in `rng_tools`
rustup update
rustup target add wasm32-unknown-unknown

# Install TS dependencies - run these in the repo root
bun i
```

Finally, start the site:

```
bun run dev
```

### Additional Windows setup

To avoid wrongly flagging unmodified files as modified, those git settings must be changed:

```
git config core.filemode false
git config core.autocrlf input
```

## Dev Workflow

Rust workflow:

1. Make rust changes and ensure tests are written to guarantee logic works as expected
2. Run `cargo test` to make sure tests pass
3. Run `cargo fmt` to format code
4. Run `cargo clippy` to make sure changes don't violate repo rules
5. Run `bun run dev` to build rust as wasm and load the web app

TypeScript workflow:

1. Make TypeScript changes
2. If you added a guide or made changes to a guide's metadata at the top of a file, run `bun run build:guides`
3. Run `bun run format` to format code
4. Run `bun run lint` to make sure changes don't violate repo rules

If you run into problems with `bun run build:guides`, try `bun run build:guides:force` to rebuild guides from the ground up. Please use it sparingly, as it ignores some protections.

`bun run build:guides:force` is primarily for automatically resolving merge conflicts with `src/__generated/guides.ts`, or if changes were made to `build-guides.tsx` that aren't compatible with your current branch.

## Helpful tips for VSCode users

Automatic formatting:

1. [Install the prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. [Install the rust analyzer plugin](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
3. [Enable format on save](https://stackoverflow.com/a/54665086)

Other helpful plugins:

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to view code violations without running commands
- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx) for mdx highlighting
- [Bun](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode) for better bun integration

</details>
