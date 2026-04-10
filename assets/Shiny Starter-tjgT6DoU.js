import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-Bh0-R9ZM.js";var n=e(),r=[{title:`Shiny Starter`,description:`Determine your SID by catching a shiny starter`,slug:`emerald-shiny-starter`,category:`Emerald`,section:`pokemon_rng`,variant:`retail`,orderPriority:0,addedOn:`2025-05-03`}];function i(e){let r={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{GenerateHoennTidSid:i,Gist:a,ShinyHoennStarter:s}=r;return i||o(`GenerateHoennTidSid`,!0),a||o(`Gist`,!0),s||o(`ShinyHoennStarter`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{children:`Gist: Determine your SID by catching a shiny starter`}),`
`,(0,n.jsx)(r.h2,{children:`Strategy Overview`}),`
`,(0,n.jsxs)(r.p,{children:[`When creating a new savefile, your SID depends the randomly generated TID and the timing of pressing `,(0,n.jsx)(r.code,{children:`A`}),` on a specific text.
Considering those 2 variables, a list of possible SIDs will be generated.
To determine which SID is the correct one, you must obtain your starter Pokémon on the advance that would make it shiny. The tested SID is the correct one if the obtained Pokémon is really shiny.`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Generate your TID and list of possible SIDs`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`On the title screen, go to Options and set the text speed to `,(0,n.jsx)(r.code,{children:`Fast`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Select `,(0,n.jsx)(r.code,{children:`New Game`}),`, type your name and move the cursor over the `,(0,n.jsx)(r.code,{children:`OK`}),` button.`]}),`
`,(0,n.jsx)(r.li,{children:`Start the TID/SID timer on the tool below.`}),`
`,(0,n.jsxs)(r.li,{children:[`Precisely when the first timer reaches 0, press `,(0,n.jsx)(r.code,{children:`A`}),` to confirm your name.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Continue the dialogue until the message `,(0,n.jsx)(r.code,{children:`Well, I'll be expecting you later. Come see me in my POKEMON LAB.`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Precisely when the second timer reaches 0, press `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Check the TID generated on your trainer card.`}),`
`,(0,n.jsx)(r.li,{children:`Fill the "Obtained TID" field on the tool below and click "Generate possible SIDs".`}),`
`,(0,n.jsx)(r.li,{children:`Follow the Recommendation below the list which states to either start over Step 1 to generate a better TID, or go to Step 2 with your TID.`}),`
`]}),`
`,(0,n.jsx)(i,{game:`emerald`}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Determine the correct SID`}),`
`,(0,n.jsx)(r.p,{children:`Summary: For each possible SID generated in Step 1, obtain a starter Pokémon with its associated earliest Method-1 advance that results in a shiny Pokémon, if the SID is the correct one.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Save the game in front of the starter Pokémon bag.`}),`
`,(0,n.jsx)(r.li,{children:`Using the tool below, fill the TID and the first possible SID of the list you haven't tried yet.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Generate", then start the timer.`}),`
`,(0,n.jsxs)(r.li,{children:[`Precisely when the first timer reaches 0, press `,(0,n.jsx)(r.code,{children:`Start + Select + A + B`}),` simultaneously to reset the game.`]}),`
`,(0,n.jsx)(r.li,{children:`Quickly open the bag to avoid unwanted advances from wandering NPCs.`}),`
`,(0,n.jsxs)(r.li,{children:[`Select your starter and wait with the confirmation message `,(0,n.jsx)(r.code,{children:`Do you choose this POKEMON?`}),` displayed.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Precisely when the second timer reaches 0, press `,(0,n.jsx)(r.code,{children:`A`}),` to choose your starter.`]}),`
`,(0,n.jsx)(r.li,{children:`Complete the battle and examine your starter Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`If it's shiny, congratulations! The inputted SID is the SID of your savefile.`}),`
`,(0,n.jsx)(r.li,{children:`If it's not shiny, fill the species, gender, nature, and stats in the form below, then click "Find advances matching caught starter Pokémon".`}),`
`,(0,n.jsx)(r.li,{children:`If no results are shown, a field is incorrect.`}),`
`,(0,n.jsx)(r.li,{children:`If the first row contains "Shiny if correct SID" but the Pokémon you got is not shiny, then the currently tested SID is incorrect. Start over Step 2 using the next SID in the list of possible SIDs.`}),`
`,(0,n.jsx)(r.li,{children:`Otherwise, click on the "Update Calibration" button and start over Step 2 with the same SID.`}),`
`]}),`
`,(0,n.jsx)(s,{game:`emerald`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Guide and interactive tool: RainingChain.`}),`
`,(0,n.jsx)(r.li,{children:`Gen3 static generator tool: EzPz.`}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`German translation: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};