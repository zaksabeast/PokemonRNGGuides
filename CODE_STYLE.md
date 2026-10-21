# Code Style Guide

Rules for any AI coding agent writing code in this repository. The goal is code a human maintainer can read, review, and change without fighting it. A PR that breaks these rules is likely to be rejected regardless of whether it works.

## 1. Comments

Most code is clearest uncommented. Write a comment only for what the code cannot express:

- **External facts.** Measurements, observed behavior, or specs from outside the codebase: hardware timings, protocol quirks, values taken from the thing being modeled. These belong on the constant that holds the value.
- **A non-obvious "why".** A reason the code is shaped this way that a competent reader would not guess, such as a workaround, an ordering constraint, or a rejected simpler alternative.

Keep it to one or two sentences. A good comment succinctly answers "why", not "what".

Every comment adds something the reader can't get from the code:

- Doc comments add information beyond the item's name and signature.
- The code shows what happens line by line. Comments explain why it is shaped that way.
- Each fact is stated once, in the most specific place.
- Fields, type aliases, and private helpers get a comment only when they carry an external fact or a non-obvious "why".
- Explanations for end users go in user docs or guides.

If code needs a comment to be understood, first try to fix the code: a better name, a smaller function, a clearer type. Comment only what is left.

```
// Bad: repeats the code and explains nothing.
/// A timeline's advance and NPC state.
type MergeKey = (usize, NpcModel);

// Good: no comment needed, because the name says what it is and why it exists.
type TimelineState = (usize, NpcModel);
```

## 2. Names

- A name should say what a value is or what a function returns, readable out of context. Prefer `kukui_timeline()` over `kukui_dialogue()` when it returns a timeline.
- Build names from words a reviewer already knows: the domain's terms and plain English.
- Use the domain's vocabulary consistently: one concept, one term, matching what the codebase already calls it.
- Keep existing names as they are unless renaming is the task.

## 3. Function bodies

Readable control flow matters more than names or comments. In priority order:

1. **Flat bodies.** Keep loops single-level, conditions on one line, and assignments plain. Pull pieces into small helpers so each loop body is roughly one call plus an early return.
2. **One job per function.** If you need "and" to describe it, split it.
3. **Early returns** over deep nesting.
4. **No immediately invoked functions.** Don't wrap branches in `(() => { ... })()` to compute a value. Instead, choose a value with `match` (ts-pattern in TypeScript), and choose what to render with a small component.

```
// Bad: an anonymous function invoked immediately.
const borderColor = (() => {
  if (!hasPlan) {
    return undefined;
  }

  return unreachable ? "Warning" : "Primary";
})();

// Good: every case is visible at a glance.
const borderColor = match({ hasPlan, press })
  .with({ hasPlan: false }, () => undefined)
  .with({ press: null }, () => "Warning")
  .otherwise(() => "Primary");
```

Readability starts with control flow. Fix it before renaming things or trimming comments.

Keep hot paths fast, even at some cost to elegance. In a tight loop, mutate state in place rather than cloning large state on every iteration.

## 4. Spacing and grouping

Blank lines are punctuation. They tell the reader which lines belong together, so a file should read as a series of short visual paragraphs, not a wall.

- **Group related constants.** Constants that describe one thing, such as a scene's model count or its timing window, sit together in one block. If the block needs a comment, write it once above the block.
- **Separate unrelated groups with a blank line.** A reader should see where one group ends and the next begins without reading every name.
- **Order each group from given to derived.** Measured or chosen values come first, and values computed from them follow.
- **Keep checks next to what they protect.** A compile-time assert sits directly beside the constant that depends on it.
- **Split function bodies into steps.** Put a blank line between setup, the main loop, and the result. A blank line means "next step", so use one only where a new step begins.

```
// Bad: one wall of unrelated values.
const DIALOGUE_NPCS: u8 = 1;
const DIALOGUE_MODELS: usize = model_count_from_npcs(DIALOGUE_NPCS);
const MIN_STEPS: u32 = 490;
const MAX_STEPS: u32 = 1800;
const MAX_ADVANCES: usize = DIALOGUE_MODELS * MAX_STEPS as usize;

// Good: each group is its own paragraph.
const DIALOGUE_NPCS: u8 = 1;
const DIALOGUE_MODELS: usize = model_count_from_npcs(DIALOGUE_NPCS);

const MIN_STEPS: u32 = 490;
const MAX_STEPS: u32 = 1800;

const MAX_ADVANCES: usize = DIALOGUE_MODELS * MAX_STEPS as usize;
```

Two rules apply everywhere, with no judgment call:

- **A blank line follows every closing `}`.** When a block or a multi-line statement ends, the next statement starts after a blank line. The exceptions are another closing line, `else`, or a chained method call, which follow `}` directly.
- **A blank line precedes the return.** If a block holds anything besides its return, put a blank line above the `return` or the tail expression. A block that only returns needs none.

```
// Bad
if is_done {
    record(states);
    return None;
}
steps.push(step);
steps

// Good
if is_done {
    record(states);

    return None;
}

steps.push(step);

steps
```

## 5. Generic logic, specific data

Core logic (generators, searchers, calculators) should be generic. Caller-specific facts should be passed in as parameters.

- If a value depends on which thing is being modeled (a species' gender ratio, a product's tax rate), the caller supplies it. Don't hardcode it in a constant inside the shared logic.
- Don't narrow a generic component into a special-purpose one to fit your feature. Renaming `pokemon_generator` to `gift_generator` because your feature is about gifts is the wrong direction. Instead, keep it general and call it with gift parameters.
- Before adding a trait, interface, or type hierarchy, check whether a function that takes parameters would do. When each implementation would be only a set of constants, pass those constants as parameters.

## 6. Types

- Types are constraints that the compiler checks. Don't silence the type checker with `as X`, `as unknown as X`, `any`, or `unwrap` on things that can fail. A cast that makes an error disappear without proving the invariant is worse than the error. Instead, prove the invariant: narrow with type guards or `match`, validate with `satisfies`, tighten the types, and handle fallible results explicitly.
- If a type-safe solution would be disproportionately complex, say so plainly and let the maintainer decide. Don't hide the problem behind a cast.
- Keep types explicit at module and component boundaries.

## 7. Tests

- Don't assert `len()` plus a few field checks, which silently ignore new fields. Instead, assert the whole result against a complete expected value (full struct or list literal).
- Don't compute expected values with the code under test. Instead, hardcode them.
- When a filter should drop some inputs, feed all inputs through one call and assert the exact surviving list.

## 8. Scope and reuse

- Reuse existing helpers, components, and patterns before writing new ones. Put shared primitives in the shared location the project already uses, outside feature folders.
- Don't restore code that history shows was removed on purpose. Instead, ask why it was removed.
- Smaller is better. A PR adding thousands of lines for one feature should make you suspect that existing code is being duplicated or over-abstracted.

## Self-review checklist

Before submitting, check each changed file:

- [ ] Every comment states an external fact or a non-obvious "why", in one or two sentences, and says it only once.
- [ ] Every doc comment adds information beyond its item's name.
- [ ] Every new name is understandable without reading its definition.
- [ ] Every function body is flat: single-level loops, one-line conditions, and plain assignments, with helpers holding the rest.
- [ ] No immediately invoked functions: values come from `match`, and rendering choices are components.
- [ ] Related constants are grouped, unrelated groups and function steps are separated by blank lines.
- [ ] Every closing `}` is followed by a blank line, and every return in a multi-statement block has a blank line above it.
- [ ] Shared logic receives caller-specific values as parameters.
- [ ] Every new abstraction provides behavior that plain parameters can't.
- [ ] No casts, `any`, or `unwrap` silence type errors: they're resolved with real type constraints the compiler checks.
- [ ] Tests assert complete, hardcoded expected values.
- [ ] The diff contains only what the task needs.
