import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-xhnL4jIs.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon finding your initial seed with clocks`,navDrawerTitle:`Find Initial Seed`,description:`Learn how to find your initial seed in Ultra Sun and Ultra Moon using clock patterns — no custom firmware required.`,slug:`retail-usum-initial-seed-clocks`,category:`Ultra Sun and Ultra Moon`,section:`rng_technique`,variant:`retail`},{title:`Sun and Moon finding your initial seed in with clocks`,navDrawerTitle:`Find Initial Seed`,description:`Learn how to find your initial seed in Sun and Moon using clock patterns — no custom firmware required.`,slug:`retail-sm-initial-seed-clocks`,category:`Sun and Moon`,section:`rng_technique`,variant:`retail`,canonical:`retail-usum-initial-seed-clocks`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Video camera (your phone's camera should work)`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`General principle`}),`
`,(0,n.jsxs)(r.p,{children:[`Each time you boot your game, an `,(0,n.jsx)(r.code,{children:`initial seed`}),` (also called `,(0,n.jsx)(r.code,{children:`seed`}),`) is created. This seed is used to RNG abuse wild encounters, events, in-game gifts, etc.`]}),`
`,(0,n.jsxs)(r.p,{children:[`At the "Continue" screen of the game, before your character picture loads, you can see a clock. By checking the clock needle's position, we can find the initial seed. You need to check between 8 and 10 clocks without restarting the game. You can leave the "Continue" screen by pressing `,(0,n.jsx)(r.code,{children:`B`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Initial-Seed/ClockNeedles.gif`,alt:`Clocks Needles`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Setup 3DSRNGTool`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open the 3DSRNGTool you downloaded.`}),`
`,(0,n.jsx)(r.li,{children:`Select your game version in the top right ("Sun", "Moon", "Ultra Sun", or "Ultra Moon").`}),`
`,(0,n.jsx)(r.li,{children:`Go to "Tools" > "Gen 7 Main RNG Tool".`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Initial-Seed/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsxs)(r.ol,{start:`4`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Ensure the `,(0,n.jsx)(r.code,{children:`InputBox`}),` has `,(0,n.jsx)(r.code,{children:`End Position`}),` selected with the number `,(0,n.jsx)(r.code,{children:`4`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Also select the `,(0,n.jsx)(r.code,{children:`Find Initial Seed via clock hands`}),` option.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Recording the clock needles`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Boot your 3DS and open the game. Leave it on the "Press Start" screen.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`You can let the animations play; they do not affect the seed or frames.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Start recording your 3DS with your camera.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` or `,(0,n.jsx)(r.code,{children:`Start`}),` to go to the "Continue" screen.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Record the entire clock movement: from when you enter the "Continue" screen until your character picture displays.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`B`}),` to return to the "Press Start" screen.`]}),`
`,(0,n.jsx)(r.li,{children:`Alternate between the "Press Start" and "Continue" screens until you have 10 clock movements.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Finding the seed`}),`
`,(0,n.jsx)(r.p,{children:`After recording 10 clock movements, list them in the tool to find the initial seed.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`In the `,(0,n.jsx)(r.code,{children:`InputBox`}),`, select the clock that matches the final position of each clock.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`This End Position occurs just before the picture loads.`}),`
`,(0,n.jsx)(r.li,{children:`The End Position in the gif shown at the beginning is the last option in the Gen7 Main RNG Tool.`}),`
`,(0,n.jsxs)(r.li,{children:[`You should see a number appear in the `,(0,n.jsx)(r.code,{children:`Needle List`}),` (12 for the gif demo).`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`The tool tries to find your seed after you input 8 needle positions.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Initial-Seed/Result.png`,alt:`Result`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`You may get various results with only 8 needles; this is why we checked 10 clocks. Add the remaining 2 until you see a single seed.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The last 2 needle positions confirm your seed.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`If you don't get any results, check your video again to find mistakes in the needle positions.`}),`
`,(0,n.jsx)(r.li,{children:`If you still can't find results, restart the game and record 10 new clocks.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Your seed should appear in the `,(0,n.jsx)(r.code,{children:`Results`}),` field if you did everything correctly.`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};