import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-IIWtMu3s.js";var n=e(),r={title:`Colosseum General RNG`,description:`RNG in Colosseum`,slug:`emulator-colosseum-general`,category:`Gamecube`,isRoughDraft:!0,section:`rng_technique`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools:`}),`
`,(0,n.jsx)(r.p,{children:`To RNG abuse Pokémon Colosseum, you will need:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`An ISO of Pokémon Colosseum`}),`
`,(0,n.jsx)(r.li,{children:`Dolphin version 4.0-6848 (this version works with RTC for Colosseum)`}),`
`,(0,n.jsx)(r.li,{children:`RunAsDate (x64)`}),`
`,(0,n.jsx)(r.li,{children:`A calculator`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`This guide explains how to RNG Pokémon Colosseum using emulators. You need basic knowledge of Gamecube RNG (especially XD) and using Dolphin & VBA (Visual Boy Advance).`}),`
`,(0,n.jsx)(r.p,{children:`The original guide was provided by Jellal.`}),`
`,(0,n.jsx)(r.h2,{children:`Setting up`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder and select "Stationary" in the Gen 3 column.`}),`
`,(0,n.jsx)(r.li,{children:`Create a new profile for Pokémon Colosseum.`}),`
`,(0,n.jsx)(r.li,{children:`In the Gen 3 Stationary Window, select your new profile. PokeFinder will set Colo/XD as the search method.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Configuration`}),`
`,(0,n.jsx)(r.p,{children:`Setting up Dolphin for this RNG is important, as we are using an outdated version with RTC only through RunAsDate.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In RunAsDate, select the path where your Dolphin.exe is located.`}),`
`,(0,n.jsx)(r.li,{children:`Choose "Absolute date/time" in Date/Time.`}),`
`,(0,n.jsxs)(r.li,{children:[`In "Parameters," type: `,(0,n.jsx)(r.code,{children:`" -d "`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Ensure other checkboxes are unchecked.`}),`
`,(0,n.jsx)(r.li,{children:`Set the date and time to 1/1/2000 at 12:00:00 AM.`}),`
`,(0,n.jsx)(r.li,{children:`Run Dolphin from RunAsDate.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`In Dolphin, open your game, pause, and check Watch in View. Add these numbers to your RAM Watch:`}),`
`,(0,n.jsx)(r.p,{children:`For US Colosseum:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Main PRNG: 80478c90.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 1: 80473070.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 2: 804731a8.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 3: 804732e0.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 4: 80473418.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 5: 80473550.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 6: 80473688.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`For PAL Colosseum:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Main PRNG: 804c6130.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 1: 804c0508.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 2: 804c0640.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 3: 804c0778.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 4: 804c08b0.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 5: 804c09e8.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 6: 804c0b20.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`For JPN Colosseum:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Main PRNG: 80464360.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 1: 8045e750.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 2: 8045e888.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 3: 8045e9c0.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 4: 8045eaf8.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 5: 8045ec30.`}),`
`,(0,n.jsx)(r.li,{children:`AI Slot 6: 8045ed68.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Click "Save," so you don't have to re-enter these values.`}),`
`,(0,n.jsx)(r.h2,{children:`The RNG Process`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In the main PokeFinder window, go to Gen 3 Tools > IVs to PID.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the IVs and Nature of your desired spread.`}),`
`,(0,n.jsx)(r.li,{children:`Copy the Seed from the results table.`}),`
`,(0,n.jsx)(r.li,{children:`Open the Gamecube RTC window (Gen 3 Tools). Enter the initial seed from 1/1/2000 and the seed from the IVs to PID window.`}),`
`,(0,n.jsx)(r.li,{children:`Set an advance range (e.g., 4000 min) and click "Search."`}),`
`,(0,n.jsx)(r.li,{children:`Gamecube RTC will provide the time you need to set up on RunAsDate to boot your game with the specific initial seed required.`}),`
`,(0,n.jsx)(r.li,{children:`Change RunAsDate's date and time values to match the ones from Gamecube RTC.`}),`
`,(0,n.jsx)(r.li,{children:`Boot up your game, ensuring the PRNG state in RAM Watch matches the seed in Gamecube RTC. If they don't match, check your Dolphin version, Date/Time, or PRNG value.`}),`
`,(0,n.jsx)(r.li,{children:`In PokeFinder's Gen 3 stationary window, enter your new initial seed, spread info, load your profile, and click "Calculate." Your target advance will be displayed.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`The RNG Process (Continued)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Boot your game and enter the overworld, starting from a point where you can reach your target Shadow Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`Create a save state before encountering the Pokémon.`}),`
`,(0,n.jsxs)(r.li,{children:[`To advance the PRNG:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`In noiseless areas: Over 10,000 advances: Check a Shadow Pokémon's summary. Less than 3,000 advances: View a regular Pokémon's summary. Less than 500 advances: Go back and forth from the PDA Menu to Shadow Monitor.`}),`
`,(0,n.jsx)(r.li,{children:`In noisy areas (Bayleff method): Swap summaries of two non-shadow Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`During battles: Advance the RNG while battling.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`In noiseless areas, you can control advancements. In noisy areas, PRNG advances uncontrollably. Hope to hit the correct PRNG state.`}),`
`,(0,n.jsx)(r.li,{children:`Advance the RNG using the techniques mentioned earlier. Make save states as you approach your target.`}),`
`,(0,n.jsx)(r.li,{children:`Once you are five advances from your target, trigger the encounter. Check the Shadow Pokémon's AI slot for your spread.`}),`
`,(0,n.jsx)(r.li,{children:`For confirmation, enter the PRNG address in Memory View.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`From here, you can either KO the Pokémon and capture it later or capture it immediately. Once you're in the post-game, use Dive/Repeat/Luxury Balls from the mainline GBA games to capture your shiny Shadow Pokémon.`}),`
`,(0,n.jsx)(r.p,{children:`Congratulations! You now have a shiny Shadow Pokémon.`})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};