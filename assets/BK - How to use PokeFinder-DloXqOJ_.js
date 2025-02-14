import{u as r,j as e}from"./index-DDBrKSsW.js";const s={title:"How to use PokeFinder",description:"How to set up and use PokeFinder for RNG on BDSP",slug:"bdsp-pokefinder",subCategory:"Basic Knowledge",isRoughDraft:!0};function o(n){const t={a:"a",br:"br",code:"code",li:"li",p:"p",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"First, an important note. PokeFinder does not have an official release for BDSP RNG yet. For now, it’s safer to use it only for Egg and TID/SID RNG. Everything will be updated after the official release."}),`
`,e.jsxs(t.p,{children:["Link: ",e.jsx(t.a,{href:"https://ci.appveyor.com/project/Admiral-Fish/pokefinder",children:"https://ci.appveyor.com/project/Admiral-Fish/pokefinder"}),e.jsx(t.br,{}),`
`,"You MUST download a version of PokeFinder after the 6aab415 commit from 12.09.2021. Older builds handled states differently, which may lead to incorrect RNG."]}),`
`,e.jsx(t.p,{children:"PokeFinder is the universal RNG tool. This guide focuses on the Gen 8 tab when you launch it."}),`
`,e.jsx(t.p,{children:'While it’s useful for Eggs, it’s important to set up your profile first. On the main menu, click on "Gen 8 Tools" and then "Profile Manager." Create profiles for BDSP. The TID/SID needed is not the G7/G8 TID. Use Pkhex and hover over the TID/SID info to get the correct numbers.'}),`
`,e.jsxs(t.p,{children:["PokeFinder uses only 2 states. If you use the luats for Yuzu/Ryujinx, 4 states will be displayed by default. Press ",e.jsx(t.code,{children:"6"})," on your keyboard to switch to u32 state display and input values from the Initial Seed section in the same order."]}),`
`,e.jsx(t.p,{children:"CaptureSight uses 4 states. Input the seeds in order:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Seed 0 of PokeFinder = Seed 0 and Seed 1 of CaptureSight."}),`
`,e.jsx(t.li,{children:"Seed 1 of PokeFinder = Seed 2 and Seed 3 of CaptureSight."}),`
`]}),`
`,e.jsx(t.p,{children:'Once the tab opens for your desired RNG, check "Use Delay" and enter the delay matching the values shown in our guides.'}),`
`,e.jsx(t.p,{children:"(Later, we will explain how to use the filters for Stationary and Wild.)"})]})}function a(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{a as default,s as frontmatter};
