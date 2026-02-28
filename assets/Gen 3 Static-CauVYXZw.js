const n=`---
- title: "Emerald Static3"
  description: "Static encounters in Emerald"
  slug: "emerald-static"
  category: "Emerald"
  section: "pokemon_rng"
  variant:
    - "retail"
    - "cfw-emu"
  guideKey: "wild"
  isRoughDraft: true
- title: "Ruby and Sapphire Static3"
  description: "Static encounters in Ruby and Sapphire"
  slug: "rs-static"
  category: "Ruby and Sapphire"
  section: "pokemon_rng"
  variant:
    - "retail"
    - "cfw-emu"
  guideKey: "wild"
  isRoughDraft: true
- title: "FireRed and LeafGreen Static3"
  description: "Static encounters in FireRed and LeafGreen"
  slug: "frlg-static"
  category: "FireRed and LeafGreen"
  section: "pokemon_rng"
  variant:
    - "retail"
    - "cfw-emu"
  guideKey: "wild"
  isRoughDraft: true
---

<ShowIf slug="/emerald-static">
  <Static3 game="emerald" />
</ShowIf>

<ShowIf slug="/rs-static">
  <Static3 game="rs" />
</ShowIf>

<ShowIf slug="/frlg-static">
  <Static3 game="frlg" />
</ShowIf>
`;export{n as default};
