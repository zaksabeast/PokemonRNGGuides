---
applyTo: "**/*.mdx,**/*.md"
---

# Project standards for translated markdown files

## Translation Guidelines

### Accuracy

- Ensure the **translated text is accurate** and preserves the meaning and intent of the original English version.
- Do not use literal translations that break clarity or context.
- Use proper grammar, idiomatic phrasing, and tone appropriate to the language.
- Credits at the bottom of files can be in any language.

### Frontmatter Format

- Confirm the frontmatter uses the **correct format**:

```
---
- title: "Translated Title"
  navDrawerTitle: "Translated Nav Drawer Title"
  description: "Translated description."
  slug: "languagecode-translated-slug"
  translation:
    enSlug: "original-english-slug"
    language: "language-code"
---
```

- The `slug` must:
  - Be **prefixed with the language code**, followed by a dash (e.g. `zh-`, `it-`, `fr-`).
  - Use lowercase, kebab-case formatting.
- The `translation` block must:
  - Accurately reference the original English `slug` in `enSlug`.
  - Use a valid two-letter ISO language code in `language`.

### Links and URLs

- Do **not** translate or localize URLs.
- Keep internal and external links **identical** to the English version.
- Do not change slug references in links unless they're translated pages with confirmed translated slugs.

### Titles & Metadata

- `title` should match the page header.
- `navDrawerTitle` should be short and contextually recognizable in the navigation drawer.
- `description` should summarize the content clearly in the target language.

> ⚠️ Reminder: Copilot should verify both language accuracy and structural correctness. The goal is seamless parity between the translated file and its English source.
