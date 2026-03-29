var e=`---
- title: "Smaragd Retail Wild RNG"
  navDrawerTitle: "Wild RNG"
  description: "Lerne, wie du wilde Pokémon in Pokémon Smaragd auf einer Retail-Konsole für perfekte IVs, Wesen und Shinies RNGst."
  slug: "de-retail-emerald-wild"
  translation:
    enSlug: "retail-emerald-wild"
    language: "de"
---

## Voraussetzungen:

- [PokeFinder](/pokefinder)
- [Mystic Timer](/mystic-timer)
- TID und SID (nur notwendig für Shinies)
- Ein Pokémon mit der Attacke Lockduft

## Schritt 1: PokeFinder einrichten

1. Öffne PokeFinder und wähle Gen 3 wild.
2. Wähle dein Profil mit der TID/SID des verwendeten Spiels aus, wenn du nach Shinies suchst.
   - Folge [diesem Guide zum Finden deiner SID](/gen3-sid), falls du diese noch nicht kennst.
3. Stelle die Methode auf "Wild 2".
4. Setze den Seed auf 0.
5. Wähle "Grass" oder "Surfing" für die Begegnung.
6. Lege den Ort und das Pokémon fest (falls gewünscht).
7. Filtere nach dem gewünschten Pokémon.
8. Klicke auf "Generate" und wähle ein gewünschtes Pokémon aus den Ergebnissen aus.

## Schritt 2: Mystic Timer einrichten

1. Öffne Mystic Timer.
2. Wähle den Gen 3 Tab.
3. Wähle die verwendete Konsole aus.
4. Gib den Target Advance aus PokeFinder für das gewünschte Pokémon in das Feld "Target Frame" ein.
5. Klicke auf "Set Timer", dann auf "Start".

## Schritt 3: Kalibrierung

1. Wenn der Timer 0 erreicht, resette das Spiel durch Drücken von \`Start + Select + A + B\`.
2. Öffne das In-Game-Menü und gehe zu deinem Team.
3. Wähle das Pokémon mit Lockduft aus und bleibe auf "Lockduft" stehen.
4. Warte, bis der zweite Countdown endet, und drücke dann \`A\`.
5. Fange das Pokémon und nutze den IV Calculator unter den Filtern.
6. Gib die Informationen des Pokémon ein, um seine IVs zu prüfen.
7. Wähle "Any" für den Encounter Slot und klicke auf "Generate".
8. Suche nach dem gefangenen Pokémon und gib den Advance ein, den du in Mystic Timer getroffen hast.
9. Klicke auf "Set Timer".

## Schritt 4: Das Pokémon RNGn

Nachdem du auf den Delay kalibriert hast, geht es nur noch um das Timing.
Fange weiterhin Pokémon und prüfe, auf welchem Advance du gelandet bist.
Passe den Mystic Timer bei Bedarf an.
Falls du nur um ein oder zwei Advances daneben liegst, versuche es ohne Änderungen erneut.

## Credits

- Chinesische Übersetzung: xuanyelin, Hakuhiro.
- Italienische Übersetzung: Fiask.
- Deutsche Übersetzung: Parasite.
`;export{e as default};