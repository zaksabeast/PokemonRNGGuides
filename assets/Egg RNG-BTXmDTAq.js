const e=`---
- title: "Smaragd Ei-RNG"
  navDrawerTitle: "Ei-RNG"
  description: "Lerne, wie du in Pokémon Smaragd Eier in der Pension RNGst. Erhalte perfekte IVs, Wesen und Shinies."
  slug: "de-emulator-emerald-egg"
  translation:
    enSlug: "emulator-emerald-egg"
    language: "de"
---

## Tools:

- [mGBA mit Lua-Skripten](/mgba-setup)

## Intro

Eier werden in Smaragd in zwei Schritten generiert: Die PID wird festgelegt, wenn du den Schritt machst, der das Ei entstehen lässt. Die IVs werden festgelegt, wenn du das Ei beim Pensionsleiter abholst. Du musst also zwei RNG-Vorgänge durchführen, um ein perfektes Shiny-Ei zu erhalten.

## Video Guide

<YouTubeVideo id="JtwSZgw6Q4U" />

## Ein Shiny-Pokémon erhalten

1. Öffne den Tab „Pokemon Info“ im Lua-Skript, um die IVs und das Wesen deiner Eltern-Pokémon zu sehen. Notiere sie für später.
2. Gib beide Pokémon in die Pension. Das erste Pokémon ist „Parent 1“, das zweite „Parent 2“. Notiere dir die Reihenfolge.
3. Sprich mit dem Pensionsleiter, um die Kompatibilität zu prüfen, und gib diese in das untenstehende RNG-Tool ein.
4. Laufe innerhalb der Pension umher, bis der Schrittzähler des Lua-Skripts auf 1 steht.
5. Speichere das Spiel, starte es neu und pausiere direkt nach dem Laden des Spielstands.
6. Wechsle im Lua-Skript zum Tab „Breeding“ und gib „Calibration“, „Initial Seed“, „TID“, „SID“ und „Advances“ (als „Initial advances“) in das RNG-Tool ein. Gib außerdem das Wesen des Nicht-Ditto- oder weiblichen Elternteils an. Optional kannst du nach Shiny-Status, Wesen und Geschlecht filtern.
7. Klicke auf „Generate“, um eine Liste potenzieller PIDs zu erhalten, und wähle eine Ziel-PID aus. Wenn es keine Ergebnisse gibt, erhöhe die „Max Advances“.
8. Hebe die Pause im Spiel auf.
9. Falls „Redraws“ nötig sind: Öffne das Spielmenü (Drücke \`Start\`), öffne den Pokédex und schließe ihn wieder für jeden benötigten Redraw.
10. Pausiere das Spiel kurz vor deinem Ziel-Advance und erstelle einen Save State.
11. Gehe das Spiel manuell Frame für Frame durch (\`Strg + N\` unter Windows, \`Cmd + N\` auf Mac), bis du deinen Ziel-Advance erreichst.
12. Halte die Richtungstaste gedrückt, damit dein Charakter läuft, und hebe die Pause auf, während du die Taste gedrückt hältst. Laufe in die Richtung, in die dein Charakter schaut (z. B. nach \`links\`, wenn er nach links blickt).
13. Das Ei, das du erhältst, sollte nun deine Ziel-PID haben.
14. Falls du das Ziel verfehlt hast, gib das Wesen im RNG-Tool ein, um herauszufinden, auf welchem Advance du gelandet bist.
15. Ziehe den erreichten Advance von deinem Ziel-Advance ab, trage die Differenz im Feld „Delay“ des RNG-Tools ein, generiere die Ergebnisse neu und versuche es erneut.

**Glückwunsch! Du hast jetzt ein Shiny-Ei!**

<EmeraldHeldEgg lua />

## IVs festlegen

1. Stelle dich draußen neben den Pensionsleiter, speichere und starte das Spiel neu.
2. Sprich mit dem Pensionsleiter, bis der Text „Kümmere dich gut darum“ erscheint. Pausiere das Spiel und erstelle einen Save State.
3. Gib den aktuellen Advance im Feld „Initial advances“ im RNG-Tool ein.
4. Trage die IVs deiner Eltern-Pokémon in das RNG-Tool ein.
5. Klicke auf „Generate“, wähle einen Ziel-Advance aus der Liste aus.
6. Pausiere das Spiel kurz vor deinem Ziel-Advance und erstelle einen Save State.
7. Gehe das Spiel manuell durch (\`Strg + N\` oder \`Cmd + N\`), bis du den Ziel-Advance erreichst.
8. Halte „A“ gedrückt und hebe die Pause auf, um das Ei genau auf dem Ziel-Advance zu erhalten.
9. Nutze den „Pokemon Info“-Tab des Lua-Skripts, um die IVs des erhaltenen Pokémon zu prüfen.
10. Falls du das Ziel verfehlt hast, gib die IVs im RNG-Tool ein, um den erreichten Advance zu finden. Eventuell musst du das Feld „Method“ ändern, um einen Treffer zu finden.
11. Ziehe den erreichten Advance von deinem Ziel ab, trage die Differenz bei „Delay“ ein, generiere neu und versuche es noch einmal.

**Glückwunsch! Dein Ei hat jetzt fantastische IVs!**

<EmeraldPickupEgg />

## Credits

- Danke an alle Mitwirkenden von [PokeFinder](https://github.com/Admiral-Fish/PokeFinder) auf deren Arbeit dieses Tool basiert.
- Chinesische Übersetzung: xuanyelin, Hakuhiro.
- Italienische Übersetzung: Fiask.
- Deutsche Übersetzung: Parasite.
`;export{e as default};
