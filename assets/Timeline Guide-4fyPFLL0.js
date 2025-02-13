import{u as a,j as e}from"./index-DweVeu07.js";const s={title:"Timeline Guide",description:"The most needed skill to do Gen 7 RNG with custom firmware",slug:"retail-usum-timeline",subCategory:"Custom Firmware"};function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.p,{children:"Before continuing with the guide it is recommended to be in the place you wish to RNG."}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up 3DSRNGTool"}),`
`,e.jsx(n.h3,{children:"In the upper right of 3DSRNGTool:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Input your game version and your TSV.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["With PCalc, you can find your TSV by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. Your TSV is listed by where it says ",e.jsx(n.code,{children:"YOUR TSV"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Input the initial seed. You can find this by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. The initial seed is found where it says ",e.jsx(n.code,{children:"Init Seed:"}),"."]}),`
`,e.jsx(n.li,{children:"If you have the Shiny Charm check the Shiny Charm box."}),`
`]}),`
`,e.jsx(n.h3,{children:"Regarding Timeline and NPCs"}),`
`,e.jsx(n.p,{children:"If you are in an area with an NPC count of one or more you must always create a timeline before searching for a target frame. A timeline is able to accurately predict what frames you can actually land on."}),`
`,e.jsx(n.p,{children:"If you are in an area with 0 NPCs the RNG procedures are different, and no timeline is needed. Refer to the guide you are following for more information on how to RNG in Gen 7 with 0 NPCs."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: In the Gen 7 games each NPC has an affect on the RNG frames. This is why the frames will not always advance by a constant number. In general, each NPC advances the frames by one, so an area with four NPCs will generally advance five frames each time. There is also Rotom and your character blinks that affect the frames advanced. 3DSRNGTool can accurately predict all of this if the timeline is created properly and allow you to land on your target frame without skipping over it due to NPCs.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Create a Timeline"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In 3DSRNGTool, make sure to input your initial seed, game version, and your TSV if you haven't already. Double check that everything is correct.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Initial Seed can be found by pressing ",e.jsx(n.code,{children:"Start + Up"})," ingame."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Check “Safe F Only”."}),`
`,e.jsxs(n.li,{children:["Enter the number of NPCs for the area. 3DSRNGTool should automatically fill in this number, but it can be confirmed with PCalc.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["After getting to the final screen for your Pokemon press ",e.jsx(n.code,{children:"Start + Up"})," to bring up the window with the NPC counter."]}),`
`,e.jsxs(n.li,{children:["If you already have it up, close it by pressing ",e.jsx(n.code,{children:"Start + Up"}),", and then bring it back up again to reset the NPC counter."]}),`
`,e.jsx(n.li,{children:"Let the game run for approximately 30 seconds to a minute to calibrate correctly."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["In the game, advance to the final screen for the Pokemon you are RNGing for. Input the frame you are currently on in the frame range. You can find this in the PCalc Game Info window (",e.jsx(n.code,{children:"Start + Up"}),") and then press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game."]}),`
`,e.jsxs(n.li,{children:['Click "Calculate", and then advance to any of the frames that are listed that have a "-" in the Mark column.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"These frames are considered Safe Frames and can be used to accurately predict the frames you can land on."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["You can advance frames by pressing ",e.jsx(n.code,{children:"Start"})," to unpause the game. You can then pause again when close to the frames given earlier with ",e.jsx(n.code,{children:"Start + Select"})," and then slowly advance by pressing ",e.jsx(n.code,{children:"Select"})," while paused.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Which frame you land on does not matter, just as long as it is one listed."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2(b): Verifying Timeline and Number of NPCs"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['Input your current frame after reaching a safe frame and then check “Create Timeline” and "Calculate".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Once you have landed on a safe frame and have used that frame to create a Timeline, do not change it. Otherwise the Timeline will be off and you'll have to restart from Step 2."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Select"})," on your 3DS to advance several times and compare to what the next frames are given in 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If they match then you have the correct number of NPCs."}),`
`,e.jsx(n.li,{children:"If they do not match, restart from beginning of Step 2."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Usually, this is when mistakes making the timeline are found. Double check that initial seed is correct, and that PCalc's NPC counter hasn't changed while making a timeline."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Do not mess with filters while creating a timeline. You should not have touched anything in filters (except to check the "Safe F Only" box) up to this point. Otherwise if you have messed with filters, restart from the beginning.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are going for a target frame with a long wait time, it is advised to recheck the timeline every once in awhile to make sure that the number of NPCs did not change. Not all NPCs will influence the RNG at once, which is why waiting 30 seconds to a minute or longer for PCalc to calibrate the number of NPCs correctly is necessary. Checking that the timeline still matches a couple minutes later makes sure that time was not wasted waiting for a frame that could not be landed on due to fluctuating NPCs.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: To check that the target frame you want is still within the timeline, redo the timeline using the current frame you are on and then search for the target frame you wanted. If it is not appearing in results, then your timeline shifted.
`})})]})}function o(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,s as frontmatter};
