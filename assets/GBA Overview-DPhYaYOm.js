import{ii as t,j as e}from"./index-dDEf2Pkr.js";const l=[{title:"GBA Übersicht",navDrawerTitle:"GBA Übersicht",description:"Besonderheiten, zentrale RNG-Konzepte und Versionsunterschiede der GBA-Spiele.",slug:"de-gba-overview",translation:{enSlug:"gba-overview",language:"de"}}];function s(i){const n={a:"a",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...i.components},{Gist:r}=n;return r||d("Gist"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsx(n.p,{children:"Besonderheiten, zentrale RNG-Konzepte und Versionsunterschiede der GBA-Spiele."})}),`
`,e.jsx(n.h3,{children:"Besonderheiten der GBA RNG Manipulation"}),`
`,e.jsx(n.p,{children:"In GBA-Spielen advanced der RNG mit jedem Video-Frame (alle 1/60 Sekunde). Das bedeutet, dass RNG Manipulation ein Drücken von A mit einer Präzision von 1/60 Sekunde erfordert, was es schwieriger macht als in der DS-Generation."}),`
`,e.jsxs(n.p,{children:["RNG Manipulation für sehr seltene Traits kann langes Warten erfordern (1h+ pro Attempt). Glücklicherweise gibt es fortgeschrittene Techniken, um ",e.jsx(n.a,{href:"/e-tips-rng",children:"RNG Advances zu beschleunigen"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"/gba-vblank",children:"vblanks"})," können schwer vorhersehbare RNG Advances während der Pokémon-Generation verursachen und das Ergebnis unerwartet verändern. Diese unerwarteten Advances sind die Ursache für die Unterschiede zwischen den ",e.jsx(n.a,{href:"/gba-methods",children:"Methods 1-4"}),"."]}),`
`,e.jsx(n.p,{children:"Dennoch gibt es gute Gründe für RNG Manipulation in GBA-Spielen, vor allem:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Einzige Möglichkeit, alle Ribbons auf einem Pokémon zu erhalten."}),`
`,e.jsx(n.li,{children:"Einzige Möglichkeit, Shiny Mew und Shiny Deoxys zu erhalten."}),`
`]}),`
`,e.jsx(n.h3,{children:"Überblick über die GBA RNG Mechanismen"}),`
`,e.jsx(n.p,{children:"Es gibt nur 1 Typ von RNG für die Pokémon-Generation. Er wird verwendet, um die PID (welche Wesen, Fähigkeiten, Shininess bestimmt) und die IVs zu generieren."}),`
`,e.jsxs(n.p,{children:["Shininess hängt von PID, TID und SID ab. Das bedeutet, du musst ",e.jsx(n.a,{href:"/gen3-sid",children:"deine SID kennen"}),", um ein Shiny Pokémon zu RNGn."]}),`
`,e.jsx(n.h3,{children:"Zentrale Unterschiede zwischen den GBA-Spielen"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Spiel"}),e.jsx(n.th,{children:"Initial Seed"}),e.jsx(n.th,{children:"Nützlich für"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"/emerald-overview",children:"Pokémon Smaragd"})}),e.jsx(n.td,{children:"Normalerweise 0"}),e.jsx(n.td,{children:"Am einfachsten für RNG von Static, Wild, und Ei Pokémon"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Rubin & Saphir"}),e.jsxs(n.td,{children:["Mit voller Batterie: Zufällig.",e.jsx("br",{}),"Mit leerer Batterie: Normal 5A0"]}),e.jsx(n.td,{children:"Zugriff auf Level 45 Groudon und Kyogre"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Feuerrot & Blattgrün"}),e.jsx(n.td,{children:"Zufällig"}),e.jsxs(n.td,{children:["Einziger Weg für Shiny Mewtu und Icognito",e.jsx("br",{}),"Einfachster Weg für Shiny Arktos, Zapdos, Lavados"]})]})]})]}),`
`,e.jsx(n.h3,{children:"Konsolen-Interoperabilität"}),`
`,e.jsx(n.p,{children:"Pokémon können zwischen GBA- und GameCube-Games getauscht werden."}),`
`,e.jsx(n.p,{children:"GameCube-Games sind besonders nützlich für:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Einzige Möglichkeit, ",e.jsx(n.a,{href:"/emulator-rs-wishmaker",children:"Shiny Jirachi"})," zu erhalten."]}),`
`,e.jsx(n.li,{children:"Erhalt von Entei, Raikou, Suicune mit seltenen Traits ist einfacher als auf GBA-Games."}),`
`]}),`
`,e.jsx(n.p,{children:"Pokémon können von GBA auf DS-Games übertragen werden, aber nicht umgekehrt."}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinesische Übersetzung: Hakuhiro."}),`
`,e.jsx(n.li,{children:"Deutsche Übersetzung: Parasite."}),`
`]})]})}function a(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}function d(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,l as frontmatter};
