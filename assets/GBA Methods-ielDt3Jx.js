import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-OZ62x8fR.js";var n=e(),r={title:`Methods 1-4 in Emerald`,navDrawerTitle:`Methods 1-4`,description:`What is a Method, the reason why Methods 1-4 exist, and how they impact Pokémon generation.`,slug:`gba-methods`,category:[`Ruby and Sapphire`,`FireRed and LeafGreen`,`Emerald`],section:`technical_info`,orderPriority:1,addedOn:`2025-04-08`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gist:i,Text:a}=r;return i||o(`Gist`,!0),a||o(`Text`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`Gist: What is a Method, the reason why Methods 1-4 exist, and how they impact
Pokémon generation.`})}),`
`,(0,n.jsx)(r.h3,{children:`What is a Method`}),`
`,(0,n.jsx)(r.p,{children:`A method indicates how a Pokémon will be generated for a given RNG advance.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.code,{children:`RNG Advance + Method => Pokémon generation result`})}),`
`,(0,n.jsx)(r.p,{children:`A method is split into 2 components (ex: Wild-2):`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Prefix: The program CPU instructions used to generate it. (ex: Wild).`}),`
`,(0,n.jsx)(r.li,{children:`Suffix: When the Vblanks occured (ex: 2).`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Method Prefix: Program CPU Instructions`}),`
`,(0,n.jsx)(r.p,{children:`The program CPU instructions depends on how the Pokémon is encountered. For RNG manipulations, 3 of them are relevant:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Stationary Pokémon: Prefix is "Method" (Not convenient, I know...).`}),`
`,(0,n.jsx)(r.li,{children:`Wild Pokémon: Prefix is "Wild" or "H".`}),`
`,(0,n.jsx)(r.li,{children:`Egg Pokémon: Prefix is "Egg".`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Program CPU instructions for Stationary Pokémon are the simplest. The GBA game generates PID then IVs, without additional RNG logic.`}),`
`,(0,n.jsx)(r.p,{children:`Instructions for Wild Pokémon determine the encountered species from Encounter Table, apply Synchronize lead logic which can force multiple PID to be generated, then generate IVs.`}),`
`,(0,n.jsx)(r.p,{children:`Instructions for Egg Pokémon select inherited stats from parents and more. This guide won't cover Egg generation in details.`}),`
`,(0,n.jsx)(r.h3,{children:`Method Suffix: Vblank occurence`}),`
`,(0,n.jsxs)(r.p,{children:[`As explained in `,(0,n.jsx)(r.a,{href:`/gba-vblank`,children:`Understanding VBlanks`}),`, Vblanks can occur seemingly at any time, altering the Pokémon generation.`]}),`
`,(0,n.jsx)(r.p,{children:`How exactly the Pokémon generation will be affected depends if a Vblank occurs and on which program instruction exactly.`}),`
`,(0,n.jsx)(r.p,{children:`This depends on many factors such as the map, background music, lead PID, the game played and how it is played (ex: via Pokémon Box Ruby & Sapphire).`}),`
`,(0,n.jsx)(r.h2,{children:`List of Methods`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Instructions`}),(0,n.jsx)(r.th,{children:`Methods`}),(0,n.jsx)(r.th,{children:`Rarity`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Stationary`}),(0,n.jsxs)(r.td,{children:[`Method-1`,(0,n.jsx)(`br`,{}),`Method-4`]}),(0,n.jsxs)(r.td,{children:[`Very common`,(0,n.jsx)(`br`,{}),`Very rare`]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Wild`}),(0,n.jsxs)(r.td,{children:[`Wild-1`,(0,n.jsx)(`br`,{}),`Wild-2`,(0,n.jsx)(`br`,{}),`Wild-4`]}),(0,n.jsxs)(r.td,{children:[`Rare`,(0,n.jsx)(`br`,{}),`Common`,(0,n.jsx)(`br`,{}),`Uncommon`]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Egg`}),(0,n.jsxs)(r.td,{children:[`Egg-Normal`,(0,n.jsx)(`br`,{}),`Egg-Split`,(0,n.jsx)(`br`,{}),`Egg-Alternate`]}),(0,n.jsxs)(r.td,{children:[`Common`,(0,n.jsx)(`br`,{}),`Common`,(0,n.jsx)(`br`,{}),`Uncommon`]})]})]})]}),`
`,(0,n.jsx)(r.h3,{children:`Method-1 and Wild-1`}),`
`,(0,n.jsx)(r.p,{children:`Here's the game logic for generating a Pokémon:`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Step`}),(0,n.jsx)(r.th,{children:`Advance At Step Start`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate 1st half PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate 2nd half PID`}),(0,n.jsx)(r.td,{children:`2`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate Def, Atk, HP IVs`}),(0,n.jsx)(r.td,{children:`3`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate SpD, SpA, Spe IVs`}),(0,n.jsx)(r.td,{children:`4`})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`Method-1 and Wild-1 is when a Pokémon is generated and no vblanks occur. The Pokémon is generated using the value of the RNG of advances 1,2,3,4.`}),`
`,(0,n.jsx)(r.h3,{children:`Wild-2`}),`
`,(0,n.jsx)(r.p,{children:`Wild-2 is when a vblank occurs between the steps "Generate 2nd half PID" and "Generate Def, Atk, HP IVs".`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Step`}),(0,n.jsx)(r.th,{children:`Advance At Step Start`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate 1st half PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate 2nd half PID`}),(0,n.jsx)(r.td,{children:`2`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`VBLANK: Advance RNG`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`3`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate Def, Atk, HP IVs`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{strong:!0,children:`4`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate SpD, SpA, Spe IVs`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{strong:!0,children:`5`})})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`The Pokémon is generated using the value of the RNG of advances 1,2,4,5. The RNG value of advance 3 has no impact on the generated Pokémon.`}),`
`,(0,n.jsx)(r.h3,{children:`Method-4 and Wild-4`}),`
`,(0,n.jsx)(r.p,{children:`Method-4 and Wild-4 are when a vblank occurs between the steps "Generate Def, Atk, HP IVs" and "Generate SpD, SpA, Spe IVs".`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Step`}),(0,n.jsx)(r.th,{children:`Advance At Step Start`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate 1st half PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate 2nd half PID`}),(0,n.jsx)(r.td,{children:`2`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate Def, Atk, HP IVs`}),(0,n.jsx)(r.td,{children:`3`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`VBLANK: Advance RNG`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`4`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generate SpD, SpA, Spe IVs`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{strong:!0,children:`5`})})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`The Pokémon is generated using the value of the RNG of advances 1,2,3,5. The RNG value of advance 4 has no impact on the generated Pokémon.`}),`
`,(0,n.jsx)(r.h3,{children:`Additional Methods`}),`
`,(0,n.jsx)(r.p,{children:`In theory, it is possible for Vblanks to occur between the steps "Generate 1st half PID" and "Generate 2nd half PID", which would result in Wild-3.
However, because there are so few instructions in-between those steps, a Vblank very rarely occurs there.`}),`
`,(0,n.jsx)(r.p,{children:`It is also theorically possible for Vblanks to occur during a very specific instruction in the RNG update, causing the RNG update to be skipped.`}),`
`,(0,n.jsx)(r.h3,{children:`Learn more`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/gba-methods-lead-impact`,children:`Lead Impact on Wild Methods in Emerald`}),`: Understanding why the lead impacts which Wild method is triggered`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain for the article.`}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Spanish translation: El Terapagos Mexicano.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};