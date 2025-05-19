import{u as h,j as e}from"./index-B0jhLgro.js";const c=[{title:"Shiny Starter",description:"Determine your SID by catching a shiny starter",slug:"emerald-shiny-starter",category:"Emerald",tag:"retail",addedOn:"2025-05-03"}];function l(n){const t={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",...h(),...n.components},{GenerateHoennTidSid:r,Gist:s,ShinyHoennStarter:o}=t;return r||i("GenerateHoennTidSid"),s||i("Gist"),o||i("ShinyHoennStarter"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Gist: Determine your SID by catching a shiny starter"}),`
`,e.jsx(t.h2,{children:"Strategy Overview"}),`
`,e.jsxs(t.p,{children:["When creating a new savefile, your SID depends the randomly generated TID and the timing of pressing ",e.jsx(t.code,{children:"A"}),` on a specific text.
Considering those 2 variables, a list of possible SIDs will be generated.
To determine which SID is the correct one, you must obtain your starter Pokémon on the advance that would make it shiny. The tested SID is the correct one if the obtained Pokémon is really shiny.`]}),`
`,e.jsx(t.h2,{children:"Step 1: Generate your TID and list of possible SIDs"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["On the title screen, go to Options and set the text speed to ",e.jsx(t.code,{children:"Fast"}),"."]}),`
`,e.jsxs(t.li,{children:["Select ",e.jsx(t.code,{children:"New Game"}),", type your name and move the cursor over the ",e.jsx(t.code,{children:"OK"})," button."]}),`
`,e.jsx(t.li,{children:"Start the TID/SID timer on the tool below."}),`
`,e.jsxs(t.li,{children:["Precisely when the first timer reaches 0, press ",e.jsx(t.code,{children:"A"})," to confirm your name."]}),`
`,e.jsxs(t.li,{children:["Continue the dialogue until the message ",e.jsx(t.code,{children:"Well, I'll be expecting you later. Come see me in my POKEMON LAB."}),"."]}),`
`,e.jsxs(t.li,{children:["Precisely when the second timer reaches 0, press ",e.jsx(t.code,{children:"A"}),"."]}),`
`,e.jsx(t.li,{children:"Check the TID generated on your trainer card."}),`
`,e.jsx(t.li,{children:'Fill the "Obtained TID" field on the tool below and click "Generate possible SIDs".'}),`
`,e.jsx(t.li,{children:"Follow the Recommendation below the list which states to either start over Step 1 to generate a better TID, or go to Step 2 with your TID."}),`
`]}),`
`,e.jsx(r,{game:"emerald"}),`
`,e.jsx(t.h2,{children:"Step 2: Determine the correct SID"}),`
`,e.jsx(t.p,{children:"Summary: For each possible SID generated in Step 1, obtain a starter Pokémon with its associated earliest Method-1 advance that results in a shiny Pokémon, if the SID is the correct one."}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Save the game in front of the starter Pokémon bag."}),`
`,e.jsx(t.li,{children:"Using the tool below, fill the TID and the first possible SID of the list you haven't tried yet."}),`
`,e.jsx(t.li,{children:'Click "Generate", then start the timer.'}),`
`,e.jsxs(t.li,{children:["Precisely when the first timer reaches 0, press ",e.jsx(t.code,{children:"Start + Select + A + B"})," simultaneously to reset the game."]}),`
`,e.jsx(t.li,{children:"Quickly open the bag to avoid unwanted advances from wandering NPCs."}),`
`,e.jsxs(t.li,{children:["Select your starter and wait with the confirmation message ",e.jsx(t.code,{children:"Do you choose this POKEMON?"})," displayed."]}),`
`,e.jsxs(t.li,{children:["Precisely when the second timer reaches 0, press ",e.jsx(t.code,{children:"A"})," to choose your starter."]}),`
`,e.jsx(t.li,{children:"Complete the battle and examine your starter Pokémon."}),`
`,e.jsx(t.li,{children:"If it's shiny, congratulations! The inputted SID is the SID of your savefile."}),`
`,e.jsx(t.li,{children:`If it's not shiny, fill the species, gender, nature, and stats in the form below, then click "Find advances matching caught starter Pokémon".`}),`
`,e.jsx(t.li,{children:"If no results are shown, a field is incorrect."}),`
`,e.jsx(t.li,{children:'If the first row contains "Shiny if correct SID" but the Pokémon you got is not shiny, then the currently tested SID is incorrect. Start over Step 2 using the next SID in the list of possible SIDs.'}),`
`,e.jsx(t.li,{children:'Otherwise, click on the "Update Calibration" button and start over Step 2 with the same SID.'}),`
`]}),`
`,e.jsx(o,{game:"emerald"})]})}function d(n={}){const{wrapper:t}={...h(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(l,{...n})}):l(n)}function i(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,c as frontmatter};
