import{u as r,j as e}from"./index-DEKSk6E2.js";const o={title:"Egg RNG Guide with Masuda Method or Shiny Charm",description:"RNG your perfect Pokemon at the daycare",slug:"retail-oras-egg-mmsc",subCategory:"Custom Firmware"};function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This method is different than using no Masuda or without having the Shiny Charm. The difference is that you RNG for the egg once, but wait times for a target frame could be longer.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Enter RNG info"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Input your game version and your TSV.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Using PCalc you can find your TSV by pressing ",e.jsx(n.code,{children:"Start + Right"})," to bring up the Party View window, then press ",e.jsx(n.code,{children:"Select + Left"}),". Your TSV is listed by where it says YOUR TSV."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Input initial seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This can be found using PCalc's Game View window. Press ",e.jsx(n.code,{children:"Start + Up"})," to bring up the window."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Check Shiny Charm box if you have the Shiny Charm."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If you are wanting to RNG the egg to have a specific ESV that is not yours, click on Edit TSV List and input TSV(s). Then check the Other TSVs Shiny box.

Do not input the TSV in the upper right. YOUR TSV must be used in the upper right or else the RNG will be incorrect.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Parent information"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Fill it out according to the parents you are using.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the parents are of different languages make sure to check Masuda Method box."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The region of the Pokemon does not affect anything, it is only the language of the Pokemon that matters for Masuda Method.
`})}),`
`,e.jsx(n.p,{children:"If using a Ditto and genderless Pokemon, the Ditto will be the female."}),`
`,e.jsx(n.h2,{children:"Step 3: Egg Seeds, Filters, and Target Frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["For the Egg Seeds input the current egg seeds of your game.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Using PCalc press ",e.jsx(n.code,{children:"Start + Down"})," ingame to bring up the egg seed window and input them into 3DSRNGTool."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"For Filters, input the info for the egg you are wanting."}),`
`,e.jsx(n.li,{children:"Check the Shiny Only box if you are wanting a shiny egg."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Start + Up"})," to bring up Game Info screen for PCalc. Then press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game."]}),`
`,e.jsx(n.li,{children:"Input your current frame and increase frame range. The higher the frame range, the more frames will be searched."}),`
`,e.jsxs(n.li,{children:['Click "To Accept" if you are going to be accepting the first egg.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If instead, you want to reject the first egg, click "To Reject".'}),`
`,e.jsx(n.li,{children:"However, it is advised to accept the first egg so you can verify that it matches frame -1."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note that the Consider Delay counter will change to 0 for rejecting the egg.
`})}),`
`,e.jsxs(n.ol,{start:"7",children:[`
`,e.jsxs(n.li,{children:["After doing all of the above, click on Calculate to output target frames.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If there are no results, increase frame range and click Calculate again."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: RNGing the Egg Traits"}),`
`,e.jsx(n.p,{children:"Keep in mind:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Frames will always advance by 2 outside of battles."}),`
`,e.jsx(n.li,{children:"Frames will be either always even or always odd."}),`
`,e.jsx(n.li,{children:"To switch from even to odd frames, save once."}),`
`,e.jsx(n.li,{children:"The first egg you collect/reject will NOT be the egg you RNG’d for."}),`
`,e.jsx(n.li,{children:"Eggs are generated when the previous egg was collected/rejected and do not change."}),`
`,e.jsx(n.li,{children:"When you collect/reject the egg, the NEXT egg will have the traits you RNG’d for."}),`
`,e.jsxs(n.li,{children:["The frame -1 is the current egg’s traits.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is the egg you will be collecting when you press A for Yes (or rejecting if you chose to reject)."}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Pick your target frame that you are wanting."}),`
`,e.jsxs(n.li,{children:["If you are currently on an even frame and want an odd frame, or vice versa, unpause by pressing ",e.jsx(n.code,{children:"Start"})," and save the game once.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will switch from even to odd frames, or vice versa."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: RNGing the Egg Traits (Exluding PID/ESV)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In game, talk to the daycare man until you get to a specific dialogue.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY) with the selection of Yes or No.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure pointer is on Yes and wait to reach your target frame."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"For rejecting the first egg: “Well then, I'll hang on to it. Thank you!” (XY/ORAS) after selecting No from previous dialogue."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["When you are close to your target frame, you can press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game, and then press ",e.jsx(n.code,{children:"Select"})," repeatedly to advance frame by frame."]}),`
`,e.jsx(n.li,{children:"Advance to your target frame and then hold A (don’t just press it, hold down A) to both unpause the game and receive/reject the egg."}),`
`,e.jsxs(n.li,{children:["As mentioned before, this egg is NOT the one you RNG’d for. It should match the frame -1 from the 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can use PCalc to view the egg's info without having to hatch it. Press ",e.jsx(n.code,{children:"Start + Right"})," for Party View then press ",e.jsx(n.code,{children:"Select + Right"})," to cycle through the party slots."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Collect the NEXT egg and hatch or check it to confirm your wanted Pokemon. Congrats!"}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Check that the TSV in the upper right matches the one of the save you are RNGing on. You can find your TSV by bringing up party view menu with ",e.jsx(n.code,{children:"Start + Right"})," then pressing ",e.jsx(n.code,{children:"Select + Left"})," to go to slot 7."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"If the first egg collected did not match the info for frame -1, make sure you are using the latest PCalc. Also, make sure you have the right daycare view for ORAS."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Pressing ",e.jsx(n.code,{children:"Select + Right/Left"})," with the egg seeds window up will switch daycare views for ORAS."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Egg seeds should change after every egg collected/rejected. If they are not changing, make sure you are using the latest PCalc and your game is updated to the latest version."}),`
`]}),`
`]})]})}function l(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{l as default,o as frontmatter};
