import{u as i,j as e}from"./index-wr_-CJZl.js";const o=[{title:"Omega Ruby and Alpha Sapphire Egg RNG Without Masuda or Shiny Charm",navDrawerTitle:"No MM/SC Egg RNG",description:"RNG your perfect Pokemon at the daycare",slug:"retail-oras-egg-no-mmsc",category:"Omega Ruby and Alpha Sapphire",tag:"cfw"},{title:"X and Y Egg RNG Without Masuda or Shiny Charm",navDrawerTitle:"No MM/SC Egg RNG",description:"RNG your perfect Pokemon at the daycare",slug:"retail-xy-egg-no-mmsc",category:"X and Y",tag:"cfw"}];function r(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This method differs from using Masuda or having the Shiny Charm. Here, you first RNG the egg traits, then RNG the ESV (and PID) when picking up the egg. This approach potentially results in shorter wait times than with Masuda or Shiny Charm.
`})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Enter RNG info"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Fill in your game version and TSV. Use PCalc to find your TSV by pressing ",e.jsx(n.code,{children:"Start + Right"}),", then ",e.jsx(n.code,{children:"Select + Left"}),'. Your TSV is under "YOUR TSV".']}),`
`,e.jsxs(n.li,{children:["Input the initial seed. Use PCalc's Game View window (",e.jsx(n.code,{children:"Start + Up"}),")."]}),`
`,e.jsx(n.li,{children:"Leave the Shiny Charm box unchecked. This method doesn't work with the Shiny Charm."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Want to RNG the egg to have a specific ESV that isn't yours? Click on Edit TSV List, input TSV(s), and check the Other TSVs Shiny box. But don't input the TSV in the upper right. You must use YOUR TSV there or the RNG will be incorrect.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Parent information"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Enter details based on the parents you are using."}),`
`,e.jsx(n.li,{children:"Don't check the Masuda Method box."}),`
`,e.jsx(n.li,{children:"This method doesn't work if the parents have different languages."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Remember: the Pokemon's region doesn't matter here. Only the Pokemon's language affects the Masuda Method.

Also, when breeding with a Genderless Pokemon and Ditto, Ditto will always be designated as female.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: Setup egg seeds, filters, and target frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Input the current egg seeds of your game in the Egg Seeds field. Use PCalc to bring up the egg seed window (",e.jsx(n.code,{children:"Start + Down"}),")."]}),`
`,e.jsx(n.li,{children:"In the Filters section, describe the egg you are aiming for."}),`
`,e.jsx(n.li,{children:"Leave the Shiny Only box unchecked. You'll RNG shininess later."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Start + Up"})," to see the Game Info screen for PCalc, then press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game."]}),`
`,e.jsx(n.li,{children:"Input your current frame and increase the frame range. A larger range means more frames will be found."}),`
`,e.jsx(n.li,{children:`Click "To Accept" if you'll accept the first egg. Alternatively, "To Reject" if you'll reject the first egg. It's advisable to accept the first egg to verify it matches frame -1.`}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The Consider Delay counter will change to 0 for rejecting the egg.
`})}),`
`,e.jsxs(n.ol,{start:"7",children:[`
`,e.jsx(n.li,{children:"After completing the steps above, click on Calculate to output target frames. If the result is empty, increase frame range and click Calculate again."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: RNG the Egg Traits (Excluding PID/ESV)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Choose your target frame."}),`
`,e.jsxs(n.li,{children:["If you're currently on an even frame and want an odd frame (or vice versa), press ",e.jsx(n.code,{children:"Start"})," to unpause and save the game once."]}),`
`]}),`
`,e.jsx(n.p,{children:"Remember:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Frames always advance by 2 out of battles."}),`
`,e.jsx(n.li,{children:"Frames will be consistently even or odd."}),`
`,e.jsx(n.li,{children:"Save once to switch between even to odd frames."}),`
`,e.jsx(n.li,{children:"The first egg you collect/reject isn't the one you RNG’d for."}),`
`,e.jsx(n.li,{children:"Egg traits are determined when the previous egg was collected/rejected and do not change."}),`
`,e.jsx(n.li,{children:"The PID and ESV of the egg aren't generated until you collect the egg."}),`
`,e.jsx(n.li,{children:"The NEXT egg will have the traits you RNG’d for when you collect/reject the first egg."}),`
`,e.jsx(n.li,{children:"When you collect the second egg (the target egg), you'll RNG for its ESV. The other traits were RNG’d when the first egg was collected/rejected."}),`
`,e.jsx(n.li,{children:"Frame -1 represents the current egg’s traits. This is the first egg you'll collect (or reject if you chose to reject)."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 5: Hit the Target Frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In the game, talk to the daycare man until a specific dialogue appears.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY) with Yes or No options. Point to Yes and wait for your target frame."}),`
`,e.jsx(n.li,{children:"For rejecting the first egg: “Well then, I'll hang on to it. Thank you!” (XY/ORAS) after choosing No from previous dialogue."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["As you approach your target frame, press ",e.jsx(n.code,{children:"Start + Select"})," to pause, then repeatedly press ",e.jsx(n.code,{children:"Select"})," to advance frame by frame."]}),`
`,e.jsx(n.li,{children:"Reach your target frame and then hold A to both unpause and receive/reject the egg."}),`
`,e.jsxs(n.li,{children:["The first egg you collect isn't the one you RNG’d for. Using PCalc (",e.jsx(n.code,{children:"Start + Right"})," for Party View then ",e.jsx(n.code,{children:"Select + Right"}),"), you can see the egg's info without hatching it."]}),`
`,e.jsxs(n.li,{children:["The egg seeds in-game (",e.jsx(n.code,{children:"Start + Down"})," to open menu) should match the egg seeds for your chosen target frame in the 3DSRNGTool."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 6: RNG the ESV of the Egg"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Right-click on the target frame you chose earlier and click on "Set as Current Status".'}),`
`,e.jsx(n.li,{children:"Click Reset in Filters and then check the Shiny Only box."}),`
`,e.jsx(n.li,{children:"Input current frame and a frame range to search. A larger range means more frames will be found."}),`
`,e.jsx(n.li,{children:"Click Calculate to show frames with the desired ESV."}),`
`,e.jsx(n.li,{children:"Choose a target frame as you did before."}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"To switch from even to odd frames (or vice versa), unpause and save the game once."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 7: Hit the Target Frame (Repeat from before)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In the game, talk to the daycare man until a specific dialogue appears.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For accepting the egg: “You’ll be wanting it, won’t you?” (ORAS) or “You do want it, don’t you?” (XY) with Yes or No options. Point to Yes and wait for your target frame."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["As you approach your target frame, press ",e.jsx(n.code,{children:"Start + Select"})," to pause, then repeatedly press ",e.jsx(n.code,{children:"Select"})," to advance frame by frame."]}),`
`,e.jsx(n.li,{children:"Reach your target frame and then hold A to both unpause and receive the egg."}),`
`]}),`
`,e.jsx(n.p,{children:"Well done! The egg should now have the traits and ESV you wanted."}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Ensure the TSV in the upper right matches the one of the save you are RNGing on. Bring up the party view menu with ",e.jsx(n.code,{children:"Start + Right"})," then press ",e.jsx(n.code,{children:"Select + Left"})," to check."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"If the first collected egg didn't match the info for frame -1, check if you have the latest PCalc and the right daycare view for ORAS."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"Select + Right/Left"})," with the egg seeds window up to switch daycare views for ORAS."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Egg seeds should change after each egg collected/rejected. If not, ensure you have the latest PCalc and your game is updated to the latest version."}),`
`]}),`
`]})]})}function a(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{a as default,o as frontmatter};
