var e=`---
- title: "Smaragd SID finden"
  navDrawerTitle: "SID finden"
  description: "Verschiedene Methoden, um die SID in Smaragd zu finden."
  slug: "de-gen3-sid"
  translation:
    enSlug: "gen3-sid"
    language: "de"
- title: "Rubin und Saphir SID finden"
  navDrawerTitle: "SID finden"
  description: "Verschiedene Methoden, um die SID in Rubin und Saphir zu finden."
  slug: "de-rs-gen3-sid"
  translation:
    enSlug: "rs-gen3-sid"
    language: "de"
- title: "Feuerrot und Blattgrün SID finden"
  navDrawerTitle: "SID finden"
  description: "Verschiedene Methoden, um die SID in Feuerrot und Blattgrün zu finden."
  slug: "de-frlg-gen3-sid"
  translation:
    enSlug: "frlg-gen3-sid"
    language: "de"
---

<ShowIf slug="/de-gen3-sid">

Diese Seite hilft dir dabei, deine SID in **Smaragd** zu finden.

Suchst du nach einer anderen Edition? Schau dir diese Seiten an:

- [Rubin und Saphir SID Guide](/de-rs-gen3-sid)
- [Feuerrot und Blattgrün SID Guide](/de-frlg-gen3-sid)

</ShowIf>

<ShowIf slug="/de-rs-gen3-sid">

Diese Seite hilft dir dabei, deine SID in **Rubin und Saphir** zu finden.

Suchst du nach einer anderen Edition? Schau dir diese Seiten an:

- [Smaragd SID Guide](/de-gen3-sid)
- [Feuerrot und Blattgrün SID Guide](/de-frlg-gen3-sid)

</ShowIf>

<ShowIf slug="/de-frlg-gen3-sid">

Diese Seite hilft dir dabei, deine SID in **Feuerrot und Blattgrün** zu finden.

Suchst du nach einer anderen Edition? Schau dir diese Seiten an:

- [Rubin und Saphir SID Guide](/de-rs-gen3-sid)
- [Smaragd SID Guide](/de-gen3-sid)

</ShowIf>

<details>
  <Summary>Wenn du einen Emulator oder eine GBA Flashcart benutzt</Summary>

1. Lade deinen Spielstand in [PKHex](https://github.com/kwsch/PKHeX/releases/latest) oder [PKHeX Web](https://pkhex-web.github.io/) und lies die SID ab.

</details>

<details>
  <Summary>Wenn du Rubin oder Saphir spielst</Summary>
<br />
### RNG für eine TID/SID-Kombination

1. Folge dem [Ruby & Sapphire TID RNG Guide](/retail-rubysapphire-tid), um eine spezifische TID und SID zu erhalten.

### PokeFinder

1. Öffne [PokeFinder](/pokefinder) und klicke auf den "IDs"-Button im "Gen 3" Tab.
2. Wähle den "RS" Tab im neuen Fenster aus.
3. Wähle "Dead Battery", falls du eine leere Batterie hast, ansonsten gib Datum und Uhrzeit ein, an dem du den Spielstand bei intakter Batterie gestartet hast.
4. Gib deine TID in die Filter des PokeFinders ein.
5. Klicke auf "Generate", um eine Liste möglicher SIDs zu erhalten.
6. Falls du mehrere SIDs hast, speichere vor der Wahl des Starters.
7. Versuche den Starter für jede SID zu RNGn. Wenn du ein Shiny erhältst, hast du deine SID gefunden.

### Web-Tool mit leerer Batterie

1. Gehe zu Lincolns [SID Finder](https://lincoln-lm.github.io/JS-Finder/Gen3/IDs.html).
2. Gib deine TID ein und klicke auf den "TID" Kreis.
3. Gib \`5a0\` als "Initial Seed" ein.
4. Klicke auf "Generate", um eine Liste möglicher SIDs zu erhalten.
5. Falls du mehrere SIDs hast, speichere vor der Wahl des Starters.
6. Versuche den Starter für jede SID zu RNGn. Wenn du ein Shiny erhältst, hast du deine SID gefunden.

</details>

<details>
  <Summary>Wenn du bereits ein Shiny besitzt</Summary>

1. Nutze EV-senkende Beeren, falls das Pokémon gekämpft hat, um die EVs zu resetten.
2. Öffne [PokeFinder](/pokefinder) und gehe zu "Gen 3 Tools" > "IV Calculator".
3. Gib die Daten des Pokémon ein, um seine IVs zu bestimmen.
4. Öffne "Gen 3 Tools" > "IVs to PID".
5. Gib IVs, Wesen und deine TID ein.
6. Suche nach Ergebnissen und bestimme die Methode:
   - Wild Pokémon: Methods 1-4.
   - Legendaries: Method 1.
7. Falls mehrere SIDs erscheinen, versuche ein Shiny mit jeder zu RNGn, bis du die richtige findest.

</details>

<details>
  <Summary>Wenn du Smaragd spielst, Faustauhaven Trends nicht geändert hast und eine leere Batterie hast</Summary>

1. [Folge diesem Guide](/de-emerald-sid-feebas)

</details>

<details>
  <Summary>Wenn du Smaragd spielst, Faustauhaven Trends nicht geändert hast und der Spielstand weniger als einen Tag alt ist</Summary>

1. [Folge diesem Guide](/de-emerald-sid-feebas)

</details>

<details>
  <Summary>Wenn du eine gemoddete Wii oder einen Gamecube und ein GBA-GC Kabel hast</Summary>

1. Dumpe deinen Spielstand mit [FIX94's gba-link-cable-dumper](https://github.com/FIX94/gba-link-cable-dumper/releases/tag/v1.6).
2. Lade den Spielstand in [PKHex](https://github.com/kwsch/PKHeX/releases/latest) oder [PKHeX Web](https://pkhex-web.github.io/) und lies die SID ab.

</details>

<details>
  <Summary>Wenn du einen NDS und eine NDS Flashcart hast</Summary>

1. Dumpe deinen Spielstand mit [Rudolph's GBA Backup Tool](https://projectpokemon.org/home/tutorials/save-editing/managing-gba-saves/using-gba-backup-tool-r55/).
2. Lade den Spielstand in [PKHex](https://github.com/kwsch/PKHeX/releases/latest) oder [PKHeX Web](https://pkhex-web.github.io/) und lies die SID ab.

</details>

<details>
  <Summary>Wenn du Pokémon auf einen gemoddeten DSI, 3DS oder eine Switch übertragen kannst</Summary>

1. Übertrage ein Pokémon auf deine gemoddete Konsole.
2. Dumpe den Spielstand deiner Konsole:
   - [GodMod9i für DSI](https://github.com/DS-Homebrew/GodMode9i/releases/latest)
   - [Checkpoint für 3DS](https://github.com/BernardoGiordano/Checkpoint/releases/latest)
   - [JKSV für Switch](https://github.com/J-D-K/JKSV/releases/latest)
3. Lade den Spielstand in [PKHex](https://github.com/kwsch/PKHeX/releases/latest), [PKSM](https://github.com/FlagBrew/PKSM/releases/latest) oder [PKHeX Web](https://pkhex-web.github.io/) und lies die SID ab.

</details>

<details>
  <Summary>Wenn du einen NDS mit WiFi und ein Gen 4 Spiel hast</Summary>

1. Tritt dem [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg) bei.
2. Frage, ob jemand die SID deines Pokémon über die [PokeClassic Network GTS](https://pkmnclassic.net/gts/) checken kann.
3. Übertrage ein Pokémon auf ein Gen 4 Spiel.
4. Stelle ein Pokémon in die [PokeClassic Network GTS](https://pkmnclassic.net/gts/).
5. Sag der Person, welches Pokémon deines ist.

</details>

<details>
  <Summary>Wenn du Pokémon auf Pokémon Home übertragen kannst</Summary>

1. Übertrage ein Pokémon zu Pokémon Home.
2. Tritt dem [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg) bei.
3. Bitte jemanden, die SID des Pokémon zu checken.

</details>

<details>
  <Summary>Wenn du bereit bist ACE in Smaragd zu nutzen</Summary>

1. Richte ACE mit [diesem Guide](https://e-sh4rk.github.io/ACE3/emerald/getting-started/introduction/) ein.
2. Nutze den "Read SID from Pokémon in box 9 slot 27" Code aus [diesem Pastebin](https://pastebin.com/kYfBzVE3), der deine TID auf den Wert deiner SID setzt.
3. Öffne deinen Trainerpass, der nun deine SID anstelle der TID anzeigt.
4. Mache einen Soft Reset, um die Änderungen nicht zu speichern.

</details>

<details>
  <Summary>Wenn du bereit bist einen neuen Spielstand in Smaragd zu starten</Summary>

1. Schau dir den [Shiny Starter](/de-emerald-shiny-starter) Guide an.

</details>

<details>
  <Summary>Wenn du bereit bist einen neuen Spielstand in Feuerrot oder Blattgrün zu starten</Summary>

1. Starte einen neuen Spielstand.
2. Starte eine Stoppuhr, wenn du \`A\` drückst, um deinen Namen im "Wie heißt du?" Bildschirm zu bestätigen.
3. Stoppe die Uhr, wenn dein Charakter schrumpft und weiß wird, direkt bevor er im Truck ist.
4. Öffne [PokeFinder](/pokefinder) und klicke auf den "IDs"-Button im "Gen 3" Tab.
5. Wähle den "FRLGE" Tab im neuen Fenster.
6. Gib deine TID in das \`TID\` Feld ein.
7. Multipliziere die Sekunden deiner Stoppuhr mit 59.7275 und runde ab, um deinen wahrscheinlichen Advance zu erhalten.
8. Ziehe 50 von deinem Advance ab und gib das Ergebnis bei \`Initial Advances\` ein.
9. Addiere 50 zu deinem Advance und gib das Ergebnis bei \`Max Advances\` ein.
10. Klicke auf "Generate", um eine Liste möglicher SIDs zu erhalten.
11. Falls du mehrere SIDs hast, speichere vor der Wahl des Starters.
12. Versuche den Starter für jede SID zu RNGn. Wenn du ein Shiny erhältst, hast du deine SID gefunden.

</details>

<details>
  <Summary>Wenn nichts davon zutrifft (Letzter Ausweg)</Summary>

1. Versuche, zufällig einem Shiny zu begegnen.
2. Folge dem "Wenn du bereits ein Shiny besitzt" Abschnitt oben.

</details>

Fehlt eine Methode? Tritt dem [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg) bei und lass es uns wissen!

## Credits

- Chinesische Übersetzung: xuanyelin, Hakuhiro.
- Italienische Übersetzung: Fiask.
- Deutsche Übersetzung: Parasite.
`;export{e as default};