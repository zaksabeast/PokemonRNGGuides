import{v as s,j as n}from"./index-oEIbahCI.js";const l={title:"Transporter RNG using the Offline Patch",navDrawerTitle:"Offline Patch RNG",description:"Use the offline patch to stabilize delay and make RNG with Pokémon Transporter more consistent.",slug:"transporter-rng-offline",category:"Transporter and Dream Radar",tag:"cfw"};function o(r){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...r.components},{Transporter:t}=e;return t||a("Transporter"),n.jsxs(n.Fragment,{children:[n.jsx(e.p,{children:"This guide allows for RNGing the IVs of Pokemon transferred from Gen 1/2 using Transporter. For a stable delay a patch is used to allow for transferring Pokemon without needing to connect to online servers. The Pokemon are still transferred the same as if the patch was not used."}),`
`,n.jsx(e.p,{children:"Shininess and nature are predetermined in the Gen 1/2 game the Pokemon are coming from."}),`
`,n.jsxs(e.p,{children:["You can check the ",n.jsx(e.a,{href:"/misc-3ds-transporter-nature-tables",children:"nature table here"})," for what nature your Pokemon will have when transferred."]}),`
`,n.jsxs(e.p,{children:["If you do not want to use the patch, you can follow the ",n.jsx(e.a,{href:"transporter-rng",children:"Transporter RNG guide here"}),"."]}),`
`,n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/install-pokereader",children:"A 3DS with PokeReader"})}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 1: Ensure a Stable Delay"}),`
`,n.jsxs(e.p,{children:["Set up the offline Transporter patch to ensure a stable delay by following the instructions ",n.jsx(e.a,{href:"/transporter-patches",children:"here"}),"."]}),`
`,n.jsx(e.h2,{children:"Step 2: Find a target advance"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Make sure you have a Pokemon in Box 1, Slot 1 of your Gen 1/2 game."}),`
`,n.jsx(e.li,{children:"Load Pokemon Transporter with PokeReader on your 3DS."}),`
`,n.jsx(e.li,{children:'Enter the initial seed displayed by PokeReader into the tool below for "Seed".'}),`
`,n.jsx(e.li,{children:'Set "Delay" to 28.'}),`
`,n.jsxs(e.li,{children:["In Transporter, press ",n.jsx(e.code,{children:"Start"})," to select the game you would like to use with Transporter.",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["This is the final ",n.jsx(e.code,{children:"A"})," press before Pokemon are generated."]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:["Press ",n.jsx(e.code,{children:"Start + Select"})," to pause the game."]}),`
`,n.jsxs(e.li,{children:["Adjust the IV filters to find a desired spread.",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter."}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:'Set the "Initial Advance" to your current advance.'}),`
`,n.jsx(e.li,{children:'Set the "Max Advances" to the highest advance you want to search for spreads.'}),`
`,n.jsx(e.li,{children:'Click "Search".'}),`
`]}),`
`,n.jsx(e.p,{children:"All the displayed results are potential target advances. Choose your preferred one."}),`
`,n.jsx(e.h2,{children:"Step 2: Hit the target"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Unpause the game by pressing ",n.jsx(e.code,{children:"Start"}),"."]}),`
`,n.jsx(e.li,{children:"Wait at the game selection screen until you are close to the target advance."}),`
`,n.jsxs(e.li,{children:["When you are close, press ",n.jsx(e.code,{children:"Start + Select"})," to pause the game."]}),`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"Select"})," to advance one by one until you reach the target advance."]}),`
`,n.jsxs(e.li,{children:["Once you reach the target advance, press and hold ",n.jsx(e.code,{children:"A"}),"."]}),`
`,n.jsx(e.li,{children:"Check if you obtained the desired Pokemon. If not, do not transfer the Pokemon and try again."}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Note: When asked if you want to transfer your Pokemon, clicking "No" will cause the Pokemon to be generated again. This allows for infinite retries in case you miss the RNG.
`})}),`
`,n.jsx(t,{})]})}function h(r={}){const{wrapper:e}={...s(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(o,{...r})}):o(r)}function a(r,e){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,l as frontmatter};
