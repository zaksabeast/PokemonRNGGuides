import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CRE-SdEk.js";var n=e(),r={title:`FireRed and LeafGreen Egg RNG`,navDrawerTitle:`Egg RNG`,description:`Learn how to RNG eggs in Pokémon FireRed and LeafGreen for perfect IVs, natures, and shinies.`,slug:`emulator-frlg-egg`,category:`FireRed and LeafGreen`,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA with lua scripts`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`Parent's IVs and compatibility (talk to the daycare man)`}),`
`,(0,n.jsx)(r.li,{children:`TID and SID (if going for shiny)`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`The egg's PID in FRLG is generated in two parts. The first part is set when the egg is generated, and the second part is set when picking it up.`}),`
`,(0,n.jsx)(r.h2,{children:`Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Deposit both parents at the daycare. The order doesn't matter.`}),`
`,(0,n.jsxs)(r.li,{children:[`Stay inside and take steps until the Lua script displays `,(0,n.jsx)(r.code,{children:`FE`}),` for the step counter. Do this inside the daycare.`]}),`
`,(0,n.jsx)(r.li,{children:`Create a savestate before continuing.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.h2,{children:`PokeFinder Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder and go to Gen 3 Egg. Select the Fire Red/Leaf Green tab.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the parents' info, including compatibility.`}),`
`,(0,n.jsx)(r.li,{children:`Set a frame range. The max for Frame Held must be lower than the min for Pickup Frame.`}),`
`,(0,n.jsx)(r.li,{children:`Find your initial seed from the Lua script, enter it, and search for a spread.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Initial-Seed.png`,alt:`Initial Seed`})}),`
`,(0,n.jsxs)(r.ol,{start:`5`,children:[`
`,(0,n.jsx)(r.li,{children:`You'll need to hit two different frames.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Held Frame RNG`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Take one step at the right frame to generate an egg. Use `,(0,n.jsx)(r.code,{children:`CTRL + N`}),` to advance frames while paused. When on the target frame, hold a directional button and unpause.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`In PokeFinder, subtract 18 from the target frame and step on that frame.`}),`
`,(0,n.jsx)(r.li,{children:`If no egg appears, double-check your inputs. If correct, try a delay of 17 or 19.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`After stepping, the Lua script will show the second half of the PID. If it matches, continue. If not, restart and try again.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Held.png`,alt:`Held Frame`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsx)(r.li,{children:`Held Frame RNG is done. Now for Pickup Frame RNG.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Pickup Frame RNG`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Create a savestate to avoid missing the `,(0,n.jsx)(r.code,{children:`A`}),` press.`]}),`
`,(0,n.jsx)(r.li,{children:`Exit, talk to the old man, and accept the egg. Pause at the last dialogue ("Take good care of it.").`}),`
`,(0,n.jsxs)(r.li,{children:[`Advance to the target frame, pause, hold `,(0,n.jsx)(r.code,{children:`A`}),`, and unpause.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The Pickup Frame delay is 3. If incorrect, try 2 or 4.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`If successful, your egg's second PID half should match.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Success.png`,alt:`Success`})}),`
`,(0,n.jsx)(r.p,{children:`If it doesn't match, recheck your steps and use savestates.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};