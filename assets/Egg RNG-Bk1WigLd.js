import{ih as a,j as e}from"./index-7kvXYaHY.js";const c=[{title:"Smaragd Ei-RNG",navDrawerTitle:"Ei-RNG",description:"Lerne, wie du in Pokémon Smaragd Eier in der Pension RNGst. Erhalte perfekte IVs, Wesen und Shinies.",slug:"de-emulator-emerald-egg",translation:{enSlug:"emulator-emerald-egg",language:"de"}}];function t(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...a(),...i.components},{EmeraldHeldEgg:s,EmeraldPickupEgg:r,YouTubeVideo:l}=n;return s||d("EmeraldHeldEgg"),r||d("EmeraldPickupEgg"),l||d("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA mit Lua-Skripten"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"Eier werden in Smaragd in zwei Schritten generiert: Die PID wird festgelegt, wenn du den Schritt machst, der das Ei entstehen lässt. Die IVs werden festgelegt, wenn du das Ei beim Pensionsleiter abholst. Du musst also zwei RNG-Vorgänge durchführen, um ein perfektes Shiny-Ei zu erhalten."}),`
`,e.jsx(n.h2,{children:"Video Guide"}),`
`,e.jsx(l,{id:"JtwSZgw6Q4U"}),`
`,e.jsx(n.h2,{children:"Ein Shiny-Pokémon erhalten"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Öffne den Tab „Pokemon Info“ im Lua-Skript, um die IVs und das Wesen deiner Eltern-Pokémon zu sehen. Notiere sie für später."}),`
`,e.jsx(n.li,{children:"Gib beide Pokémon in die Pension. Das erste Pokémon ist „Parent 1“, das zweite „Parent 2“. Notiere dir die Reihenfolge."}),`
`,e.jsx(n.li,{children:"Sprich mit dem Pensionsleiter, um die Kompatibilität zu prüfen, und gib diese in das untenstehende RNG-Tool ein."}),`
`,e.jsx(n.li,{children:"Laufe innerhalb der Pension umher, bis der Schrittzähler des Lua-Skripts auf 1 steht."}),`
`,e.jsx(n.li,{children:"Speichere das Spiel, starte es neu und pausiere direkt nach dem Laden des Spielstands."}),`
`,e.jsx(n.li,{children:"Wechsle im Lua-Skript zum Tab „Breeding“ und gib „Calibration“, „Initial Seed“, „TID“, „SID“ und „Advances“ (als „Initial advances“) in das RNG-Tool ein. Gib außerdem das Wesen des Nicht-Ditto- oder weiblichen Elternteils an. Optional kannst du nach Shiny-Status, Wesen und Geschlecht filtern."}),`
`,e.jsx(n.li,{children:"Klicke auf „Generate“, um eine Liste potenzieller PIDs zu erhalten, und wähle eine Ziel-PID aus. Wenn es keine Ergebnisse gibt, erhöhe die „Max Advances“."}),`
`,e.jsx(n.li,{children:"Hebe die Pause im Spiel auf."}),`
`,e.jsxs(n.li,{children:["Falls „Redraws“ nötig sind: Öffne das Spielmenü (Drücke ",e.jsx(n.code,{children:"Start"}),"), öffne den Pokédex und schließe ihn wieder für jeden benötigten Redraw."]}),`
`,e.jsx(n.li,{children:"Pausiere das Spiel kurz vor deinem Ziel-Advance und erstelle einen Save State."}),`
`,e.jsxs(n.li,{children:["Gehe das Spiel manuell Frame für Frame durch (",e.jsx(n.code,{children:"Strg + N"})," unter Windows, ",e.jsx(n.code,{children:"Cmd + N"})," auf Mac), bis du deinen Ziel-Advance erreichst."]}),`
`,e.jsxs(n.li,{children:["Halte die Richtungstaste gedrückt, damit dein Charakter läuft, und hebe die Pause auf, während du die Taste gedrückt hältst. Laufe in die Richtung, in die dein Charakter schaut (z. B. nach ",e.jsx(n.code,{children:"links"}),", wenn er nach links blickt)."]}),`
`,e.jsx(n.li,{children:"Das Ei, das du erhältst, sollte nun deine Ziel-PID haben."}),`
`,e.jsx(n.li,{children:"Falls du das Ziel verfehlt hast, gib das Wesen im RNG-Tool ein, um herauszufinden, auf welchem Advance du gelandet bist."}),`
`,e.jsx(n.li,{children:"Ziehe den erreichten Advance von deinem Ziel-Advance ab, trage die Differenz im Feld „Delay“ des RNG-Tools ein, generiere die Ergebnisse neu und versuche es erneut."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Glückwunsch! Du hast jetzt ein Shiny-Ei!"})}),`
`,e.jsx(s,{lua:!0}),`
`,e.jsx(n.h2,{children:"IVs festlegen"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Stelle dich draußen neben den Pensionsleiter, speichere und starte das Spiel neu."}),`
`,e.jsx(n.li,{children:"Sprich mit dem Pensionsleiter, bis der Text „Kümmere dich gut darum“ erscheint. Pausiere das Spiel und erstelle einen Save State."}),`
`,e.jsx(n.li,{children:"Gib den aktuellen Advance im Feld „Initial advances“ im RNG-Tool ein."}),`
`,e.jsx(n.li,{children:"Trage die IVs deiner Eltern-Pokémon in das RNG-Tool ein."}),`
`,e.jsx(n.li,{children:"Klicke auf „Generate“, wähle einen Ziel-Advance aus der Liste aus."}),`
`,e.jsx(n.li,{children:"Pausiere das Spiel kurz vor deinem Ziel-Advance und erstelle einen Save State."}),`
`,e.jsxs(n.li,{children:["Gehe das Spiel manuell durch (",e.jsx(n.code,{children:"Strg + N"})," oder ",e.jsx(n.code,{children:"Cmd + N"}),"), bis du den Ziel-Advance erreichst."]}),`
`,e.jsx(n.li,{children:"Halte „A“ gedrückt und hebe die Pause auf, um das Ei genau auf dem Ziel-Advance zu erhalten."}),`
`,e.jsx(n.li,{children:"Nutze den „Pokemon Info“-Tab des Lua-Skripts, um die IVs des erhaltenen Pokémon zu prüfen."}),`
`,e.jsx(n.li,{children:"Falls du das Ziel verfehlt hast, gib die IVs im RNG-Tool ein, um den erreichten Advance zu finden. Eventuell musst du das Feld „Method“ ändern, um einen Treffer zu finden."}),`
`,e.jsx(n.li,{children:"Ziehe den erreichten Advance von deinem Ziel ab, trage die Differenz bei „Delay“ ein, generiere neu und versuche es noch einmal."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Glückwunsch! Dein Ei hat jetzt fantastische IVs!"})}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Danke an alle Mitwirkenden von ",e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder",children:"PokeFinder"})," auf deren Arbeit dieses Tool basiert."]}),`
`,e.jsx(n.li,{children:"Chinesische Übersetzung: xuanyelin, Hakuhiro."}),`
`,e.jsx(n.li,{children:"Italienische Übersetzung: Fiask."}),`
`,e.jsx(n.li,{children:"Deutsche Übersetzung: Parasite."}),`
`]})]})}function u(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}function d(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default,c as frontmatter};
