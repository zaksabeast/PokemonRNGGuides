import{u as o,j as e}from"./index-DlzSnQqK.js";const a={title:"Transporter with PCalc",description:"Transfer your Gen 1/2 Pokemon to always be 6IV",slug:"transporter-rng",subCategory:"Custom Firmware"};function r(t){const n={a:"a",em:"em",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Useful note"}),`
`,e.jsx(n.p,{children:'When asked if you want to transfer your Pokemon, clicking "No" will cause the Pokemon to be generated again. This allows inifinite retries in case you miss the RNG.'}),`
`,e.jsx(n.h2,{children:"Step 1: Callibrate your delay"}),`
`,e.jsx(n.p,{children:`Like most games, RNGing with Transporter will have a delay between the time a user presses "A" and the time the Pokemon are generated/transferred. Transporter's delay is partially caused by network requests to the validation and Bank servers, so the delay will always need to be callibrated before RNGing with Transporter.`}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Make sure you have at least one Pokemon in Box 1, Slot 1 of your Gen 1/2 game"}),`
`,e.jsx(n.li,{children:"Load Pokemon Transporter with PCalc on your 3ds"}),`
`,e.jsx(n.li,{children:"Open up 3DSRNGTool on your computer"}),`
`,e.jsx(n.li,{children:`Change 3DSRNGTool's "Game Version" to "Transporter"`}),`
`,e.jsx(n.li,{children:`Change 3DSRNGTool's "Seed" to the Initial Seed PCalc shows you`}),`
`,e.jsx(n.li,{children:`Change 3DSRNGTool's tab to "Stationary RNG"`}),`
`,e.jsxs(n.li,{children:['In Transporter, press "Start" to select the game you would like to use with Transporter',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'This is the final "A" press before Pokemon are generated'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Press "Start + Select" to pause the game'}),`
`,e.jsx(n.li,{children:"Make a note of your current frame, this is your starting frame"}),`
`,e.jsx(n.li,{children:'Press "A" to unpause and have Transporter generate the Pokemon'}),`
`,e.jsx(n.li,{children:"Search for the exact IVs PCalc says the generated Pokemon has using 3DSRNGTool to find your hit frame"}),`
`,e.jsxs(n.li,{children:["Subtract your hit frame from your starting frame to get your delay",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Example: I started on frame 1000 and I hit frame 1197, so my delay is 197"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'When asked to transfer the Pokemon, click "No"'}),`
`,e.jsx(n.li,{children:"Repeat the process 5-10 times to get 5-10 delays"}),`
`,e.jsx(n.li,{children:`Input the most frequent delay, or an average of all delays, into 3DSRNGTool's "Delay" box`}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Find a spread to RNG"}),`
`,e.jsx(n.p,{children:"Follow these steps in 3DSRNGTool to find a desired spread:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Change the "Gender Ratio" to match the gender ratio of the Pokemon you’d like to RNG'}),`
`,e.jsx(n.li,{children:'Change the "Index of Target Pkm" to be "1"'}),`
`,e.jsxs(n.li,{children:["Change ",e.jsx(n.em,{children:"only"})," the gender and IVs to find a spread you would like to hit",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Change the first "Frame Range" box to be the frame you are currently on'}),`
`,e.jsx(n.li,{children:'Change the second "Frame Range" box to be the maximum frame you want to search for spreads'}),`
`,e.jsx(n.li,{children:'Click "Search"'}),`
`]}),`
`,e.jsx(n.p,{children:"All results are potentially wanted frames. Pick your favorite!"}),`
`,e.jsx(n.h2,{children:"Step 3: Hit the target"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Using PCalc, wait at the game selection screen until you get close to your wanted frame"}),`
`,e.jsx(n.li,{children:'Once you are close to your wanted frame, press "Start + Select" to pause the game'}),`
`,e.jsx(n.li,{children:'Press "Select" to advance the frames one by one until you reach your wanted frame'}),`
`,e.jsx(n.li,{children:'Once you have reached your wanted frame, press and hold "A"'}),`
`,e.jsx(n.li,{children:"Check if you got the Pokemon you wanted, if not, don’t transfer your Pokemon and try again"}),`
`]}),`
`,e.jsx(n.p,{children:"This will take several attempts."}),`
`,e.jsx(n.h2,{children:"Alternative method with increased chances"}),`
`,e.jsx(n.p,{children:"Because Transporter is generating 20 Pokemon at the same time, if you have 20 of the same Pokemon or 20 clones of the same Pokemon, you can have 20 chances to RNG the same Pokemon in one attempt."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Catch 20 species of the same Pokemon (Or clone them if you’d like)"}),`
`,e.jsx(n.li,{children:"Make sure all 20 are in Box 1 of your Gen 1/2 game"}),`
`]}),`
`,e.jsx(n.p,{children:"In 3DSRNGTool:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Change the "Index of Target Pkm" to be "1"'}),`
`,e.jsx(n.li,{children:'Change the "Filters" box to have the IVs you’d like to RNG'}),`
`,e.jsx(n.li,{children:"Search for spreads using the initial seed PCalc shows"}),`
`,e.jsx(n.li,{children:'Repeat this, adding 1 to the "Index of Target Pkm" to see the spreads for all 20 Pokemon'}),`
`,e.jsx(n.li,{children:"Make a note of the index that has the most consecutive frames with spreads you would like - this is your target index"}),`
`,e.jsx(n.li,{children:"You want the number of consecutive frames to be at least 10"}),`
`,e.jsx(n.li,{children:'Set the "Index of Target Pkm" to your target index'}),`
`,e.jsx(n.li,{children:"Get the list of delays from the calibration step"}),`
`,e.jsx(n.li,{children:"Look for the highest delay within 10 frames of your most common delay"}),`
`,e.jsx(n.li,{children:'In the "RNG Info" box of 3DSRNGTool, change the "delay" to be this new delay'}),`
`,e.jsx(n.li,{children:'Press "Calculate" to find your potential wanted frames with this new delay for your target index'}),`
`,e.jsx(n.li,{children:"Find the highest frame out of the 10+ consecutive frames from earlier and use it as your target frame"}),`
`]})]})}function i(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{i as default,a as frontmatter};
