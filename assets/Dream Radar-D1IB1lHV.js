import{u as a,j as e}from"./index-DtinywFa.js";const s={title:"Dream Radar RNG in Generation 5",description:"RNG Level 5 Dream Ball HA Legends",slug:"emulator-b2w2-dream-radar",subCategory:"Emulator"};function i(r){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Desmume",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Setup Desmume for RNG"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/suloku/BW_tool/releases",children:"Suloku's Gen V Save Tool (Optional)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Alternatively, you can extract your BW2 save file after obtaining the Pokemon you wish to RNG from the Dream Radar if you rather not inject."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You may have noticed a "Dream Radar" tab in RNG Reporter. During the time of this guide being written, that tab does not work. Therefore, this guide will explain an alternate method of finding seeds and desired IV/Nature combinations.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Finding a spread"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open RNG reporter and go to "Gen 5 Time Finder". Stay on the "Capture" tab and adjust the settings accordingly.'}),`
`,e.jsx(n.li,{children:'Set IVs to what you want, Encounter Type is "Wild Pokemon", and the method is "IVs (Standard Seed)".'}),`
`,e.jsx(n.li,{children:"The IVs frame range depends on what Pokemon you are RNGing. For the Therian Trio (Tornadus, Thundurus, Landorus) set the minimum IV frame to 21. For the other Pokemon the minimum IV frame is 8. Maximum frame can be whatever you prefer."}),`
`,e.jsx(n.li,{children:"Hit search and wait for results to show."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Timefinder.png",alt:"Timefinder"})}),`
`,e.jsx(n.p,{children:"If you are going for a Generation 4 Legendary or a random Pokemon, target even IV frames, but if you are going for a Therian-Forme, target odd IV frames."}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a nature (Optional)"}),`
`,e.jsx(n.p,{children:'You may notice that Time Finder has not listed nature for Dream Radar. To get the nature we will hit by using a frame, we will go to the main RNGReporter screen and select "Gen 5 PIDRNG".'}),`
`,e.jsx(n.p,{children:"Unfortunately, you cannot control Dream Radar nature, only predict it. To find the nature we will get, we use a formula."}),`
`,e.jsx(n.p,{children:"For example, if I want this:"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Nature.png",alt:"Nature"})}),`
`,e.jsx(n.p,{children:"I will take the seed and get the initial PIDRNG Frame for it using the button on RNGReporter."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This button will appear on the right when you have selected Gen 5 PIDRNG."}),`
`]}),`
`,e.jsx(n.h3,{children:"Therian Trio"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"(Your IVFrame (The one in Time Finder) - 21) / 2 = Number of required Advancements"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Initial PIDRNG Frame + 7 + Advances required = PIDFrame you will hit"}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{children:"G4 Box Legends and Gendered Pokemon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"(Your IVFrame - 8) / 2 = Number of required advancements"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Initial PIDRNG Frame + 2 + (2 * advances required) = PIDFrame you will hit"}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{children:"Genderless Pokemon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"(Your IVFrame - 8) / 2 = Number of required advancements"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Initial PIDRNG Frame + 1 + (2 * advances required) = PIDFrame you will hit"}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: RNGing the Pokemon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`Use Key System's "Send and Receive Keys" function to frame advance`,`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Each time you start the "Send and Receive Keys" search, it will advance both the PIDRNG and IVRNG Frames by 2.'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:`Obtain your Pokemon
In the example below, we have a dream ball hidden ability Landorus!`}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Result.png",alt:"Result"})})]})}function l(r={}){const{wrapper:n}={...a(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{l as default,s as frontmatter};
