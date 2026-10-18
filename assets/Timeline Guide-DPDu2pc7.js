import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-CJDwoe_J.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon Timeline RNG`,navDrawerTitle:`Timeline RNG`,description:`Learn how to create a timeline in Ultra Sun and Ultra Moon.`,slug:`retail-usum-timeline`,category:`Ultra Sun and Ultra Moon`,section:`rng_technique`,variant:`cfw-emu`},{title:`Sun and Moon Timeline RNG`,navDrawerTitle:`Timeline RNG`,description:`Learn how to create a timeline in Sun and Moon.`,slug:`retail-sm-timeline`,category:`Sun and Moon`,section:`rng_technique`,variant:`cfw-emu`,canonical:`retail-usum-timeline`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{Gen7TimelineFinder:i}=r;return i||o(`Gen7TimelineFinder`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`What is a Timeline?`}),`
`,(0,n.jsx)(r.p,{children:`NPCs use RNG advances when they blink. Each video frame, every NPC on screen may use an advance, so the RNG doesn't move forward one advance at a time. Only some advances can be landed on. The advances you can land on are your timeline.`}),`
`,(0,n.jsx)(r.p,{children:`To know which timeline you're on, you need to land on a safe advance. A safe advance is one where no NPC is blinking, so every future blink can be predicted.`}),`
`,(0,n.jsx)(r.p,{children:`Only use a timeline if there are one or more NPCs in your area. If you have no NPCs, you don't need a timeline.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Create a Timeline`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Follow the appropriate guide for finding a target advance (3DSRNGTool's "frames").`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`You should be at the part of the guide that has you generate a timeline.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Pause the game with `,(0,n.jsx)(r.code,{children:`Start + Select`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`In PokeReader, note your initial seed, current advance, and NPC count.`}),`
`,(0,n.jsx)(r.li,{children:`Enter your values below and click "Find Safe Advances".`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Select`}),` to step one video frame at a time until you land exactly on one of the listed safe advances, then click it.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Keep stepping and compare your advances to the ones shown.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If they match, you're on the right timeline.`}),`
`,(0,n.jsx)(r.li,{children:`If they don't match, check your initial seed and NPC count, then try again.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Press A on Your Target`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`If the tool says your target isn't on this timeline, pick another target in 3DSRNGTool, then repeat starting from Step 1.3.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Start`}),` to unpause. Use the tool's "Time" as a guide, and pause again with `,(0,n.jsx)(r.code,{children:`Start + Select`}),` when you're close to the Timeline Leap advance.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Select`}),` to step one video frame at a time until you reach the Timeline Leap advance.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` on the Timeline Leap advance.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use the tool's "Time after leap" as a guide, and pause again with `,(0,n.jsx)(r.code,{children:`Start + Select`}),` when you're close to your target.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Select`}),` to step one video frame at a time until you reach your target advance.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` on your target advance.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`wwwwwwzx for `,(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool`,children:`3DSRNGTool`}),`, which some of this tool's logic is based on.`]}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};