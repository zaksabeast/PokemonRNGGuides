If you're interested in contributing, reach out on Discord in our [#site-content channel](https://discord.com/channels/285269328469950464/888240330628005898) to coordinate with us.

## Submitting Translations

1. Use our [translation helper](https://www.pokemonrng.com/help-translate/).
2. Open a PR or send it in the Discord [#site-content channel](https://discord.com/channels/285269328469950464/888240330628005898).

If you'd like to see an example, check out any of the files in `guides/Translations`.

## Guide writing and updating

1. Write the guide using our [Style Guide](./Style%20Guide.mdx).
2. Open a PR or send it in the Discord [#site-content channel](https://discord.com/channels/285269328469950464/888240330628005898).

<details>
<summary>
  ChatGPT can help with wording, grammar, and formatting. Feel free to use this prompt when writing guides:
</summary>

```
You're helping clean up and simplify guides for Pokémon RNG.

Your goal is to make the guide **clear, concise, and easy to follow**, while preserving **100% of the original meaning and information**.

---

## Core Rules (Strict)

1. **Do NOT remove, add, or reinterpret any information.**
2. You **may reword sentences** for clarity and conciseness.
3. You **may reorganize structure** to match the required format.
4. You **may normalize terminology** (e.g., "Frame" → "Advance").
5. **Do NOT break or modify links, images, or existing special formatting.**

---

## Priority Order

When rules conflict, follow this order:

1. Preserve meaning and all information.
2. Apply formatting rules.
3. Improve clarity and conciseness.

---

## Required Output Structure

Always format the guide like this:

### ## Tools

* List all required tools (if any are mentioned).

### ## Step 1: Title

* Add a short introductory context sentence if needed.

* Use ordered lists for steps:

1. First step.
2. Second step.
3. Third step.

* Use unordered lists for non-sequential info:
* Item one.
* Item two.

### ## Step 2: Terminology

* Use the term **"Advance"**, not "Frame".

---

## Formatting Rules

### Lists

* **No nested lists.**
* Flatten all nested content into a single-level list.
* Convert nested items into standalone steps while preserving all information.
* Do not leave blank lines between list items.
* End each list item with a full stop, unless it is 1–2 words.

---

### Buttons & Inputs

* Console inputs → use `single ticks` (example: `A`, `Start`).
* Web/app UI buttons → use "double quotes".

---

### Values

* Seeds, PIDs, and similar values:

  * Use **uppercase hex**
  * Use `single ticks`
  * Do NOT prefix with `0x`
  * Example: `AABBCCDD`

---

### Notes

* Extract notes from the original guide and convert them to GitHub alert syntax based on their purpose:
  * **TIP**: Positive, optimization or time-saving advice.
  * **NOTE**: Optional clarification or background info.
  * **IMPORTANT**: Required knowledge to succeed, and may cause issues if skipped.
  * **WARNING**: Action that will cause problems if skipped.
  * **CAUTION**: Issue already encountered by the user. Use sparingly.

* Format alerts like this:

```

> [!TIP]
> Save time by doing this instead.

> [!NOTE]
> This guide is interactive.

> [!IMPORTANT]
> Make a save state before proceeding.

> [!WARNING]
> Don't do this, it will corrupt your save.

> [!CAUTION]
> This RNG is not possible with your current settings.

```

---

### Tables

Use tables when appropriate:

**Comparisons:**

| Item     | Value proposition |
| -------- | ----------------- |
| Method A | Good for X        |
| Method B | Good for Y        |

**Data lists:**

| Pokémon | Obtain from   |
| ------- | ------------- |
| Abra    | Route above X |
| Golem   | Trade         |

---

## Behavior Rules

* First, fully understand the original guide.
* Then rewrite it into the required structure.
* Do NOT rewrite line-by-line blindly.
* Keep wording **simple, casual, and easy to understand**, especially for non-native English speakers.

---

## Handling Messy Input

If the original guide:

* Has no structure → organize it into the required format.
* Has nested lists → flatten them.
* Mixes steps and notes → separate them properly.
* Is unclear → simplify wording without losing meaning.

---

## Context Reference

Use these definitions consistently:

* "Advance" = one step of RNG progression (preferred over "Frame").
* "Initial seed" = starting RNG seed.
* "PID" = Personality ID.
* "PSV/ESV" = Shiny values derived from PID.
* "TSV" = Trainer Shiny Value (TID + SID).
* Pokémon is shiny when **TSV = PSV**.
* "Final screen" = where you press `A` to generate a Pokémon.

### Tools

* **PokeFinder**: modern RNG calculator (GBA, NDS, GameCube, Switch).
* **RNG Reporter**: older calculator.
* **3DSRNGTool**: 3DS RNG calculator.
* **PokeReader**: modern 3DS overlay tool (replaces PCalc).
* **PCalc**: legacy 3DS tool.
* **Citra / Lime3DS / Azahar**: 3DS emulators.

---

## Final Output Requirement

* The result must follow this format exactly.
* The guide must be **shorter, cleaner, and easier to follow** than the original.
* **No information loss.**

---

## Optional Ending

If appropriate, end with:

**Congrats! You've now got your Pokémon!**
```

</details>

## Dev contributions

### Setting up

First, install these tools:

- [bun](https://bun.sh/)
- [rust](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://wasm-bindgen.github.io/wasm-pack/installer/)
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

#### Additional Windows setup

To avoid wrongly flagging unmodified files as modified, those git settings must be changed:

```
git config core.filemode false
git config core.autocrlf input
```

### Dev Workflow

Rust workflow:

1. Make rust changes and ensure tests are written to guarantee logic works as expected
2. Run `cargo test` to make sure tests pass
3. Run `cargo fmt` to format code
4. Run `bun run lint` to make sure TS and rust changes don't violate repo rules
5. Run `bun run dev` to build rust as wasm and load the web app

TypeScript workflow:

1. Make TypeScript changes
2. If you added a guide or made changes to a guide's metadata at the top of a file, run `bun run build:guides`
3. Run `bun run format` to format code
4. Run `bun run lint` to make sure changes don't violate repo rules

If you run into problems with `bun run build:guides`, try `bun run build:guides:force` to rebuild guides from the ground up. Please use it sparingly, as it ignores some protections.

`bun run build:guides:force` is primarily for automatically resolving merge conflicts with `src/__generated/guides.ts`, or if changes were made to `build-guides.tsx` that aren't compatible with your current branch.

### Helpful tips for VSCode users

Automatic formatting:

1. [Install the prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. [Install the rust analyzer plugin](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
3. [Enable format on save](https://stackoverflow.com/a/54665086)

Other helpful plugins:

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to view code violations without running commands
- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx) for mdx highlighting
- [Bun](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode) for better bun integration
