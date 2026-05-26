# AGENTS.md

Guidance for AI coding agents working in this repository.

## Environment Setup

- Runtime/tooling: TypeScript, React, Vite, MDX, Bun, Rust/WASM.
- Package manager: Bun. Prefer `bun run <script>` over npm/pnpm/yarn.
- Rust/WASM code lives in `rng_tools`; TypeScript imports generated WASM artifacts.
- Do not install packages, change lockfiles, or upgrade tooling unless the task explicitly requires it.

## Commands

Run the smallest practical command for the change.
Don't run formatting (bun prettier) and linting unless the task explicitly requires it.

### Fast Feedback

- Type check: `bun run lint:ts:types`
- Format touched TS/TSX/MDX files: `bun prettier <file...> --write`
- Check formatting: `bun prettier <file...> --check`
- Rust tests: `bun run test:rust`
- Build guides check: `bun run build:guides:check`

### Full Commands

- Start dev server (recommended if rust code hasn't changed): `bun run scripts/dev-server`
- Format all code: `bun run format`
- TypeScript lint suite: `bun run lint:ts`
- Full lint: `bun run lint`
- Full check: `bun run check`
- Build rust changes and start dev server: `bun run dev`
- Build for production-only: `bun run build`

Some commands build or touch generated WASM/Rust artifacts. Avoid full-suite commands when a targeted check is enough.

## Project Structure

- `src/components/` - shared React UI components and form/table primitives.
- `src/rngToolsUi/` - tool-specific React screens and workflows.
- `src/rngTools/` - TypeScript-facing RNG domain helpers and generated bindings usage.
- `guides/` - MDX guide content.
- `scripts/` - Bun scripts for builds, guides, and generated data.
- `rng_tools/` - Rust crate compiled to WASM.
- `dist/` - generated build output; do not edit directly.

## Working Rules

- Respect the existing working tree. Do not revert, overwrite, or clean up unrelated user changes.
- Keep edits narrowly scoped to the task.
- Prefer existing components, utilities, and patterns over new abstractions.
- Use ASCII in new files unless the surrounding file already uses Unicode or the content clearly needs it.
- Add comments only when they clarify non-obvious logic.
- Never modify a file outside of the project.

## Frontend Guidelines

- Match the app's existing UI conventions and component library in `src/components`.
- Avoid unnecessary layout churn and unrelated visual redesigns.
- Ensure labels, buttons, and dynamic text fit across expected viewport sizes.
- Do not use `React.useMemo` or `React.useEffect` unless necessary; the project uses React Compiler.
- Use existing icons, Ant Design components, and local wrappers before adding new UI dependencies.

## TypeScript Guidelines

- Keep types explicit at component boundaries.
- Reuse domain types from existing modules such as `~/rngTools` and `~/types`.
- Use existing formatting helpers for user-visible numbers, methods, maps, and Pokemon-specific display text.
- Avoid ad hoc parsing if a structured helper already exists.
- Keep imports aligned with existing path aliases and lint rules.

## Rust/WASM Guidelines

- Keep Rust changes localized under `rng_tools`.
- Run `bun run test:rust` for Rust logic changes when practical.
- Do not manually edit generated WASM/build artifacts.

## Permissions

### Allowed Without Prompting

- Read files and list directories.
- Edit files in this repository for the requested task.
- Run targeted format, type-check, lint, build, or test commands.

### Ask First

- Installing or upgrading dependencies.
- Git commits, pushes, branch changes, rebases, or resets.
- Deleting files or generated directories.
- Running long full-suite checks when a targeted check would be enough.
- Commands that require network access or write outside the repository.

## Validation

- Before finishing, run the most relevant validation command that is practical for the change.
- For narrow TS/React edits, prefer `bun run lint:ts:types` or file-scoped Prettier checks.
- For guide content, prefer `bun run build:guides:check` when relevant.
- If a command cannot be run because dependencies, sandboxing, generated artifacts, or time make it impractical, report that clearly.

## PR Expectations

- Keep diffs small and focused.
- Include or update tests when behavior changes or risk warrants it.
- Mention validation performed and any skipped checks in the final response.
