import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-D9rvoGGh.js";var n=e(),r={title:`Ruby and Sapphire Egg RNG`,navDrawerTitle:`Egg RNG`,description:`Learn how to RNG eggs from the Daycare in Ruby and Sapphire for shiny, high-IV Pokémon.`,slug:`emulator-rs-egg`,category:`Ruby and Sapphire`,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`Parent's IVs and their compatibility (ask the daycare man)`}),`
`,(0,n.jsx)(r.li,{children:`TID and SID (if going for shiny)`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`The PID for the egg in Ruby/Sapphire is created in two parts. You'll RNG the first part when the egg is generated and the second part when picking up the egg.`}),`
`,(0,n.jsx)(r.p,{children:`Egg RNG in Ruby/Sapphire can be done with both live and dead battery.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: In Ruby and Sapphire, the Everstone does not work to pass down natures in breeding.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Deposit the Pokémon at the daycare. Make sure the parents aren't holding items. The order of deposit does not matter.`}),`
`,(0,n.jsxs)(r.li,{children:[`Stay in the daycare and take steps until the Lua script displays `,(0,n.jsx)(r.code,{children:`FE`}),` for the step counter. Do this inside the daycare.`]}),`
`,(0,n.jsx)(r.li,{children:`Create a savestate here before continuing.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Egg/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.h2,{children:`PokeFinder Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder and select Gen 3 Egg. Make sure to be on the Ruby/Sapphire tab.`}),`
`,(0,n.jsx)(r.li,{children:`Enter all the information for the parents, including their compatibility.`}),`
`,(0,n.jsx)(r.li,{children:`Choose any min/max for the frame range, but the max Frame Held must be lower than the min Pickup Frame.`}),`
`,(0,n.jsxs)(r.li,{children:[`Enter your initial seed from the Lua script and find a spread. For a dead battery, the initial seed will be `,(0,n.jsx)(r.code,{children:`5A0`}),` for Ruby/Sapphire.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Egg/Initial-Seed.png`,alt:`Initial Seed`})}),`
`,(0,n.jsxs)(r.ol,{start:`5`,children:[`
`,(0,n.jsx)(r.li,{children:`Once you have a target frame, note that you need to hit two different frames.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Held Frame RNG`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Take one step at the right frame to generate an egg. Use `,(0,n.jsx)(r.code,{children:`CTRL + N`}),` to advance frames one by one while paused. Once on the target frame, hold the directional button and unpause the emulator. For PokeFinder, subtract 18 from the target frame and take the step on that frame. If no egg is generated, check your entries and try a delay of 17 or 19.`]}),`
`,(0,n.jsx)(r.li,{children:`After the step, the second half of your PID should display on the screen with the script. If it matches, continue. If not, restart the emulator or try the next Frame Held.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Egg/Held.png`,alt:`Held Frame`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsx)(r.li,{children:`You have finished the Held Frame RNG. Now, it's time for the Pickup Frame RNG.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Pickup Frame RNG`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Create a savestate in case you miss the chance to press `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Go outside, talk to the old man and accept the egg. Pause the emulator at the last dialogue ("Take good care of it.").`}),`
`,(0,n.jsxs)(r.li,{children:[`Advance to the target frame, pause, hold `,(0,n.jsx)(r.code,{children:`A`}),`, and unpause. For the Pickup Frame, the delay will be 3. If the egg does not have the correct PID, try a delay of 2 or 4.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`You should have the second part of the PID for your egg, resulting in a successful RNG.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Egg/Success.png`,alt:`Success`})}),`
`,(0,n.jsx)(r.p,{children:`If it doesn't match, recheck the whole process, and feel free to use savestates.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};