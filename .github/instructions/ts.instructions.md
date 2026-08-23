---
applyTo: "**/*.tsx,**/*.ts"
---

# TypeScript Standards

## React Compiler

We use the React Compiler, which automatically memoizes components and optimizes rendering. Because of this:

- Use `useCallback` or `useMemo` only when the linter explicitly tells you to
- These are typically necessary when a function or unstable object reference is used as a hook dependency (e.g., for `useEffect`)
- The compiler handles most memoization automatically

## Types and Casting

### Explicit Type Helpers

Prefer explicit type helpers over casting. Use:

- **`as const`** for literal types that won't change
- **`satisfies`** to validate a value against a type without changing its inferred type
- Explicit casts only when absolutely necessary, with clear documentation of why

### Type Explicitness

- Keep types explicit at component boundaries
- Reuse domain types from existing modules such as `~/rngTools` and `~/types`

## Styling

### JavaScript Objects

- Use JavaScript objects for styles rather than CSS text strings
- Emotion is integrated with Ant Design theming

### Colors

- Source colors from the theme, not hardcoded values
- Emotion is plugged into the Ant Design theme provider

### Styled Components

- Prefer `styled(Flex)` rather than `styled.div`
- Use existing components from `src/components` instead of creating new styled elements

### Numeric Styles

Express styled numbers (e.g., `width`, `height`, `padding`) as numbers, not strings.

## Strings and Formatting

### Enum Names

- Use utility functions or translations for converting enum strings to human-readable display strings
- Keep formatting logic centralized to enable consistent translations

### User-Facing Instructions

Place user-facing instructions, guidance, and explanations in MDX content:

- TS instructions bypass custom MDX styling
- Translators work primarily with MDX files, making it easier for them to maintain localized content
- MDX is the source of truth for user guidance

## Unique Identifiers

### `uniqueId` Usage

Use `uniqueId` from lodash when displaying results from Pokémon game calculations in a table. Calculations often produce duplicate results (e.g., multiple Pokémon generated from different seeds), and `uniqueId` provides a stable identifier to distinguish identical rows.

## Imports

### React Imports

Prefer `import React from 'react'` over named React imports:

```typescript
// Preferred
import React from 'react';
const MyComponent = () => <div>Hello</div>;

// Avoid
import { FC } from 'react';
const MyComponent: FC = () => <div>Hello</div>;
```

## Utility Functions and Domain Knowledge

- Use existing formatting helpers for user-visible numbers, methods, maps, and Pokémon-specific display text
- Leverage structured helpers from `~/rngTools` and `~/utils` rather than ad hoc parsing
- Keep imports aligned with existing path aliases and lint rules
