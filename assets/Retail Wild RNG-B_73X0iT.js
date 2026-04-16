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
   - <Image
       alt="Gen 3 Wild Pokémon"
       src="/images/Emerald/Wild/Step-1.1.webp"
       maxHeight={300}
     />
2. Wähle dein Profil mit der TID/SID des verwendeten Spiels aus, wenn du nach Shinies suchst.
   - Folge [diesem Guide zum Finden deiner SID](/gen3-sid), falls du diese noch nicht kennst.
3. Stelle die Methode auf "Wild 2".
4. Setze den Seed auf 0.
5. Wähle "Grass" oder "Surfing" für die Begegnung.
6. Lege den Ort und das Pokémon fest (falls gewünscht).
7. Filtere nach dem gewünschten Pokémon.
8. Klicke auf "Generate" und wähle ein gewünschtes Pokémon aus den Ergebnissen aus.

![PokeFinder Settings](/images/Emerald/Wild/Step-1.2-1.8.webp)

## Schritt 2: Mystic Timer einrichten

1. Öffne [Mystic Timer](/mystic-timer).
2. Wähle den Gen 3 Tab.
3. Wähle die verwendete Konsole aus.
4. Gib den Target Advance aus PokeFinder für das gewünschte Pokémon in das Feld "Target Frame" ein.
5. Klicke auf "Set Timer", dann auf "Start".

<Image
  alt="Mystic Timer Settings"
  src="/images/Emerald/Wild/Step-2.webp"
  maxHeight={350}
/>

## Schritt 3: Kalibrierung

1. Wenn der Timer 0 erreicht, resette das Spiel durch Drücken von \`Start + Select + A + B\`.
2. Öffne das In-Game-Menü und gehe zu deinem Team.
3. Wähle das Pokémon mit Lockduft aus und bleibe auf "Lockduft" stehen.
   - <Flex gap={16}>
       <Image
         pixelated
         alt="Stand in target area"
         src="/images/Emerald/Wild/Step-3.2.webp"
         minHeight={200}
       />
       <Image
         pixelated
         alt="Hover over Sweet Scent"
         src="/images/Emerald/Wild/Step-3.3.webp"
         minHeight={200}
       />
     </Flex>
4. Warte, bis der zweite Countdown endet, und drücke dann \`A\`.
5. Fange das Pokémon und nutze den IV Calculator unter den Filtern.
6. Gib die Informationen des Pokémon ein, um seine IVs zu prüfen.
   - <Image
       alt="IV Calculator"
       src="/images/Emerald/Wild/Step-3.5-3.6.webp"
       maxHeight={300}
     />
7. Wähle "Any" für den Encounter Slot und klicke auf "Generate".
   - ![Catch Pokémon and check IVs](/images/Emerald/Wild/Step-3.7.webp)
8. Suche nach dem gefangenen Pokémon und gib den Advance ein, den du in Mystic Timer getroffen hast.
9. Klicke auf "Set Timer".
   - <Image
       alt="Set Timer again"
       src="/images/Emerald/Wild/Step-3.8-3.9.webp"
       maxHeight={350}
     />

## Schritt 4: Das Pokémon RNGn

Nachdem du auf den Delay kalibriert hast, geht es nur noch um das Timing.
Fange weiterhin Pokémon und prüfe, auf welchem Advance du gelandet bist.
Passe den Mystic Timer bei Bedarf an.
Falls du nur um ein oder zwei Advances daneben liegst, versuche es ohne Änderungen erneut.

<Image pixelated alt="Shiny Pokémon" src="/images/Emerald/Wild/Step-4.webp" />

## Credits

- Chinesische Übersetzung: xuanyelin, Hakuhiro.
- Italienische Übersetzung: Fiask.
- Deutsche Übersetzung: Parasite.
- Screenshots: Fiask.
`;export{e as default};