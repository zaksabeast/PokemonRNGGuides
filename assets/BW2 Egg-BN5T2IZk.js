import{u as r,j as e}from"./index-BHBhF5Ha.js";const l={title:"Egg RNG",description:"How to RNG egg in BW2 based on the recent discoveries",slug:"bw2-egg",category:"Black 2 and White 2",tag:"emu"};function i(t){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsx(n.li,{children:"All the tools needed for your method (EonTimer, Luas)"}),`
`,e.jsx(n.li,{children:"Access to the Daycare"}),`
`,e.jsx(n.li,{children:"IVs of your parent Pokémon"}),`
`]}),`
`,e.jsx(n.h2,{children:"Part 1: Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder."}),`
`,e.jsx(n.li,{children:"Go to Gen 5 Tab -> Egg."}),`
`,e.jsx(n.li,{children:"Input the parent Pokémon details."}),`
`,e.jsx(n.li,{children:"Deposit your parent Pokémon in the daycare."}),`
`,e.jsx(n.li,{children:"Walk until you have an egg ready."}),`
`,e.jsx(n.li,{children:"Save the game, preferably in the daycare to avoid advancing the RNG."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Egg RNG in BW2 is different than in BW1. IVs are generated first, then the PID. If you're interested in only one part, you can skip to the relevant section.
`})}),`
`,e.jsx(n.h2,{children:"Part 2: IV + Nature RNG"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Important: If you are going for Nidoran or Volbeat/Illumise, this step will determine which species you get. Enter the correct egg species, and you'll know the gender of the egg (male for Nidoran M/Volbeat and female for Nidoran F/Illumise).
`})}),`
`,e.jsxs(n.p,{children:["In contrast to Gen 6 Egg RNG, you'll RNG a seed and IVs for the next egg without needing a specific advance. ",e.jsx(n.strong,{children:"Only hitting the initial seed matters"}),"."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Input the IVs, nature, and ability you want in PokeFinder (don't add other filters yet)."}),`
`,e.jsx(n.li,{children:"Search for an initial seed."}),`
`,e.jsx(n.li,{children:"Start the game and hit the initial seed."}),`
`,e.jsxs(n.li,{children:["Talk to the old man and ",e.jsx(n.strong,{children:"reject the egg"}),"."]}),`
`,e.jsx(n.li,{children:"Walk around until you have another egg ready."}),`
`,e.jsx(n.li,{children:"Save next to the old man."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you only want IVs and not a PID, you can grab the egg. The RNG is done.
`})}),`
`,e.jsx(n.h2,{children:"Part 3: PID RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Remove all the IV filters and input the PID filters (gender, shininess)."}),`
`,e.jsx(n.li,{children:"Search for an initial seed that gives your PID."}),`
`,e.jsx(n.li,{children:"Start the game and hit the initial seed."}),`
`,e.jsx(n.li,{children:"Advance the RNG until you reach your PID spread."}),`
`,e.jsx(n.li,{children:"Talk to the old man and accept the egg."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Sometimes with PokeFinder, you may need to talk to the man one advance earlier than your target. If your target is at 100 advances, talk to him at 99.
`})}),`
`,e.jsx(n.p,{children:"You should now have the egg with everything you wanted!"})]})}function a(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,l as frontmatter};
