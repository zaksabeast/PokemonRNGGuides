import{u as r,j as e}from"./index-DtinywFa.js";const s={title:"Wild RNG",description:"Wild RNG",slug:"dppt-wild",subCategory:"Basic Knowledge"};function i(t){const n={code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide assumes basic knowledge of Gen 4 RNG, such as hitting an initial Seed and advancing the RNG."}),`
`,e.jsx(n.h2,{children:"General"}),`
`,e.jsx(n.p,{children:"Before diving into specific cases, it's essential to determine your Target Frame and configure PokeFinder as follows:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Open PokeFinder => Gen 4 => Wild => Searcher. ",e.jsx(n.strong,{children:"Make sure to select Method J."})]}),`
`,e.jsx(n.li,{children:"Set up your profile, including the route and the desired Pokémon with the correct encounter slot."}),`
`,e.jsx(n.li,{children:"Apply your criteria and pinpoint your target advance."}),`
`]}),`
`,e.jsx(n.h2,{children:"Basic Wild"}),`
`,e.jsx(n.p,{children:"For a straightforward wild encounter, head to the area with your target Pokémon. Make sure you have a Pokémon with Sweet Scent or honey, and you're good to go. No additional items or actions are required. Follow these steps:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Hit your initial seed."}),`
`,e.jsx(n.li,{children:"Open your party."}),`
`,e.jsx(n.li,{children:"Advance the RNG."}),`
`,e.jsx(n.li,{children:"Use Sweet Scent or honey."}),`
`,e.jsx(n.li,{children:"Avoid leaving the menu to prevent any noise cancelation."}),`
`]}),`
`,e.jsx(n.p,{children:"Unlike Gen 5, Sweet Scent and honey animations won't affect RNG advancement."}),`
`,e.jsx(n.h2,{children:"GBA Insertions"}),`
`,e.jsxs(n.p,{children:["The RNG process for GBA insertions is the same as basic wild RNG. Just keep in mind that they use ",e.jsx(n.strong,{children:"Encounter Slot 8 and 9"}),". If your profile is correctly set up, PokeFinder should automatically adjust and display all the relevant information."]}),`
`,e.jsx(n.h2,{children:"Fishing"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Any methods claiming to boost the fishing rate do not work. PokeFinder should account for this, as it's a DPPt bug.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Move to your desired fishing location."}),`
`,e.jsx(n.li,{children:"Advance the RNG in your party."}),`
`,e.jsx(n.li,{children:"Open your bag and use the fishing rod."}),`
`]}),`
`,e.jsx(n.p,{children:"On an emulator, if you notice a significant advancement, it indicates a successful hook and a possible hint that you've reached your target encounter. PokeFinder also reveals in the Generator which advances lead to an encounter and which do not."}),`
`,e.jsx(n.h3,{children:"Feebas"}),`
`,e.jsx(n.p,{children:"Feebas encounters are a bit more challenging than usual. Here's what to do:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Locate the right tile."}),`
`,e.jsx(n.li,{children:"Save and configure your RNG."}),`
`,e.jsx(n.li,{children:"Use the PokeFinder Generator and input the initial Seed to pinpoint the target advance."}),`
`,e.jsx(n.li,{children:"Ensure that your target and the subsequent advance result in an encounter; otherwise, you may get no encounter."}),`
`]}),`
`,e.jsx(n.p,{children:"For Feebas, there's a 50/50 element that isn't supported at the moment, making it somewhat random."}),`
`,e.jsx(n.h2,{children:"Trophy Garden"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Stand in front of the garden owner and save your game."}),`
`,e.jsx(n.li,{children:"Reload your setup with any initial seed."}),`
`,e.jsx(n.li,{children:"Open PokeFinder, go to Static, Method 1, and generate results."}),`
`,e.jsx(n.li,{children:"Examine the first value of the PID at your current Advance."}),`
`,e.jsx(n.li,{children:"Use the table below to determine which Pokémon will be available when you engage in a conversation with the owner:"}),`
`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{style:{textAlign:"left"},children:"PID"}),e.jsx(n.th,{children:"Pokemon"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"0"}),e.jsx(n.td,{children:"Eevee"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"1"}),e.jsx(n.td,{children:"Bonsly"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"2"}),e.jsx(n.td,{children:"Happiny"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"3"}),e.jsx(n.td,{children:"Meowth"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"4"}),e.jsx(n.td,{children:"Cleffa"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"5"}),e.jsx(n.td,{children:"Clefairy"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"6"}),e.jsx(n.td,{children:"Igglybuff"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"7"}),e.jsx(n.td,{children:"Plusle"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"8"}),e.jsx(n.td,{children:"Jigglypuff"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"9"}),e.jsx(n.td,{children:"Porygon (DP) / Ditto(Pt)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"A"}),e.jsx(n.td,{children:"Castform"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"B"}),e.jsx(n.td,{children:"Minun"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"C"}),e.jsx(n.td,{children:"Mime Jr."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"D"}),e.jsx(n.td,{children:"Marill"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"E"}),e.jsx(n.td,{children:"Chansey"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"F"}),e.jsx(n.td,{children:"Azurill"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Due to indexing differences between tools, you might be off by one. Make a small adjustment if needed.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The Pokémon of the day will occupy Encounter Slot 6, and the previous day's Pokémon will become Encounter Slot 7.
`})}),`
`,e.jsx(n.h2,{children:"Great Marsh"}),`
`,e.jsx(n.p,{children:"Similar to the Trophy Garden, this utilizes Encounter Slot 6 and 7."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Utilize the lookout to select your desired Pokémon."}),`
`,e.jsx(n.li,{children:"Save your game in front of the Great Marsh."}),`
`,e.jsx(n.li,{children:"Search for a target with a narrow enough range that allows for hitting the target without introducing RNG noise from walking."}),`
`,e.jsx(n.li,{children:"Conclude the RNG as usual."}),`
`]})]})}function d(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{d as default,s as frontmatter};
