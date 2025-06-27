import{v as s,j as e}from"./index-Qwe0mBDb.js";const l={title:"X and Y Friend Safari RNG",navDrawerTitle:"Friend Safari RNG",description:"Learn how to RNG shiny 6IV Pokémon from the Friend Safari in X and Y, including Ditto and other rare species.",slug:"pcalc-xy-friend-safari",category:"X and Y",tag:"cfw"};function r(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Required Reading"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen6-TinyMT-Timeline-Calibration",children:"TinyMT Timeline"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/ntr-helper-usage",children:"NTR Helper Usage"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Explanation of TinyMT frames within Tiny Timeline Tool"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Main RNG Frame"}),": Main RNG frame ranges for each TinyMT frame listed. Manipulating the TinyMT timeline makes these frames overlap."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Enctr?"}),": Determines if there will be an encounter if the character turns or walks into the grass during those TinyMT seeds. The encounter must be under 13 (0-12) for guaranteed encounters."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sync?"}),": Determines if nature will be synchronized.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"X"})," = No, ",e.jsx(n.code,{children:"O"})," = Yes."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Slot"}),": Chooses which slot of Friend Safari will be used for the Pokémon.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Order matches the Friend Safari Pokémon screen from left to right."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HA"}),": Determines if Pokémon will have Hidden Ability or not.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"X"})," = No, ",e.jsx(n.code,{children:"O"})," = Yes."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set up"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load XY and connect to NTR Helper within 3DSRNGTool."}),`
`,e.jsx(n.li,{children:"Enter the Friend Safari you wish to RNG in."}),`
`,e.jsxs(n.li,{children:["Walk to the left side of the area outside the grass and save.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can now either do a test run or reset the game to use the reseeding method mentioned later in the guide to find a target frame."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide assumes you already have basic knowledge of how to do Gen 6 RNG. It is recommended to first learn about Gen 6 RNG mechanics by RNGing something simple like eggs.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Manipulating TinyMT"}),`
`,e.jsx(n.p,{children:"To successfully cause an encounter on your target frame, manipulate the TinyMT with the following method. It’s good to practice manipulating the TinyMT first with test frames."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Choose a test frame as your target frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Search for any frame within the ",e.jsx(n.code,{children:"Wild RNG"})," Tab of 3DSRNGTool."]}),`
`,e.jsx(n.li,{children:"Don't worry about nature if using Sync; this will be handled with TinyMT."}),`
`,e.jsx(n.li,{children:'Right-click on the frame you want and select "Set as Target Frame."'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"In-game, step into the first grass tile."}),`
`,e.jsxs(n.li,{children:["Open the game menu with ",e.jsx(n.code,{children:"X"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This prevents your character from fidgeting and messing with the TinyMT timeline."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"Tiny Timeline Tool"})," in the Wild RNG Tab of 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Check the ",e.jsx(n.code,{children:"Consider Delay"})," box and set delay to 6."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"Calibrate"})," next to ",e.jsx(n.code,{children:"Tiny Seeds"})," and wait for it to calibrate."]}),`
`,e.jsxs(n.li,{children:["If the desired TinyMT frames do not overlap with the target frame, step out of the grass and back in, open the menu, then calibrate again.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Repeat until the TinyMT frames align with the target frame."}),`
`,e.jsx(n.li,{children:"To advance TinyMT frames slightly, just turn in place instead of stepping."}),`
`,e.jsx(n.li,{children:"For faster advancement, walk up and down the left side, since steps advance TinyMT frames quickly."}),`
`,e.jsx(n.li,{children:"If you trigger an encounter, walk at least 5 steps after to enable another encounter. Remember this even after a successful RNG."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Hitting the Target Frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["To avoid random TinyMT index advancement (+2), close the menu during your target's index. Pause the game with ",e.jsx(n.code,{children:"Start + Select"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Advance frame by frame by pressing ",e.jsx(n.code,{children:"Select"})," until you're on your target frame."]}),`
`,e.jsx(n.li,{children:"Ensure you're standing on a grass tile while doing this."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Unpause with ",e.jsx(n.code,{children:"A"})," and turn in any direction with the D-Pad to trigger the encounter."]}),`
`,e.jsx(n.li,{children:"Calibrate a delay if needed, but delay of 6 should work for Friend Safari if you turn, and 14 if you step."}),`
`]}),`
`,e.jsx(n.h2,{children:"Reseeding Method"}),`
`,e.jsx(n.p,{children:"Once you can manipulate the TinyMT to reach a target frame, you can look for higher frames. Using NTR Helper and reseeding helps find a target frame faster."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Load XY and connect to NTR Helper within 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"One Click"})," in NTR Helper to connect and grab the initial seed."]}),`
`,e.jsx(n.li,{children:"Directions on how to do this can be found in the NTR Helper Usage link above."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," to reach the continue screen. This is when the seed is set."]}),`
`,e.jsxs(n.li,{children:["Search for frames using that seed. If you find nothing appealing, reseed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"B"})," then ",e.jsx(n.code,{children:"A"})," to back out of the continue menu and return to it."]}),`
`,e.jsx(n.li,{children:"This refreshes the initial seed each time."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Repeat until you find a desirable frame."}),`
`,e.jsx(n.li,{children:"Continue the save, manipulate the TinyMT, and trigger the encounter on the target frame to get the Pokémon you want."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Frames advance twice as fast in a battle, so you can battle to advance many frames, then manipulate the TinyMT. Allow extra time for this in case you miss your target frame while aligning the TinyMT frames.
`})})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{a as default,l as frontmatter};
