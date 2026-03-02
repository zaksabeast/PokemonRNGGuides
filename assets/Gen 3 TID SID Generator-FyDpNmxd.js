const n=`---
- title: "TID and SID Generator"
  description: "Generator for TID and SID in RS"
  slug: "rs-tidsid-generator"
  category: "Ruby and Sapphire"
  section: "tool"
  isRoughDraft: true
- title: "TID and SID Generator"
  description: "Generator for TID and SID in FRLG"
  slug: "frlg-tidsid-generator"
  category: "FireRed and LeafGreen"
  section: "tool"
  isRoughDraft: true
- title: "TID and SID Generator"
  description: "Generator for TID/SID in Emerald"
  slug: "emerald-tidsid-generator"
  category: "Emerald"
  section: "tool"
  isRoughDraft: true
- title: "TID and SID Generator"
  description: "Generator for TID and SID in XD and Colo"
  slug: "xdcolo-tidsid-generator"
  category: "Gamecube"
  section: "tool"
  isRoughDraft: true
---

<ShowIf slug="/rs-tidsid-generator">
  <Gen3TidSidGenerator game="rs" />
</ShowIf>

<ShowIf slug="/frlg-tidsid-generator">
  <Gen3TidSidGenerator game="frlge" />
</ShowIf>

<ShowIf slug="/emerald-tidsid-generator">
  <Gen3TidSidGenerator game="frlge" />
</ShowIf>

<ShowIf slug="/xdcolo-tidsid-generator">
  <Gen3TidSidGenerator game="xdcolo" />
</ShowIf>
`;export{n as default};
