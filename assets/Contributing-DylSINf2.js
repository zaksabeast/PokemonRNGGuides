import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-BhGva7Hs.js";var n=e(),r={title:`Contribute Pokémon RNG Guides`,navDrawerTitle:`Contributing`,description:`Learn how to contribute Pokémon RNG guides, translations, and tools. Help improve tutorials for RNG manipulation across Pokémon games.`,slug:`contributing`,category:`Home`,section:`site_info`,layout:`guide`};function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,...t(),...e.components},{TextArea:i}=r;return i||o(`TextArea`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`If you're interested in contributing, reach out on Discord in our `,(0,n.jsx)(r.a,{href:`https://discord.com/channels/285269328469950464/888240330628005898`,children:`#site-content channel`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`You don't need to get everything perfect, but try to keep things clear and step-by-step. We'll handle final cleanup and formatting.`}),`
`,(0,n.jsx)(r.h2,{children:`Writing or Updating a Guide`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Write or update a guide – preview it with `,(0,n.jsx)(r.a,{href:`https://edtr.md/`,children:`Edtr.md`}),`, no account needed.`]}),`
`,(0,n.jsx)(r.li,{children:`(Recommended) Use the LLM prompt below to clean it up.`}),`
`,(0,n.jsxs)(r.li,{children:[`Send it in the Discord `,(0,n.jsx)(r.a,{href:`https://discord.com/channels/285269328469950464/888240330628005898`,children:`#site-content channel`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`We may tweak wording or formatting slightly before publishing.`}),`
`,(0,n.jsx)(r.h3,{children:`Recommended: Use an LLM to Clean Up Your Guide`}),`
`,(0,n.jsx)(r.p,{children:`If you're using ChatGPT or similar, paste your guide into this prompt to quickly clean it up before sending:`}),`
`,(0,n.jsx)(i,{readOnly:!0,rows:8,value:`
You're helping clean up and simplify guides for Pokémon RNG.

Your goal is to make the guide **clear, concise, and easy to follow**, while preserving **100% of the original meaning and information**.

## Core Rules (Strict)

1. **Do NOT remove, add, or reinterpret any information.**
2. You **may reword sentences** for clarity and conciseness.
3. You **may reorganize structure** to match the required format.
4. You **may normalize terminology** (e.g., "Frame" → "Advance").
5. **Do NOT break or modify links, images, or existing special formatting.**

## Priority Order

When rules conflict, follow this order:

1. Preserve meaning and all information.
2. Apply formatting rules.
3. Improve clarity and conciseness.

## Required Output Structure

Always format the guide like this:

### ## Tools

- List all required tools (if any are mentioned).

### ## Step 1: Title

- Add a short introductory context sentence if needed.

- Use ordered lists for steps:

1. First step.
2. Second step.
3. Third step.

- Use unordered lists for non-sequential info:
- Item one.
- Item two.

### ## Step 2: Terminology

- Use the term **"Advance"**, not "Frame".

## Formatting Rules

### Lists

- **No nested lists.**
- Flatten all nested content into a single-level list.
- Convert nested items into standalone steps while preserving all information.
- Do not leave blank lines between list items.
- End each list item with a full stop, unless it is 1–2 words.

### Buttons & Inputs

- Console inputs → use \`single ticks\` (example: \`A\`, \`Start\`).
- Web/app UI buttons → use "double quotes".

### Values

- Seeds, PIDs, and similar values:

- Use **uppercase hex**
- Use \`single ticks\`
- Do NOT prefix with \`0x\`
- Example: \`AABBCCDD\`

### Notes

Use GitHub alerts to highlight tips, notes, and warnings:

- **TIP**: Positive, optimization or time-saving advice. Optional and actionable. No issues if skipped.
- **NOTE**: Optional clarification or background info. Non-actionable. No issues if skipped.
- **IMPORTANT**: Required knowledge to succeed. Actionable. May cause issues if skipped.
- **WARNING**: Action to avoid that will cause problems. Required and actionable.
- **CAUTION**: Issue already encountered by the user. Required and actionable. Use sparingly.

Examples:

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

## Behavior Rules

- First, fully understand the original guide.
- Then rewrite it into the required structure.
- Do NOT rewrite line-by-line blindly.
- Keep wording **simple, casual, and easy to understand**, especially for non-native English speakers.

## Handling Messy Input

If the original guide:

- Has no structure → organize it into the required format.
- Has nested lists → flatten them.
- Mixes steps and notes → separate them properly.
- Is unclear → simplify wording without losing meaning.

## Context Reference

Use these definitions consistently:

- "Advance" = one step of RNG progression (preferred over "Frame").
- "Initial seed" = starting RNG seed.
- "PID" = Personality ID.
- "PSV/ESV" = Shiny values derived from PID.
- "TSV" = Trainer Shiny Value (TID + SID).
- Pokémon is shiny when **TSV = PSV**.
- "Final screen" = where you press \`A\` to generate a Pokémon.

### Tools

- **PokeFinder**: modern RNG calculator (GBA, NDS, GameCube, Switch).
- **RNG Reporter**: older calculator.
- **3DSRNGTool**: 3DS RNG calculator.
- **PokeReader**: modern 3DS overlay tool (replaces PCalc).
- **PCalc**: legacy 3DS tool.
- **Citra / Lime3DS / Azahar**: 3DS emulators.

## Final Output Requirement

- The result must follow this format exactly.
- The guide must be **shorter, cleaner, and easier to follow** than the original.
- **No information loss.**

## Optional Ending

If appropriate, end with:

**Congrats! You've now got your Pokémon!**
`}),`
`,(0,n.jsx)(r.h2,{children:`Submitting Translations`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Use our `,(0,n.jsx)(r.a,{href:`/help-translate`,children:`translation helper`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Send it in the Discord `,(0,n.jsx)(r.a,{href:`https://discord.com/channels/285269328469950464/888240330628005898`,children:`#site-content channel`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Building Tools`}),`
`,(0,n.jsxs)(r.p,{children:[`Reach out to us on Discord `,(0,n.jsx)(r.a,{href:`https://discord.com/channels/285269328469950464/888240330628005898`,children:`#site-content channel`}),`.`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};