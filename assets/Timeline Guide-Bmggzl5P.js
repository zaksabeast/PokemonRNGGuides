import{u as r,j as e}from"./index-Dz3fli10.js";const s={title:"Timeline Guide",description:"Key skill for Gen 7 RNG with custom firmware",slug:"retail-usum-timeline",subCategory:"Custom Firmware"};function t(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with installed PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setting Up 3DSRNGTool"}),`
`,e.jsx(n.p,{children:"Only create a timeline if there are one or more NPCs in your area. If you have 0 NPCs, you don't need a timeline."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Enter your game version and TSV (",e.jsx(n.code,{children:"Start + Up"})," in PCalc will reveal TSV in the Game View window)."]}),`
`,e.jsxs(n.li,{children:["Input the initial seed, found in the Game View window under ",e.jsx(n.code,{children:"Init Seed:"}),"."]}),`
`,e.jsx(n.li,{children:"If you have the Shiny Charm, check the Shiny Charm box."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: In Gen 7 games, NPCs affect the RNG frames. As a rule, each NPC advances the frame by one. Therefore, an area with four NPCs typically progresses five frames each time. Things like Rotom or character blinks also have an effect. Accurate predictions can be achieved if the timeline is correctly created, ensuring you don't miss your target frame due to NPCs.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Timeline Creation"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Enable “Safe F Only” in 3DSRNGTool."}),`
`,e.jsxs(n.li,{children:["Enter the count of NPCs for the area. Confirm this count with PCalc.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"Start + Up"})," to view the NPC counter. It may need resetting via the same button combination and then displayed again. Let it run for about 30 seconds to a minute for accurate calibration."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["In the game, go advance to the Pokémon's final screen you are RNGing for. Input the current frame in the frame range, visible in PCalc Game Info window (",e.jsx(n.code,{children:"Start + Up"}),") and pause with ",e.jsx(n.code,{children:"Start + Select"}),"."]}),`
`,e.jsx(n.li,{children:'Click "Calculate", then advance to any listed frames with a "-" in the Mark column. These are "Safe Frames", useful for accurate frame landing predictions.'}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Start"})," to advance frames by unpausing the game. You can then pause again with ",e.jsx(n.code,{children:"Start + Select"})," when close to your frame and slowly advance with ",e.jsx(n.code,{children:"Select"})," button while paused."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Timeline and NPC Number Confirmation"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'After reaching any safe frame, input your current frame into 3DSRNGTool, then enable “Create Timeline” and click "Calculate".'}),`
`,e.jsxs(n.li,{children:["Advance several times by pressing ",e.jsx(n.code,{children:"Select"})," and compare with the subsequent frames in 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If they match, the NPC count is correct."}),`
`,e.jsx(n.li,{children:"If they do not match, recreate your timeline."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Errors in making the timeline are typically discovered at this point. Verify the initial seed and ensure PCalc's NPC counter hasn't changed during timeline creation."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Do not adjust filters during timeline creation. Only "Safe F Only" box should have been activated by this point. If any other filter has been adjusted, start again from the beginning.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Retest the timeline occasionally for lengthy wait times, ensuring the NPC number hasn't shifted. Not all NPCs affect the RNG simultaneously, hence waiting for 30 seconds to a minute for accurate NPC count calibration is recommended. Testing the timeline again after a few minutes ensures no time is wasted waiting for an unattainable frame due to fluctuating NPCs.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Check if your desired frame is still within the timeline by redoing the timeline with your current frame, then searching for your target. If it doesn't appear in the results, your timeline has shifted.
`})})]})}function l(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{l as default,s as frontmatter};
