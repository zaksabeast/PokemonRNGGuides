import{u as o,j as e}from"./index-DYtIK9hq.js";const r={title:"How to Use Chatot for Brilliant Diamond and Shining Pearl",navDrawerTitle:"Chatot RNG Tool",description:"How to use the chatot.pokemonrng.com website for RNG in Brilliant Diamond and Shining Pearl.",slug:"bdsp-chatot",category:"Brilliant Diamond and Shining Pearl",isRoughDraft:!0,tag:"any"};function i(n){const t={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"This guide will help you use the Chatot website to set up RNG Abuse in Brilliant Diamond and Shining Pearl."}),`
`,e.jsx(t.h2,{children:"Tools"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"CaptureSight or Luas for Ryujinx/Yuzu set up and ready to go."}),`
`,e.jsxs(t.li,{children:["Visit the Chatot site at ",e.jsx(t.a,{href:"https://chatot.pokemonrng.com/#/bdsp",children:"https://chatot.pokemonrng.com/#/bdsp"}),"."]}),`
`,e.jsx(t.li,{children:"Brilliant Diamond or Shining Pearl with the latest version."}),`
`]}),`
`,e.jsx(t.h2,{children:"Step 1: Using the Website"}),`
`,e.jsx(t.p,{children:"When you open the website, you'll see the wild, stationary, and underground tabs. Select the method you want to use for RNG. Input your data like the delay, min/max advances, etc. You can find more details about filling specific information in dedicated guides and search for specific filters."}),`
`,e.jsx(t.p,{children:"Once everything is set up, you just need the seeds."}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:`If you're using CaptureSight: Launch the game and, at the title screen, open the Tesla Menu. Open CaptureSight and go to "Main RNG." Enter the 4 seeds into the Chatot site. The seeds are in order, so the first seed in CaptureSight is seed 0. This method keeps track of everything safely.`}),`
`,e.jsxs(t.li,{children:["If you're using Luas: Enter the values shown in the Initial Seed section. They appear in the same order as the website. Ensure that the StateSize is set to ",e.jsx(t.code,{children:"u32"}),". If it's in ",e.jsx(t.code,{children:"u64"}),", press ",e.jsx(t.code,{children:"3"})," to switch to the correct mode."]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:"Note: If you lose track of your advances during RNG, relaunch the Tesla Menu and try to freeze the Main RNG at 0 by pressing `A`. If successful, you can input new seeds and keep track again without issues.\n"})}),`
`,e.jsx(t.h2,{children:"Step 2: Generate"}),`
`,e.jsx(t.p,{children:"Once done, hit generate to find out which frame to hit."}),`
`,e.jsxs(t.p,{children:["Press the ",e.jsx(t.code,{children:"D-Up"})," button on the Switch to regain control of the game (press the same button again to control the overlay)."]}),`
`,e.jsx(t.p,{children:"Now you're ready to advance your frames and complete your RNG!"})]})}function a(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{a as default,r as frontmatter};
