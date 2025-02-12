import{u as o,j as e}from"./index-5j1DF-qJ.js";const s={title:"Egg RNG Guide without Masuda and/or Shiny Charm",description:"RNG for eggs without using Masuda Method and without the Shiny Charm",slug:"retail-usum-egg-no-mmsc",subCategory:"Custom Firmware"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"How is this different than using the Masuda Method and/or Shiny Charm?"}),`
`,e.jsx(n.p,{children:"When using the Masuda Method and/or Shiny Charm, the ESVs of every egg are already set in a predetermined order that will not change. The only way to reach the frames you want is to accept and/or reject however many eggs it takes to reach those frames. However, without using the Masuda Method and without having the Shiny Charm, the ESVs are not generated until the moment you accept the egg. This means ANY egg frame can be ANY ESV you want it to be."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-Note:",children:`If an ESV matches a TSV (Trainer Shiny Value) then the egg will hatch shiny.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up 3DSRNGTool"}),`
`,e.jsx(n.h3,{children:"In the upper right of 3DSRNGTool:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Input your game version and your TSV.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["With PCalc, you can find your TSV by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. Your TSV is listed by where it says ",e.jsx(n.code,{children:"YOUR TSV"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Input the initial seed. You can find this by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. The initial seed is found where it says ",e.jsx(n.code,{children:"Init Seed:"}),"."]}),`
`,e.jsx(n.li,{children:'The "Shiny Charm" box must be unchecked. If you have the Shiny Charm you cannot use this method.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If you are wanting to RNG the egg to have a specific ESV that is not yours, click on "Edit TSV List" and input the TSV(s).

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
`})}),`
`,e.jsx(n.h3,{children:"For parents information:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Fill it out according to the parents you are using.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Make sure the "Masuda Method" box is not checked. If the parents are of different languages you cannot use this method.'}),`
`,e.jsx(n.li,{children:"Double check that the parents are of the same language. Checking this now will save you from wasting time later."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
`})}),`
`,e.jsx(n.p,{children:`If using a Ditto and genderless Pokemon, the Ditto will be the female.
Otherwise, the Ditto will be the opposite gender of the other parent.`}),`
`,e.jsx(n.p,{children:"Note about breeding for Rockruff:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If its ability is Own Tempo, then the ability can either be 1, 2, or H, it won’t make a difference."}),`
`,e.jsx(n.li,{children:"If its ability is not Own Tempo then its abilities are [1] Keen Eye, [2] Vital Spirit, or [H] Steadfast."}),`
`]}),`
`,e.jsx(n.h3,{children:"For current status"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['For the "Current Status" section in 3DSRNGTool input the current egg seeds of your game.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Using PCalc, press ",e.jsx(n.code,{children:"Start + Down"})," in-game to bring up the egg seed window and input them into 3DSRNGTool."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Do not check the "Main RNG Egg (PID)" box. We will be doing this later.'}),`
`,e.jsx(n.li,{children:'For "Filters", input the info for the egg you are wanting.'}),`
`,e.jsx(n.li,{children:`Do not check the "Shiny Only" box even if you are wanting a shiny egg. The ESV of the egg will be RNG'd separately.`}),`
`,e.jsx(n.li,{children:'Input "0" as the starting frame.'}),`
`,e.jsx(n.li,{children:'Click "Calculate".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a Target Frame"}),`
`,e.jsx(n.p,{children:"You can choose any of the given frames, but lower frames are generally better due to less egg accepts/rejects."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Right click on the row for the one you want and click "Set as Target Frame".'}),`
`,e.jsxs(n.li,{children:['Click on "Shortest Path" and "Calculate".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will automatically calculate the shortest path for the least number of accepts and rejects for your target egg."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Accept and/or reject the eggs in the order given from top to bottom. Doing the accepts and/or rejects out of order will result in the wrong egg seeds.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The very last egg you are going to accept will be your target egg. Do NOT accept this egg!"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Once you are to your target egg seeds, continue with the rest of the guide."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`With PCalc you can check which egg frame you are on by looking at your egg seeds in-game (Start + Down to bring up the menu).
`})}),`
`,e.jsx(n.h2,{children:"Step 3: RNGing the ESV of the Egg"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Once you have the egg you want to be shiny ready to pick up from the daycare helper, save the game in case you mess up and need to start over for the next part."}),`
`,e.jsxs(n.li,{children:["Stand directly in front of the daycare helper and start the dialogue to accept the egg.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Standing off to the side may cause NPCs to fluctuate when making a timeline."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["When you get to the choice of “Yes” or “No”, press ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window in-game, and then pause the game (",e.jsx(n.code,{children:"Start + Select"}),").",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If the Game View window is already open, close and open it again when at the "Yes" or "No" selection to reset NPC counter.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Follow the steps below to create a timeline to obtain the ESV you want.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Check the "Main RNG Egg (PID)" box in 3DSRNGTool under "Current Status".'}),`
`,e.jsx(n.li,{children:'Afterward, reset "Filters" by clicking on the gear icon.'}),`
`,e.jsxs(n.li,{children:["Then follow the ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-usum-timeline",children:"timeline guide"})," to create a timeline."]}),`
`,e.jsx(n.li,{children:"Creating a timeline is necessary to know what frames you can actually land on due to NPC influence on frames."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["After making a timeline you can now search for a target frame that you are able to land on.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If you are wanting to RNG the egg to have a specific ESV that is not yours, click on "Edit TSV List", input TSV(s), and check the "Other TSVs Shiny" box.'}),`
`,e.jsx(n.li,{children:'Check the "Shiny Only" box.'}),`
`,e.jsx(n.li,{children:'Then "Calculate" to find frames that will give the ESV(s) you want.'}),`
`,e.jsx(n.li,{children:"Choose any of the blue highlighted frames (lower frames are better because of less waiting time)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Advance to that frame and when you land on it, Press ",e.jsx(n.code,{children:"A"})," to accept egg."]}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the egg you wanted with the TSV you RNG’d for. If not, you can reset the game if you saved before picking up the egg and try again."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Tip: You can use PCalc to check the egg's info. Press Start + Left to bring up Party View and then Select + Right to cycle through the different slots.
`})})]})}function h(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{h as default,s as frontmatter};
