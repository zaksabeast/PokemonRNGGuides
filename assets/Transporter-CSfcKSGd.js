import{u as o,j as e}from"./index-CUW7P-dy.js";const i={title:"Transporter with PCalc",description:"Transfer your Gen 1/2 Pokémon to always be 6IV.",slug:"transporter-rng",subCategory:"Custom Firmware"};function r(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Useful note"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`When asked if you want to transfer your Pokémon, clicking "No" will cause the Pokémon to be generated again. This allows infinite retries if you miss the RNG.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Calibrate your delay"}),`
`,e.jsxs(n.p,{children:["RNGing with Transporter has a delay between pressing ",e.jsx(n.code,{children:"A"})," and Pokémon generation. The delay must be calibrated before RNGing."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Make sure you have at least one Pokémon in Box 1, Slot 1 of your Gen 1/2 game."}),`
`,e.jsx(n.li,{children:"Load Pokémon Transporter with PCalc on your 3DS."}),`
`,e.jsx(n.li,{children:"Open 3DSRNGTool on your computer."}),`
`,e.jsx(n.li,{children:`Change 3DSRNGTool's "Game Version" to "Transporter."`}),`
`,e.jsx(n.li,{children:`Change 3DSRNGTool's "Seed" to the Initial Seed PCalc shows.`}),`
`,e.jsx(n.li,{children:`Change 3DSRNGTool's tab to "Stationary RNG."`}),`
`,e.jsxs(n.li,{children:["In Transporter, press ",e.jsx(n.code,{children:"Start"})," to select the game for Transporter."]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game."]}),`
`,e.jsx(n.li,{children:"Note your current frame; this is your starting frame."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," to unpause and let Transporter generate the Pokémon."]}),`
`,e.jsx(n.li,{children:"Search for the exact IVs PCalc indicates using 3DSRNGTool to find your hit frame."}),`
`,e.jsxs(n.li,{children:["Subtract your hit frame from your starting frame to get your delay.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Example: If you started on frame 1000 and hit frame 1197, your delay is 197."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'When asked to transfer the Pokémon, click "No."'}),`
`,e.jsx(n.li,{children:"Repeat the process 5-10 times to get 5-10 delays."}),`
`,e.jsx(n.li,{children:`Input the most frequent delay or an average into 3DSRNGTool's "Delay" box.`}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Find a spread to RNG"}),`
`,e.jsx(n.p,{children:"Follow these steps in 3DSRNGTool to find a desired spread:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Change the "Gender Ratio" to match the Pokémon you want to RNG.'}),`
`,e.jsx(n.li,{children:'Change the "Index of Target Pkm" to "1."'}),`
`,e.jsxs(n.li,{children:["Change only the gender and IVs to find a spread you want.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Change the first "Frame Range" box to your current frame.'}),`
`,e.jsx(n.li,{children:'Change the second "Frame Range" box to the maximum frame you want to search.'}),`
`,e.jsx(n.li,{children:'Click "Search."'}),`
`]}),`
`,e.jsx(n.p,{children:"All results are potential wanted frames. Pick your favorite!"}),`
`,e.jsx(n.h2,{children:"Step 3: Hit the target"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Using PCalc, wait at the game selection screen until you get close to your wanted frame."}),`
`,e.jsxs(n.li,{children:["Once close, press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game."]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Select"})," to advance the frames one by one until you reach your wanted frame."]}),`
`,e.jsxs(n.li,{children:["Once at your wanted frame, press and hold ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsx(n.li,{children:"Check if you got the Pokémon you wanted; if not, don’t transfer your Pokémon and try again."}),`
`]}),`
`,e.jsx(n.p,{children:"This may take several attempts."}),`
`,e.jsx(n.h2,{children:"Alternative method with increased chances"}),`
`,e.jsx(n.p,{children:"Transporter generates 20 Pokémon at once. If you have 20 of the same Pokémon or cloned, you can have 20 chances to RNG the same Pokémon."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Catch 20 of the same Pokémon (or clone them)."}),`
`,e.jsx(n.li,{children:"Make sure all 20 are in Box 1 of your Gen 1/2 game."}),`
`]}),`
`,e.jsx(n.p,{children:"In 3DSRNGTool:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Change the "Index of Target Pkm" to "1."'}),`
`,e.jsx(n.li,{children:'Change the "Filters" box to have the IVs you want to RNG.'}),`
`,e.jsx(n.li,{children:"Search for spreads using the initial seed PCalc shows."}),`
`,e.jsx(n.li,{children:'Repeat this, adding 1 to the "Index of Target Pkm" to check the spreads for all 20 Pokémon.'}),`
`,e.jsx(n.li,{children:"Note the index with the most consecutive frames with spreads you want; this is your target index."}),`
`,e.jsx(n.li,{children:"Ensure the number of consecutive frames is at least 10."}),`
`,e.jsx(n.li,{children:'Set the "Index of Target Pkm" to your target index.'}),`
`,e.jsx(n.li,{children:"Get the list of delays from the calibration step."}),`
`,e.jsx(n.li,{children:"Look for the highest delay within 10 frames of your most common delay."}),`
`,e.jsx(n.li,{children:'In the "RNG Info" box of 3DSRNGTool, change "delay" to this new delay.'}),`
`,e.jsx(n.li,{children:'Press "Calculate" to find your potential frames with this new delay for your target index.'}),`
`,e.jsx(n.li,{children:"Find the highest frame among the 10+ consecutive frames from earlier and use it as your target frame."}),`
`]})]})}function a(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{a as default,i as frontmatter};
