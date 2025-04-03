import{u as s,j as e}from"./index-DPL8gWl_.js";const a={title:"Transporter RNG using the Offline Patch",description:"Ensure a stable delay for easier RNG",slug:"transporter-rng-offline",subCategory:"Custom Firmware",tag:"cfw"};function r(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PokeReader (",e.jsx(n.a,{href:"https://www.pokemonrng.com/install-pokereader",children:"PokeReader Install Guide"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://chatot.pokemonrng.com/#/gen6/transporter",children:"Chatot"})," or ",e.jsx(n.a,{href:"https://ci.appveyor.com/project/Bambo-Rambo/3dsrngtool/build/artifacts",children:"3DSRNGTool"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"3DSRNGTool Info"}),`
`,e.jsx(n.p,{children:'If using 3DSRNGTool, choose "Transporter" for the game version and select the "Stationary" tab.'}),`
`,e.jsx(n.p,{children:"You can utilize the index feature to check the spreads for all the generated Pokémon, enabling you to perform multiple RNGs simultaneously."}),`
`,e.jsx(n.h2,{children:"Step 1: Ensure a Stable Delay"}),`
`,e.jsxs(n.p,{children:["Set up the offline Transporter patch to ensure a stable delay by following the instructions ",e.jsx(n.a,{href:"https://www.pokemonrng.com/transporter-patches",children:"here"}),"."]}),`
`,e.jsx(n.h2,{children:"Step 2: Find a target advance"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Make sure you have a Pokemon in Box 1, Slot 1 of your Gen 1/2 game."}),`
`,e.jsx(n.li,{children:"Load Pokemon Transporter with PokeReader on your 3DS."}),`
`,e.jsx(n.li,{children:"Open Chatot or 3DSRNGTool and enter the initial seed displayed by PokeReader."}),`
`,e.jsx(n.li,{children:"Set the delay to 28."}),`
`,e.jsxs(n.li,{children:["In Transporter, press ",e.jsx(n.code,{children:"Start"})," to select the game you would like to use with Transporter.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This is the final ",e.jsx(n.code,{children:"A"})," press before Pokemon are generated."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game."]}),`
`,e.jsxs(n.li,{children:["Adjust the IV filters to find a desired spread.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Set the minimum advance to your current advance."}),`
`,e.jsx(n.li,{children:"Set the maximum advance to the highest advance you want to search for spreads."}),`
`,e.jsx(n.li,{children:'Click "Search".'}),`
`]}),`
`,e.jsx(n.p,{children:"All the displayed results are potential target advances. Choose your preferred one."}),`
`,e.jsx(n.h2,{children:"Step 2: Hit the target"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Unpause the game by pressing ",e.jsx(n.code,{children:"Start"}),"."]}),`
`,e.jsx(n.li,{children:"Wait at the game selection screen until you are close to the target advance."}),`
`,e.jsxs(n.li,{children:["When you are close, press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"Select"})," to advance one by one until you reach the target advance."]}),`
`,e.jsxs(n.li,{children:["Once you reach the target advance, press and hold ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsx(n.li,{children:"Check if you obtained the desired Pokemon. If not, do not transfer the Pokemon and try again."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: When asked if you want to transfer your Pokemon, clicking "No" will cause the Pokemon to be generated again. This allows for infinite retries in case you miss the RNG.
`})})]})}function i(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{i as default,a as frontmatter};
