import{u as r,j as e}from"./index-5j1DF-qJ.js";const a={title:"Egg RNG",description:"How to RNG egg in BW2 based on the recent discoveries",slug:"bw2-egg",subCategory:"RNG",isRoughDraft:!1};function i(t){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note : This is a rough draft, like I always do. So to make things interesting, I'll assume that the reader has the basic knowledge in Gen 5 RNG. It implies to know how to calibrate a profile, hit an initial seed and to use PokeFinder. This guide can be used for Retail without any issue even if the setup is based on emu
`})}),`
`,e.jsx(n.h2,{children:"Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsx(n.li,{children:"All the tools necessary based on your method (EonTimer, Luas)"}),`
`,e.jsx(n.li,{children:"Access to the Daycare"}),`
`,e.jsx(n.li,{children:"IVs of your Parents"}),`
`]}),`
`,e.jsx(n.h2,{children:"Part 1: Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder"}),`
`,e.jsx(n.li,{children:"Go to Gen 5 Tab -> Egg"}),`
`,e.jsx(n.li,{children:"Input the parent Pokemon details"}),`
`,e.jsx(n.li,{children:"Deposit your parent Pokemon in the daycare"}),`
`,e.jsx(n.li,{children:"Walk until you have an egg ready"}),`
`,e.jsx(n.li,{children:"Save the game, preferably in the daycare to avoid advancing the RNG"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Egg RNG in BW2 is different than in BW1. The main difference is that IVs are generated first, then the PID.  If you're interested in only one of the parts, you can skip directly to the right that interests you.
`})}),`
`,e.jsx(n.h2,{children:"Part 2: IV + Nature RNG"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Important : If you are going for Nidoran or Volbeat / Illumise this step will determine which species you get. Enter the right egg species, and you'll have a confirmation with the gender of the egg (male for Nidoran M / Volbeat and female for Nidoran F / Illumise
`})}),`
`,e.jsxs(n.p,{children:["So we could compare that to Gen 6 Egg RNG, where you'll RNG a seed and IVs for the next egg. The good part is because how BW2 egg RNG is done, you'll not need to hit a specific advance. ",e.jsx(n.strong,{children:"Only hitting the Initial Seed will matter"}),"."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Input the IVs, the nature and the ability you want in PokeFinder (don't add other filters just yet)"}),`
`,e.jsx(n.li,{children:"Search for an initital seed"}),`
`,e.jsx(n.li,{children:"Start the game and hit the initial seed"}),`
`,e.jsxs(n.li,{children:["Talk to the old man and ",e.jsx(n.strong,{children:"reject the egg"})]}),`
`,e.jsx(n.li,{children:"Walk around until you have another egg ready"}),`
`,e.jsx(n.li,{children:"Save next to the old man"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you only want IVs and not a PID, you can grab the egg. The RNG is done.
`})}),`
`,e.jsx(n.h2,{children:"Part 3: PID RNG"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Remove all the IV filters and input the PID filters (gender, shininess)"}),`
`,e.jsx(n.li,{children:"Search for an initial seed that gives your PID"}),`
`,e.jsx(n.li,{children:"Start the game and hit the initial seed"}),`
`,e.jsx(n.li,{children:"Advance the RNG until you're at your PID spread"}),`
`,e.jsx(n.li,{children:"Talk to the old man and accept the egg"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Sometimes With PokeFinder, you'll need to talk to the man one advance earlier than your target. If your target is at 100 advances, talk to him at 99.
`})}),`
`,e.jsx(n.p,{children:"You should now have the egg with everything you wanted!"})]})}function s(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{s as default,a as frontmatter};
