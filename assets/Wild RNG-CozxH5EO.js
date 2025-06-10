import{q as r,j as e}from"./index-DB1mOhG0.js";const a=[{title:"Ultra Sun and Ultra Moon Wild RNG",navDrawerTitle:"Wild RNG",description:"Learn how to RNG wild Pokémon in Ultra Sun and Ultra Moon for shiny and high-IV results.",slug:"retail-usum-wild",category:"Ultra Sun and Ultra Moon",tag:"cfw"},{title:"Sun and Moon Wild RNG",navDrawerTitle:"Wild RNG",description:"Learn how to RNG wild Pokémon in Sun and Moon for shiny and high-IV results.",slug:"retail-sm-wild",category:"Sun and Moon",tag:"cfw",canonical:"retail-usum-wild"}];function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/install-pokereader",children:"A 3DS with PokeReader"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: In the game, you will have to use "honey" to initiate the wild encounter. You can get the "honey" item in any store after clearing three trials.
`})}),`
`,e.jsx(n.p,{children:"It's best to be in the area where you want to RNG."}),`
`,e.jsxs(n.p,{children:["For Sun/Moon games, refer to this list of ",e.jsx(n.a,{href:"http://pokerng.forumcommunity.net/?t=59613020",children:"encounter slots with 0 NPC or the least number of NPC spots"}),"."]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In the upper right, input your game version and TSV."}),`
`,e.jsxs(n.li,{children:["Input the initial seed in the upper right. You can find this in the main RNG view as ",e.jsx(n.code,{children:"Init Seed:"}),"."]}),`
`,e.jsx(n.li,{children:'If you have the Shiny Charm, check the "Shiny Charm" box.'}),`
`,e.jsx(n.li,{children:'Choose the "Wild" tab, then select "Normal Wilds" or "UBs" for Ultra Beasts. Select "Location" and choose the Pokémon you want from the "Slot" dropdown to automatically fill in its info.'}),`
`,e.jsx(n.li,{children:'If using a Pokémon with Synchronize in the first slot, choose its nature from the "Synch Nature" dropdown. This is crucial for accurate RNG predictions.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: For wild Pokémon, Synchronize has a 50% chance of having the same nature as the lead Pokémon. Using Synchronize increases your chances of finding target frames.
`})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:'Check "Day" or "Night" based on the game time. If it is raining in the game, also check the "Raining" box to ensure the RNG is accurate.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2 (with NPCs) Create a Timeline:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If in an area with 0 NPCs, skip to the 0 NPC section. Do not check the "Blink F Only" box if there are NPCs.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Follow the ",e.jsx(n.a,{href:"/retail-usum-timeline",children:"timeline guide"})," to create a timeline and find a target frame. Open the in-game menu with ",e.jsx(n.code,{children:"X"})," and hover over the bag before making the timeline."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2 (with 0 NPCs):"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Do not check the "Blink F Only" box.'}),`
`,e.jsxs(n.li,{children:["Open the in-game menu with ",e.jsx(n.code,{children:"X"})," and hover over the bag. Input your current frame in the frame range. You can pause the game by pressing ",e.jsx(n.code,{children:"Start + Select"}),"."]}),`
`,e.jsxs(n.li,{children:['Adjust filters as needed, then click "Calculate" to select one of the results. If no results, increase the Frame Range or restart the game for a new initial seed.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Restart from the beginning of the guide if you restart the game."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: With 0 NPCs, use Festival Plaza to advance frames faster, but do this only with 0 NPCs. Exit Festival Plaza about a thousand frames before your target frame to avoid missing it.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: Obtain the Wanted Pokémon"}),`
`,e.jsx(n.p,{children:"Once you have a timeline (if there are NPCs) and target frame, proceed with the RNG."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Advance frames by pressing ",e.jsx(n.code,{children:"Start"})," to unpause. Pause again near your target frame with ",e.jsx(n.code,{children:"Start + Select"})," and slowly advance by pressing ",e.jsx(n.code,{children:"Select"})," while paused."]}),`
`,e.jsxs(n.li,{children:["When on the target frame, press ",e.jsx(n.code,{children:"A"})," to open the bag. The delay from opening the bag is already accounted for in 3DSRNGTool, so no worries here."]}),`
`,e.jsx(n.li,{children:'Use "Honey" and wait for the animation to finish to start the battle.'}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the Pokémon you wanted. If not, you may need to adjust the correction value. See the end of this guide for more info."}),`
`,e.jsx(n.h2,{children:"Adjusting Correction"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Double-check that all info is correctly input, especially the initial seed. Use the correct method for the presence of NPCs; otherwise, target frames may be skipped.
`})}),`
`,e.jsx(n.p,{children:"If the Pokémon is not what you wanted after following the steps, adjust the correction value in 3DSRNGTool. The correction value determines the frames used to load the map, and it varies by where your character stands."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Set the "Target Frame" to your target frame.'}),`
`,e.jsx(n.li,{children:'Reset filters by clicking the cog icon in "Filters."'}),`
`,e.jsx(n.li,{children:'In the "Slots" box, change it to the Pokémon encountered in battle.'}),`
`,e.jsx(n.li,{children:`Change the "Nature" to the Pokémon's nature.`}),`
`,e.jsx(n.li,{children:'Click "Search" to find a frame matching the filters near the target frame. The IVs may not match initially due to an incorrect correction value.'}),`
`,e.jsx(n.li,{children:'Adjust the correction value until the IVs match the encountered Pokémon. You can increase or decrease the value by one and click "Search" to generate new results.'}),`
`]}),`
`,e.jsx(n.p,{children:"Once you find the correct correction value, it remains stable for future RNG attempts, as long as you don't move your character. Moving may require further adjustments."})]})}function s(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{s as default,a as frontmatter};
