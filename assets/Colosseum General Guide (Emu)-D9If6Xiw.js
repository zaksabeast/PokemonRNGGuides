import{u as l,j as e}from"./index-B1VKQ_Ga.js";const r={title:"Colosseum General RNG",description:"RNG in Colosseum",slug:"emulator-colosseum-general",category:"Gamecube",isRoughDraft:!0,tag:"emu"};function i(o){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools:"}),`
`,e.jsx(n.p,{children:"To RNG abuse Pokémon Colosseum, you will need:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsx(n.li,{children:"An ISO of Pokémon Colosseum"}),`
`,e.jsx(n.li,{children:"Dolphin version 4.0-6848 (this version works with RTC for Colosseum)"}),`
`,e.jsx(n.li,{children:"RunAsDate (x64)"}),`
`,e.jsx(n.li,{children:"A calculator"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide explains how to RNG Pokémon Colosseum using emulators. You need basic knowledge of Gamecube RNG (especially XD) and using Dolphin & VBA (Visual Boy Advance)."}),`
`,e.jsx(n.p,{children:"The original guide was provided by Jellal."}),`
`,e.jsx(n.h2,{children:"Setting up"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open PokeFinder and select "Stationary" in the Gen 3 column.'}),`
`,e.jsx(n.li,{children:"Create a new profile for Pokémon Colosseum."}),`
`,e.jsx(n.li,{children:"In the Gen 3 Stationary Window, select your new profile. PokeFinder will set Colo/XD as the search method."}),`
`]}),`
`,e.jsx(n.h2,{children:"Configuration"}),`
`,e.jsx(n.p,{children:"Setting up Dolphin for this RNG is important, as we are using an outdated version with RTC only through RunAsDate."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In RunAsDate, select the path where your Dolphin.exe is located."}),`
`,e.jsx(n.li,{children:'Choose "Absolute date/time" in Date/Time.'}),`
`,e.jsxs(n.li,{children:['In "Parameters," type: ',e.jsx(n.code,{children:'" -d "'}),"."]}),`
`,e.jsx(n.li,{children:"Ensure other checkboxes are unchecked."}),`
`,e.jsx(n.li,{children:"Set the date and time to 1/1/2000 at 12:00:00 AM."}),`
`,e.jsx(n.li,{children:"Run Dolphin from RunAsDate."}),`
`]}),`
`,e.jsx(n.p,{children:"In Dolphin, open your game, pause, and check Watch in View. Add these numbers to your RAM Watch:"}),`
`,e.jsx(n.p,{children:"For US Colosseum:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Main PRNG: 80478c90."}),`
`,e.jsx(n.li,{children:"AI Slot 1: 80473070."}),`
`,e.jsx(n.li,{children:"AI Slot 2: 804731a8."}),`
`,e.jsx(n.li,{children:"AI Slot 3: 804732e0."}),`
`,e.jsx(n.li,{children:"AI Slot 4: 80473418."}),`
`,e.jsx(n.li,{children:"AI Slot 5: 80473550."}),`
`,e.jsx(n.li,{children:"AI Slot 6: 80473688."}),`
`]}),`
`,e.jsx(n.p,{children:"For PAL Colosseum:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Main PRNG: 804c6130."}),`
`,e.jsx(n.li,{children:"AI Slot 1: 804c0508."}),`
`,e.jsx(n.li,{children:"AI Slot 2: 804c0640."}),`
`,e.jsx(n.li,{children:"AI Slot 3: 804c0778."}),`
`,e.jsx(n.li,{children:"AI Slot 4: 804c08b0."}),`
`,e.jsx(n.li,{children:"AI Slot 5: 804c09e8."}),`
`,e.jsx(n.li,{children:"AI Slot 6: 804c0b20."}),`
`]}),`
`,e.jsx(n.p,{children:"For JPN Colosseum:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Main PRNG: 80464360."}),`
`,e.jsx(n.li,{children:"AI Slot 1: 8045e750."}),`
`,e.jsx(n.li,{children:"AI Slot 2: 8045e888."}),`
`,e.jsx(n.li,{children:"AI Slot 3: 8045e9c0."}),`
`,e.jsx(n.li,{children:"AI Slot 4: 8045eaf8."}),`
`,e.jsx(n.li,{children:"AI Slot 5: 8045ec30."}),`
`,e.jsx(n.li,{children:"AI Slot 6: 8045ed68."}),`
`]}),`
`,e.jsx(n.p,{children:`Click "Save," so you don't have to re-enter these values.`}),`
`,e.jsx(n.h2,{children:"The RNG Process"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In the main PokeFinder window, go to Gen 3 Tools > IVs to PID."}),`
`,e.jsx(n.li,{children:"Enter the IVs and Nature of your desired spread."}),`
`,e.jsx(n.li,{children:"Copy the Seed from the results table."}),`
`,e.jsx(n.li,{children:"Open the Gamecube RTC window (Gen 3 Tools). Enter the initial seed from 1/1/2000 and the seed from the IVs to PID window."}),`
`,e.jsx(n.li,{children:'Set an advance range (e.g., 4000 min) and click "Search."'}),`
`,e.jsx(n.li,{children:"Gamecube RTC will provide the time you need to set up on RunAsDate to boot your game with the specific initial seed required."}),`
`,e.jsx(n.li,{children:"Change RunAsDate's date and time values to match the ones from Gamecube RTC."}),`
`,e.jsx(n.li,{children:"Boot up your game, ensuring the PRNG state in RAM Watch matches the seed in Gamecube RTC. If they don't match, check your Dolphin version, Date/Time, or PRNG value."}),`
`,e.jsx(n.li,{children:`In PokeFinder's Gen 3 stationary window, enter your new initial seed, spread info, load your profile, and click "Calculate." Your target advance will be displayed.`}),`
`]}),`
`,e.jsx(n.h2,{children:"The RNG Process (Continued)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Boot your game and enter the overworld, starting from a point where you can reach your target Shadow Pokémon."}),`
`,e.jsx(n.li,{children:"Create a save state before encountering the Pokémon."}),`
`,e.jsxs(n.li,{children:["To advance the PRNG:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In noiseless areas: Over 10,000 advances: Check a Shadow Pokémon's summary. Less than 3,000 advances: View a regular Pokémon's summary. Less than 500 advances: Go back and forth from the PDA Menu to Shadow Monitor."}),`
`,e.jsx(n.li,{children:"In noisy areas (Bayleff method): Swap summaries of two non-shadow Pokémon."}),`
`,e.jsx(n.li,{children:"During battles: Advance the RNG while battling."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"In noiseless areas, you can control advancements. In noisy areas, PRNG advances uncontrollably. Hope to hit the correct PRNG state."}),`
`,e.jsx(n.li,{children:"Advance the RNG using the techniques mentioned earlier. Make save states as you approach your target."}),`
`,e.jsx(n.li,{children:"Once you are five advances from your target, trigger the encounter. Check the Shadow Pokémon's AI slot for your spread."}),`
`,e.jsx(n.li,{children:"For confirmation, enter the PRNG address in Memory View."}),`
`]}),`
`,e.jsx(n.p,{children:"From here, you can either KO the Pokémon and capture it later or capture it immediately. Once you're in the post-game, use Dive/Repeat/Luxury Balls from the mainline GBA games to capture your shiny Shadow Pokémon."}),`
`,e.jsx(n.p,{children:"Congratulations! You now have a shiny Shadow Pokémon."})]})}function t(o={}){const{wrapper:n}={...l(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{t as default,r as frontmatter};
