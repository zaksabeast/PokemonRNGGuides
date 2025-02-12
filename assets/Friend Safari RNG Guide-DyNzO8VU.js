import{u as s,j as e}from"./index-NUjML0_o.js";const o={title:"Friend Safari RNG",description:"Get shiny 6IV friend safari Pokemon, like Ditto!",slug:"pcalc-xy-friend-safari",subCategory:"Custom Firmware"};function t(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Required Reading"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen6-TinyMT-Timeline-Calibration",children:"TinyMT Timeline"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/ntr-helper-usage",children:"NTR Helper Usage"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Explanation of TinyMT frames within Tiny Timeline Tool"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Main RNG Frame"}),": The main RNG frame ranges that correspond to each TinyMT frame that is listed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Through manipulation of the TinyMT timeline, you can make the TinyMT frames overlap with different main RNG frames."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Enctr?"}),": Determines if there will be an encounter or not if the character turns or walks into the grass during those TinyMT seeds. It's the most important factor for this RNG.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Encounter must be under 13 (0-12) since this will guarantee an encounter every time."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sync?"}),": Determines if nature will be Synchronized or not.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"X"})," = No ",e.jsx(n.code,{children:"O"})," = Yes"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Slot"}),": Determines which slot of Friend Safari will be chosen for the Pokemon that appears.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Order is same order as shown in Friend Safari Pokemon screen from left to right before entering the specific safari."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HA"}),": Determines if Pokemon will have HA or not.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"X"})," = No ",e.jsx(n.code,{children:"O"})," = Yes"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set up"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load up XY and connect to NTR Helper within 3DSRNGTool."}),`
`,e.jsx(n.li,{children:"Enter the Friend Safari you wish to RNG in."}),`
`,e.jsxs(n.li,{children:["Walk to the left side of the area outside of the grass and save.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can now either choose to do a test run, or reset game to do the reseeding method mentioned further in the guide to find a target frame."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide assumes you already have basic knowledge of how to do Gen 6 RNG. Otherwise it is recommended to first familiarize yourself with Gen 6 RNG mechanics by RNGing something simple like eggs.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Manipulating TinyMT"}),`
`,e.jsx(n.p,{children:"The key to successfully causing an encounter on your target frame is manipulating the TinyMT using the method below. It is suggested to practice manipulating the TinyMT first for test frames to get an idea for how it all works."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Choose a test frame to be your target frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can do this by searching for any frame you want within the ",e.jsx(n.code,{children:"Wild RNG"})," Tab of 3DSRNGTool."]}),`
`,e.jsx(n.li,{children:"Do not worry about nature if using Sync as this will be done with TinyMT."}),`
`,e.jsx(n.li,{children:'Right click on the frame you want and click "Set as Target Frame".'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Ingame, take a step into the first grass tile."}),`
`,e.jsxs(n.li,{children:["Open the game menu with ",e.jsx(n.code,{children:"X"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is necessary to prevent your character from fidgetting and messing with the TinyMT timeline."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"Tiny Timeline Tool"})," within the Wild RNG Tab of 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Make sure the ",e.jsx(n.code,{children:"Consider Delay"})," box is checked and delay is 6."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Click on ",e.jsx(n.code,{children:"Calibrate"})," by the ",e.jsx(n.code,{children:"Tiny Seeds"})," and wait for it to calibrate for you."]}),`
`,e.jsxs(n.li,{children:["If the TinyMT frames you want do not overlap with the target frame, take a step out of the grass and then back into the grass, open menu, then calibrate like before.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Repeat as needed until the TinyMT frames you want line up with the target frame."}),`
`,e.jsx(n.li,{children:"To advance the TinyMT frames a smaller amount you can just turn in place once instead of taking steps."}),`
`,e.jsx(n.li,{children:"To advance frames faster you can walk up and down the left side of the area since steps advance TinyMT frames the fastest."}),`
`,e.jsx(n.li,{children:"If you accidentally trigger an encounter, afterwards walk at least 5 steps or else you won't be able to trigger another encounter when you want to. Don't forget to do that even if you did a successful RNG and that you want to do another one right after."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Hitting the Target Frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["To avoid a random TinyMT index advancement (+2), you must close the menu during your target's index. Once done, pause the game with ",e.jsx(n.code,{children:"Start + Select"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Advance frame by frame by pressing ",e.jsx(n.code,{children:"Select"})," until you are on your target frame."]}),`
`,e.jsx(n.li,{children:"Make sure you are standing in a grass tile while doing this."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["At the same time, unpause with ",e.jsx(n.code,{children:"A"})," and turn in any direction with the D-Pad to trigger the encounter."]}),`
`,e.jsx(n.li,{children:"Calibrate a delay if needed, although delay of 6 should work for Friend Safari if you do a turn, and 14 if you do a step."}),`
`]}),`
`,e.jsx(n.h2,{children:"Reseeding Method"}),`
`,e.jsx(n.p,{children:"Once you have the hang of manipulating the TinyMT to correspond to a target frame, then you can go for higher frames. Using NTR Helper and reseeding you can search for a target frame faster."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Load up XY and connect to NTR Helper within 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"One Click"})," in NTR Helper to connect and grab the initial seed."]}),`
`,e.jsx(n.li,{children:"Directions for how to do this can be found in the NTR Helper Usage link above."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," to get to the continue screen. This is when the seed is determined."]}),`
`,e.jsxs(n.li,{children:["Search for frames using that seed, and if nothing you like comes up then reseed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can do this by pressing ",e.jsx(n.code,{children:"B"})," then ",e.jsx(n.code,{children:"A"})," to back out of the continue menu and go back into it."]}),`
`,e.jsx(n.li,{children:"This gives a new initial seed each time."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Repeat the process until you find a frame you like."}),`
`,e.jsx(n.li,{children:"Choose to continue the save, manipulate the TinyMT, and trigger the encounter on the target frame to get the Pokemon you wanted."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Frames advance twice as fast in a battle, so you can use a battle to advance a lot of frames and then manipulate the TinyMT. Be careful to allow a lot of time to do so in case you miss your target frame while trying to line up the TinyMT frames.
`})})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{a as default,o as frontmatter};
