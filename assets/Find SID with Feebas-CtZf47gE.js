const e=`---
- title: "SID mit Barschwa in Smaragd finden"
  navDrawerTitle: "Finde SID mit Barschwa"
  description: "Wie du deine Secret ID (SID) in Smaragd mithilfe von Barschwa findest."
  slug: "de-emerald-sid-feebas"
  translation:
    enSlug: "emerald-sid-feebas"
    language: "de"
- title: "SID mit Barschwa in Rubin und Saphir finden"
  navDrawerTitle: "Finde SID mit Barschwa"
  description: "Wie du deine Secret ID (SID) in Rubin oder Saphir mithilfe von Barschwa findest."
  slug: "de-rs-sid-feebas"
  translation:
    enSlug: "rs-sid-feebas"
    language: "de"
---

<ShowIf slug="/de-rs-sid-feebas">

<Alert
  showIcon
  type="warning"
  message="Es gibt eine einfachere Methode für Rubin und Saphir!"
  description={
    <>
      Folge stattdessen dem Abschnitt „Falls du Rubin oder Saphir spielst“ in{" "}
      <a href="/gen3-sid">diesem Guide</a>
    </>
  }
/>

Diese Methode funktioniert nur, wenn:

- Deine interne Batterie leer ist.
- Du den Trend in Faustauhaven nicht geändert hast.

</ShowIf>

<ShowIf slug="/de-emerald-sid-feebas">

Diese Methode funktioniert nur, wenn:

- Deine interne Batterie leer ist oder du weniger als 1 Tag gespielt hast.
- Du den Trend in Faustauhaven nicht geändert hast.

</ShowIf>

## Video Guide

<YouTubeVideo id="nOCbSmMRXLA" />

## Deine Barschwa-Felder finden

1. Reise nach Faustauhaven.
2. Sprich mit dem NPC direkt über dem Pokémon-Center, um den aktuellen Trend zu erfahren.
3. Nutze [mucksw's Feebas Tile Calculator](https://mucksw.github.io/Feebas-Tile-Calculator/) um eine Liste möglicher Barschwa-Seeds zu erhalten.
4. Teste jeden Seed, indem du an den vom Rechner angegebenen Stellen angelst.

## Deine SID finden

1. Nutze den Barschwa-Seed mit dem untenstehenden Tool, um deine möglichen SIDs zu finden.
2. Versuche ein Shiny-Pokémon zu RNGn, um die korrekte SID zu bestätigen.

<ShowIf slug="/de-rs-sid-feebas">
  <Gen3Sid game="rs" />
</ShowIf>

<ShowIf slug="/de-emerald-sid-feebas">
  <Gen3Sid game="emerald" />
</ShowIf>

## Credits

- Lincoln, HappyLappy und Shao für den [Python SID Finder](https://github.com/HappyLappy1/Lappy-Python-Scripts/tree/main/RSE_Trendy_Saying_2_SID) auf dem dies basiert.
- mucksw für den [Feebas Tile Calculator](https://mucksw.github.io/Feebas-Tile-Calculator).
- Chinesische Übersetzung: xuanyelin, Hakuhiro.
- Deutsche Übersetzung: Parasite.
`;export{e as default};
