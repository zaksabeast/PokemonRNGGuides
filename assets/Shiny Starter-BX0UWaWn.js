const e=`---
- title: "Shiny Starter"
  navDrawerTitle: "Shiny Starter"
  description: "Bestimme deine SID, indem du einen Shiny Starter fängst"
  slug: "de-emerald-shiny-starter"
  translation:
    enSlug: "emerald-shiny-starter"
    language: "de"
---

<Gist>Bestimme deine SID, indem du einen Shiny Starter fängst.</Gist>

## Strategie-Überblick

Wenn du einen neuen Spielstand erstellst, hängt deine SID von der zufällig generierten TID und dem Timing beim Drücken von \`A\` bei einem bestimmten Text ab.
Unter Berücksichtigung dieser 2 Variablen wird eine Liste möglicher SIDs generiert.
Um zu bestimmen, welche SID die richtige ist, musst du deinen Starter auf dem Advance erhalten, der ihn shiny machen würde. Die getestete SID ist korrekt, wenn das erhaltene Pokémon wirklich shiny ist.

## Schritt 1: Generiere deine TID und eine Liste möglicher SIDs

1. Geh im Titelbildschirm in die Optionen und stelle die Textgeschwindigkeit auf \`Schnell\`.
2. Wähle \`Neues Spiel\`, gib deinen Namen ein und bewege den Cursor über den \`OK\`-Button.
3. Starte den TID/SID-Timer im Tool unten.
4. Genau wenn der erste Timer 0 erreicht, drücke \`A\`, um deinen Namen zu bestätigen.
5. Setze den Dialog fort bis zur Nachricht \`Komm später in mein POKéMON-LABOR, ich erwarte dich dort\`.
6. Genau wenn der zweite Timer 0 erreicht, drücke \`A\`.
7. Überprüfe die generierte TID auf deinem Trainerpass.
8. Trage die TID in das Feld "Obtained TID" im Tool unten ein und klicke auf "Generate possible SIDs".
9. Folge der Empfehlung unter der Liste, die besagt, ob du Schritt 1 für eine bessere TID wiederholen oder mit deiner aktuellen TID zu Schritt 2 übergehen sollst.

<GenerateHoennTidSid game="emerald" />

## Schritt 2: Bestimme die korrekte SID

Zusammenfassung: Versuche für jede in Schritt 1 generierte mögliche SID einen Starter auf dem jeweils frühesten Method-1 Advance zu erhalten, der zu einem Shiny führt (falls die SID korrekt ist).

1. Speichere das Spiel direkt vor der Tasche mit den Starter-Pokémon.
2. Trage im Tool unten die TID und die erste mögliche SID der Liste ein, die du noch nicht probiert hast.
3. Klicke auf "Generate" und starte dann den Timer.
4. Genau wenn der erste Timer 0 erreicht, drücke gleichzeitig \`Start + Select + A + B\`, um das Spiel zu resetten.
5. Öffne schnell die Tasche, um ungewollte Advances durch umherlaufende NPCs zu vermeiden.
6. Wähle deinen Starter aus und warte, während die Bestätigung \`Wählst du dieses Pokémon?\` angezeigt wird.
7. Genau wenn der zweite Timer 0 erreicht, drücke \`A\`, um deinen Starter zu wählen.
8. Beende den Kampf und untersuche dein Pokémon.
9. Wenn es shiny ist, Glückwunsch! Die eingegebene SID ist die SID deines Spielstands.
10. Wenn es nicht shiny ist, trage Spezies, Geschlecht, Wesen und Statuswerte in das Formular unten ein und klicke auf "Find advances matching caught starter Pokémon".
11. Wenn keine Ergebnisse angezeigt werden, ist ein Feld fehlerhaft ausgefüllt.
12. Wenn die erste Zeile "Shiny if correct SID" enthält, das Pokémon aber nicht shiny ist, dann ist die aktuell getestete SID falsch. Beginne Schritt 2 erneut mit der nächsten SID aus der Liste.
13. Andernfalls klicke auf den Button "Update Calibration" und wiederhole Schritt 2 mit derselben SID.

<ShinyHoennStarter game="emerald" />

## Credits

- Guide und interaktives Tool: RainingChain.
- Gen3 Static Generator Tool: EzPz.
- Chinesische Übersetzung: xuanyelin, Hakuhiro.
- Deutsche Übersetzung: Parasite.
`;export{e as default};
