import{u as l,j as e}from"./index-ojmfz2wl.js";const a={title:"PokeRadar RNG",description:"Shiny hunt with the PokeRadar in XY!",slug:"xy-pokeradar",subCategory:"Custom Firmware",tag:"cfw",addedOn:"2025-03-24"};function s(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components},{XyPokeRadar:o,YouTubeVideo:r}=n;return o||t("XyPokeRadar"),r||t("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Video Guide"}),`
`,e.jsx(r,{src:"https://www.youtube.com/embed/5Pkw195YiLQ"}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/install-pokereader",children:"PokeReader"})}),`
`,e.jsx(n.li,{children:"Lots of repels to avoid wild Pokémon encounters"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setting Up"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Ensure you have PokeReader installed and running."}),`
`,e.jsxs(n.li,{children:["Open PokéReader and lock it in place by pressing ",e.jsx(n.code,{children:"X"})," and ",e.jsx(n.code,{children:"Y"}),"."]}),`
`,e.jsx(n.li,{children:"Use the PokeRadar and encounter the Pokemon you want to be shiny."}),`
`,e.jsxs(n.li,{children:["Knock out or catch the Pokémon to start the chain of 1 and lock the species.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chain 0 patches are not determined the same as chain 1 or higher. You must randomly encounter a Pokemon or use Wild RNG to get your species."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Avoid using roller skates, running into the wrong species, or stepping into empty patches - these will break your chain.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Inputting Data"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open your bag to pause TinyMT advancements."}),`
`,e.jsxs(n.li,{children:["Enter the following data from PokeReader into the RNG tool at the bottom of this guide:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"TinyMT seeds"}),`
`,e.jsx(n.li,{children:"Current advances"}),`
`,e.jsx(n.li,{children:"Max advances (e.g., 20,000)"}),`
`,e.jsx(n.li,{children:"Number of Pokémon in your party"}),`
`,e.jsx(n.li,{children:"Chain count"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Click "Generate" to display possible results.'}),`
`]}),`
`,e.jsx(n.p,{children:"When you click on a row in the tool you'll see shown below the results:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sparkles"}),": Shiny Pokémon patches."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Green checkmarks"}),": Safe patches that continue your chain."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Red crosses"}),": Dangerous patches that break your chain (wrong species or empty)."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Advancing TinyMT"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Walk around to recharge the PokéRadar if needed."}),`
`,e.jsx(n.li,{children:"Use Pokémon Amie to advance TinyMT quickly."}),`
`,e.jsx(n.li,{children:"Open your bag to pause advancements when you are close to your target advance."}),`
`,e.jsxs(n.li,{children:["Advance to your target by",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Toggling the Experience Share to advance by 3 for each Pokémon in your party."}),`
`,e.jsx(n.li,{children:"Start teaching a Pokémon a TM and quickly exit to advance by 1."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Finding the Shiny Patch"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Once you've reached your target advance, use PokeRadar."}),`
`,e.jsx(n.li,{children:"Walk into the correct patch without breaking the chain."}),`
`,e.jsx(n.li,{children:"Catch your shiny Pokémon!"}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats—you've successfully RNGed a shiny Pokémon!"}),`
`,e.jsx(n.h2,{children:"RNG Tool"}),`
`,e.jsx(o,{}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["wwwwwwzx for reverse engineering this logic, ",e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool",children:"3DSRNGTool, and TinyTimeline"}),"."]}),`
`,e.jsxs(n.li,{children:["Bambo_Rambo for ",e.jsx(n.a,{href:"https://github.com/Bambo-Rambo/TinyFinder",children:"TinyFinder"}),", which this tool is based on, and their ",e.jsx(n.a,{href:"https://github.com/Bambo-Rambo/RNG-Guides/blob/main/DexNavRNG.md",children:"DexNav guide"}),", which has help info."]}),`
`,e.jsx(n.li,{children:"Vlad and Shiny_Sylveon for answering questions while this tool was being built."}),`
`]})]})}function c(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,a as frontmatter};
