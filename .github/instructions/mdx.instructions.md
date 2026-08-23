---
applyTo: "**/*.mdx,**/*.md"
---

# MDX and Markdown Standards

## Frontmatter Overview

There are two main frontmatter patterns:

1. **Single frontmatter object** – one guide per file
2. **Frontmatter array** – multiple guides per file (same MDX component, different metadata/slugs)

There are also two metadata schemas:

1. **Base/English frontmatter** – full guide metadata
2. **Translation frontmatter** – links to English guide, inherits metadata

---

## Single Guide Frontmatter (Base/English)

Base guides use full metadata. For detailed field documentation and validation rules, see [scripts/build-guides.tsx](../../scripts/build-guides.tsx).

---

## Multi-Guide Frontmatter (Array)

A single MDX file can host multiple guides with different metadata and slugs using a frontmatter array. Each entry follows the base guide rules. See [scripts/build-guides.tsx](../../scripts/build-guides.tsx) for full documentation.

Example: **Hubs.mdx** uses this pattern for 16 game hub guides.

---

## Translation Frontmatter

Translation files link to the English/base guide and inherit its metadata. For detailed field documentation and validation rules, see [scripts/build-guides.tsx](../../scripts/build-guides.tsx).

### Translation-Only Notes

- Do **not** change slug references in links unless they target confirmed translated pages
- The English guide (referenced by `enSlug`) must exist in the codebase
- The slug must be prefixed with the language code, followed by a dash (e.g. `zh-`, `it-`, `fr-`).

Translation files can also use frontmatter arrays, linking to multiple English guides (each entry follows the same rules).

---

## Translation Guidelines

### Accuracy

- Ensure the **translated text is accurate** and preserves the meaning and intent of the original English version.
- Use proper grammar, idiomatic phrasing, and tone appropriate to the language.
- Credits at the bottom of files can be in any language.

### Links and URLs

- Keep internal and external links **identical** to the English version.
- Keep slug references in links unless they're translated pages with confirmed translated slugs.

### Titles & Metadata

- `title` should match the page header.
- `navDrawerTitle` should be short and contextually recognizable in the navigation drawer.
- `description` should summarize the content clearly in the target language.

> ⚠️ Reminder: Copilot should verify both language accuracy and structural correctness. The goal is seamless parity between the translated file and its English source.
