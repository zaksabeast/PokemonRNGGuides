import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BB5MVq97.js";var n=e(),r=[{title:`Battle Video`,navDrawerTitle:`Battle Video`,description:`How to create an optimal Battle Video to save and restore the RNG state.`,slug:`emerald-battle-video`,category:`Emerald`,section:`rng_technique`,variant:`retail`,addedOn:`2026-03-24`}];function i(e){let r={a:`a`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components},{BattleVideo:i,Gist:a}=r;return i||o(`BattleVideo`,!0),a||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{children:(0,n.jsx)(r.p,{children:`Gist: How to create an optimal Battle Video or update an existing one.`})}),`
`,(0,n.jsx)(r.h2,{children:`Prerequisite`}),`
`,(0,n.jsxs)(r.p,{children:[`It is recommended to first read `,(0,n.jsx)(r.a,{href:`/emerald-advancing-rng-techniques`,children:`Overview of RNG Advancing Techniques`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Overview`}),`
`,(0,n.jsx)(r.p,{children:`Battle Video is a RNG technique to save and restore the RNG state. Using that technique, players only need to wait the full delay of their RNG manipulation once. Afterwards, each retry is very quick.`}),`
`,(0,n.jsx)(r.p,{children:`After winning or losing a battle at the Battle Frontier, players can record their battle. The RNG state at the start of the battle is saved into the battle record. Players can watch their battle anywhere by opening their trainer card and selecting "Battle Record". By doing so, the current RNG state is reseeded with the RNG state at the start of the recorded battle.`}),`
`,(0,n.jsx)(r.p,{children:`The RNG state saved on the battle record must leave sufficient time to perform the action required by the RNG manipulation.`}),`
`,(0,n.jsx)(r.h2,{children:`Cases`}),`
`,(0,n.jsx)(r.p,{children:`Battle Video is used 3 cases:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Creating a Battle Video from scratch.`}),`
`,(0,n.jsx)(r.li,{children:`Update an existing Battle Video because the current one has too much waiting.`}),`
`,(0,n.jsx)(r.li,{children:`Creating a Battle Video after successful Painting Reseeding.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`The 2 first cases are covered in this guide. Battle Video in the context of Painting Reseeding will be covered in another guide.`}),`
`,(0,n.jsx)(r.p,{children:`Creating a Battle Video requires waiting for the RNG state to reach the wanted advance. The easiest way is to wait in front of the Battle Frontier clerk. However, it is also possible to do most of the waiting while in battle, which advanced the RNG twice as fast. The webtool supports both approaches.`}),`
`,(0,n.jsx)(r.h2,{children:`Webtool and Instructions`}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain`}),`
`,(0,n.jsx)(r.li,{children:`German translation: Parasite`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};