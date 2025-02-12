import{u as o,j as e}from"./index-NUjML0_o.js";const l={title:"Finding your initial seed in Gen 7 with clocks",description:"This guide allows you to find your initial seed without using Custom Firmware",slug:"retail-usum-initial-seed-clocks",subCategory:"Retail"};function t(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Video camera (your phone's camera should do)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Optional but it is very handy."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"General principle"}),`
`,e.jsxs(n.p,{children:["Each time you boot up your game, an ",e.jsx(n.code,{children:"initial seed"})," (also called ",e.jsx(n.code,{children:"seed"})," throughout this guide) is created. This seed can then be used to RNG abuse wild encounters, events, in-game gifts, etc."]}),`
`,e.jsx(n.p,{children:'At the "Continue" screen of the game, before your character picture loads, you can see a clock. Thanks to the clock needles position, we are going to be able to find our initial seed. The idea is to check a certain number of clocks (between 8 and 10), without restarting the game, in order to get the seed value.'}),`
`,e.jsxs(n.p,{children:['Since each seed is generated when you launch the game, checking the clocks needs to be done without restarting the game. You can simply leave the "Continue" screen by pressing ',e.jsx(n.strong,{children:"B"}),"."]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"https://i.imgur.com/2Nh45HB.gif",alt:""})}),`
`,e.jsx(n.h2,{children:"Step 1: Setup 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the 3DSRNGTool you downloaded."}),`
`,e.jsx(n.li,{children:'Select your game version on the top right. ("Sun", "Moon", "Ultra Sun" or "Ultra Moon").'}),`
`,e.jsx(n.li,{children:'Go to "Tools" > "Gen 7 Main RNG Tool". It looks like the following picture.'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/UltraSun-UltraMoon/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Make sure that in the ",e.jsx(n.code,{children:"InputBox"})," you have the option ",e.jsx(n.code,{children:"End Position"})," selected with the number ",e.jsx(n.code,{children:"4"}),"."]}),`
`,e.jsxs(n.li,{children:["Select the ",e.jsx(n.code,{children:"Find Initial Seed via clock hands"})," option as well."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Recording the clock needles"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['Boot your 3DS and open the game. Leave it on the "Press Start" screen.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can leave the animations playing, they do not influence the seed (or the frames)."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Start recording your 3DS with your camera."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.strong,{children:"A"})," or ",e.jsx(n.strong,{children:"Start"}),' to go into the "Continue" screen.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Make sure you recorded the whole clock movement: from the moment you enter the "Continue" screen, until your character picture is displayed.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.strong,{children:"B"}),' to go back to the "Press Start" screen.']}),`
`,e.jsx(n.li,{children:'Repeat this process of alternating between the "Press Start" and the "Continue" screen until you get 10 clock movements.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Finding the seed"}),`
`,e.jsx(n.p,{children:"Once you have recorded the 10 clock movements we need to list them in the tool to get the initial seed."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In the ",e.jsx(n.code,{children:"InputBox"})," select the clock that corresponds to the final position of each clock.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This End Position occurs right before the picture loads."}),`
`,e.jsx(n.li,{children:"The End Position of the gif showed at the beginning is last option of the Gen7 Main RNG Tool."}),`
`,e.jsxs(n.li,{children:["You will see a number appear in the ",e.jsx(n.code,{children:"Needle List"})," of the tool (12 for the gif demo)."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"The tool will try to find your seed after you have input 8 Needle positions."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/UltraSun-UltraMoon/Initial-Seed/Result.png",alt:"Result"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Sometimes you will get various results with only 8 Needles, that is why we checked 10 clocks. Enter the remaining 2 until you see a single seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The last 2 Needle positions are also useful to confirm your seed."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"If you do not have any results try checking your video again and see where you made a mistake on the Needle positions."}),`
`,e.jsx(n.li,{children:"If you still do not find any results, restart the game and try again recording 10 new clocks."}),`
`]}),`
`,e.jsxs(n.p,{children:["Your seed should appear in the ",e.jsx(n.code,{children:"Results"})," field if you did everything correctly."]})]})}function r(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{r as default,l as frontmatter};
