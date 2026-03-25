import{ii as h,j as e}from"./index-BGnyzrB1.js";const a=[{title:"Shiny Starter",navDrawerTitle:"Shiny Starter",description:"Bestimme deine SID, indem du einen Shiny Starter fängst",slug:"de-emerald-shiny-starter",translation:{enSlug:"emerald-shiny-starter",language:"de"}}];function l(i){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...h(),...i.components},{GenerateHoennTidSid:t,Gist:s,ShinyHoennStarter:d}=n;return t||r("GenerateHoennTidSid"),s||r("Gist"),d||r("ShinyHoennStarter"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Bestimme deine SID, indem du einen Shiny Starter fängst."}),`
`,e.jsx(n.h2,{children:"Strategie-Überblick"}),`
`,e.jsxs(n.p,{children:["Wenn du einen neuen Spielstand erstellst, hängt deine SID von der zufällig generierten TID und dem Timing beim Drücken von ",e.jsx(n.code,{children:"A"}),` bei einem bestimmten Text ab.
Unter Berücksichtigung dieser 2 Variablen wird eine Liste möglicher SIDs generiert.
Um zu bestimmen, welche SID die richtige ist, musst du deinen Starter auf dem Advance erhalten, der ihn shiny machen würde. Die getestete SID ist korrekt, wenn das erhaltene Pokémon wirklich shiny ist.`]}),`
`,e.jsx(n.h2,{children:"Schritt 1: Generiere deine TID und eine Liste möglicher SIDs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Geh im Titelbildschirm in die Optionen und stelle die Textgeschwindigkeit auf ",e.jsx(n.code,{children:"Schnell"}),"."]}),`
`,e.jsxs(n.li,{children:["Wähle ",e.jsx(n.code,{children:"Neues Spiel"}),", gib deinen Namen ein und bewege den Cursor über den ",e.jsx(n.code,{children:"OK"}),"-Button."]}),`
`,e.jsx(n.li,{children:"Starte den TID/SID-Timer im Tool unten."}),`
`,e.jsxs(n.li,{children:["Genau wenn der erste Timer 0 erreicht, drücke ",e.jsx(n.code,{children:"A"}),", um deinen Namen zu bestätigen."]}),`
`,e.jsxs(n.li,{children:["Setze den Dialog fort bis zur Nachricht ",e.jsx(n.code,{children:"Komm später in mein POKéMON-LABOR, ich erwarte dich dort"}),"."]}),`
`,e.jsxs(n.li,{children:["Genau wenn der zweite Timer 0 erreicht, drücke ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsx(n.li,{children:"Überprüfe die generierte TID auf deinem Trainerpass."}),`
`,e.jsx(n.li,{children:'Trage die TID in das Feld "Obtained TID" im Tool unten ein und klicke auf "Generate possible SIDs".'}),`
`,e.jsx(n.li,{children:"Folge der Empfehlung unter der Liste, die besagt, ob du Schritt 1 für eine bessere TID wiederholen oder mit deiner aktuellen TID zu Schritt 2 übergehen sollst."}),`
`]}),`
`,e.jsx(t,{game:"emerald"}),`
`,e.jsx(n.h2,{children:"Schritt 2: Bestimme die korrekte SID"}),`
`,e.jsx(n.p,{children:"Zusammenfassung: Versuche für jede in Schritt 1 generierte mögliche SID einen Starter auf dem jeweils frühesten Method-1 Advance zu erhalten, der zu einem Shiny führt (falls die SID korrekt ist)."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Speichere das Spiel direkt vor der Tasche mit den Starter-Pokémon."}),`
`,e.jsx(n.li,{children:"Trage im Tool unten die TID und die erste mögliche SID der Liste ein, die du noch nicht probiert hast."}),`
`,e.jsx(n.li,{children:'Klicke auf "Generate" und starte dann den Timer.'}),`
`,e.jsxs(n.li,{children:["Genau wenn der erste Timer 0 erreicht, drücke gleichzeitig ",e.jsx(n.code,{children:"Start + Select + A + B"}),", um das Spiel zu resetten."]}),`
`,e.jsx(n.li,{children:"Öffne schnell die Tasche, um ungewollte Advances durch umherlaufende NPCs zu vermeiden."}),`
`,e.jsxs(n.li,{children:["Wähle deinen Starter aus und warte, während die Bestätigung ",e.jsx(n.code,{children:"Wählst du dieses Pokémon?"})," angezeigt wird."]}),`
`,e.jsxs(n.li,{children:["Genau wenn der zweite Timer 0 erreicht, drücke ",e.jsx(n.code,{children:"A"}),", um deinen Starter zu wählen."]}),`
`,e.jsx(n.li,{children:"Beende den Kampf und untersuche dein Pokémon."}),`
`,e.jsx(n.li,{children:"Wenn es shiny ist, Glückwunsch! Die eingegebene SID ist die SID deines Spielstands."}),`
`,e.jsx(n.li,{children:'Wenn es nicht shiny ist, trage Spezies, Geschlecht, Wesen und Statuswerte in das Formular unten ein und klicke auf "Find advances matching caught starter Pokémon".'}),`
`,e.jsx(n.li,{children:"Wenn keine Ergebnisse angezeigt werden, ist ein Feld fehlerhaft ausgefüllt."}),`
`,e.jsx(n.li,{children:'Wenn die erste Zeile "Shiny if correct SID" enthält, das Pokémon aber nicht shiny ist, dann ist die aktuell getestete SID falsch. Beginne Schritt 2 erneut mit der nächsten SID aus der Liste.'}),`
`,e.jsx(n.li,{children:'Andernfalls klicke auf den Button "Update Calibration" und wiederhole Schritt 2 mit derselben SID.'}),`
`]}),`
`,e.jsx(d,{game:"emerald"}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Guide und interaktives Tool: RainingChain."}),`
`,e.jsx(n.li,{children:"Gen3 Static Generator Tool: EzPz."}),`
`,e.jsx(n.li,{children:"Chinesische Übersetzung: xuanyelin, Hakuhiro."}),`
`,e.jsx(n.li,{children:"Deutsche Übersetzung: Parasite."}),`
`]})]})}function o(i={}){const{wrapper:n}={...h(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default,a as frontmatter};
