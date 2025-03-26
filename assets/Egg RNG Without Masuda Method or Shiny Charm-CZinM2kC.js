import{u as r,j as e}from"./index-B1sIwuQM.js";const h={title:"Egg RNG Guide without Masuda and/or Shiny Charm",description:"RNG for eggs without using Masuda Method and without the Shiny Charm",slug:"retail-sm-egg-no-mmsc",subCategory:"Custom Firmware",tag:"cfw"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"How is this different from using the Masuda Method and/or Shiny Charm?"}),`
`,e.jsx(n.p,{children:"Using the Masuda Method and/or Shiny Charm sets the Egg Shiny Values (ESVs) in a fixed pattern, and the only way to reach desired frames is to accept or reject eggs. But without them, ESVs generate at the moment you accept the egg. This allows any egg frame to become any ESV."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: An ESV determines if an egg hatches shiny. When an ESV matches a Trainer Shiny Value (TSV), the egg hatches shiny.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setting Up 3DSRNGTool"}),`
`,e.jsx(n.h3,{children:"In the upper right of 3DSRNGTool:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Enter your game version and TSV (",e.jsx(n.code,{children:"Start + Up"})," in PCalc will reveal TSV in the Game View window)."]}),`
`,e.jsxs(n.li,{children:["Enter the initial seed (",e.jsx(n.code,{children:"Start + Up"})," in PCalc will reveal this in the Game View window)."]}),`
`,e.jsx(n.li,{children:`Make sure the "Shiny Charm" box is unchecked. This method doesn't work if you have the Shiny Charm.`}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`To RNG an egg with a specific ESV that isn't yours, click on "Edit TSV List" and input the TSV(s). Keep YOUR TSV in the upper right or the RNG will be incorrect.
`})}),`
`,e.jsx(n.h3,{children:"For parents information:"}),`
`,e.jsx(n.p,{children:"Fill it out based on the parents you're using."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`Ensure the "Masuda Method" box is not checked. You can't use this method if parents have different languages.`}),`
`,e.jsx(n.li,{children:"Double-check that parents share the same language to save time later on."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: For Masuda Method, only the Pokémon's language matters, not the region.
`})}),`
`,e.jsx(n.p,{children:"The Ditto will be the female in a Ditto and genderless Pokemon pair. Otherwise, it'll be the opposite gender of the other parent."}),`
`,e.jsx(n.p,{children:"Note about Rockruff breeding:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If its ability is Own Tempo, setting the ability as 1, 2, or H makes no difference."}),`
`,e.jsx(n.li,{children:"If it isn't Own Tempo, its abilities are [1] Keen Eye, [2] Vital Spirit, or [H] Steadfast."}),`
`]}),`
`,e.jsx(n.h3,{children:"For current status"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['For the "Current Status" section in 3DSRNGTool, enter your current egg seeds (',e.jsx(n.code,{children:"Start + Down"})," in PCalc will reveal your egg seeds)."]}),`
`,e.jsx(n.li,{children:'Leave the "Main RNG Egg (PID)" box unchecked for now.'}),`
`,e.jsx(n.li,{children:'For "Filters", enter the details about the egg you want.'}),`
`,e.jsx(n.li,{children:`Leave the "Shiny Only" box empty, even if you want a shiny egg. We'll RNG the ESV separately.`}),`
`,e.jsx(n.li,{children:'Set "0" as the starting frame.'}),`
`,e.jsx(n.li,{children:'Click "Calculate".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a Target Frame"}),`
`,e.jsx(n.p,{children:"You may choose any of the listed frames. Lower frames usually mean fewer egg acceptances/rejections."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Right-click your chosen row and click "Set as Target Frame".'}),`
`,e.jsx(n.li,{children:'Click on "Shortest Path" and "Calculate". This will determine the shortest path with the fewest accepts and rejects to get your target egg.'}),`
`,e.jsx(n.li,{children:"Accept and/or reject eggs in the sequence provided. Following a different order will result in incorrect egg seeds. Do NOT accept your target egg, the last egg listed!"}),`
`,e.jsx(n.li,{children:"Once you have your target egg seeds, proceed with the guide."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`With PCalc, you can check which egg frame you're on by looking at your egg seeds in-game. Use Start + Down to open the menu.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: RNGing the ESV of the Egg"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Save your game while standing in front of the daycare helper before accepting the egg in case of errors."}),`
`,e.jsx(n.li,{children:"Begin the dialogue to accept the egg from the daycare helper. Standing off-center might confuse NPCs when creating a timeline."}),`
`,e.jsxs(n.li,{children:["When the “Yes” or “No” choice appears, press ",e.jsx(n.code,{children:"Start + Up"})," to open the Game View window, then pause the game (",e.jsx(n.code,{children:"Start + Select"}),'). If the Game View window is already open, reopen it at the "Yes" or "No" choice to reset the NPC counter.']}),`
`,e.jsxs(n.li,{children:["Create a timeline to achieve your desired ESV by following these steps:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Check the "Main RNG Egg (PID)" box under "Current Status" in the 3DSRNGTool.'}),`
`,e.jsx(n.li,{children:'Click the gear icon to reset "Filters".'}),`
`,e.jsxs(n.li,{children:["Follow the ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-sm-timeline",children:"timeline guide"})," to create a timeline."]}),`
`,e.jsx(n.li,{children:"Creating a timeline helps identify feasible frames due to NPC influence."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Search for your target frame once you've created a timeline.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`If you want to RNG for a specific ESV that isn't yours, click on "Edit TSV List", input TSV(s), and select the "Other TSVs Shiny" box.`}),`
`,e.jsx(n.li,{children:'Select the "Shiny Only" box.'}),`
`,e.jsx(n.li,{children:'Click "Calculate" to find frames for desired ESV(s).'}),`
`,e.jsx(n.li,{children:"Select any of the highlighted blue frames (lower frames require less waiting)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Advance to that frame, and press ",e.jsx(n.code,{children:"A"})," to accept the egg once you land on it."]}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the desired egg with the RNG’d TSV. If not, you can reset the game (if you saved before picking up the egg) and try again."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Tip: Use PCalc to check the egg's info. Press Start + Left for Party View, and Select + Right to cycle through different slots.
`})})]})}function o(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,h as frontmatter};
