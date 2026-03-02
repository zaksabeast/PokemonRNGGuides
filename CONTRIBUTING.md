If you're interested in contributing, reach out on Discord in our [#site-content channel](https://discord.com/channels/285269328469950464/888240330628005898) to coordinate with us.

<details>
  <summary><b>Read this if you're interested in translating guides</b></summary>

## Submitting Translations

There are two ways to submit a translation:

1. Send it to our Discord [#site-content channel](https://discord.com/channels/285269328469950464/888240330628005898)
2. Submit a GitHub pull request

If you send it to us in Discord, we'll take care of everything from there - you don't need to read the next section.

## Submitting a pull request

If you're submitting a pull request, create a new file in `guides/Translations/language_code`.

For example, if you're `guides/Gen 4/Wild.mdx` to Spanish, create a file at `guides/Translations/es/Gen 4/Wild.mdx`.

Next, add this info to the top of the file:

```mdx
---
- title: "Translated Title"
  description: "Translated Description."
  slug: "es-dppt-wild"
  translation:
    enSlug: "dppt-wild"
    language: "es"
---
```

- `title` is the translated title
- `description` is the translated description
- `slug` is the English slug prefixed with the language code
- `translation.enSlug` the English slug
- `translation.language` the language code

The translated contents should follow.

After that, commit and submit the pull request!

If you'd like to see an example, check out any of the files in `guides/Translated`.

</details>

<details>
  <summary><b>Read this if you're interested in adding or editing guides</b></summary>

## Guide writing and updating

Follow our [Style Guide](./Style%20Guide.mdx) when writing the guide.

ChatGPT can help with wording, grammar, and formatting. Feel free to use this prompt when writing guides:

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

* Any line starting with **"Note:"** must be converted into a code block:

```

Note: Example note here.

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
