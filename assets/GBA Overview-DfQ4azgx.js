import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-B5eGYVya.js";var n=e(),r=[{title:`GBA Übersicht`,navDrawerTitle:`GBA Übersicht`,description:`Besonderheiten, zentrale RNG-Konzepte und Versionsunterschiede der GBA-Spiele.`,slug:`de-gba-overview`,translation:{enSlug:`gba-overview`,language:`de`}}];function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gist:i}=r;return i||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`Besonderheiten, zentrale RNG-Konzepte und Versionsunterschiede der GBA-Spiele.`})}),`
`,(0,n.jsx)(r.h3,{children:`Besonderheiten der GBA RNG Manipulation`}),`
`,(0,n.jsx)(r.p,{children:`In GBA-Spielen advanced der RNG mit jedem Video-Frame (alle 1/60 Sekunde). Das bedeutet, dass RNG Manipulation ein Drücken von A mit einer Präzision von 1/60 Sekunde erfordert, was es schwieriger macht als in der DS-Generation.`}),`
`,(0,n.jsxs)(r.p,{children:[`RNG Manipulation für sehr seltene Traits kann langes Warten erfordern (1h+ pro Attempt). Glücklicherweise gibt es fortgeschrittene Techniken, um `,(0,n.jsx)(r.a,{href:`/e-tips-rng`,children:`RNG Advances zu beschleunigen`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:`/gba-vblank`,children:`vblanks`}),` können schwer vorhersehbare RNG Advances während der Pokémon-Generation verursachen und das Ergebnis unerwartet verändern. Diese unerwarteten Advances sind die Ursache für die Unterschiede zwischen den `,(0,n.jsx)(r.a,{href:`/gba-methods`,children:`Methods 1-4`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`Dennoch gibt es gute Gründe für RNG Manipulation in GBA-Spielen, vor allem:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Einzige Möglichkeit, alle Ribbons auf einem Pokémon zu erhalten.`}),`
`,(0,n.jsx)(r.li,{children:`Einzige Möglichkeit, Shiny Mew und Shiny Deoxys zu erhalten.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Überblick über die GBA RNG Mechanismen`}),`
`,(0,n.jsx)(r.p,{children:`Es gibt nur 1 Typ von RNG für die Pokémon-Generation. Er wird verwendet, um die PID (welche Wesen, Fähigkeiten, Shininess bestimmt) und die IVs zu generieren.`}),`
`,(0,n.jsxs)(r.p,{children:[`Shininess hängt von PID, TID und SID ab. Das bedeutet, du musst `,(0,n.jsx)(r.a,{href:`/gen3-sid`,children:`deine SID kennen`}),`, um ein Shiny Pokémon zu RNGn.`]}),`
`,(0,n.jsx)(r.h3,{children:`Zentrale Unterschiede zwischen den GBA-Spielen`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Spiel`}),(0,n.jsx)(r.th,{children:`Initial Seed`}),(0,n.jsx)(r.th,{children:`Nützlich für`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:`/emerald-overview`,children:`Pokémon Smaragd`})}),(0,n.jsx)(r.td,{children:`Normalerweise 0`}),(0,n.jsx)(r.td,{children:`Am einfachsten für RNG von Static, Wild, und Ei Pokémon`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Rubin & Saphir`}),(0,n.jsxs)(r.td,{children:[`Mit voller Batterie: Zufällig.`,(0,n.jsx)(`br`,{}),`Mit leerer Batterie: Normal 5A0`]}),(0,n.jsx)(r.td,{children:`Zugriff auf Level 45 Groudon und Kyogre`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Feuerrot & Blattgrün`}),(0,n.jsx)(r.td,{children:`Zufällig`}),(0,n.jsxs)(r.td,{children:[`Einziger Weg für Shiny Mewtu und Icognito`,(0,n.jsx)(`br`,{}),`Einfachster Weg für Shiny Arktos, Zapdos, Lavados`]})]})]})]}),`
`,(0,n.jsx)(r.h3,{children:`Konsolen-Interoperabilität`}),`
`,(0,n.jsx)(r.p,{children:`Pokémon können zwischen GBA- und GameCube-Games getauscht werden.`}),`
`,(0,n.jsx)(r.p,{children:`GameCube-Games sind besonders nützlich für:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Einzige Möglichkeit, `,(0,n.jsx)(r.a,{href:`/emulator-rs-wishmaker`,children:`Shiny Jirachi`}),` zu erhalten.`]}),`
`,(0,n.jsx)(r.li,{children:`Erhalt von Entei, Raikou, Suicune mit seltenen Traits ist einfacher als auf GBA-Games.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Pokémon können von GBA auf DS-Games übertragen werden, aber nicht umgekehrt.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinesische Übersetzung: Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Deutsche Übersetzung: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};