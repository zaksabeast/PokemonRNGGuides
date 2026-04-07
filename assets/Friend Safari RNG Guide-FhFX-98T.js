import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BiAAUMAS.js";var n=e(),r={title:`X and Y Friend Safari RNG`,navDrawerTitle:`Friend Safari RNG`,description:`Learn how to RNG shiny 6IV Pokémon from the Friend Safari in X and Y, including Ditto and other rare species.`,slug:`pcalc-xy-friend-safari`,category:`X and Y`,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`A 3DS with PCalc (`,(0,n.jsx)(r.a,{href:`/misc-3ds-installing-pcalc`,children:`PCalc Install Guide`}),`)`]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Required Reading`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen6-TinyMT-Timeline-Calibration`,children:`TinyMT Timeline`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/ntr-helper-usage`,children:`NTR Helper Usage`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Explanation of TinyMT frames within Tiny Timeline Tool`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Main RNG Frame`}),`: Main RNG frame ranges for each TinyMT frame listed. Manipulating the TinyMT timeline makes these frames overlap.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Enctr?`}),`: Determines if there will be an encounter if the character turns or walks into the grass during those TinyMT seeds. The encounter must be under 13 (0-12) for guaranteed encounters.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Sync?`}),`: Determines if nature will be synchronized.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`X`}),` = No, `,(0,n.jsx)(r.code,{children:`O`}),` = Yes.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Slot`}),`: Chooses which slot of Friend Safari will be used for the Pokémon.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Order matches the Friend Safari Pokémon screen from left to right.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`HA`}),`: Determines if Pokémon will have Hidden Ability or not.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`X`}),` = No, `,(0,n.jsx)(r.code,{children:`O`}),` = Yes.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Set up`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Load XY and connect to NTR Helper within 3DSRNGTool.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the Friend Safari you wish to RNG in.`}),`
`,(0,n.jsxs)(r.li,{children:[`Walk to the left side of the area outside the grass and save.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`You can now either do a test run or reset the game to use the reseeding method mentioned later in the guide to find a target frame.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: This guide assumes you already have basic knowledge of how to do Gen 6 RNG. It is recommended to first learn about Gen 6 RNG mechanics by RNGing something simple like eggs.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Manipulating TinyMT`}),`
`,(0,n.jsx)(r.p,{children:`To successfully cause an encounter on your target frame, manipulate the TinyMT with the following method. It’s good to practice manipulating the TinyMT first with test frames.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Choose a test frame as your target frame.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Search for any frame within the `,(0,n.jsx)(r.code,{children:`Wild RNG`}),` Tab of 3DSRNGTool.`]}),`
`,(0,n.jsx)(r.li,{children:`Don't worry about nature if using Sync; this will be handled with TinyMT.`}),`
`,(0,n.jsx)(r.li,{children:`Right-click on the frame you want and select "Set as Target Frame."`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`In-game, step into the first grass tile.`}),`
`,(0,n.jsxs)(r.li,{children:[`Open the game menu with `,(0,n.jsx)(r.code,{children:`X`}),`.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`This prevents your character from fidgeting and messing with the TinyMT timeline.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Click on `,(0,n.jsx)(r.code,{children:`Tiny Timeline Tool`}),` in the Wild RNG Tab of 3DSRNGTool.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Check the `,(0,n.jsx)(r.code,{children:`Consider Delay`}),` box and set delay to 6.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Click on `,(0,n.jsx)(r.code,{children:`Calibrate`}),` next to `,(0,n.jsx)(r.code,{children:`Tiny Seeds`}),` and wait for it to calibrate.`]}),`
`,(0,n.jsxs)(r.li,{children:[`If the desired TinyMT frames do not overlap with the target frame, step out of the grass and back in, open the menu, then calibrate again.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Repeat until the TinyMT frames align with the target frame.`}),`
`,(0,n.jsx)(r.li,{children:`To advance TinyMT frames slightly, just turn in place instead of stepping.`}),`
`,(0,n.jsx)(r.li,{children:`For faster advancement, walk up and down the left side, since steps advance TinyMT frames quickly.`}),`
`,(0,n.jsx)(r.li,{children:`If you trigger an encounter, walk at least 5 steps after to enable another encounter. Remember this even after a successful RNG.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Hitting the Target Frame`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`To avoid random TinyMT index advancement (+2), close the menu during your target's index. Pause the game with `,(0,n.jsx)(r.code,{children:`Start + Select`}),`.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Advance frame by frame by pressing `,(0,n.jsx)(r.code,{children:`Select`}),` until you're on your target frame.`]}),`
`,(0,n.jsx)(r.li,{children:`Ensure you're standing on a grass tile while doing this.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Unpause with `,(0,n.jsx)(r.code,{children:`A`}),` and turn in any direction with the D-Pad to trigger the encounter.`]}),`
`,(0,n.jsx)(r.li,{children:`Calibrate a delay if needed, but delay of 6 should work for Friend Safari if you turn, and 14 if you step.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Reseeding Method`}),`
`,(0,n.jsx)(r.p,{children:`Once you can manipulate the TinyMT to reach a target frame, you can look for higher frames. Using NTR Helper and reseeding helps find a target frame faster.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Load XY and connect to NTR Helper within 3DSRNGTool.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`One Click`}),` in NTR Helper to connect and grab the initial seed.`]}),`
`,(0,n.jsx)(r.li,{children:`Directions on how to do this can be found in the NTR Helper Usage link above.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` to reach the continue screen. This is when the seed is set.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Search for frames using that seed. If you find nothing appealing, reseed.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`B`}),` then `,(0,n.jsx)(r.code,{children:`A`}),` to back out of the continue menu and return to it.`]}),`
`,(0,n.jsx)(r.li,{children:`This refreshes the initial seed each time.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Repeat until you find a desirable frame.`}),`
`,(0,n.jsx)(r.li,{children:`Continue the save, manipulate the TinyMT, and trigger the encounter on the target frame to get the Pokémon you want.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Frames advance twice as fast in a battle, so you can battle to advance many frames, then manipulate the TinyMT. Allow extra time for this in case you miss your target frame while aligning the TinyMT frames.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};