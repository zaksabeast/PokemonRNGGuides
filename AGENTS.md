# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

This is the `PokemonRNGGuides` project, a TypeScript/React guide and tooling site for Pokemon RNG workflows. The app uses Vite, React, MDX content, Bun scripts, and Rust/WASM code under `rng_tools`.

## Working Rules

- Respect the existing working tree. Do not revert, overwrite, or clean up unrelated user changes.
- Keep edits narrowly scoped to the task.
- Prefer existing components, utilities, and patterns over new abstractions.
- Use ASCII in new files unless the surrounding file already uses Unicode or the content clearly needs it.
- Add comments only when they clarify non-obvious logic.
- Never modify a file outside of the project.

## Searching And Reading

- Prefer `rg` for searching when available.
- If `rg` is unavailable or blocked, use PowerShell alternatives such as:
  - `Get-ChildItem -Recurse -File | Select-String -Pattern "<pattern>"`
  - `Get-Content -Path <file>`

## Commands

This repo uses Bun for JavaScript/TypeScript tooling.

- Start dev server: `bun run dev`
- Format all code: `bun run format`
- Format TypeScript/JS/MDX/etc: `bun run format:ts`
- Build: `bun run build`
- Type check: `bun run lint:ts:types`
- TypeScript lint suite: `bun run lint:ts`
- Full lint: `bun run lint`
- Rust tests: `bun run test:rust`
- Full check: `bun run check`

Some commands build or touch generated WASM/Rust artifacts. Run the smallest relevant command for the change when possible.

## Frontend Guidelines

- Don't use React.useMemo and React.useEffect except if it's necessary. The project uses the react compiler that automatically wraps the code with useMemo and useEffect.
- Match the app's existing UI conventions and component library in `src/components`.
- Keep tool screens practical and workflow-oriented rather than marketing-like.
- Avoid unnecessary layout churn and unrelated visual redesigns.
- Ensure labels, buttons, and dynamic text fit across expected viewport sizes.

## TypeScript Guidelines

- Keep types explicit at component boundaries.
- Reuse domain types from existing modules such as `~/rngTools` and `~/types`.
- Use existing formatting helpers for user-visible numbers, methods, maps, and Pokemon-specific display text.
- Avoid ad hoc parsing if a structured helper already exists.

## Validation

Before finishing, run the most relevant validation command that is practical for the change. If a command cannot be run because dependencies, sandboxing, or generated artifacts are unavailable, report that clearly in the final response.
