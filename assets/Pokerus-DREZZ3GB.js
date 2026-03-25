import{w as a,j as e}from"./index-CCQMIRn6.js";const o=[{title:"Pokérus in Smaragd",navDrawerTitle:"Pokérus",description:"Wie man sich mit dem Pokérus infiziert",slug:"de-emerald-pokerus-emu",translation:{enSlug:"emerald-pokerus-emu",language:"de"}},{title:"Pokérus in Rubin und Saphir",navDrawerTitle:"Pokérus",description:"Wie man sich mit dem Pokérus infiziert",slug:"de-rs-pokerus-emu",translation:{enSlug:"rs-pokerus-emu",language:"de"}}];function l(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...a(),...i.components},{Gist:t,ShowIf:r,YouTubeVideo:d}=n;return t||s("Gist"),r||s("ShowIf"),d||s("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Zusammenfassung: Infiziere deine Pokémon mit dem Pokérus"}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA"})}),`
`,e.jsxs(n.li,{children:["Download ",e.jsx(n.a,{href:"https://raw.githubusercontent.com/RainingChain/pk_emu_scripts/refs/heads/main/Gen3/pokerus.lua",children:"Pokérus lua script"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Pokérus"}),`
`,e.jsx(n.p,{children:"Nach jedem Kampf gegen ein wildes Pokémon besteht eine Chance von 1 / 21.845, dass eines deiner Pokémon mit dem Pokérus infiziert wird. Während der Infektion werden die im Kampf erhaltenen EVs verdoppelt. Der Pokérus wird vor allem benötigt, um optimale Low-Level-Pokémon zu erhalten, wie zum Beispiel ein Farbeagle auf Level 5 mit Drachenwut."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/pokerus.png",alt:"Pokémon infected by Pokérus"})}),`
`,e.jsx(n.h2,{children:"Schritt 1: Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(r,{slug:"/de-emerald-pokerus-emu",children:"Öffne mGBA."}),`
`,e.jsx(r,{slug:"/de-rs-pokerus-emu",children:e.jsx(n.p,{children:`Öffne mGBA. Stelle sicher, dass die "Realtime clock" deaktiviert ist (Tools
-> Game overrides...).`})}),`
`]}),`
`,e.jsxs(n.li,{children:["Starte dein Spiel und lade das ",e.jsx(n.code,{children:"pokerus.lua"})," Script."]}),`
`,e.jsxs(n.li,{children:["Starte das Spiel mit ",e.jsx(n.code,{children:"Strg + R"})," neu."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Schritt 2: Kalibrierung"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Starte einen Pokémon-Kampf und greife das wilde Pokémon an, bis es besiegt ist."}),`
`,e.jsx(n.li,{children:'Erstelle einen Savestate bei der Nachricht "XXX erhält YY EP.".'}),`
`,e.jsxs(n.li,{children:["Pausiere das Spiel mit ",e.jsx(n.code,{children:"Strg + P"}),"."]}),`
`,e.jsx(n.li,{children:'Notiere dir den "Current advance", der im Scripting-Fenster angezeigt wird.'}),`
`,e.jsxs(n.li,{children:["Drücke ",e.jsx(n.code,{children:"A"})," während das Spiel pausiert ist, halte ",e.jsx(n.code,{children:"A"})," gedrückt und setze das Spiel mit ",e.jsx(n.code,{children:"Strg + P"})," fort."]}),`
`,e.jsx(n.li,{children:"Wenn das Scripting-Fenster meldet, dass der aktuelle Kampf keinen Pokérus liefern kann, beende den Kampf und kehre zu Schritt 1 der Kalibrierung zurück."}),`
`,e.jsx(n.li,{children:'Andernfalls berechne deinen Target Advance, indem du den Current Advance aus Schritt 4 mit der im Scripting-Fenster angezeigten "Advance Difference" addierst.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Schritt 3: Den Target Advance treffen"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Lade deinen vorherigen Savestate (den aus dem Kampf) und spule die Zeit mit ",e.jsx(n.code,{children:"Strg + N"})," vor, bis der Current Advance mit dem im letzten Schritt berechneten Target Advance übereinstimmt."]}),`
`,e.jsxs(n.li,{children:["Sobald sie übereinstimmen, drücke ",e.jsx(n.code,{children:"A"})," während das Spiel pausiert ist, halte ",e.jsx(n.code,{children:"A"})," gedrückt und setze das Spiel mit ",e.jsx(n.code,{children:"Strg + P"})," fort."]}),`
`,e.jsx(n.li,{children:"Überprüfe den Bericht all deiner Pokémon, um zu verifizieren, ob eines von ihnen den Pokérus hat."}),`
`]}),`
`,e.jsx(d,{id:"ySpe6-4xCNc"}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Guide und Scripts: RainingChain."}),`
`,e.jsx(n.li,{children:"Script Inspiration: Real96."}),`
`,e.jsxs(n.li,{children:["Decompil Projekte: ",e.jsx(n.a,{href:"https://github.com/pret/pokeemerald",children:"pret team"}),"."]}),`
`,e.jsx(n.li,{children:"Chinesische Übersetzung: xuanyelin, Hakuhiro."}),`
`,e.jsx(n.li,{children:"Deutsche Übersetzung: Parasite."}),`
`]})]})}function h(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,o as frontmatter};
