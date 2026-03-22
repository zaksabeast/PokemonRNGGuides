import{ii as s,j as n}from"./index-CEitD9YF.js";const h=[{title:"Black 2 and White 2 Wild RNG",navDrawerTitle:"Wild RNG",description:"Learn how to RNG wild Pokémon in Black 2 and White 2 for shiny and high-IV results.",slug:"emulator-b2w2-wild",category:"Black 2 and White 2",addedOn:"2026-03-08",section:"pokemon_rng",variant:"cfw-emu"},{title:"Black and White Wild RNG",navDrawerTitle:"Wild RNG",description:"Learn how to RNG wild Pokémon in Black and White for shiny and high-IV results.",slug:"emulator-bw-wild",category:"Black and White",addedOn:"2026-03-08",section:"pokemon_rng",variant:"cfw-emu",canonical:"emulator-b2w2-wild"}];function r(t){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...t.components},{Alert:i}=e;return i||o("Alert"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/emulator-bw-find-ds-parameters",children:"A configured game profile"})}),`
`,n.jsx(e.li,{children:"Chatot with Chatter"}),`
`,n.jsx(e.li,{children:"A Pokémon with Sweet Scent or have Honey in bag"}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 1: Understand Gen 5 RNG"}),`
`,n.jsx(e.p,{children:"In Gen 5, RNG is split into two separate systems."}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"RNG Type"}),n.jsx(e.th,{children:"Controls"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"PIDRNG"}),n.jsx(e.td,{children:"Shiny status, nature, gender, ability."})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"IVRNG"}),n.jsx(e.td,{children:"Pokémon IVs only."})]})]})]}),`
`,n.jsx(e.p,{children:"You must control both to obtain a shiny Pokémon with the desired IVs."}),`
`,n.jsx(e.h2,{children:"Step 2: Choose and Prepare Your Location"}),`
`,n.jsx(e.p,{children:"Go to the route where you want to encounter the Pokémon, with the script already running."}),`
`,n.jsx(e.p,{children:"This allows you to check whether the map is noisy, which is important for Gen 5 RNG."}),`
`,n.jsx(e.p,{children:"Once you choose your location and target:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Save the game."}),`
`,n.jsx(e.li,{children:"Close the emulator."}),`
`]}),`
`,n.jsxs(e.p,{children:["For detailed information about NPC behavior and a list of low-noise locations, see ",n.jsx(e.a,{href:"https://docs.google.com/document/d/1Hxz24gvMLrt8Qk-_6tG50hEA0TI8fuCI6yqQwBckwR4/edit?usp=sharing",children:"this external NPC behavior guide"}),"."]}),`
`,n.jsx(e.h2,{children:"Step 3: Search for a Target Seed"}),`
`,n.jsx(e.p,{children:"Open PokeFinder and configure the search."}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'Go to the "Gen 5" tab.'}),`
`,n.jsx(e.li,{children:'Select "Wild".'}),`
`,n.jsx(e.li,{children:"Choose your game profile."}),`
`,n.jsx(e.li,{children:'Open the "Searcher" tab.'}),`
`,n.jsx(e.li,{children:'Select a "Lead" if the first Pokémon in your party has a lead ability.'}),`
`,n.jsx(e.li,{children:'Set the "Advances" value to the amount you plan to advance in-game.'}),`
`,n.jsx(e.li,{children:"Choose your target Pokémon in the Settings section."}),`
`,n.jsx(e.li,{children:"Configure desired values in Filter, such as IVs, gender, ability, or nature."}),`
`,n.jsx(e.li,{children:"Adjust the date range."}),`
`,n.jsx(e.li,{children:'Click "Search".'}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 4: Start the Game on the Target Seed"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"runasdate.exe"})," from the ",n.jsx(e.a,{href:"/desmume-setup",children:"Desmume Guide"})," to launch the game at the correct date and time."]}),`
`,n.jsx(e.li,{children:"Enter the game quickly."}),`
`,n.jsx(e.li,{children:"Open the menu immediately."}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Be sure not to turn on the C-Gear when entering the game to avoid any unpredictable advancements.
`})}),`
`,n.jsx(e.p,{children:"The initial seed should match your target."}),`
`,n.jsx(e.p,{children:"If the seed is incorrect, recheck your profile parameters or runasdate configuration."}),`
`,n.jsx(e.h2,{children:"Step 5: Advance the PIDRNG"}),`
`,n.jsx(e.p,{children:"Use these methods to increase the PIDRNG Advance:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Chatot: Use Chatter to advance +1 every time you check its summary."}),`
`,n.jsx(e.li,{children:"Save the game: This is useful for specific cases like Starters."}),`
`,n.jsx(e.li,{children:"NPC advancement: This can be tricky but can be managed with weather to advance LCRNG quickly."}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 6: Advance the IVRNG"}),`
`,n.jsx(e.p,{children:"Use these methods to increase the IVRNG Advance:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Walking 128 steps increases the IVRNG by the number of Pokémon in your party (e.g. 6 Pokémon advances by 6)."}),`
`,n.jsx(e.li,{children:"Withdraw a Pokémon in the PC advances the IVRNG by 7."}),`
`,n.jsx(e.li,{children:"Battling Pokémon also advances the IVRNG, but the result can be unpredictable."}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 7: Trigger the Encounter"}),`
`,n.jsx(e.p,{children:"After reaching the correct PIDRNG Advance and IVRNG Advance:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Make sure you are on the target Advance."}),`
`,n.jsx(e.li,{children:"Use Sweet Scent or Honey to start the wild encounter."}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Use save states in noisy areas so you can retry if you miss the target Advance.
`})}),`
`,n.jsx(i,{type:"warning",showIcon:!0,message:"If the location has moving NPCs or weather, the LCRNG will continue advancing during the Sweet Scent/Honey animation."}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Congrats! You've now got your Pokémon!"})}),`
`,n.jsx(e.h2,{children:"Troubleshooting"}),`
`,n.jsx(e.p,{children:"This means the encounter may not occur on the exact target Advance, even if your setup is correct."}),`
`,n.jsx(e.p,{children:"There is no guaranteed solution. You must adjust and calibrate until you consistently hit the correct shiny."}),`
`,n.jsx(e.p,{children:"However, fishing doesn't advance LCRNG Advances, so you can fish without any problems."}),`
`,n.jsx(e.h2,{children:"Credits"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Vlad for writing the original guide"}),`
`,n.jsx(e.li,{children:"Fiask for finalizing and translating the guide"}),`
`]})]})}function l(t={}){const{wrapper:e}={...s(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(r,{...t})}):r(t)}function o(t,e){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default,h as frontmatter};
