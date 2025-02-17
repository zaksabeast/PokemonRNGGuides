import{u as a,j as e}from"./index-DPTnHYM2.js";const o={title:"Dream Radar RNG in Generation 5",description:"RNG Level 5 Dream Ball HA Legends",slug:"emulator-b2w2-dream-radar",subCategory:"Emulator"};function i(r){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/suloku/BW_tool/releases",children:"Suloku's Gen V Save Tool (Optional)"}),". You can also extract your BW2 save file after getting the Pokémon you want from the Dream Radar if you prefer not to inject."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The "Dream Radar" tab in RNG Reporter does not work at this time. This guide will explain an alternate way to find seeds and desired IV/Nature combinations.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Finding a spread"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open RNG Reporter and go to "Gen 5 Time Finder". Stay on the "Capture" tab and adjust the settings.'}),`
`,e.jsx(n.li,{children:'Set IVs to your preference, Encounter Type to "Wild Pokémon", and the method to "IVs (Standard Seed)".'}),`
`,e.jsx(n.li,{children:"Minimum IV frame for the Therian Trio (Tornadus, Thundurus, Landorus) is 21. For other Pokémon, it's 8. Set the maximum frame to your liking."}),`
`,e.jsx(n.li,{children:"Hit search and wait for results."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Timefinder.png",alt:"Timefinder"})}),`
`,e.jsx(n.p,{children:"Target even IV frames for Generation 4 Legendaries or random Pokémon, and target odd IV frames for Therian-Forme Pokémon."}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a nature (Optional)"}),`
`,e.jsx(n.p,{children:'To find the nature, go to the main RNG Reporter screen and select "Gen 5 PIDRNG". You cannot control Dream Radar nature, only predict it.'}),`
`,e.jsx(n.p,{children:"Use the formula below to find the nature based on your seed."}),`
`,e.jsx(n.h3,{children:"Therian Trio"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(Your IV Frame - 21) / 2 = Number of required advancements."}),`
`,e.jsx(n.li,{children:"Initial PIDRNG Frame + 7 + Required advancements = PID Frame you will hit."}),`
`]}),`
`,e.jsx(n.h3,{children:"G4 Box Legends and Gendered Pokémon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(Your IV Frame - 8) / 2 = Number of required advancements."}),`
`,e.jsx(n.li,{children:"Initial PIDRNG Frame + 2 + (2 * Required advancements) = PID Frame you will hit."}),`
`]}),`
`,e.jsx(n.h3,{children:"Genderless Pokémon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(Your IV Frame - 8) / 2 = Number of required advancements."}),`
`,e.jsx(n.li,{children:"Initial PIDRNG Frame + 1 + (2 * Required advancements) = PID Frame you will hit."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: RNGing the Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`Use Key System's "Send and Receive Keys" function to frame advance. Each time you start the "Send and Receive Keys" search, it will advance both the PIDRNG and IVRNG Frames by 2.`}),`
`,e.jsx(n.li,{children:"Obtain your Pokémon. In the example below, we have a Dream Ball hidden ability Landorus!"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Result.png",alt:"Result"})})]})}function s(r={}){const{wrapper:n}={...a(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{s as default,o as frontmatter};
