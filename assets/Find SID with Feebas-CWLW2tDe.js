const e=`---
- title: "Find SID with Feebas in Emerald"
  navDrawerTitle: "Find SID with Feebas"
  description: "How to find your Secret ID (SID) in Emerald using Feebas."
  slug: "emerald-sid-feebas"
  category: "Emerald"
  tag: "retail"
  addedOn: "2025-03-03"
- title: "Find SID with Feebas in Ruby and Sapphire"
  navDrawerTitle: "Find SID with Feebas"
  description: "How to find your Secret ID (SID) in Ruby or Sapphire using Feebas."
  slug: "rs-sid-feebas"
  category: "Ruby and Sapphire"
  tag: "retail"
---

<ShowIf slug="/rs-sid-feebas">
  <Alert
    showIcon
    type="warning"
    message="There's an easier method for Ruby and Sapphire!"
    description={
      <>
        Follow the "If you're playing Ruby or Sapphire" section of{" "}
        <a href="/gen3-sid">this guide</a> instead!
      </>
    }
  />

This method only works if:

- You have a dead battery.
- You haven't changed the Dewford Trend.

</ShowIf>

<ShowIf slug="/emerald-sid-feebas">

This method only works if:

- You have a dead battery or have played for less than 1 day.
- You haven't changed the Dewford Trend.

</ShowIf>

## Video Guide

<YouTubeVideo src="https://www.youtube.com/embed/nOCbSmMRXLA" />

## Find your Feebas Tiles

1. Travel to Dewford.
2. Talk to the NPC directly above the Pokemon Center to get the Dewford Trend.
3. Use [mucksw's Feebas Tile Calculator](https://mucksw.github.io/Feebas-Tile-Calculator/) to get a list of possible Feebas seeds.
4. Test each seed by fishing in the tiles provided by the calculator.

## Find your SID

1. Use the Feebas seed with the tool below to find your possible SIDs.
2. Try to RNG a shiny Pokemon to confirm the correct SID.

<ShowIf slug="/rs-sid-feebas">
  <Gen3Sid game="rs" />
</ShowIf>

<ShowIf slug="/emerald-sid-feebas">
  <Gen3Sid game="emerald" />
</ShowIf>

## Credits

- Lincoln, HappyLappy, and Shao for [the Python SID Finder](https://github.com/HappyLappy1/Lappy-Python-Scripts/tree/main/RSE_Trendy_Saying_2_SID) this is based on.
- mucksw for the [Feebas Tile Calculator](https://mucksw.github.io/Feebas-Tile-Calculator).
- Chinese translation: xuanyelin, Hakuhiro.
`;export{e as default};
