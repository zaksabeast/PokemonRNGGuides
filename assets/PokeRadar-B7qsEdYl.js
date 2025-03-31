import{u as l,j as n}from"./index-BLTGEFAJ.js";const a={title:"PokeRadar RNG",description:"Shiny hunt with the PokeRadar in XY!",slug:"xy-pokeradar",subCategory:"Custom Firmware",tag:"cfw",addedOn:"2025-03-24"};function r(i){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...l(),...i.components},{XyPokeRadar:o,YouTubeVideo:s}=e;return o||t("XyPokeRadar"),s||t("YouTubeVideo"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Video Guide"}),`
`,n.jsx(s,{src:"https://www.youtube.com/embed/5Pkw195YiLQ"}),`
`,n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/install-pokereader",children:"PokeReader"})}),`
`,n.jsx(e.li,{children:"Lots of repels to avoid wild Pokémon encounters"}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 1: Setting Up"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Ensure you have PokeReader installed and running."}),`
`,n.jsxs(e.li,{children:["Open PokéReader and lock it in place by pressing ",n.jsx(e.code,{children:"X"})," and ",n.jsx(e.code,{children:"Y"}),"."]}),`
`,n.jsx(e.li,{children:"Use the PokeRadar and encounter the Pokemon you want to be shiny."}),`
`,n.jsx(e.li,{children:"Knock out or catch the Pokémon to start the chain of 1 and lock the species."}),`
`]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"Note:"})," Avoid using roller skates, running into the wrong species, or stepping into empty patches - these will break your chain."]}),`
`,n.jsx(e.h2,{children:"Step 2: Inputting Data"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Open your bag to pause TinyMT advancements."}),`
`,n.jsxs(e.li,{children:["Enter the following data from PokeReader into the RNG tool at the bottom of this guide:",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"TinyMT seeds"}),`
`,n.jsx(e.li,{children:"Current advances"}),`
`,n.jsx(e.li,{children:"Max advances (e.g., 20,000)"}),`
`,n.jsx(e.li,{children:"Number of Pokémon in your party"}),`
`,n.jsx(e.li,{children:"Chain count"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:'Click "Generate" to display possible results.'}),`
`]}),`
`,n.jsx(e.p,{children:"When you click on a row in the tool you'll see shown below the results:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Sparkles"}),": Shiny Pokémon patches."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Green checkmarks"}),": Safe patches that continue your chain."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Red crosses"}),": Dangerous patches that break your chain (wrong species or empty)."]}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 3: Advancing TinyMT"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Walk around to recharge the PokéRadar if needed."}),`
`,n.jsx(e.li,{children:"Use Pokémon Amie to advance TinyMT quickly."}),`
`,n.jsx(e.li,{children:"Open your bag to pause advancements when you are close to your target advance."}),`
`,n.jsxs(e.li,{children:["Advance to your target by",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Toggling the Experience Share to advance by 3 for each Pokémon in your party."}),`
`,n.jsx(e.li,{children:"Start teaching a Pokémon a TM and quickly exit to advance by 1."}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 4: Finding the Shiny Patch"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Once you've reached your target advance, use PokeRadar."}),`
`,n.jsx(e.li,{children:"Walk into the correct patch without breaking the chain."}),`
`,n.jsx(e.li,{children:"Catch your shiny Pokémon!"}),`
`]}),`
`,n.jsx(e.p,{children:"Congrats—you've successfully RNGed a shiny Pokémon!"}),`
`,n.jsx(e.h2,{children:"RNG Tool"}),`
`,n.jsx(o,{}),`
`,n.jsx(e.h2,{children:"Credits"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["wwwwwwzx for reverse engineering this logic, ",n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool",children:"3DSRNGTool, and TinyTimeline"}),"."]}),`
`,n.jsxs(e.li,{children:["Bambo_Rambo for ",n.jsx(e.a,{href:"https://github.com/Bambo-Rambo/TinyFinder",children:"TinyFinder"}),", which this tool is based on, and their ",n.jsx(e.a,{href:"https://github.com/Bambo-Rambo/RNG-Guides/blob/main/DexNavRNG.md",children:"DexNav guide"}),", which has help info."]}),`
`,n.jsx(e.li,{children:"Vlad and Shiny_Sylveon for answering questions while this tool was being built."}),`
`]})]})}function c(i={}){const{wrapper:e}={...l(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(r,{...i})}):r(i)}function t(i,e){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,a as frontmatter};
