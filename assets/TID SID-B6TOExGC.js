import{q as s,j as e}from"./index-CNAPx3nD.js";const r={title:"Diamond, Pearl, and Platinum TID/SID RNG",navDrawerTitle:"TID/SID RNG",description:"Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Diamond, Pearl, and Platinum.",slug:"emulator-dppt-tid-sid",category:"Diamond, Pearl, and Platinum",isRoughDraft:!1,tag:"emu"};function i(t){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Choosing your ID to hit"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`Go to the Gen 4 tab and select "ID's".`}),`
`,e.jsx(n.li,{children:"Under Filters, select TID and enter any 5-digit number you want."}),`
`,e.jsx(n.li,{children:"Update your delay to be at least 5000."}),`
`,e.jsx(n.li,{children:"Choose a TID and SID combo that you like."}),`
`,e.jsx(n.li,{children:'Right click on the chosen option and select "Generate time for seed".'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/pkfinder-ID-search.png",alt:"pk-finder-id-boxes"})}),`
`,e.jsx(n.h2,{children:"Step 2: Setup RunAsDate"}),`
`,e.jsxs(n.p,{children:["Follow the instructions found in ",e.jsx(n.a,{href:"//dppt-initial-seed",children:"Initial Seed RNG"})," up until hitting target seed."]}),`
`,e.jsx(n.h2,{children:"Step 3: Hit delay"}),`
`,e.jsx(n.p,{children:"Now that you have set up run as date and started your game, you will want to get through the opening sequence as fast as possible."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: When naming your character, you will be changing your delay between even and odds if you use Capital letters or add symbols to your name. Keep this in mind, if you need to redo this step.
`})}),`
`,e.jsxs(n.p,{children:["Once you have gotten to this screen below, press ",e.jsx(n.code,{children:"N"})," and make a save state here. then slowly get to you target delay and hold ",e.jsx(n.code,{children:"A"})," as you press ",e.jsx(n.code,{children:"CTRL + P"}),"."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Platinum"}),e.jsx(n.th,{children:"Diamond and Pearl"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/pt-last-screen-tid.png",alt:"pt-last-screen"})}),e.jsx(n.td,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/DP-last-screen-tid.png",alt:"dp-last-screen"})})]})})]}),`
`,e.jsx(n.p,{children:"You will most likely have gotten the wrong TID. Enter the TID you did get in seed finder like below:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/hit-tid-pkfinder-ex.png",alt:"hit-tid"})}),`
`,e.jsx(n.p,{children:"In this example, I hit 46 early. Go back to your save state and then hit your delay but adjust for the delay you experienced."}),`
`,e.jsx(n.p,{children:"Congrats! You should now have your target ID."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If you experience issues with the delay swapping from even and odd, you can go up or down a year on the date pokefinder gives you to swap as well."}),`
`,e.jsx(n.li,{children:"The PID option is a useful filter option, if you want to tie this RNG into RNG'ing your starter as you can get a good stat spread to be shiny that has a good delay."}),`
`,e.jsxs(n.li,{children:[`or you could use a cute charm PID to go do a cute charm RNG next!
`,e.jsx(n.a,{href:"/emulator-dppt-cute-charm",children:"Cute Charm RNG guide"})]}),`
`]})]})}function o(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,r as frontmatter};
