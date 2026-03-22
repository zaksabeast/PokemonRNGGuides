import{ii as r,j as n}from"./index-CEitD9YF.js";const l={title:"Contribute Pokémon RNG Guides",navDrawerTitle:"Contributing",description:"Learn how to contribute Pokémon RNG guides, translations, and tools. Help improve tutorials for RNG manipulation across Pokémon games.",slug:"contributing",category:"Home",section:"site_info",layout:"guide"};function i(t){const e={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",...r(),...t.components},{TextArea:o}=e;return o||s("TextArea"),n.jsxs(n.Fragment,{children:[n.jsxs(e.p,{children:["If you're interested in contributing, reach out on Discord in our ",n.jsx(e.a,{href:"https://discord.com/channels/285269328469950464/888240330628005898",children:"#site-content channel"}),"."]}),`
`,n.jsx(e.p,{children:"You don't need to get everything perfect, but try to keep things clear and step-by-step. We'll handle final cleanup and formatting."}),`
`,n.jsx(e.h2,{children:"Writing or Updating a Guide"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Write or update a guide – preview it with ",n.jsx(e.a,{href:"https://edtr.md/",children:"Edtr.md"}),", no account needed."]}),`
`,n.jsx(e.li,{children:"(Recommended) Use the LLM prompt below to clean it up."}),`
`,n.jsxs(e.li,{children:["Send it in the Discord ",n.jsx(e.a,{href:"https://discord.com/channels/285269328469950464/888240330628005898",children:"#site-content channel"}),"."]}),`
`]}),`
`,n.jsx(e.p,{children:"We may tweak wording or formatting slightly before publishing."}),`
`,n.jsx(e.h3,{children:"Recommended: Use an LLM to Clean Up Your Guide"}),`
`,n.jsx(e.p,{children:"If you're using ChatGPT or similar, paste your guide into this prompt to quickly clean it up before sending:"}),`
`,n.jsx(o,{readOnly:!0,rows:8,value:`
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

---

## Formatting Rules

### Lists

- **No nested lists.**
- Flatten all nested content into a single-level list.
- Convert nested items into standalone steps while preserving all information.
- Do not leave blank lines between list items.
- End each list item with a full stop, unless it is 1–2 words.

---

### Buttons & Inputs

- Console inputs → use \`single ticks\` (example: \`A\`, \`Start\`).
- Web/app UI buttons → use "double quotes".

---

### Values

- Seeds, PIDs, and similar values:

- Use **uppercase hex**
- Use \`single ticks\`
- Do NOT prefix with \`0x\`
- Example: \`AABBCCDD\`

---

### Notes

- Any line starting with **"Note:"** must be converted into a code block:

\`\`\`
Note: Example note here.
\`\`\`

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

- First, fully understand the original guide.
- Then rewrite it into the required structure.
- Do NOT rewrite line-by-line blindly.
- Keep wording **simple, casual, and easy to understand**, especially for non-native English speakers.

---

## Handling Messy Input

If the original guide:

- Has no structure → organize it into the required format.
- Has nested lists → flatten them.
- Mixes steps and notes → separate them properly.
- Is unclear → simplify wording without losing meaning.

---

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

---

## Final Output Requirement

- The result must follow this format exactly.
- The guide must be **shorter, cleaner, and easier to follow** than the original.
- **No information loss.**

---

## Optional Ending

If appropriate, end with:

**Congrats! You've now got your Pokémon!**
`}),`
`,n.jsx(e.h2,{children:"Submitting Translations"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Use our ",n.jsx(e.a,{href:"/help-translate",children:"translation helper"}),"."]}),`
`,n.jsxs(e.li,{children:["Send it in the Discord ",n.jsx(e.a,{href:"https://discord.com/channels/285269328469950464/888240330628005898",children:"#site-content channel"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{children:"Building Tools"}),`
`,n.jsxs(e.p,{children:["Reach out to us on Discord ",n.jsx(e.a,{href:"https://discord.com/channels/285269328469950464/888240330628005898",children:"#site-content channel"}),"."]})]})}function d(t={}){const{wrapper:e}={...r(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(i,{...t})}):i(t)}function s(t,e){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,l as frontmatter};
