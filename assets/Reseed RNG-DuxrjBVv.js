var e=`---
- title: "RNG-Reseed mit Gemälden"
  navDrawerTitle: "Gemälde RNG"
  description: "Lerne, wie du den RNG in Pokémon Smaragd mithilfe von Gemälden reseedest, um dein Wunsch-Pokémon ohne lange Wartezeiten zu erhalten."
  slug: "de-emerald-painting-rng"
  translation:
    enSlug: "emerald-painting-rng"
    language: "de"
---

## Tools

- [mGBA mit Lua-Skripten](/mgba-setup)
- [PokeFinder](/pokefinder)

## Video-Guide

<YouTubeVideo id="ydS9HLNmAog" />

## Intro

Das Reseeden des RNG durch das Betrachten von Gemälden ermöglicht es dir, lange Wartezeiten auf hohe Advances zu vermeiden. Normalerweise startet der RNG mit einer festgeschriebenen Zahl und generiert jedes Mal dieselben Zufallszahlen.

Indem du ein Gemälde im Spiel betrachtest, wie zum Beispiel die in der Wettbewerbshalle von Seegrasulb City, wird der RNG basierend auf dem Video-Frame-Counter reseeded.

Diese Methode kann mit Kampfvideos kombiniert werden, um den neuen RNG-Zustand nach dem Betrachten des Gemäldes zu speichern.

Du kannst diese Methode auch für Rubin und Saphir verwenden, unabhängig davon, ob die interne Batterie noch funktioniert oder leer ist.

## Setup

1. Suche dir eine Target Seed mit dem PokeFinder.
2. Klicke mit der rechten Maustaste auf die gewählte Seed im PokeFinder und wähle "Generate times for seed".

## Gemälde RNG

<PaintingSeedToEmuTimer />

1. Gib deine Target Seed in das obige Tool ein, um deinen "Target Painting Timer" zu finden.
2. Warte im Spiel, bis der vom Lua-Skript angezeigte Painting Timer dem Target Painting Timer entspricht. Öffne dabei das Pokémon-Menü, um zu verhindern, dass NPCs den RNG beeinflussen.
3. Betrachte das Gemälde genau bei dieser Zahl, um den RNG auf die gewünschte Seed zu reseeden.
4. Nutze die Anzahl der Advances, die im PokeFinder unter "Seed to Time" angezeigt werden, um den RNG-Vorgang wie gewohnt abzuschließen.

## Credits

- Chinesische Übersetzung: xuanyelin, Hakuhiro.
- Deutsche Übersetzung: Parasite.
`;export{e as default};