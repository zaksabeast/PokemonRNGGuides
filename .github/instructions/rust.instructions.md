---
applyTo: "**/*.rs"
---

# Project coding standards for Rust (WASM)

## Rust Guidelines (WASM context for React frontend)

### General Principles

- **Assume core logic is correct**. Don't touch algorithms unless simplifying interfaces or improving reuse.
- **Interfaces are the priority.** Any public API should be clean, simple, and ergonomic for JS/TS consumers.
- Favor composability and readability over micro-optimizations.

### WebAssembly + TypeScript Interop

- All exported types should be compatible with `#[wasm_bindgen]` and `#[derive(Tsify, Serialize, Deserialize)]`.
  - Complex exports are fine if they map cleanly to TypeScript interfaces.
  - Prefer flat, descriptive structs over deeply nested or generic types.
- Avoid `Result<T, E>` in exports — all exposed functions should **always return successfully**.
  - If something "cannot" be calculated, return an empty list or empty object.
  - **Invalid inputs should be structurally impossible.** Design signatures that prevent misuse rather than validate at runtime.
- Never use `serde_wasm_bindgen` directly — rely on `Tsify` for ABI conversion.

### API Design

- Exported functions should:
  - Be **self-contained and stateless**
  - Take clear, minimal inputs (prefer structs over long param lists)
  - Return outputs in a directly usable format
- Inputs/outputs should feel natural in TypeScript.
  - Use meaningful names.
  - Avoid excessive nesting or Rust-specific idioms.
- Collapse tightly coupled params into named structs.
- Expose **only what the frontend needs** — don't export internals, helpers, or overly general utilities.

### Code Structure & Cleanliness

- Core logic should remain idiomatic Rust, with zero dependency on wasm/ts interop.
- Prefer `const`, `let`, `impl`, and small functions over macro magic.
- Reuse logic instead of duplicating or slightly tweaking per-case.
- Minimize trait impls and generics in exported interfaces — keep them as concrete as possible.

> ⚠️ Reminder: Trust the logic. Don't fix what isn't broken. Focus on making it **impossible to misuse** and easy to call from the frontend.
