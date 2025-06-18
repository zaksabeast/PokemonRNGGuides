import{q as i,j as e}from"./index-DcEfuLT1.js";const s={title:"HeartGold and Soulsilver Egg RNG",navDrawerTitle:"Egg RNG",description:"Breeding RNG",slug:"emulator-hgss-breeding",category:"HeartGold and SoulSilver",isRoughDraft:!0,tag:"emu"};function r(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"What You Need"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"RNG Reporter (I didn't try with Finder yet)"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:"Lua Script (link pending)"}),`
`]}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsx(n.p,{children:"Avoid items on parents."}),`
`,e.jsx(n.p,{children:"Put the parents in the daycare, track their IVs, and save."}),`
`,e.jsx(n.h2,{children:"PID Part"}),`
`,e.jsx(n.p,{children:"Open the 4th gen time finder and select Shiny Egg."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Enter all required data. Use international parents for Masuda Method."}),`
`,e.jsx(n.li,{children:"Set min delay to 600. Max delay is up to you."}),`
`,e.jsx(n.li,{children:"Generate a list."}),`
`]}),`
`,e.jsx(n.p,{children:"It's easier to take Frame 1 here, as advancements vary. If you choose a higher shiny egg frame, note these ways to advance it:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Calling Joey increases it by 2."}),`
`,e.jsx(n.li,{children:"Discarding an egg increases it by 1."}),`
`]}),`
`,e.jsx(n.p,{children:"Once you choose your target frame, hit your frame (link to hitting an initial frame), then enter the game and move until the egg is ready to be generated. After that, save your game."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If you want to be sure, create a save state, take the egg, verify it with PKHeX, and reload the state.
`})}),`
`,e.jsx(n.h2,{children:"IVs Part"}),`
`,e.jsx(n.p,{children:"This part is more classic."}),`
`,e.jsx(n.p,{children:"In the 4th gen time finder, select IVs Egg."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Input the IVs of the parents: Parent A is the first parent, Parent B is the second parent."}),`
`,e.jsx(n.li,{children:"Input desired IVs and the delay/frame range."}),`
`,e.jsx(n.li,{children:"Generate a list and select your target frame."}),`
`,e.jsx(n.li,{children:"Right-click to generate times."}),`
`]}),`
`,e.jsx(n.p,{children:"Hit your initial seed, advance frames in the usual way (Chatot, radio, NPCs if you prefer risky methods), and take your frame."}),`
`,e.jsx(n.p,{children:"Congrats! You're done!"})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{l as default,s as frontmatter};
