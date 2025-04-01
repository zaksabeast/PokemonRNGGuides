import{u as t,j as e}from"./index-R5JkGJWU.js";const l={title:"Finding your initial seed in Gen 7 with clocks",description:"This guide allows you to find your initial seed without using custom firmware.",slug:"retail-usum-initial-seed-clocks",subCategory:"Retail",tag:"retail"};function s(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Video camera (your phone's camera should work)"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"General principle"}),`
`,e.jsxs(n.p,{children:["Each time you boot your game, an ",e.jsx(n.code,{children:"initial seed"})," (also called ",e.jsx(n.code,{children:"seed"}),") is created. This seed is used to RNG abuse wild encounters, events, in-game gifts, etc."]}),`
`,e.jsxs(n.p,{children:[`At the "Continue" screen of the game, before your character picture loads, you can see a clock. By checking the clock needle's position, we can find the initial seed. You need to check between 8 and 10 clocks without restarting the game. You can leave the "Continue" screen by pressing `,e.jsx(n.code,{children:"B"}),"."]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"https://i.imgur.com/2Nh45HB.gif",alt:""})}),`
`,e.jsx(n.h2,{children:"Step 1: Setup 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the 3DSRNGTool you downloaded."}),`
`,e.jsx(n.li,{children:'Select your game version in the top right ("Sun", "Moon", "Ultra Sun", or "Ultra Moon").'}),`
`,e.jsx(n.li,{children:'Go to "Tools" > "Gen 7 Main RNG Tool".'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Ensure the ",e.jsx(n.code,{children:"InputBox"})," has ",e.jsx(n.code,{children:"End Position"})," selected with the number ",e.jsx(n.code,{children:"4"}),"."]}),`
`,e.jsxs(n.li,{children:["Also select the ",e.jsx(n.code,{children:"Find Initial Seed via clock hands"})," option."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Recording the clock needles"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['Boot your 3DS and open the game. Leave it on the "Press Start" screen.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can let the animations play; they do not affect the seed or frames."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Start recording your 3DS with your camera."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," or ",e.jsx(n.code,{children:"Start"}),' to go to the "Continue" screen.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Record the entire clock movement: from when you enter the "Continue" screen until your character picture displays.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"B"}),' to return to the "Press Start" screen.']}),`
`,e.jsx(n.li,{children:'Alternate between the "Press Start" and "Continue" screens until you have 10 clock movements.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Finding the seed"}),`
`,e.jsx(n.p,{children:"After recording 10 clock movements, list them in the tool to find the initial seed."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In the ",e.jsx(n.code,{children:"InputBox"}),", select the clock that matches the final position of each clock.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This End Position occurs just before the picture loads."}),`
`,e.jsx(n.li,{children:"The End Position in the gif shown at the beginning is the last option in the Gen7 Main RNG Tool."}),`
`,e.jsxs(n.li,{children:["You should see a number appear in the ",e.jsx(n.code,{children:"Needle List"})," (12 for the gif demo)."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"The tool tries to find your seed after you input 8 needle positions."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/Initial-Seed/Result.png",alt:"Result"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You may get various results with only 8 needles; this is why we checked 10 clocks. Add the remaining 2 until you see a single seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The last 2 needle positions confirm your seed."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"If you don't get any results, check your video again to find mistakes in the needle positions."}),`
`,e.jsx(n.li,{children:"If you still can't find results, restart the game and record 10 new clocks."}),`
`]}),`
`,e.jsxs(n.p,{children:["Your seed should appear in the ",e.jsx(n.code,{children:"Results"})," field if you did everything correctly."]})]})}function r(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{r as default,l as frontmatter};
