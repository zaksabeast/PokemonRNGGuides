import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DLFhP4kJ.js";var n=e(),r=[{title:`Shiny Starter`,navDrawerTitle:`Shiny Starter`,description:`Bestimme deine SID, indem du einen Shiny Starter fängst`,slug:`de-emerald-shiny-starter`,translation:{enSlug:`emerald-shiny-starter`,language:`de`}}];function i(e){let r={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{GenerateHoennTidSid:i,Gist:a,ShinyHoennStarter:s}=r;return i||o(`GenerateHoennTidSid`,!0),a||o(`Gist`,!0),s||o(`ShinyHoennStarter`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{children:`Bestimme deine SID, indem du einen Shiny Starter fängst.`}),`
`,(0,n.jsx)(r.h2,{children:`Strategie-Überblick`}),`
`,(0,n.jsxs)(r.p,{children:[`Wenn du einen neuen Spielstand erstellst, hängt deine SID von der zufällig generierten TID und dem Timing beim Drücken von `,(0,n.jsx)(r.code,{children:`A`}),` bei einem bestimmten Text ab.
Unter Berücksichtigung dieser 2 Variablen wird eine Liste möglicher SIDs generiert.
Um zu bestimmen, welche SID die richtige ist, musst du deinen Starter auf dem Advance erhalten, der ihn shiny machen würde. Die getestete SID ist korrekt, wenn das erhaltene Pokémon wirklich shiny ist.`]}),`
`,(0,n.jsx)(r.h2,{children:`Schritt 1: Generiere deine TID und eine Liste möglicher SIDs`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Geh im Titelbildschirm in die Optionen und stelle die Textgeschwindigkeit auf `,(0,n.jsx)(r.code,{children:`Schnell`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Wähle `,(0,n.jsx)(r.code,{children:`Neues Spiel`}),`, gib deinen Namen ein und bewege den Cursor über den `,(0,n.jsx)(r.code,{children:`OK`}),`-Button.`]}),`
`,(0,n.jsx)(r.li,{children:`Starte den TID/SID-Timer im Tool unten.`}),`
`,(0,n.jsxs)(r.li,{children:[`Genau wenn der erste Timer 0 erreicht, drücke `,(0,n.jsx)(r.code,{children:`A`}),`, um deinen Namen zu bestätigen.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Setze den Dialog fort bis zur Nachricht `,(0,n.jsx)(r.code,{children:`Komm später in mein POKéMON-LABOR, ich erwarte dich dort`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Genau wenn der zweite Timer 0 erreicht, drücke `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Überprüfe die generierte TID auf deinem Trainerpass.`}),`
`,(0,n.jsx)(r.li,{children:`Trage die TID in das Feld "Obtained TID" im Tool unten ein und klicke auf "Generate possible SIDs".`}),`
`,(0,n.jsx)(r.li,{children:`Folge der Empfehlung unter der Liste, die besagt, ob du Schritt 1 für eine bessere TID wiederholen oder mit deiner aktuellen TID zu Schritt 2 übergehen sollst.`}),`
`]}),`
`,(0,n.jsx)(i,{game:`emerald`}),`
`,(0,n.jsx)(r.h2,{children:`Schritt 2: Bestimme die korrekte SID`}),`
`,(0,n.jsx)(r.p,{children:`Zusammenfassung: Versuche für jede in Schritt 1 generierte mögliche SID einen Starter auf dem jeweils frühesten Method-1 Advance zu erhalten, der zu einem Shiny führt (falls die SID korrekt ist).`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Speichere das Spiel direkt vor der Tasche mit den Starter-Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`Trage im Tool unten die TID und die erste mögliche SID der Liste ein, die du noch nicht probiert hast.`}),`
`,(0,n.jsx)(r.li,{children:`Klicke auf "Generate" und starte dann den Timer.`}),`
`,(0,n.jsxs)(r.li,{children:[`Genau wenn der erste Timer 0 erreicht, drücke gleichzeitig `,(0,n.jsx)(r.code,{children:`Start + Select + A + B`}),`, um das Spiel zu resetten.`]}),`
`,(0,n.jsx)(r.li,{children:`Öffne schnell die Tasche, um ungewollte Advances durch umherlaufende NPCs zu vermeiden.`}),`
`,(0,n.jsxs)(r.li,{children:[`Wähle deinen Starter aus und warte, während die Bestätigung `,(0,n.jsx)(r.code,{children:`Wählst du dieses Pokémon?`}),` angezeigt wird.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Genau wenn der zweite Timer 0 erreicht, drücke `,(0,n.jsx)(r.code,{children:`A`}),`, um deinen Starter zu wählen.`]}),`
`,(0,n.jsx)(r.li,{children:`Beende den Kampf und untersuche dein Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`Wenn es shiny ist, Glückwunsch! Die eingegebene SID ist die SID deines Spielstands.`}),`
`,(0,n.jsx)(r.li,{children:`Wenn es nicht shiny ist, trage Spezies, Geschlecht, Wesen und Statuswerte in das Formular unten ein und klicke auf "Find advances matching caught starter Pokémon".`}),`
`,(0,n.jsx)(r.li,{children:`Wenn keine Ergebnisse angezeigt werden, ist ein Feld fehlerhaft ausgefüllt.`}),`
`,(0,n.jsx)(r.li,{children:`Wenn die erste Zeile "Shiny if correct SID" enthält, das Pokémon aber nicht shiny ist, dann ist die aktuell getestete SID falsch. Beginne Schritt 2 erneut mit der nächsten SID aus der Liste.`}),`
`,(0,n.jsx)(r.li,{children:`Andernfalls klicke auf den Button "Update Calibration" und wiederhole Schritt 2 mit derselben SID.`}),`
`]}),`
`,(0,n.jsx)(s,{game:`emerald`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Guide und interaktives Tool: RainingChain.`}),`
`,(0,n.jsx)(r.li,{children:`Gen3 Static Generator Tool: EzPz.`}),`
`,(0,n.jsx)(r.li,{children:`Chinesische Übersetzung: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Deutsche Übersetzung: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};