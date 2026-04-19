import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-CvakMO0A.js";var n=e(),r={title:`GBA Overview`,navDrawerTitle:`GBA Overview`,description:`Particularities, key RNG concepts, and version differences of GBA games.`,slug:`gba-overview`,category:[`Ruby and Sapphire`,`FireRed and LeafGreen`,`Emerald`],section:`getting_started`,addedOn:`2025-04-08`};function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gist:i}=r;return i||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`Gist: Particularities, key RNG concepts, and version differences of GBA games.`})}),`
`,(0,n.jsx)(r.h3,{children:`Particularities of GBA RNG Manipulation`}),`
`,(0,n.jsx)(r.p,{children:`In GBA games, the RNG advances every in-game video frame (every 1/60th of a second). This means RNG manipulation requires pressing A with a 1/60th second precision, making it more difficult than the DS generation.`}),`
`,(0,n.jsxs)(r.p,{children:[`RNG manipulation for very rare traits can require waiting for a very long time (1h+ for each attempt). Fortunately, some advanced techniques exist `,(0,n.jsx)(r.a,{href:`/e-tips-rng`,children:`to speed up RNG advances`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:`/gba-vblank`,children:`vblanks`}),` can cause hard to predict RNG advances during the Pokémon generation, altering the outcome unexpectely. Those unexpected advances are the source of the differences between `,(0,n.jsx)(r.a,{href:`/gba-methods`,children:`Methods 1-4`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`Still, they are good reasons to RNG manipulate in GBA games, most notably:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Only way to obtain all Ribbons on a Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`Only way to obtain Shiny Mew and Shiny Deoxys.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`GBA RNG Mechanisms Overview`}),`
`,(0,n.jsx)(r.p,{children:`There is only 1 type of RNG for Pokémon generation. It is used to generate the PID (which dictates Nature, Ability, Shininess) and IVs.`}),`
`,(0,n.jsxs)(r.p,{children:[`Shininess depends on PID, TID, and SID. This means you must `,(0,n.jsx)(r.a,{href:`/gen3-sid`,children:`know your SID`}),` to RNG manipulate a shiny Pokémon.`]}),`
`,(0,n.jsx)(r.h3,{children:`Key Differences between GBA Games`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Game`}),(0,n.jsx)(r.th,{children:`Initial Seed`}),(0,n.jsx)(r.th,{children:`Useful For`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:`/emerald-overview`,children:`Pokémon Emerald`})}),(0,n.jsx)(r.td,{children:`Normally 0`}),(0,n.jsx)(r.td,{children:`Easiest to RNG Static, Wild, and Egg Pokémon`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Ruby & Sapphire`}),(0,n.jsxs)(r.td,{children:[`With live battery: Random.`,(0,n.jsx)(`br`,{}),`With dead battery: Normally 5A0`]}),(0,n.jsx)(r.td,{children:`Access to level 45 Groudon and Kyogre`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`FireRed & LeafGreen`}),(0,n.jsx)(r.td,{children:`Random`}),(0,n.jsxs)(r.td,{children:[`Only way to get Shiny Mewtwo and Unown`,(0,n.jsx)(`br`,{}),`Easiest way to get Shiny Articuno, Zapdos, Moltres`]})]})]})]}),`
`,(0,n.jsx)(r.h3,{children:`Console Interoperability`}),`
`,(0,n.jsx)(r.p,{children:`Pokémon can be traded between GBA and GameCube games.`}),`
`,(0,n.jsx)(r.p,{children:`GameCube games are specifically useful for:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Only way to obtain `,(0,n.jsx)(r.a,{href:`/emulator-rs-wishmaker`,children:`Shiny Jirachi`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Obtaining Entei, Raikou, Suicune with rare traits is easier than on GBA games.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Pokémon can be transfered from GBA to DS games, but not the other way around.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`German translation: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};