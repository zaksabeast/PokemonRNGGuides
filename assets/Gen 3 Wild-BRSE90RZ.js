const e=`---
- title: "Wild Searcher"
  description: "Wild Searcher"
  slug: "emerald-wild"
  category: "Emerald"
  section: "pokemon_rng"
  variant: "retail"
  isRoughDraft: true
---

## Searcher

**Use case**: Determine the best setup (map, advance, lead) to obtain the wanted target Pokémon.

<Wild3SearcherFindTarget />

<br />

## Coming soon

- Fix a bug causing some Wild5 method results to be missing.
- Support calibrating painting seeds.
- Add support for Latios and Latias.
- Add support for Safari Zone.
- Add a textual guide for the Emerald Wild Searcher.
- Improve performance.

## Credits

- RainingChain: Research about cycle range to estimate method likelihood. Creation of the multi-lead searcher, multi-method generator, and the web UI tool.
- Sorendog: Original Wild generation tool.
- Shao: Function to calculate cycles taken by modulo operations.
`;export{e as default};
