import{u as l,j as e}from"./index-DcbTsy5O.js";const c={title:"Celebi",description:"How to get a shiny Fairy",slug:"gen2-celebi",subCategory:"Emulator"};function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",pre:"pre",strong:"strong",ul:"ul",...l(),...t.components},{Alert:o,Gen2StarterRng:s}=n;return o||r("Alert"),s||r("Gen2StarterRng"),e.jsxs(e.Fragment,{children:[e.jsx(o,{showIcon:!0,type:"warning",message:"Highly experimental!",description:"Gen 2 RNG is still in its early days. Expect to need multiple attempts!"}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/install-pokereader",children:"PokeReader"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Written guide"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Save in front of the Celebi shrine, in case you need to reset the game."}),`
`,e.jsxs(n.li,{children:['Press "A" to interact with the shrine and stop when you see ',e.jsx(n.code,{children:"Player put in the GS Ball."}),"."]}),`
`,e.jsxs(n.li,{children:["Go into PokeReader's RNG screen and wait until it stops saying ",e.jsx(n.code,{children:"Finding ADIV Index"})," and ",e.jsx(n.code,{children:"Finding SDIV Index"}),"."]}),`
`,e.jsxs(n.li,{children:["Pause PokeReader with ",e.jsx(n.code,{children:"L + R"}),"."]}),`
`,e.jsxs(n.li,{children:["Type the information on PokeReader into the RNG Tool below and press ",e.jsx(n.code,{children:"Generate"}),"."]}),`
`,e.jsxs(n.li,{children:["Advance the game with ",e.jsx(n.code,{children:"L"})," until PokeReader's ",e.jsx(n.code,{children:"Advance"})," number matches one of the generated ",e.jsx(n.code,{children:"Advance"})," columns below."]}),`
`,e.jsx(n.li,{children:"(Optional) Create a save state if you're on an emulator, in case you need to reset."}),`
`,e.jsxs(n.li,{children:["When you land on your desired advance, press ",e.jsx(n.code,{children:"A"})," to accept the Pokemon. ",e.jsx(n.strong,{children:"Do not press anything else until you see Celebi!"})]}),`
`,e.jsx(n.li,{children:"If you got your Pokemon, congrats! If not, keep trying!"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This is less stable than starters!  Expect it to take longer!
`})}),`
`,e.jsx(n.h2,{children:"RNG Tool"}),`
`,e.jsx(s,{type:"celebi"})]})}function a(t={}){const{wrapper:n}={...l(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}function r(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,c as frontmatter};
