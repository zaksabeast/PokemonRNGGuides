import{u as l,j as e}from"./index-5j1DF-qJ.js";const r={title:"Colosseum General RNG",description:"RNG in Colosseum",slug:"emulator-colosseum-general",subCategory:"Emulator",isRoughDraft:!0};function o(i){const n={h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements:"}),`
`,e.jsx(n.p,{children:"In order to RNG abuse Pokemon Colosseum you will need:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsx(n.li,{children:"An ISO of Pokemon Colosseum"}),`
`,e.jsx(n.li,{children:"Dolphin version 4.0-6848. (This version is known to work with RTC for Colosseum)"}),`
`,e.jsx(n.li,{children:"RunAsDate (x64)"}),`
`,e.jsx(n.li,{children:"A calculator"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide explains how to RNG Pokemon Colosseum using emulators. It is based on experience and extensive research. Basic knowledge of Gamecube RNG (especially XD) and using Dolphin & VBA (Visual Boy Advance) is required."}),`
`,e.jsx(n.p,{children:"The original guide was provided by Jellal."}),`
`,e.jsx(n.h2,{children:"Setting up"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open Pokefinder, select "Stationary" in the Gen 3 column.'}),`
`,e.jsx(n.li,{children:"Create a new profile for Pokemon Colosseum."}),`
`,e.jsx(n.li,{children:"In the Gen 3 Stationary Window, select your new profile, and PokeFinder will set Colo/XD as the Search method."}),`
`]}),`
`,e.jsx(n.h2,{children:"Configuration"}),`
`,e.jsx(n.p,{children:"Dolphin setup for this RNG is important, as we are working with an outdated version using RTC only with RunAsDate."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In RunAsDate, select the path where your Dolphin.exe is located."}),`
`,e.jsx(n.li,{children:'Choose "Absolute date / time" in Date/Time.'}),`
`,e.jsx(n.li,{children:'In "Parameters," type: " -d ".'}),`
`,e.jsx(n.li,{children:"Ensure other checkboxes are unchecked."}),`
`,e.jsx(n.li,{children:"Set the date and time to 1/1/2000 at 12:00:00 AM."}),`
`,e.jsx(n.li,{children:"Run Dolphin from RunAsDate."}),`
`]}),`
`,e.jsx(n.p,{children:"In Dolphin, open your game, pause, and check Watch in View. Add these numbers to your RAM Watch:"}),`
`,e.jsx(n.p,{children:"For US Colosseum:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Main PRNG: 80478c90"}),`
`,e.jsx(n.li,{children:"AI Slot 1: 80473070"}),`
`,e.jsx(n.li,{children:"AI Slot 2: 804731a8"}),`
`,e.jsx(n.li,{children:"AI Slot 3: 804732e0"}),`
`,e.jsx(n.li,{children:"AI Slot 4: 80473418"}),`
`,e.jsx(n.li,{children:"AI Slot 5: 80473550"}),`
`,e.jsx(n.li,{children:"AI Slot 6: 80473688"}),`
`]}),`
`,e.jsx(n.p,{children:"For PAL Colosseum:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Main PRNG: 804c6130"}),`
`,e.jsx(n.li,{children:"AI Slot 1: 804c0508"}),`
`,e.jsx(n.li,{children:"AI Slot 2: 804c0640"}),`
`,e.jsx(n.li,{children:"AI Slot 3: 804c0778"}),`
`,e.jsx(n.li,{children:"AI Slot 4: 804c08b0"}),`
`,e.jsx(n.li,{children:"AI Slot 5: 804c09e8"}),`
`,e.jsx(n.li,{children:"AI Slot 6: 804c0b20"}),`
`]}),`
`,e.jsx(n.p,{children:"For JPN Colosseum:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Main PRNG: 80464360"}),`
`,e.jsx(n.li,{children:"AI Slot 1: 8045e750"}),`
`,e.jsx(n.li,{children:"AI Slot 2: 8045e888"}),`
`,e.jsx(n.li,{children:"AI Slot 3: 8045e9c0"}),`
`,e.jsx(n.li,{children:"AI Slot 4: 8045eaf8"}),`
`,e.jsx(n.li,{children:"AI Slot 5: 8045ec30"}),`
`,e.jsx(n.li,{children:"AI Slot 6: 8045ed68"}),`
`]}),`
`,e.jsx(n.p,{children:`Click "Save," so you don't have to re-enter these values.`}),`
`,e.jsx(n.h2,{children:"The RNG Process"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In the main PokeFinder window, go to Gen 3 Tools > IVs to PID."}),`
`,e.jsx(n.li,{children:"Enter the IVs and Nature of the desired spread."}),`
`,e.jsx(n.li,{children:"Copy the Seed from the results table."}),`
`,e.jsx(n.li,{children:"Open the Gamecube RTC window (Gen 3 Tools). Enter the initial seed from 1/1/2000, and the seed from the IVs to PID window."}),`
`,e.jsx(n.li,{children:'Set an advance range (e.g., 4000 min) and click "Search."'}),`
`,e.jsx(n.li,{children:"Gamecube RTC will provide the time you need to set up on RunAsDate to boot your game with the specific initial seed required."}),`
`,e.jsx(n.li,{children:"Change RunAsDate's date and time values to match the ones from Gamecube RTC."}),`
`,e.jsx(n.li,{children:"Boot up your game, ensuring the PRNG state in RAM Watch matches the seed in Gamecube RTC. If they don't match, check your Dolphin version, Date/Time, or PRNG value."}),`
`,e.jsx(n.li,{children:`In PokeFinder's Gen 3 stationary window, enter your new initial seed, spread info, load your profile, and click "Calculate." Your target advance will be displayed.`}),`
`]}),`
`,e.jsx(n.h2,{children:"The RNG Process (Continued)"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Boot your game and enter the overworld, ensuring you start from a point where you can reach your target Shadow Pokemon."}),`
`,e.jsx(n.li,{children:"Create a save state before encountering the Pokemon."}),`
`,e.jsxs(n.li,{children:["To advance the PRNG:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["In noiseless areas:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Over 10,000 advances: Check a Shadow Pokemon's summary."}),`
`,e.jsx(n.li,{children:"Less than 3,000 advances: View a regular Pokemon's summary."}),`
`,e.jsx(n.li,{children:"Less than 500 advances: Go back and forth from PDA Menu to Shadow Monitor."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"In noisy areas (Bayleff method): Swap summaries of two non-shadow Pokemons."}),`
`,e.jsx(n.li,{children:"During battles: Advance the RNG while battling."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"In noiseless areas, you have control over advancements. But in noisy areas, PRNG advances uncontrollably. Hope to hit the correct PRNG state."}),`
`,e.jsx(n.li,{children:"Advance the RNG using the techniques mentioned earlier. Make save states as you approach your target."}),`
`,e.jsx(n.li,{children:"Once you are five advances from your target, trigger the encounter. Check the Shadow Pokemon's AI slot for your spread."}),`
`,e.jsx(n.li,{children:"For confirmation, enter the PRNG address in Memory View."}),`
`]}),`
`,e.jsx(n.p,{children:"From here, you can either KO the Pokemon and capture it later or capture it immediately. Once you're in the post-game, you can use Dive/Repeat/Luxury Balls from the mainline GBA games to capture your Shiny Shadow Pokemon."}),`
`,e.jsx(n.p,{children:"Congratulations! You now have a Shiny Shadow Pokemon."})]})}function t(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{t as default,r as frontmatter};
