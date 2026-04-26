import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-widtYTN0.js";var n=e(),r=[{title:`Pokérus in Smaragd`,navDrawerTitle:`Pokérus`,description:`Wie man sich mit dem Pokérus infiziert`,slug:`de-emerald-pokerus-emu`,translation:{enSlug:`emerald-pokerus-emu`,language:`de`}},{title:`Pokérus in Rubin und Saphir`,navDrawerTitle:`Pokérus`,description:`Wie man sich mit dem Pokérus infiziert`,slug:`de-rs-pokerus-emu`,translation:{enSlug:`rs-pokerus-emu`,language:`de`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{Gist:i,ShowIf:a,YouTubeVideo:s}=r;return i||o(`Gist`,!0),a||o(`ShowIf`,!0),s||o(`YouTubeVideo`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:`Zusammenfassung: Infiziere deine Pokémon mit dem Pokérus`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA`})}),`
`,(0,n.jsxs)(r.li,{children:[`Download `,(0,n.jsx)(r.a,{href:`https://raw.githubusercontent.com/RainingChain/pk_emu_scripts/refs/heads/main/Gen3/pokerus.lua`,children:`Pokérus lua script`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Pokérus`}),`
`,(0,n.jsx)(r.p,{children:`Nach jedem Kampf gegen ein wildes Pokémon besteht eine Chance von 1 / 21.845, dass eines deiner Pokémon mit dem Pokérus infiziert wird. Während der Infektion werden die im Kampf erhaltenen EVs verdoppelt. Der Pokérus wird vor allem benötigt, um optimale Low-Level-Pokémon zu erhalten, wie zum Beispiel ein Farbeagle auf Level 5 mit Drachenwut.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/pokerus.png`,alt:`Pokémon infected by Pokérus`})}),`
`,(0,n.jsx)(r.h2,{children:`Schritt 1: Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(a,{slug:`/de-emerald-pokerus-emu`,children:`Öffne mGBA.`}),`
`,(0,n.jsx)(a,{slug:`/de-rs-pokerus-emu`,children:(0,n.jsx)(r.p,{children:`Öffne mGBA. Stelle sicher, dass die "Realtime clock" deaktiviert ist (Tools
-> Game overrides...).`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Starte dein Spiel und lade das `,(0,n.jsx)(r.code,{children:`pokerus.lua`}),` Script.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Starte das Spiel mit `,(0,n.jsx)(r.code,{children:`Strg + R`}),` neu.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Schritt 2: Kalibrierung`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Starte einen Pokémon-Kampf und greife das wilde Pokémon an, bis es besiegt ist.`}),`
`,(0,n.jsx)(r.li,{children:`Erstelle einen Savestate bei der Nachricht "XXX erhält YY EP.".`}),`
`,(0,n.jsxs)(r.li,{children:[`Pausiere das Spiel mit `,(0,n.jsx)(r.code,{children:`Strg + P`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Notiere dir den "Current advance", der im Scripting-Fenster angezeigt wird.`}),`
`,(0,n.jsxs)(r.li,{children:[`Drücke `,(0,n.jsx)(r.code,{children:`A`}),` während das Spiel pausiert ist, halte `,(0,n.jsx)(r.code,{children:`A`}),` gedrückt und setze das Spiel mit `,(0,n.jsx)(r.code,{children:`Strg + P`}),` fort.`]}),`
`,(0,n.jsx)(r.li,{children:`Wenn das Scripting-Fenster meldet, dass der aktuelle Kampf keinen Pokérus liefern kann, beende den Kampf und kehre zu Schritt 1 der Kalibrierung zurück.`}),`
`,(0,n.jsx)(r.li,{children:`Andernfalls berechne deinen Target Advance, indem du den Current Advance aus Schritt 4 mit der im Scripting-Fenster angezeigten "Advance Difference" addierst.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Schritt 3: Den Target Advance treffen`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Lade deinen vorherigen Savestate (den aus dem Kampf) und spule die Zeit mit `,(0,n.jsx)(r.code,{children:`Strg + N`}),` vor, bis der Current Advance mit dem im letzten Schritt berechneten Target Advance übereinstimmt.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Sobald sie übereinstimmen, drücke `,(0,n.jsx)(r.code,{children:`A`}),` während das Spiel pausiert ist, halte `,(0,n.jsx)(r.code,{children:`A`}),` gedrückt und setze das Spiel mit `,(0,n.jsx)(r.code,{children:`Strg + P`}),` fort.`]}),`
`,(0,n.jsx)(r.li,{children:`Überprüfe den Bericht all deiner Pokémon, um zu verifizieren, ob eines von ihnen den Pokérus hat.`}),`
`]}),`
`,(0,n.jsx)(s,{id:`ySpe6-4xCNc`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Guide und Scripts: RainingChain.`}),`
`,(0,n.jsx)(r.li,{children:`Script Inspiration: Real96.`}),`
`,(0,n.jsxs)(r.li,{children:[`Decompil Projekte: `,(0,n.jsx)(r.a,{href:`https://github.com/pret/pokeemerald`,children:`pret team`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Chinesische Übersetzung: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Deutsche Übersetzung: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};