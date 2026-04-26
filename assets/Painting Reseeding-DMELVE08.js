import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DYKm3G_o.js";var n=e(),r=[{title:`Painting Reseeding`,navDrawerTitle:`Painting Reseeding`,description:`How to perform Painting Reseeding to quickly access very distant RNG states.`,slug:`emerald-painting-reseeding`,guideKey:`emerald-painting`,category:`Emerald`,section:`rng_technique`,variant:`retail`,addedOn:`2026-04-07`}];function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{EmeraldPaintingReseeding:i,Gist:a}=r;return i||o(`EmeraldPaintingReseeding`,!0),a||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{children:(0,n.jsx)(r.p,{children:`Gist: How to perform Painting Reseeding to quickly access very distant RNG
states.`})}),`
`,(0,n.jsx)(r.h2,{children:`Prerequisites`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Access to the Battle Frontier.`}),`
`,(0,n.jsx)(r.li,{children:`Owning a Egg Pokémon and a Pokémon knowing Sweet Scent.`}),`
`,(0,n.jsx)(r.li,{children:`Recommended: A Master Ball or a Pokémon knowing False Swipe.`}),`
`,(0,n.jsx)(r.li,{children:`Recommended: 5+ Rare Candies.`}),`
`,(0,n.jsxs)(r.li,{children:[`Recommended: Having read `,(0,n.jsx)(r.a,{href:`/emerald-advancing-rng-techniques`,children:`Overview of RNG Advancing Techniques`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`General Overview`}),`
`,(0,n.jsx)(r.p,{children:`Painting Reseeding is a RNG technique to make the RNG state jump by millions of advances instantly, giving access to
RNG states that would normally not be reachable realistically.`}),`
`,(0,n.jsx)(r.p,{children:`By interacting with a painting in Lilycove contest hall, the RNG state is reseeded using the current visual frame counter. Players don't need to have participated in a contest for the paintings to be accessible.`}),`
`,(0,n.jsx)(r.p,{children:`This technique requires a frame-perfect input. Players need to validate whether they successfully did the technique by catching a high-level Pokémon.`}),`
`,(0,n.jsx)(r.h3,{children:`Steps Overview`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Step 1:`}),` Select the target frame before painting and advance after painting. Combined together, they will set the RNG state to its target advance for the RNG manipulation.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Step 2:`}),` Interact with the painting, create a Battle Video and validate whether the target frame before painting was hit. This step must be repeated until the target is hit.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Step 3:`}),` Update the Battle Video to bring it closer to the final target advance, to reduce the wait time for each RNG manipulation attempt.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Webtool and Instructions`}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h2,{children:`Technical Info`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The RNG state before interacting with the painting has no impact on the new RNG state. It is not possible to use Battle Video to speedup the wait before interacting with the painting.`}),`
`,(0,n.jsxs)(r.li,{children:[`The Egg Pokémon lead ensures that the caught Pokémon for validation will be generated with `,(0,n.jsx)(r.a,{href:`/gba-methods-lead-impact`,children:`method Wild-1`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};