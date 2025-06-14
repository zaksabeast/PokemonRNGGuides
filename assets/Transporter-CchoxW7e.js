import{q as a,j as n}from"./index-C7PTtfVT.js";const l={title:"Transporter RNG for Gen 1 and 2",navDrawerTitle:"Transporter RNG",description:"Learn how to RNG your Virtual Console Pokémon so they transfer to Gen 7 with perfect 6IVs.",slug:"transporter-rng",category:"Transporter and Dream Radar",tag:"cfw",addedOn:"2025-05-08"};function o(r){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...r.components},{Transporter:t}=e;return t||s("Transporter"),n.jsxs(n.Fragment,{children:[n.jsx(e.p,{children:"This guide allows for RNGing the IVs of Pokemon transferred from Gen 1/2 using Transporter. Shininess and nature are predetermined in the Gen 1/2 game the Pokemon are coming from."}),`
`,n.jsxs(e.p,{children:["You can check the ",n.jsx(e.a,{href:"/misc-3ds-transporter-nature-tables",children:"nature table here"})," for what nature your Pokemon will have when transferred."]}),`
`,n.jsxs(e.p,{children:["If you would like a stable delay for easier RNG, you can follow the ",n.jsx(e.a,{href:"transporter-rng-offline",children:"Offline Patch Transporter RNG guide here"}),"."]}),`
`,n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/install-pokereader",children:"A 3DS with PokeReader"})}),`
`]}),`
`,n.jsx(e.h2,{children:"Useful note"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`When asked if you want to transfer your Pokémon, clicking "No" will cause the Pokémon to be generated again. This allows infinite retries if you miss the RNG.
`})}),`
`,n.jsx(e.h2,{children:"Step 1: Calibrate your delay"}),`
`,n.jsxs(e.p,{children:["RNGing with Transporter has a delay between pressing ",n.jsx(e.code,{children:"A"})," and Pokémon generation. The delay must be calibrated before RNGing."]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Make sure you have at least one Pokémon in Box 1, Slot 1 of your Gen 1/2 game."}),`
`,n.jsx(e.li,{children:"Load Pokémon Transporter with PokeReader on your 3DS."}),`
`,n.jsx(e.li,{children:"Enter your Initial seed in the tool below."}),`
`,n.jsxs(e.li,{children:["In Transporter, press ",n.jsx(e.code,{children:"Start"})," to select the game for Transporter."]}),`
`,n.jsxs(e.li,{children:["Press ",n.jsx(e.code,{children:"Start + Select"})," to pause the game."]}),`
`,n.jsx(e.li,{children:"Note your current advance; this is your starting advance."}),`
`,n.jsxs(e.li,{children:["Press ",n.jsx(e.code,{children:"A"})," to unpause and let Transporter generate the Pokémon."]}),`
`,n.jsx(e.li,{children:"Search for the exact IVs PokeReader indicates using the tool below to find your hit advance."}),`
`,n.jsxs(e.li,{children:["Subtract your hit advance from your starting advance to get your delay.",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Example: If you started on advance 1000 and hit advance 1197, your delay is 197."}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:'When asked to transfer the Pokémon, click "No."'}),`
`,n.jsx(e.li,{children:"Repeat the process 5-10 times to get 5-10 delays."}),`
`,n.jsx(e.li,{children:'Input the most frequent delay or an average into the "Delay" box.'}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 2: Find a spread to RNG"}),`
`,n.jsx(e.p,{children:"Follow these steps with the tool below to find a desired spread:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'Change the "Transporter Gender" to match the Pokémon you want to RNG.'}),`
`,n.jsxs(e.li,{children:["Change IVs to find a spread you want.",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter."}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:'Change the "Initial Advance" box to your current advance.'}),`
`,n.jsx(e.li,{children:'Change the "Max Advances" box to the maximum advance you want to search.'}),`
`,n.jsx(e.li,{children:'Click "Generate."'}),`
`]}),`
`,n.jsx(e.p,{children:"All results are potential wanted advances. Pick your favorite!"}),`
`,n.jsx(e.h2,{children:"Step 3: Hit the target"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Wait at the game selection screen until you get close to your wanted advance."}),`
`,n.jsxs(e.li,{children:["Once close, press ",n.jsx(e.code,{children:"Start + Select"})," to pause the game."]}),`
`,n.jsxs(e.li,{children:["Press ",n.jsx(e.code,{children:"Select"})," to advance one by one until you reach your wanted advance."]}),`
`,n.jsxs(e.li,{children:["Once at your wanted advance, press and hold ",n.jsx(e.code,{children:"A"}),"."]}),`
`,n.jsx(e.li,{children:"Check if you got the Pokémon you wanted; if not, don't transfer your Pokémon and try again."}),`
`]}),`
`,n.jsx(e.p,{children:"This may take several attempts."}),`
`,n.jsx(e.h2,{children:"20 Pokemon Method"}),`
`,n.jsx(e.p,{children:"Transporter generates 20 Pokémon at once. If you have 20 of the same Pokémon, you can have 20 chances at landing on the right advance."}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Catch 20 of the same Pokémon (or clone them)."}),`
`,n.jsx(e.li,{children:"Make sure all 20 are in Box 1 of your Gen 1/2 game."}),`
`]}),`
`,n.jsx(e.p,{children:"In the tool below:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'Change the "Filters" box to have the IVs you want to RNG.'}),`
`,n.jsx(e.li,{children:"Search for spreads using the initial seed PokeReader shows."}),`
`,n.jsx(e.li,{children:"Ensure the number of consecutive advances is at least 10."}),`
`,n.jsx(e.li,{children:"Aim for the middle advance as your target advance."}),`
`]}),`
`,n.jsx(t,{})]})}function d(r={}){const{wrapper:e}={...a(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(o,{...r})}):o(r)}function s(r,e){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,l as frontmatter};
