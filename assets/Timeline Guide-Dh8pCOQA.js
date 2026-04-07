import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DzYB2I0T.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon Timeline RNG`,navDrawerTitle:`Timeline RNG`,description:`Learn how to create a timeline in Ultra Sun and Ultra Moon.`,slug:`retail-usum-timeline`,category:`Ultra Sun and Ultra Moon`,section:`rng_technique`,variant:`cfw-emu`},{title:`Sun and Moon Timeline RNG`,navDrawerTitle:`Timeline RNG`,description:`Learn how to create a timeline in Sun and Moon.`,slug:`retail-sm-timeline`,category:`Sun and Moon`,section:`rng_technique`,variant:`cfw-emu`,canonical:`retail-usum-timeline`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Setting Up 3DSRNGTool`}),`
`,(0,n.jsx)(r.p,{children:`Only create a timeline if there are one or more NPCs in your area. If you have 0 NPCs, you don't need a timeline.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Enter your game version and TSV.`}),`
`,(0,n.jsxs)(r.li,{children:[`Input the initial seed, found in the main RNG view under `,(0,n.jsx)(r.code,{children:`Init Seed:`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`If you have the Shiny Charm, check the Shiny Charm box.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: In Gen 7 games, NPCs affect the RNG frames. Usually each NPC advances the frame by one. Therefore, an area with four NPCs typically progresses five frames each time. Things like Rotom or character blinks also have an effect. Accurate predictions can be achieved if the timeline is correctly created, ensuring you don't miss your target frame due to NPCs.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Timeline Creation`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Enable “Safe F Only” in 3DSRNGTool.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the count of NPCs for the area. Confirm this count with PokeReader.`}),`
`,(0,n.jsx)(r.li,{children:`In the game, advance to the Pokémon's final screen you are RNGing for. Input the current frame in the frame range.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Calculate", then advance to any listed frames with a "-" in the Mark column. These are "Safe Frames", useful for accurate frame landing predictions.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Start`}),` to advance frames by unpausing the game. You can then pause again with `,(0,n.jsx)(r.code,{children:`Start + Select`}),` when close to your frame and slowly advance with `,(0,n.jsx)(r.code,{children:`Select`}),` button while paused.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Timeline and NPC Number Confirmation`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`After reaching any safe frame, input your current frame into 3DSRNGTool, then enable “Create Timeline” and click "Calculate".`}),`
`,(0,n.jsxs)(r.li,{children:[`Advance several times by pressing `,(0,n.jsx)(r.code,{children:`Select`}),` and compare with the subsequent frames in 3DSRNGTool.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If they match, the NPC count is correct.`}),`
`,(0,n.jsx)(r.li,{children:`If they do not match, recreate your timeline.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Errors in making the timeline are typically discovered at this point. Verify the initial seed and ensure PokeReader's NPC counter hasn't changed during timeline creation.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Do not adjust filters during timeline creation. Only "Safe F Only" box should have been activated by this point. If any other filter has been adjusted, start again from the beginning.
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Check if your desired frame is still within the timeline by redoing the timeline with your current frame, then searching for your target. If it doesn't appear in the results, your timeline has shifted.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};